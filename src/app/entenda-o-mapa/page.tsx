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
  Users, 
  Target, 
  MapPin, 
  Lock
} from "lucide-react";

export default function EntendaOMapaPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleWhatsappCta = (plan: string) => {
    const phone = "5521981116787"; // Standard ministry number
    const message = `Graça e paz! Gostaria de entender melhor e solicitar o meu Mapa Profético ${plan}.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const testimonials = [
    {
      name: "Julio Cezar de Jesus",
      role: "Empresário & Líder de Ministério",
      image: "/testimonial-julio.png",
      text: "Minha vida ministerial mudou completamente após receber o Mapa Profético. Eu sentia que meu chamado estava travado e não compreendia certas resistências. A análise revelou bloqueios específicos e me deu uma direção clara sobre minha vocação. Hoje atuo com muito mais segurança e alinhamento espiritual.",
    },
    {
      name: "Avelina",
      role: "Intercessora",
      image: "/testimonial-avelina.png",
      text: "Tive revelações profundas sobre cativeiros familiares e padrões que se repetiam na minha linhagem. O direcionamento do Mapa me ajudou a entrar em um tempo de libertação e posicionamento espiritual que há anos eu buscava. É uma ferramenta de cura indispensável.",
    },
    {
      name: "Pr. Thiago",
      role: "Pastor Auxiliar",
      image: "/testimonial-thiago.png",
      text: "Como pastor, o Mapa me deu ferramentas cirúrgicas para entender minhas inclinações ministeriais e focar onde realmente dou frutos. Ele reduz a fricção de tentar caminhos aleatórios. Recomendo a todos os membros da nossa liderança que buscam maturidade no seu chamado.",
    }
  ];

  const faqs = [
    {
      q: "O que é o Mapa Profético?",
      a: "É um diagnóstico espiritual profundo e individualizado, elaborado manualmente com base no perfil respondido por você. O objetivo é mapear seus dons ministeriais, identificar bloqueios espirituais ou cativeiros hereditários e traçar uma rota de ativação prática para o seu chamado."
    },
    {
      q: "Como o Mapa é elaborado?",
      a: "Após a confirmação do pedido, você receberá um formulário de perfil detalhado. O Apóstolo Ricardo Ribeiro e sua equipe analisam suas respostas com foco bíblico e profético, identificando inclinações, legalidades e cativeiros espirituais. O resultado é entregue em um documento PDF consolidado."
    },
    {
      q: "Qual o prazo de entrega?",
      a: "O prazo de entrega é de 48 horas para até 2 pessoas. A cada 2 pessoas adicionais, acrescenta-se mais 24 horas ao prazo (no máximo). O Plano Premium conta com prioridade na fila de produção, o que garante o atendimento dentro desse prazo mesmo em períodos de alta demanda."
    },
    {
      q: "Os meus dados são mantidos em sigilo?",
      a: "Absolutamente. Todas as informações compartilhadas no formulário de perfil são estritamente confidenciais e acessadas exclusivamente pelo Apóstolo Ricardo Ribeiro e sua equipe de análise para fins de diagnóstico espiritual."
    },
    {
      q: "O Mapa Profético substitui o aconselhamento pastoral?",
      a: "Não. O Mapa é uma ferramenta complementar de diagnóstico e ativação. Ele fornece chaves, revelações e direcionamento pessoal que cooperam com o acompanhamento pastoral local e com sua caminhada na igreja local."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-slate-900">

      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white py-28 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-cover bg-center opacity-10 bg-no-repeat" style={{ backgroundImage: "url('/hero-bg.png')" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(15,23,42,0.8),#020617)] z-0" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest mx-auto">
            <Compass className="w-3.5 h-3.5" />
            <span>Direcionamento Profético e Ativação</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-2xl">
            Decifre o Desenho de Deus para sua Vida e <span className="text-brand-gradient">Destrave seu Chamado</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            O diagnóstico profundo, bíblico e individualizado para mapear seus dons ministeriais, identificar cativeiros espirituais e traçar uma rota prática de serviço ao Reino.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a 
              href="#oferta"
              className="px-8 py-4 bg-brand-gradient text-white font-black text-xs rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 border-0 flex items-center justify-center gap-2"
            >
              <span>Ver Planos e Solicitar</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#para-quem"
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl uppercase tracking-wider transition-all border border-slate-800 flex items-center justify-center"
            >
              Entenda Como Funciona
            </a>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-12 border-t border-slate-900 text-left">
            <div className="flex gap-2.5 items-start">
              <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">100% Seguro</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Sigilo absoluto das respostas</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <Target className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">Foco Prático</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Direções claras e acionáveis</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <Compass className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">Alinhamento</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Geográfico e vocacional</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">Revelação</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Mapeamento de cativeiros</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Para quem é? */}
      <section id="para-quem" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Você se encaixa aqui?</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-none">Para Quem é Indicado?</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">O Mapa Profético auxilia cristãos em diferentes estágios de sua jornada com Deus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50/50 border border-slate-200/50 rounded-3xl p-6 text-left space-y-4 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Quem se sente Travado</h3>
              <p className="text-xs text-slate-650 font-medium leading-relaxed">
                Pessoas que percebem resistências espirituais fora do comum, ciclos de frustração profissional ou ministerial e desejam discernir a causa espiritual desses bloqueios.
              </p>
            </div>

            <div className="bg-slate-50/50 border border-slate-200/50 rounded-3xl p-6 text-left space-y-4 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Quem Busca Maturidade</h3>
              <p className="text-xs text-slate-650 font-medium leading-relaxed">
                Líderes, pastores e obreiros que desejam aprimorar seu autoconhecimento vocacional, focando seus talentos nas áreas que dão mais frutos no Reino.
              </p>
            </div>

            <div className="bg-slate-50/50 border border-slate-200/50 rounded-3xl p-6 text-left space-y-4 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Busca de Direção</h3>
              <p className="text-xs text-slate-650 font-medium leading-relaxed">
                Quem está em momentos de transição de vida, escolha profissional ou de posicionamento geográfico e quer discernir as coordenadas de Deus para sua nova temporada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: O que você receberá? */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider block">Conteúdo do Diagnóstico</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-snug">O Que Você Recebe No Seu Mapa Profético?</h2>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Diferente de um teste de personalidade genérico, o Mapa Profético é desenvolvido com fundamentação teológica e olhar espiritual cirúrgico sobre a sua realidade.
            </p>
            <div className="pt-2">
              <a 
                href="#oferta"
                className="inline-flex items-center gap-1.5 text-xs font-black text-amber-600 hover:text-amber-500 uppercase tracking-widest transition-colors"
              >
                <span>Escolher meu plano</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 text-left space-y-2.5 shadow-sm">
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Revelação de Dons</span>
              </h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Clareza exata de quais esferas ministeriais (bíblicas) você possui maior facilidade e chamado latente para operar.
              </p>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 text-left space-y-2.5 shadow-sm">
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Cativeiros Espirituais</span>
              </h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Mapeamento de amarras recorrentes na linhagem familiar ou bloqueios de mente que têm dificultado sua plenitude espiritual.
              </p>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 text-left space-y-2.5 shadow-sm">
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direção Geográfica</span>
              </h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Pistas e entendimento sobre regiões ou conexões territoriais importantes que cooperam diretamente com o seu plano de vida.
              </p>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 text-left space-y-2.5 shadow-sm">
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Rota de Ativação</span>
              </h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Passo a passo prático de posicionamento, leitura e disciplinas espirituais para entrar ativamente no seu propósito desenhado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Histórias de Alinhamento</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-none">Vidas que Encontraram Direção</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">Veja o depoimento de pessoas que passaram pelo processo do Mapa Profético.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/40 rounded-3xl p-6 sm:p-7 text-left flex flex-col justify-between hover:border-slate-350 transition-colors shadow-sm relative">
                <div className="space-y-4">
                  <p className="text-[11px] text-slate-700 italic font-semibold leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-200/50">
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-200 relative">
                    <img 
                      src={t.image} 
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[11px] font-black text-slate-900 truncate block">{t.name}</h4>
                    <span className="text-[9px] text-slate-500 font-bold block truncate">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="oferta" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16 relative z-10">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Acesso e Valores</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-none">Escolha o Seu Plano</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">Selecione o nível de profundidade e o prazo adequados para sua busca atual.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

            {/* Standard */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left hover:border-slate-350 transition-all shadow-sm">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-slate-950">Mapa Standard</h3>
                    <p className="text-xs text-slate-450 font-bold mt-0.5">Diagnóstico Fundamental</p>
                  </div>
                  <span className="text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Essencial
                  </span>
                </div>

                <div className="py-1">
                  <span className="text-3xl font-black text-slate-950 font-mono">R$ 77</span>
                  <span className="text-[10px] text-slate-450 font-bold ml-1">/ Super Preço</span>
                </div>

                <ul className="space-y-2 text-[11px] text-slate-650 font-semibold border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>SIGNIFICADO DO NOME</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>SIGNIFICADO DOS SOBRENOMES</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>INTERPRETAÇÃO PROFÉTICA DOS NOMES</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>NOME ESCRITO EM HEBRAICO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>DATA DE NASCIMENTO BÍBLICA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>TEXTO DA PARASHÁ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-slate-450 shrink-0" />
                    <span className="text-slate-500 font-medium">NOME DA TRIBO <span className="font-bold text-slate-700">SEM ESTUDO</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-slate-450 shrink-0" />
                    <span className="text-slate-500 font-medium">NOME DO MÊS BÍBLICO <span className="font-bold text-slate-700">SEM ESTUDO</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-slate-450 shrink-0" />
                    <span className="text-slate-500 font-medium"><span className="font-bold text-slate-700">SEM TABELAS</span> DE ESTUDO EM ANEXO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-slate-450 shrink-0" />
                    <span className="text-slate-500 font-medium"><span className="font-bold text-slate-700">SEM ESTUDO</span> SOBRE CADA LETRA BÍBLICA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>CERCA DE 4 PÁGINAS</span>
                  </li>
                  <li className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>ENTREGA EM 2 HORAS!!!!</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleWhatsappCta("Standard")}
                  className="w-full py-4.5 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors border-0"
                >
                  <MessageSquare className="w-4 h-4 fill-white stroke-none" />
                  <span>Garantir Mapa Standard</span>
                </button>
              </div>
            </div>

            {/* Premium */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left hover:border-amber-500/40 relative shadow-2xl">
              <span className="absolute -top-3.5 left-6 px-3 py-1 bg-brand-gradient text-white font-black uppercase tracking-wider text-[9px] rounded-full">
                Recomendado
              </span>

              <div className="space-y-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-white">Mapa Premium</h3>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">Diagnóstico Profundo</p>
                  </div>
                   <span className="text-[10px] font-black text-white bg-brand-gradient px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    Completo
                  </span>
                </div>

                <div className="py-1">
                  <span className="text-3xl font-black text-white font-mono">R$ 297</span>
                  <span className="text-[10px] text-slate-400 font-bold ml-1">/ Preço Promocional</span>
                </div>

                <ul className="space-y-2 text-[11px] text-slate-300 font-semibold border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>SIGNIFICADO DO NOME</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>SIGNIFICADO DOS SOBRENOMES</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>INTERPRETAÇÃO PROFÉTICA DOS NOMES</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>NOME ESCRITO EM HEBRAICO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>DATA DE NASCIMENTO BÍBLICA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>TEXTO DA PARASHÁ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>NOME DA TRIBO E ESTUDO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>NOME DO MÊS BÍBLICO E ESTUDO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>TABELAS DE ESTUDO EM ANEXO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>ESTUDO SOBRE CADA LETRA BÍBLICA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>MAIS DE 15 PÁGINAS</span>
                  </li>
                  <li className="flex items-center gap-2 text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md w-fit">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>ENTREGA EM 24 HORAS!!!</span>
                  </li>
                </ul>
              </div>

               <div className="pt-8">
                <button
                  onClick={() => handleWhatsappCta("Premium")}
                  className="w-full py-4.5 bg-brand-gradient text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors border-0"
                >
                  <MessageSquare className="w-4 h-4 fill-white stroke-none" />
                  <span>Garantir Mapa Premium</span>
                </button>
              </div>
            </div>

          </div>

          {/* Secure transaction notice */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-bold">
            <Lock className="w-4 h-4 text-amber-500" />
            <span>Processo com sigilo absoluto e validação individual feita pela equipe Ricardo Ribeiro.</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Perguntas Frequentes</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-none">Dúvidas Comuns</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">Encontre respostas rápidas para as principais questões sobre o funcionamento do Mapa.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200/60 rounded-2xl overflow-hidden transition-all bg-slate-50/30"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center bg-transparent border-0 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide leading-snug">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs text-slate-650 font-medium leading-relaxed text-left border-t border-slate-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
