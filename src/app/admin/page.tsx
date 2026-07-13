"use client";

import React, { useState } from "react";
import { useDB, Order } from "@/context/DBContext";
import { 
  Plus, 
  Search, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  Upload, 
  Phone, 
  Calendar, 
  User, 
  DollarSign, 
  FileText,
  TrendingUp,
  X,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";

export default function AdminDashboard() {
  const { orders, createOrder, updateOrder, deleteOrder, settings } = useDB();

  // State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({ client_name: "", client_phone: "", plan: "standard" as "standard" | "premium" });
  const [pdfInputUrl, setPdfInputUrl] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  const handleCopyFormLink = (order: Order) => {
    const link = `${window.location.origin}/form?id=${order.id}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedOrderId(order.id);
      setTimeout(() => setCopiedOrderId(null), 2000);
    });
  };

  // Helpers: Calculate Traffic Light Status
  const getTrafficLight = (order: Order) => {
    if (order.status === "entregue") {
      return { 
        color: "bg-slate-950 text-slate-400 border-slate-800", 
        dotColor: "bg-slate-500", 
        label: "Entregue" 
      };
    }
    
    const dueDate = new Date(order.due_date).getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { 
        color: "bg-red-950/50 text-red-400 border-red-850", 
        dotColor: "bg-red-500", 
        label: "Atrasado" 
      };
    } else if (diffDays <= 2) {
      return { 
        color: "bg-amber-950/50 text-amber-400 border-amber-850", 
        dotColor: "bg-amber-500", 
        label: "Atenção" 
      };
    } else {
      return { 
        color: "bg-emerald-950/50 text-emerald-400 border-emerald-850", 
        dotColor: "bg-emerald-500", 
        label: "No Prazo" 
      };
    }
  };

  // Metrics
  const stats = {
    newToday: orders.filter(o => o.status === "pagamento_pendente").length,
    inProgress: orders.filter(o => o.status === "em_producao").length,
    pendingForms: orders.filter(o => o.status === "formulario_pendente").length,
    overdue: orders.filter(o => {
      if (o.status === "entregue") return false;
      return new Date(o.due_date).getTime() < new Date().getTime();
    }).length,
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const query = searchQuery.toLowerCase();
    return (
      o.client_name.toLowerCase().includes(query) ||
      o.client_phone.includes(query) ||
      o.id.toLowerCase().includes(query)
    );
  });

  // Handle manual order creation
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderForm.client_name || !newOrderForm.client_phone) return;

    createOrder({
      client_name: newOrderForm.client_name,
      client_phone: newOrderForm.client_phone,
      plan: newOrderForm.plan,
      status: "pagamento_pendente" // Starts as pending payment
    });

    setIsCreateModalOpen(false);
    setNewOrderForm({ client_name: "", client_phone: "", plan: "standard" });
  };

  // Client PDF link delivery handler
  const handleSavePdf = (orderId: string) => {
    if (!pdfInputUrl.trim()) return;
    updateOrder(orderId, {
      pdf_url: pdfInputUrl,
      status: "pronto_entrega"
    });
    // Sync active state
    if (selectedOrder) {
      setSelectedOrder(prev => prev ? { ...prev, pdf_url: pdfInputUrl, status: "pronto_entrega" } : null);
    }
    setPdfInputUrl("");
  };

  // WhatsApp Messaging Templates Helpers
  const sendWhatsAppMsg = (order: Order, type: "cobrar" | "enviar_form" | "lembrar" | "entregar") => {
    const phone = order.client_phone.replace(/[^0-9]/g, "");
    let text = "";

    const formLink = `${window.location.origin}/form?id=${order.id}`;

    switch (type) {
      case "cobrar":
        text = `Olá ${order.client_name}! Tudo bem? Confirmamos a solicitação do seu Mapa Profético ${order.plan.toUpperCase()}. Faltou apenas o envio do comprovante PIX para darmos início ao preenchimento do seu perfil no sistema. Aguardamos sua confirmação!`;
        break;
      case "enviar_form":
        text = `Olá ${order.client_name}! Confirmamos o seu pagamento. Para podermos iniciar a análise do seu Mapa Profético, por favor preencha o seu perfil dinâmico no link a seguir: ${formLink}`;
        break;
      case "lembrar":
        text = `Olá ${order.client_name}! Lembramos que o formulário do seu Mapa Profético ainda não foi respondido. O preenchimento é necessário para que o Ricardo Ribeiro inicie a análise espiritual. Preencha aqui: ${formLink}`;
        break;
      case "entregar":
        text = `Olá ${order.client_name}! Graça e paz. O seu Mapa Profético está pronto! Segue o link para download do seu arquivo PDF de análise: ${order.pdf_url || "Disponibilizado pelo administrador"}. Qualquer dúvida, estamos à disposição.`;
        break;
    }

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Recommendations Logic
  const getSuggestion = (order: Order) => {
    switch (order.status) {
      case "pagamento_pendente":
        return { text: "Cobrar Comprovante PIX", action: () => sendWhatsAppMsg(order, "cobrar"), color: "bg-amber-500 hover:bg-amber-450 text-slate-950" };
      case "formulario_pendente":
        return { text: "Enviar Link do Formulário", action: () => sendWhatsAppMsg(order, "enviar_form"), color: "bg-blue-600 hover:bg-blue-500 text-white" };
      case "em_producao":
        return { text: "Fazer Análise (Iniciar Produção)", action: () => {}, color: "bg-slate-900 text-white cursor-default" };
      case "pronto_entrega":
        return { text: "Enviar PDF via WhatsApp", action: () => sendWhatsAppMsg(order, "entregar"), color: "bg-emerald-500 hover:bg-emerald-600 text-white" };
      case "entregue":
        return { text: "Concluído", action: () => {}, color: "bg-slate-100 text-slate-400 cursor-default" };
    }
  };

  return (
    <div className="space-y-8 font-sans select-none text-left">
      
      {/* 1. Executive Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-slate-800">
        <div className="text-left">
          <h1 className="text-2xl font-black text-white tracking-tight uppercase leading-none">Modo Hoje</h1>
          <p className="text-xs text-slate-400 font-bold mt-1.5">Acompanhe as pendências imediatas, entregas agendadas e relatórios do Mapa Profético.</p>
        </div>
        <div className="flex gap-2.5 shrink-0">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-455 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-0 shadow-md cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>Novo Pedido</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1 text-left">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Novos Hoje</span>
            <h3 className="text-2xl font-black text-white">{stats.newToday}</h3>
          </div>
          <div className="w-11 h-11 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center border border-amber-500/20">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1 text-left">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Aguardando Perfil</span>
            <h3 className="text-2xl font-black text-white">{stats.pendingForms}</h3>
          </div>
          <div className="w-11 h-11 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/20">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1 text-left">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Em Produção</span>
            <h3 className="text-2xl font-black text-white">{stats.inProgress}</h3>
          </div>
          <div className="w-11 h-11 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center border border-purple-500/20">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1 text-left">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Atrasados (Semáforo)</span>
            <h3 className="text-2xl font-black text-red-500">{stats.overdue}</h3>
          </div>
          <div className="w-11 h-11 bg-red-500/10 text-red-450 rounded-xl flex items-center justify-center border border-red-500/20">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Orders Management area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Table / List list */}
        <div className="lg:col-span-8 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider text-left">Fila Profética ({filteredOrders.length})</h2>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por nome, telefone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3.5 py-1.5 border border-slate-850 rounded-lg focus:outline-none focus:border-amber-500 bg-slate-955 text-slate-100 placeholder-slate-500 text-xs font-semibold w-full sm:w-56"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/60 text-slate-450 font-bold uppercase tracking-wider border-b border-slate-850 text-[9px]">
                    <th className="px-6 py-3.5">Cliente</th>
                    <th className="px-6 py-3.5">Plano</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Semáforo</th>
                    <th className="px-6 py-3.5 text-center">Ações Rápidas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-slate-350 font-bold">
                  {filteredOrders.map((order) => {
                    const traffic = getTrafficLight(order);
                    return (
                      <tr 
                        key={order.id} 
                        onClick={() => { setSelectedOrder(order); setIsMaximized(false); }}
                        onDoubleClick={() => { setSelectedOrder(order); setIsMaximized(true); }}
                        className={`hover:bg-slate-950/60 transition-colors cursor-pointer ${
                          selectedOrder?.id === order.id ? "bg-amber-500/5 text-white" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="font-black text-white">{order.client_name}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{order.client_phone}</div>
                        </td>
                        <td className="px-6 py-4 uppercase">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${order.plan === "premium" ? "bg-purple-950/50 text-purple-400 border border-purple-800/40" : "bg-blue-950/50 text-blue-400 border border-blue-800/40"}`}>
                            {order.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="capitalize text-slate-400 font-semibold">{order.status.replace("_", " ")}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border rounded-full text-[9px] font-black uppercase tracking-wider whitespace-nowrap ${traffic.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${traffic.dotColor}`} />
                            <span>{traffic.label}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-2 justify-center">
                            {order.status === "formulario_pendente" && (
                              <button
                                onClick={() => sendWhatsAppMsg(order, "lembrar")}
                                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-450 hover:text-white border-0 bg-transparent cursor-pointer"
                                title="Cobrar formulário"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                            )}
                            <a
                              href={`tel:${order.client_phone}`}
                              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-450 hover:text-white"
                              title="Ligar"
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-16 text-slate-400 font-bold">Nenhum pedido na fila.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Ficha do Cliente sidebar / overlay details (Right Column) */}
        <div className="lg:col-span-4 space-y-6">
          {selectedOrder ? (
            <div className={isMaximized ? "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in" : "block"}>
              <div className={`bg-slate-900 text-left space-y-6 relative ${isMaximized ? 'w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl' : 'animate-fade-in border border-slate-800 rounded-2xl p-5 shadow-lg'}`}>
                
                <div className="absolute top-4 right-4 flex gap-1">
                  {!isMaximized && (
                    <button 
                      onClick={() => setIsMaximized(true)}
                      className="p-1 hover:bg-slate-800 rounded-lg text-slate-450 hover:text-white border-0 bg-transparent cursor-pointer"
                      title="Maximizar Tela"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => isMaximized ? setIsMaximized(false) : setSelectedOrder(null)}
                    className="p-1 hover:bg-slate-800 rounded-lg text-slate-455 hover:text-white border-0 bg-transparent cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

              <div className="space-y-1.5">
                <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest block font-sans">Ficha do Cliente</span>
                <h3 className="text-lg font-black text-white">{selectedOrder.client_name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-slate-400 font-semibold">{selectedOrder.client_phone}</p>
                  <button
                    onClick={() => handleCopyFormLink(selectedOrder)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider cursor-pointer border transition-colors ${
                      copiedOrderId === selectedOrder.id
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-450"
                        : "bg-slate-950 border-slate-800 text-amber-500 hover:text-amber-400 hover:bg-slate-900"
                    }`}
                    title="Copiar link do formulário deste cliente"
                  >
                    {copiedOrderId === selectedOrder.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-450" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-amber-500" />
                        <span>Copiar Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Status workflow selector */}
              <div className="space-y-1.5 text-xs">
                <label className="text-slate-400 uppercase block font-bold text-[9px] tracking-wider">Mudar Status do Pedido</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e: any) => {
                    const newStatus = e.target.value;
                    updateOrder(selectedOrder.id, { status: newStatus });
                    setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl bg-slate-950 text-slate-100 focus:outline-none focus:border-amber-500 font-bold"
                >
                  <option value="pagamento_pendente">Pagamento Pendente</option>
                  <option value="formulario_pendente">Formulário Pendente</option>
                  <option value="em_producao">Em Produção</option>
                  <option value="pronto_entrega">Pronto para Entrega</option>
                  <option value="entregue">Entregue</option>
                </select>
              </div>
              {/* Suggestions quick action card */}
              <div className="bg-slate-955/40 border border-slate-800/60 rounded-xl p-4 space-y-2 text-xs">
                <h4 className="font-black text-[9px] uppercase tracking-wider text-slate-450 block">Sugestão Próxima Ação</h4>
                {(() => {
                  const suggestion = getSuggestion(selectedOrder);
                  return (
                    <button
                      onClick={suggestion?.action}
                      className={`w-full py-2 px-3 rounded-lg text-center font-bold text-xs uppercase tracking-wider border-0 shadow-sm transition-transform cursor-pointer ${suggestion?.color}`}
                    >
                      {suggestion?.text}
                    </button>
                  );
                })()}
              </div>

              {/* PDF uploader form */}
              {selectedOrder.status === "em_producao" && (
                <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                  <h4 className="font-black text-[9px] uppercase tracking-wider text-slate-450 block">Conclusão: Enviar PDF</h4>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      placeholder="Cole o link do PDF (ex: Cloudinary/Drive)"
                      value={pdfInputUrl}
                      onChange={(e) => setPdfInputUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-800 bg-slate-950 text-white rounded-lg focus:outline-none text-xs font-semibold"
                    />
                    <button
                      onClick={() => handleSavePdf(selectedOrder.id)}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-455 text-slate-950 rounded-lg font-black uppercase tracking-wider text-[10px] cursor-pointer flex items-center justify-center gap-1 border-0"
                    >
                      <Upload className="w-3.5 h-3.5 text-slate-955" />
                      <span>Salvar e Marcar Pronto</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Client Answers responses */}
              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <h4 className="font-black text-[9px] uppercase tracking-wider text-slate-450 block">Respostas do Formulário</h4>
                {selectedOrder.form_responses ? (
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                    {Object.entries(selectedOrder.form_responses).map(([question, ans], idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-[10px] text-slate-400 uppercase font-black">{question}</div>
                        {typeof ans === "string" && ans.startsWith("data:image") ? (
                          <div className="w-24 h-24 border border-slate-800 rounded-xl overflow-hidden mt-1 flex items-center justify-center bg-slate-950">
                            <img src={ans} alt="Perfil" className="max-w-full max-h-full object-cover" />
                          </div>
                        ) : (
                          <p className="text-slate-200 font-semibold leading-relaxed bg-slate-950 border border-slate-850 p-2.5 rounded-xl">{String(ans)}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 font-bold py-4 text-center">Aguardando preenchimento do cliente.</p>
                )}
              </div>

              {/* Delete button option */}
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    if (confirm("Excluir este pedido permanentemente?")) {
                      deleteOrder(selectedOrder.id);
                      setSelectedOrder(null);
                      setIsMaximized(false);
                    }
                  }}
                  className="text-[10px] text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer font-bold uppercase tracking-wider"
                >
                  Excluir Pedido
                </button>
              </div>

              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 text-center text-slate-500 font-bold shadow-lg min-h-[300px] flex items-center justify-center">
              Selecione um cliente na lista para visualizar sua ficha completa.
            </div>
          )}
        </div>

      </div>

      {/* 4. Manual Create Order Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative space-y-6">
            <button 
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-850 rounded-lg text-slate-500 hover:text-white border-0 bg-transparent cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="text-left space-y-1">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Criar Novo Pedido</h3>
              <p className="text-[10px] text-slate-400 font-bold">Gere o link e inicie o processo do Mapa Profético manual.</p>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-left text-xs font-bold text-slate-400">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  value={newOrderForm.client_name}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, client_name: e.target.value }))}
                  placeholder="Nome do cliente"
                  className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Telefone / WhatsApp</label>
                <input
                  type="text"
                  required
                  value={newOrderForm.client_phone}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, client_phone: e.target.value }))}
                  placeholder="Ex: +5521981116787"
                  className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Plano Contratado</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewOrderForm(prev => ({ ...prev, plan: "standard" }))}
                    className={`py-2 px-3 border rounded-xl text-center font-bold transition-all ${
                      newOrderForm.plan === "standard" ? "border-amber-500 bg-amber-500/10 text-amber-500" : "border-slate-800 text-slate-400 bg-slate-950 hover:bg-slate-900"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewOrderForm(prev => ({ ...prev, plan: "premium" }))}
                    className={`py-2 px-3 border rounded-xl text-center font-bold transition-all ${
                      newOrderForm.plan === "premium" ? "border-amber-500 bg-amber-500/10 text-amber-500" : "border-slate-800 text-slate-400 bg-slate-950 hover:bg-slate-900"
                    }`}
                  >
                    Premium
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-455 text-slate-950 rounded-xl font-black uppercase tracking-wider text-xs border-0 shadow-md flex items-center justify-center gap-1.5 cursor-pointer pt-4.5 transition-colors"
              >
                <Plus className="w-4 h-4 text-slate-950" />
                <span>Registrar Pedido</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
