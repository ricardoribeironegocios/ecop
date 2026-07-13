"use client";

import React, { useState, useEffect } from "react";
import { useDB, FormField, FormTemplate } from "@/context/DBContext";
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  Save, 
  Settings, 
  CheckSquare, 
  Square,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ListPlus,
  Copy,
  Check
} from "lucide-react";

export default function FormsBuilderPage() {
  const { formTemplates, saveFormTemplate, isLoading } = useDB();

  // State Management
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "premium">("standard");
  const [fields, setFields] = useState<FormField[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const link = `${baseUrl}/form`;
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // New field Form State
  const [newFieldForm, setNewFieldForm] = useState({
    label: "",
    type: "text" as FormField["type"],
    required: false,
    optionsText: "" // For select options split by commas
  });

  // Sync state with db loaded templates
  useEffect(() => {
    if (!isLoading) {
      const template = formTemplates.find((t) => t.id === selectedPlan);
      if (template) {
        setFields([...template.fields]);
      }
    }
  }, [selectedPlan, formTemplates, isLoading]);

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldForm.label.trim()) return;

    const id = "fld-" + Math.random().toString(36).substring(2, 9);
    
    // Parse select options if present
    let options: string[] | undefined = undefined;
    if (newFieldForm.type === "select" && newFieldForm.optionsText.trim()) {
      options = newFieldForm.optionsText.split(",").map(o => o.trim()).filter(Boolean);
    }

    const newField: FormField = {
      id,
      label: newFieldForm.label.trim(),
      type: newFieldForm.type,
      required: newFieldForm.required,
      active: true,
      options
    };

    setFields(prev => [...prev, newField]);
    setIsAdding(false);
    setNewFieldForm({ label: "", type: "text", required: false, optionsText: "" });
  };

  const handleDeleteField = (id: string) => {
    setFields(prev => prev.filter(f => f.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
  };

  const handleToggleRequired = (id: string) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, required: !f.required } : f));
  };

  // Reorder up/down helpers (drag and drop replacement for stable, robust code)
  const handleMoveField = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === fields.length - 1) return;

    const updated = [...fields];
    const swapTargetIndex = direction === "up" ? index - 1 : index + 1;
    
    // Swap items
    const temp = updated[index];
    updated[index] = updated[swapTargetIndex];
    updated[swapTargetIndex] = temp;

    setFields(updated);
  };

  const handleSaveChanges = () => {
    saveFormTemplate(selectedPlan, fields);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans text-xs font-bold text-slate-500 uppercase tracking-widest">
        Carregando Construtor...
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans select-none text-left">
      
      {/* 1. Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-slate-800">
        <div className="text-left">
          <h1 className="text-2xl font-black text-white tracking-tight uppercase leading-none">Construtor de Formulários</h1>
          <p className="text-xs text-slate-400 font-bold mt-1.5">Customize livremente as perguntas dos planos Standard e Premium do Mapa Profético.</p>
        </div>
        
        <div className="flex gap-2.5 shrink-0 w-full sm:w-auto">
          {/* Copy Form Link */}
          <button
            onClick={handleCopyLink}
            title="Copiar link público do formulário"
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${
              isCopied
                ? "bg-emerald-500/15 border-emerald-700/40 text-emerald-400"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {isCopied ? (
              <><Check className="w-4 h-4" /><span>Link Copiado!</span></>
            ) : (
              <><Copy className="w-4 h-4" /><span>Copiar Link</span></>
            )}
          </button>

          <button
            onClick={handleSaveChanges}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-455 text-slate-955 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 border-0 shadow-md cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4 text-slate-955" />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </div>

      {isSaved && (
        <div className="p-3.5 border border-emerald-800/20 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs font-bold text-center leading-normal animate-fade-in">
          Alterações salvas com sucesso no banco de dados!
        </div>
      )}

      {/* 2. Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Editor (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-lg p-6 space-y-6">
          
          {/* Plan Selector Tab */}
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedPlan("standard")}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                  selectedPlan === "standard"
                    ? "bg-amber-500 text-slate-950 border-transparent font-black shadow-sm"
                    : "border-slate-800 text-slate-400 bg-slate-950 hover:bg-slate-850"
                }`}
              >
                Plano Standard
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan("premium")}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                  selectedPlan === "premium"
                    ? "bg-amber-500 text-slate-950 border-transparent font-black shadow-sm"
                    : "border-slate-800 text-slate-400 bg-slate-950 hover:bg-slate-850"
                }`}
              >
                Plano Premium
              </button>
            </div>
            
            <button
              onClick={() => setIsAdding(true)}
              className="px-3.5 py-2 border border-slate-800 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-sm bg-slate-950"
            >
              <Plus className="w-3.5 h-3.5 text-amber-500" />
              <span>Adicionar Pergunta</span>
            </button>
          </div>

          {/* Fields list */}
          <div className="space-y-3.5 text-left text-xs font-bold text-slate-300">
            {fields.map((field, idx) => (
              <div 
                key={field.id}
                className={`border rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 transition-all ${
                  field.active ? "bg-slate-950/40 border-slate-800/80 text-white" : "bg-slate-950/10 border-slate-850 opacity-40"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => handleMoveField(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 disabled:opacity-20 cursor-pointer border-0 bg-transparent"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveField(idx, "down")}
                      disabled={idx === fields.length - 1}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 disabled:opacity-20 cursor-pointer border-0 bg-transparent"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-white truncate block">{field.label}</span>
                      {field.required && (
                        <span className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded text-[9px] font-black uppercase tracking-wider shrink-0 border border-red-500/20">
                          Obrigatório
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 uppercase font-black">
                      <span>Tipo: {field.type}</span>
                      {field.options && (
                        <span className="truncate">Opções: {field.options.join(", ")}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Toggle Active status */}
                  <button
                    onClick={() => handleToggleActive(field.id)}
                    className="p-2 hover:bg-slate-800 rounded-xl text-slate-450 hover:text-white border-0 bg-transparent cursor-pointer"
                    title={field.active ? "Desativar campo" : "Ativar campo"}
                  >
                    {field.active ? (
                      <ToggleRight className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-slate-500" />
                    )}
                  </button>
                  
                  {/* Toggle Required status */}
                  <button
                    onClick={() => handleToggleRequired(field.id)}
                    className="p-2 hover:bg-slate-800 rounded-xl text-slate-450 border-0 bg-transparent cursor-pointer"
                    title={field.required ? "Marcar como opcional" : "Marcar como obrigatório"}
                  >
                    {field.required ? (
                      <CheckSquare className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDeleteField(field.id)}
                    className="p-2 hover:bg-red-500/10 rounded-xl text-slate-500 hover:text-red-400 border-0 bg-transparent cursor-pointer"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            
            {fields.length === 0 && (
              <div className="text-center py-16 text-slate-400 font-bold">Nenhum campo cadastrado para este plano.</div>
            )}
          </div>

        </div>

        {/* Form Preview / Side help (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Preview */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-500" />
                <span>Pré-Visualização</span>
              </h3>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                {selectedPlan === "premium" ? "Premium" : "Standard"}
              </span>
            </div>
            
            <div className="p-5 space-y-5 max-h-[60vh] overflow-y-auto">
              {/* Preview Header */}
              <div className="text-center space-y-2 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-xl font-black flex items-center justify-center text-sm mx-auto">R</div>
                <h4 className="text-sm font-black text-white leading-tight font-serif">Mapa Profético</h4>
                <p className="text-[10px] text-slate-400 font-bold">Preencha com atenção para uma análise precisa.</p>
              </div>

              {/* Render each active field */}
              {fields.filter(f => f.active).length > 0 ? (
                fields.filter(f => f.active).map((field, idx) => (
                  <div key={field.id} className="space-y-1.5 text-left">
                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-wider flex items-center gap-1">
                      <span>{field.label}</span>
                      {field.required && <span className="text-red-500">*</span>}
                    </label>

                    {field.type === "text" && (
                      <input
                        type="text"
                        disabled
                        placeholder="Resposta do cliente..."
                        className="w-full px-3 py-2 border border-slate-800 bg-slate-950 rounded-xl text-xs font-semibold text-slate-500 cursor-not-allowed"
                      />
                    )}
                    {field.type === "longtext" && (
                      <textarea
                        disabled
                        placeholder="Resposta longa do cliente..."
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-800 bg-slate-955 rounded-xl text-xs font-semibold text-slate-500 resize-none cursor-not-allowed"
                      />
                    )}
                    {field.type === "date" && (
                      <input
                        type="date"
                        disabled
                        className="w-full px-3 py-2 border border-slate-800 bg-slate-950 rounded-xl text-xs font-semibold text-slate-505 cursor-not-allowed"
                      />
                    )}
                    {field.type === "number" && (
                      <input
                        type="number"
                        disabled
                        placeholder="0"
                        className="w-full px-3 py-2 border border-slate-800 bg-slate-955 rounded-xl text-xs font-semibold text-slate-500 cursor-not-allowed"
                      />
                    )}
                    {field.type === "boolean" && (
                      <div className="flex gap-3">
                        <span className="px-4 py-2 border border-slate-800 bg-slate-950 rounded-xl text-xs font-bold text-slate-500 cursor-not-allowed">Sim</span>
                        <span className="px-4 py-2 border border-slate-800 bg-slate-950 rounded-xl text-xs font-bold text-slate-500 cursor-not-allowed">Não</span>
                      </div>
                    )}
                    {field.type === "select" && (
                      <select
                        disabled
                        className="w-full px-3 py-2 border border-slate-800 bg-slate-950 rounded-xl text-xs font-semibold text-slate-500 cursor-not-allowed"
                      >
                        <option>Selecione...</option>
                        {field.options?.map((opt, oi) => (
                          <option key={oi}>{opt}</option>
                        ))}
                      </select>
                    )}
                    {field.type === "image" && (
                      <div className="w-full h-20 border-2 border-dashed border-slate-800 rounded-xl bg-slate-955 flex items-center justify-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        📷 Upload de Imagem
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-500 text-xs font-bold">
                  Nenhum campo ativo para visualizar.
                </div>
              )}

              {/* Preview Submit Button (disabled) */}
              {fields.filter(f => f.active).length > 0 && (
                <div className="pt-3 border-t border-slate-800">
                  <div className="w-full py-3 bg-slate-955 text-slate-550 border border-slate-850 rounded-xl text-xs font-black uppercase tracking-wider text-center cursor-not-allowed">
                    Enviar Respostas
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4 text-left">
            <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
              <Settings className="w-4 h-4" />
              <span>Instruções</span>
            </h3>
            
            <ul className="space-y-3 text-xs leading-relaxed text-slate-400 font-medium">
              <li>
                👉 <strong>Campos históricos:</strong> Se você já possui respostas de clientes preenchidas, evite deletar a pergunta. Prefira apenas <strong>desativar o campo</strong> no botão de alternância (toggle) para preservar as informações nos registros antigos.
              </li>
              <li>
                👉 <strong>Ordenação Estável:</strong> Use as setas Up/Down na lateral esquerda de cada pergunta para reordenar a sequência exibida para os clientes no formulário.
              </li>
              <li>
                👉 <strong>Tipagem Múltipla:</strong> Ao selecionar o tipo de pergunta <i>Múltipla Escolha</i>, preencha o campo de opções separando os itens por vírgulas.
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* 3. Add Field Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative space-y-6">
            <button 
              onClick={() => setIsAdding(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-850 rounded-lg text-slate-500 hover:text-white border-0 bg-transparent cursor-pointer"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>

            <div className="text-left space-y-1">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Adicionar Campo</h3>
              <p className="text-[10px] text-slate-450 font-bold">Customize o rótulo e tipo da nova pergunta.</p>
            </div>

            <form onSubmit={handleAddField} className="space-y-4 text-left text-xs font-bold text-slate-400">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Rótulo / Pergunta</label>
                <input
                  type="text"
                  required
                  value={newFieldForm.label}
                  onChange={(e) => setNewFieldForm(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="Ex: Qual seu testemunho pessoal?"
                  className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Tipo do Campo</label>
                <select
                  value={newFieldForm.type}
                  onChange={(e: any) => setNewFieldForm(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl bg-slate-950 text-slate-100 focus:outline-none focus:border-amber-500 font-bold"
                >
                  <option value="text">Texto Curto</option>
                  <option value="longtext">Texto Longo</option>
                  <option value="date">Data de Calendário</option>
                  <option value="number">Número Inteiro</option>
                  <option value="boolean">Sim ou Não (Lógico)</option>
                  <option value="select">Múltipla Escolha (Seletor)</option>
                  <option value="image">Upload de Imagem</option>
                </select>
              </div>

              {newFieldForm.type === "select" && (
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Opções do Seletor</label>
                  <input
                    type="text"
                    required
                    value={newFieldForm.optionsText}
                    onChange={(e) => setNewFieldForm(prev => ({ ...prev, optionsText: e.target.value }))}
                    placeholder="Opção A, Opção B, Opção C"
                    className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold"
                  />
                  <span className="text-[8px] text-slate-550 font-medium leading-none block">Separe as opções por vírgulas.</span>
                </div>
              )}

              <div className="flex gap-2.5 items-center select-none cursor-pointer" onClick={() => setNewFieldForm(prev => ({ ...prev, required: !prev.required }))}>
                {newFieldForm.required ? (
                  <CheckSquare className="w-4.5 h-4.5 text-amber-500" />
                ) : (
                  <Square className="w-4.5 h-4.5 text-slate-500" />
                )}
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Marcar como obrigatório</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-455 text-slate-950 rounded-xl font-black uppercase tracking-wider text-xs border-0 shadow-md flex items-center justify-center gap-1.5 cursor-pointer pt-4.5 transition-colors"
              >
                <ListPlus className="w-4.5 h-4.5 text-slate-955" />
                <span>Adicionar ao Modelo</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
