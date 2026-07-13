"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDB, ProductItem } from "@/context/DBContext";
import { 
  Check, 
  MessageSquare, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  BookOpen, 
  Lock, 
  HelpCircle,
  FileText,
  PlayCircle,
  TrendingUp,
  Infinity,
  ArrowUpRight,
  Sparkle,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";

export default function CursosOnlinePage() {
  const { products, settings } = useDB();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Search, Filter, and Pagination states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"todos" | "essenciais" | "avancados">("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Reset pagination when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleWhatsappCta = () => {
    const phone = settings.whatsapp_number.replace(/[^0-9]/g, "") || "5521981116787";
    const message = "Olá! Gostaria de obter mais informações sobre os cursos online.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Filter Products based on search and category tabs
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeFilter === "essenciais") {
      return matchesSearch && product.price_cash === 97;
    }
    if (activeFilter === "avancados") {
      return matchesSearch && product.price_cash === 297;
    }
    return matchesSearch;
  });

  // Paginated Products slicing
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const coursesList = [
    { title: "Curso de Oração em Línguas", lessons: 16, icon: PlayCircle },
    { title: "Curso extra de Cativeiros Espirituais", lessons: 12, icon: ShieldCheck },
    { title: "Curso de Tribunais Celestiais", lessons: 20, icon: Compass },
    { title: "Curso Escola de Profetas", lessons: 17, icon: Sparkles },
    { title: "Curso Tipos de Oração", lessons: 4, icon: HelpCircle },
    { title: "Curso de Libertação completo", lessons: 26, icon: Lock },
    { title: "Curso 5 ministérios", lessons: 5, icon: BookOpen },
    { title: "Curso Códigos da Adoração e Dança Profética", lessons: 8, icon: PlayCircle },
    { title: "Curso Finanças e Estilo de Vida do Reino", lessons: 4, icon: TrendingUp },
    { title: "Curso avançado de Batalha Espiritual", lessons: 14, icon: ShieldCheck },
    { title: "Curso Avançado de Tricotomia", lessons: 4, icon: FileText },
    { title: "Lives com apóstolo Ricardo e especialistas", lessons: 16, icon: PlayCircle },
  ];

  const faqs = [
    {
      q: "O acesso realmente é vitalício?",
      a: "Sim. Ao adquirir a Universidade Profética Internacional (ou qualquer curso avulso), seu acesso a essa coletânea é vitalício. Você pode assistir a todas as aulas no seu próprio ritmo, sem pressa de expiração."
    },
    {
      q: "Como recebo o acesso aos cursos?",
      a: "Após a aprovação da sua inscrição, você receberá automaticamente em seu e-mail cadastrado as credenciais de acesso à nossa plataforma de membros na Suneduzz."
    },
    {
      q: "Há suporte para tirar dúvidas?",
      a: "Sim. Cada curso possui sua própria área de comentários debaixo de cada vídeo-aula na plataforma de alunos, onde você poderá enviar suas dúvidas ministeriais e teológicas diretamente à equipe."
    },
    {
      q: "Quais as formas de pagamento disponíveis?",
      a: "Você pode parcelar em até 12x no cartão de crédito, ou pagar via PIX à vista através do checkout seguro da Suneduzz."
    }
  ];

  // Helper function to render a premium cover mockup dynamically
  const renderProductCover = (product: ProductItem) => {
    if (product.image_url) {
      return (
        <img 
          src={product.image_url} 
          alt={product.title} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      );
    }

    // High-end CSS mockup cover
    const isVip = product.type === "package";
    return (
      <div className={`w-full h-full bg-gradient-to-br ${isVip ? "from-amber-950 via-slate-900 to-amber-950" : "from-slate-900 via-slate-950 to-slate-900"} p-5 flex flex-col justify-between relative`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.08),transparent)] pointer-events-none" />
        
        <div className="flex justify-between items-center z-10">
          <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
            isVip ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-slate-800 text-slate-400 border-slate-700"
          }`}>
            {isVip ? "Acesso VIP" : "Treinamento"}
          </span>
          <Sparkle className={`w-4 h-4 ${isVip ? "text-amber-500" : "text-slate-650"}`} />
        </div>

        <div className="space-y-2 text-left z-10">
          <h4 className="text-sm font-black text-white font-serif leading-snug uppercase tracking-wide group-hover:text-amber-500 transition-colors">
            {product.title}
          </h4>
          <div className="flex items-center gap-1.5 text-[8px] text-slate-500 font-black uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-amber-500/80" />
            <span>{product.lessons} Aulas Cadastradas</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-slate-900">
      
      {/* 1. Hero Header Section */}
      <section className="relative bg-slate-950 text-white py-28 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(15,23,42,0.8),#020617)] z-0" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-10 top-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest mx-auto animate-pulse">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Treinamentos Proféticos & Ativações</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-2xl">
            Vitrine de <span className="text-brand-gradient">Cursos Online</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Escolha cursos individuais específicos para o seu momento ministerial, ou adquira a coletânea completa com acesso VIP vitalício.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a 
              href="#oferta-vip"
              className="px-6 py-3.5 bg-brand-gradient text-white font-black text-xs rounded-xl uppercase tracking-wider transition-all shadow-lg border-0 flex items-center justify-center gap-2"
            >
              <span>Ver Pacote VIP Completo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button 
              onClick={handleWhatsappCta}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl uppercase tracking-wider transition-all border border-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white stroke-none" />
              <span>Dúvidas? Fale Conosco</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Filtros e Campo de Busca */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-20 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4.5 h-4.5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar curso por nome ou descrição..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/80 focus:border-amber-500 rounded-xl focus:outline-none text-xs text-slate-800 font-medium placeholder-slate-400 shadow-inner"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto items-center">
            <button
              onClick={() => setActiveFilter("todos")}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer border-0 transition-all ${
                activeFilter === "todos" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900 bg-transparent"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveFilter("essenciais")}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer border-0 transition-all ${
                activeFilter === "essenciais" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900 bg-transparent"
              }`}
            >
              Essenciais
            </button>
            <button
              onClick={() => setActiveFilter("avancados")}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer border-0 transition-all ${
                activeFilter === "avancados" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900 bg-transparent"
              }`}
            >
              Avançados
            </button>
          </div>
        </div>
      </section>

      {/* 3. Vitrine Geral de Produtos */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Grid Layout of Courses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-slate-50/50 border border-slate-200/50 rounded-3xl p-4.5 hover:border-slate-350 hover:bg-white transition-all flex flex-col justify-between space-y-4 group shadow-sm"
              >
                <div className="space-y-3.5">
                  {/* Premium Mockup Cover in 1:1 Ratio */}
                  <div className="w-full aspect-square rounded-2xl overflow-hidden relative border border-slate-200/60 shadow-md bg-slate-950">
                    {renderProductCover(product)}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide line-clamp-2 h-8 leading-snug">{product.title}</h3>
                      <span className={`text-[7px] font-black uppercase px-1.5 py-0.5 rounded ${
                        product.price_cash === 297 ? "bg-amber-500/10 text-amber-600" : "bg-slate-200 text-slate-600"
                      }`}>
                        {product.price_cash === 297 ? "Avançado" : "Essencial"}
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-450 font-bold leading-normal">{product.lessons} aulas exclusivas</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium line-clamp-2">{product.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2.5 text-left">
                  <div className="flex justify-between items-end">
                    <span className="text-[8px] text-slate-450 font-black uppercase">Investimento</span>
                    <div className="text-right">
                      <span className="text-[8px] text-slate-400 font-bold block uppercase tracking-wide">Ou {product.price_installments}</span>
                      <span className="text-sm font-black text-slate-955 font-mono">R$ {product.price_cash},00 à vista</span>
                    </div>
                  </div>

                  <a 
                    href={product.checkout_url}
                    target={product.checkout_url.startsWith("http") ? "_blank" : undefined}
                    rel={product.checkout_url.startsWith("http") ? "noreferrer" : undefined}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5 cursor-pointer transition-colors border-0"
                  >
                    <span>Comprar Agora</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}

            {paginatedProducts.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-400 space-y-2 border border-dashed border-slate-200 rounded-3xl">
                <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-bold uppercase tracking-wider">Nenhum curso encontrado</p>
                <p className="text-[10px] font-medium text-slate-500">Tente buscar por outro termo ou mude o filtro ativo.</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-6 border-t border-slate-100">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl cursor-pointer disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                    currentPage === i + 1 
                      ? "bg-slate-950 text-white border-slate-950" 
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl cursor-pointer disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. Pacote VIP Completo / Seção VIP */}
      <section id="oferta-vip" className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.8),#020617)] z-0" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[500px] h-[250px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-16">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest mx-auto animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Oportunidade Imperial VIP</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight uppercase">
              Universidade Profética VIP
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
              Adquira a coletânea completa com acesso vitalício a todos os cursos proféticos de forma simplificada e com desconto especial de lançamento no plano VIP.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            
            {/* Left side: Package listing */}
            <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-black uppercase text-amber-500 tracking-wider">Acervo Includo no Pacote VIP:</h3>
                <p className="text-[10px] text-slate-450 font-bold">12 Cursos Completos • 150 Aulas de Revelação Teológica</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[10px] font-bold text-slate-300">
                {coursesList.map((course, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="truncate leading-normal uppercase">{course.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Pricing and CTA card */}
            <div className="lg:col-span-5 bg-slate-900 border border-amber-500/40 rounded-3xl p-8 shadow-2xl space-y-6 text-left relative">
              <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Melhor Oferta
              </div>

              <div className="space-y-1.5 pb-4 border-b border-slate-800">
                <h3 className="text-base font-black uppercase text-white tracking-wider">Acesso VIP Vitalício</h3>
                <p className="text-[10px] text-slate-440 font-medium">Todos os 12 Cursos inclusos de imediato com suporte e PDFs.</p>
              </div>

              <div className="space-y-1 text-left">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider block">Valor do Pacote</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-slate-400 font-semibold">12x de</span>
                  <span className="text-3xl font-black text-white font-mono">R$ 30,72</span>
                </div>
                <span className="text-[9px] text-slate-400 font-bold block">ou R$ 297,00 à vista</span>
              </div>

              <div className="pt-2">
                <a
                  href="https://chk.eduzz.com/797ZDYPA0E"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4.5 bg-brand-gradient text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border-0 shadow-lg shadow-amber-500/10 hover:scale-[1.01] transition-transform"
                >
                  <Lock className="w-4 h-4 fill-white stroke-none" />
                  <span>Adquirir Acesso VIP</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Perguntas Frequentes</span>
            <h2 className="text-3xl font-extrabold text-slate-955 tracking-tight leading-none">Dúvidas Comuns</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">Tudo o que você precisa saber sobre o acesso à Universidade Profética.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200/60 rounded-2xl overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center bg-transparent border-0 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide leading-snug">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs text-slate-650 font-medium leading-relaxed text-left border-t border-slate-100 bg-slate-50/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Secure badge */}
      <section className="py-12 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center gap-3">
          <Lock className="w-5 h-5 text-amber-500" />
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Compra 100% Protegida</h4>
          <p className="text-[10px] text-slate-500 font-bold leading-normal max-w-md">
            Sua transação é assegurada pela Suneduzz. Receba seu acesso imediatamente no e-mail após a confirmação do pagamento.
          </p>
        </div>
      </section>

    </div>
  );
}
