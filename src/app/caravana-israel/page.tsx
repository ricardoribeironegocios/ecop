"use client";

import React, { useState } from "react";
import {
  Check,
  MapPin,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Plane,
  Sparkles,
  Shield,
  Bus,
  Hotel,
  Utensils,
  UserCheck,
  Compass,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

export default function CaravanaIsraelPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const benefits = [
    { title: "Atos Proféticos", desc: "Clamores e ministrações estratégicas lideradas pelo Apóstolo Ricardo Ribeiro.", icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
    { title: "Mentoria Espiritual", desc: "Acompanhamento pastoral diário e ensinamentos profundos.", icon: <UserCheck className="w-5 h-5 text-amber-500" /> },
    { title: "Guia Especializado", desc: "Guias locais fluentes em português credenciados pelo Ministério de Turismo.", icon: <Compass className="w-5 h-5 text-amber-500" /> },
    { title: "Ônibus Executivo", desc: "Transporte moderno com ar-condicionado e Wi-Fi durante todo o trajeto.", icon: <Bus className="w-5 h-5 text-amber-500" /> },
    { title: "Hotéis Selecionados", desc: "Hospedagem premium de categoria turística superior ou primeira classe.", icon: <Hotel className="w-5 h-5 text-amber-500" /> },
    { title: "Café da Manhã", desc: "Buffet completo incluso nos hotéis para iniciar bem o seu dia.", icon: <Utensils className="w-5 h-5 text-amber-500" /> },
    { title: "Jantar", desc: "Jantares típicos deliciosos servidos todas as noites nos hotéis.", icon: <Utensils className="w-5 h-5 text-amber-500" /> },
    { title: "Seguro Viagem", desc: "Assistência médica e cobertura completa durante toda a estadia.", icon: <Shield className="w-5 h-5 text-amber-500" /> }
  ];

  const timeline = [
    { title: "Embarque", desc: "Encontro no Aeroporto de Guarulhos (SP) para orientações e decolagem em direção a Israel.", isDone: true },
    { title: "Chegada", desc: "Desembarque no Aeroporto de Tel Aviv, recepção pelo guia local e traslado para o hotel.", isDone: false },
    { title: "Jerusalém", desc: "Visita ao Monte das Oliveiras, Getsêmani, Muro das Lamentações, Via Dolorosa e Jardim do Túmulo.", isDone: false },
    { title: "Galileia", desc: "Passeio de barco no Mar da Galileia, Monte das Bem-Aventuranças, Cafarnaum e Rio Jordão.", isDone: false },
    { title: "Mar Morto", desc: "Momento de flutuação nas águas terapêuticas do Mar Morto e visita às ruínas de Qumran.", isDone: false },
    { title: "Monte Carmelo", desc: "Lugar do desafio do Profeta Elias contra os profetas de Baal, com vista para o Vale do Armagedom.", isDone: false },
    { title: "Retorno", desc: "Traslado ao aeroporto de Tel Aviv para embarque de volta ao Brasil com conexões inclusas.", isDone: false }
  ];

  const faqs = [
    {
      q: "Precisa de visto?",
      a: "Brasileiros viajando a turismo não necessitam de visto prévio para entrar em Israel. O visto de turista é concedido gratuitamente no setor de imigração na chegada."
    },
    {
      q: "Quanto custa?",
      a: "Os valores variam por ano e temporada. Entre em contato conosco via WhatsApp para obter a tabela de investimento atualizada, formas de pagamento e condições especiais."
    },
    {
      q: "Pode parcelar?",
      a: "Sim. Oferecemos opções facilitadas de parcelamento parcelado mensalmente via boletos bancários até a data da viagem ou parcelas no cartão de crédito."
    },
    {
      q: "Quanto tempo dura?",
      a: "Nossas caravanas costumam durar entre 10 e 12 dias completos de viagem, cobrindo os principais pontos bíblicos históricos e atos proféticos."
    },
    {
      q: "O pacote inclui?",
      a: "O pacote completo inclui passagens aéreas saindo de Guarulhos, hospedagem em hotéis selecionados (meia pensão: café da manhã e jantar), transporte em ônibus executivo privado, guias oficiais credenciados, seguro de viagem internacional e ingressos para todos os locais inclusos no roteiro."
    },
    {
      q: "Existe parceria para pastores?",
      a: "Sim. Pastores líderes de ministérios possuem condições especiais para liderar caravanas integradas ou trazer grupos acima de um número mínimo de passageiros. Fale com nossa equipe."
    },
    {
      q: "Posso montar meu roteiro?",
      a: "O roteiro da caravana profética é fixo e planejado estrategicamente para cobrir todas as ministrações, atos proféticos e locais bíblicos de forma otimizada e segura. Não é possível realizar alterações individuais no cronograma oficial do grupo."
    }
  ];

  return (
    <div className="font-sans antialiased bg-slate-50 text-slate-900 select-none">

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[105vh] bg-slate-950 flex flex-col justify-start overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-[center_bottom] opacity-100 z-0"
          style={{ backgroundImage: "url('/caravana-israel-hero.jpg')" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-36 z-10 w-full flex justify-center lg:justify-start">
          {/* Glassmorphism Frame Box */}
          <div className="bg-transparent border border-slate-900/20 backdrop-blur-md rounded-3xl p-8 sm:p-10 max-w-xl w-full text-left space-y-6 shadow-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Plane className="w-3.5 h-3.5 text-amber-600" />
              <span>Viagem de Destino</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Caravana Profética para Israel
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-semibold">
              Não é apenas uma viagem. É uma experiência espiritual de ativação ministerial e conexão profética.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/5521981116787?text=Olá! Gostaria de reservar minha vaga para a Caravana Profética para Israel."
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-brand-gradient text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg border-0 cursor-pointer inline-flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                <span>Reservar Minha Vaga</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sobre a Caravana */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span className="text-xs font-black uppercase text-amber-600 tracking-wider">A Jornada</span>
          <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Sobre a Caravana</h2>
          <p className="text-sm text-slate-650 leading-relaxed font-medium text-left sm:text-center max-w-3xl mx-auto">
            O Apóstolo Ricardo Ribeiro sempre nutriu uma profunda paixão por Israel e, todos os anos, conduz caravanas à Terra Santa, proporcionando uma experiência que vai muito além do turismo comum.
            <br /><br />
            Como representante oficial da **Jack Travel Turismo**, oferece viagens com excelência corporativa e logística segura desde o embarque no aeroporto de Guarulhos até o retorno ao Brasil, com acompanhamento completo ininterrupto.
            <br /><br />
            Cada roteiro é planejado meticulosamente para proporcionar crescimento espiritual, aprendizado bíblico contextualizado e momentos inesquecíveis nos mesmos solos onde a história bíblica foi traçada.
          </p>
        </div>
      </section>

      {/* 3. Por que viajar conosco? */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">

          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Diferenciais</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-none">Por que viajar conosco?</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">Garantimos total conforto e suporte espiritual e logístico durante todo o caminho.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm space-y-3.5 hover:border-slate-350 transition-colors">
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                  {benefit.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">{benefit.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Cronograma da Viagem (Timeline) */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">

          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">O Roteiro</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-none">Cronograma da Viagem</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">Etapas principais do nosso caminho traçado no território sagrado.</p>
          </div>

          <div className="relative border-l border-slate-200 max-w-2xl mx-auto text-left pl-6 space-y-10 py-4">
            {timeline.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Glowing Dot */}
                <span className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${idx === 0 ? "border-amber-500 ring-4 ring-amber-500/20" : "border-slate-300"
                  }`} />
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5">
                    <span>{step.title}</span>
                    {idx === 0 && <span className="text-[8px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded">Início</span>}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FAQ Accordion */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">

          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Dúvidas Frequentes</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-none">Perguntas Frequentes</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">Respostas rápidas para ajudar no planejamento da sua viagem.</p>
          </div>

          <div className="space-y-3 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 flex justify-between items-center bg-transparent border-0 font-bold text-xs text-slate-900 cursor-pointer text-left focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-500 font-medium leading-relaxed border-t border-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. CTA Final Section */}
      <section className="relative py-28 bg-slate-950 text-white overflow-hidden text-center">
        {/* Jerusalem sunset bg */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/jerusalem-sunset.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950 z-0" />

        <div className="relative max-w-xl mx-auto px-4 z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Pronto para viver essa experiência?
          </h2>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            As vagas são limitadas por caravana. Fale agora mesmo com nossa equipe e tire todas as suas dúvidas.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/5521981116787?text=Olá! Gostaria de obter informações e reservar vaga na Caravana Profética para Israel."
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-brand-gradient text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl transition-colors border-0"
            >
              <MessageSquare className="w-4.5 h-4.5 fill-white stroke-none" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block pt-2">WhatsApp: +55 21 98111-6787</span>
        </div>
      </section>

    </div>
  );
}
