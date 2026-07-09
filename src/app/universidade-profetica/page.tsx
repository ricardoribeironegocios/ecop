"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Infinity
} from "lucide-react";

export default function UniversidadeProfeticaPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleWhatsappCta = () => {
    const phone = "5521981116787";
    const message = "Olá! Gostaria de obter mais informações sobre a Universidade Profética Internacional.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

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
      a: "Sim. Ao adquirir a Universidade Profética Internacional, seu acesso à coletânea é vitalício. Você pode assistir a todas as 150 aulas no seu próprio ritmo, sem pressa de expiração."
    },
    {
      q: "Como recebo o acesso aos cursos?",
      a: "Após a aprovação da sua inscrição, você receberá automaticamente em seu e-mail cadastrado as credenciais de acesso à nossa plataforma de membros na Suneduzz."
    },
    {
      q: "Há suporte para tirar dúvidas?",
      a: "Sim. Cada curso possui sua própria área de comentários debaixo de cada vídeo-aula na plataforma de alunos, onde você poderá enviar suas dúvidas ministeriais e teológicas."
    },
    {
      q: "Quais as formas de pagamento disponíveis?",
      a: "Você pode parcelar em até 12x no cartão de crédito, ou pagar via PIX à vista ou boleto bancário através do checkout seguro da Suneduzz."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-slate-900">

      {/* 1. Hero Section */}
      <section className="relative bg-slate-950 text-white py-28 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-cover bg-center opacity-10 bg-no-repeat" style={{ backgroundImage: "url('/hero-bg.png')" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(15,23,42,0.8),#020617)] z-0" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest mx-auto">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Formação Teológica & Ativação Avançada</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-2xl">
            Acelere sua Ativação na <span className="text-brand-gradient">Universidade Profética Internacional</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Não é apenas UM curso. São vários treinamentos teológicos e ministramentos de revelação extrema consolidados de uma só vez pelo Apóstolo Ricardo Ribeiro.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a 
              href="https://chk.eduzz.com/797ZDYPA0E"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-brand-gradient text-white font-black text-xs rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 border-0 flex items-center justify-center gap-2"
            >
              <span>Matricular-se Agora</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button 
              onClick={handleWhatsappCta}
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl uppercase tracking-wider transition-all border border-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white stroke-none" />
              <span>Falar com Suporte</span>
            </button>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-12 border-t border-slate-900 text-left">
            <div className="flex gap-2.5 items-start">
              <Infinity className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white">Acesso Vitalício</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Assista no seu tempo</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <BookOpen className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white">12 Cursos Completos</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">150 Aulas de Revelação</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white">Pagamento Seguro</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Plataforma Suneduzz</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white">Ativação Prática</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Ministrações do apóstolo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Coletânea Cores / Grid of Courses */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Acesso Imediato</span>
            <h2 className="text-3xl font-extrabold text-slate-955 tracking-tight leading-none">O que está Incluso no Pacote?</h2>
            <p className="text-xs text-slate-500 font-bold max-w-xl mx-auto">
              Ao invés de comprar cada treinamento individualmente, você adquire a biblioteca completa de capacitação por uma fração do investimento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {coursesList.map((course, idx) => {
              const IconComp = course.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-50/60 border border-slate-200/50 rounded-2xl p-6 text-left space-y-3 hover:border-amber-500/40 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                >
                  <div className="w-9 h-9 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center font-bold">
                    <IconComp className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide leading-snug">{course.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-slate-450 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{course.lessons} aulas exclusivas</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 text-center space-y-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="space-y-2 relative z-10">
              <span className="text-xs font-black text-amber-500 uppercase tracking-widest">Resumo do Acervo</span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">SÃO MAIS DE 150 AULAS DE CONTEÚDO PROFUNDO</h3>
              <p className="text-xs text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
                Você terá acesso vitalício a todos os 12 cursos completos pelo preço de um único treinamento. É o maior e mais rico compilado de sabedoria teológica, libertação e batalha espiritual do ministério.
              </p>
            </div>
            <div className="pt-2 relative z-10">
              <a 
                href="https://chk.eduzz.com/797ZDYPA0E?country=BRA"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-brand-gradient text-white font-black text-xs rounded-xl uppercase tracking-wider inline-flex items-center gap-2 shadow-lg"
              >
                <span>Adquirir Biblioteca Completa</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
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

      {/* 4. VIP Offer Section */}
      <section id="oferta-vip" className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.8),#020617)] z-0" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[500px] h-[250px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center space-y-12">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest mx-auto animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Oportunidade Imperial VIP</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight uppercase">
              Universidade Profética VIP
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
              Adquira a coletânea completa com acesso vitalício de forma simplificada e com desconto especial de lançamento no plano VIP.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-md mx-auto shadow-2xl space-y-8 text-left">
            <div className="space-y-2 pb-6 border-b border-slate-800">
              <h3 className="text-lg font-black uppercase text-amber-500 tracking-wider">Acesso VIP Vitalício</h3>
              <p className="text-xs text-slate-400 font-medium">12 Cursos Completos • 150 Aulas de Revelação Teológica</p>
            </div>

            <ul className="space-y-3.5 text-xs font-bold text-slate-200">
              <li className="flex gap-2.5 items-start">
                <Check className="w-4.5 h-4.5 text-amber-500 shrink-0 animate-pulse" />
                <span>Todos os 12 Cursos inclusos de imediato</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <Check className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                <span>Acesso vitalício às 150 aulas</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <Check className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                <span>Área exclusiva de tirar dúvidas por aula</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <Check className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                <span>Materiais de apoio em PDF para download</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-800 space-y-1.5 text-center sm:text-left">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Valor Exclusivo VIP</span>
              <div className="flex items-baseline justify-center sm:justify-start gap-1">
                <span className="text-xs text-slate-400 font-semibold">12x de</span>
                <span className="text-3xl font-black text-white font-mono">R$ 30,72</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold block">ou R$ 297,00 à vista</span>
            </div>

            <div className="pt-2">
              <a
                href="https://chk.eduzz.com/797ZDYPA0E?country=BRA"
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-brand-gradient text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors border-0 shadow-lg shadow-amber-500/10"
              >
                <Lock className="w-4 h-4 fill-white stroke-none" />
                <span>Adquirir Acesso VIP</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Secure badge */}
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
