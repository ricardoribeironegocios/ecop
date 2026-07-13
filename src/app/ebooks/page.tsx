"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDB } from "@/context/DBContext";
import {
  BookOpen,
  Scale,
  Shield,
  Crown,
  Moon,
  Eye,
  Flame,
  User,
  Key,
  Calendar,
  Sparkles,
  Check,
  ArrowRight,
  MessageSquare,
  Info,
  Percent,
  CheckSquare,
  Square
} from "lucide-react";

// Icon mapper for dynamic covers
const iconMap: Record<string, React.ComponentType<any>> = {
  Scale,
  Shield,
  Crown,
  BookOpen,
  Moon,
  Eye,
  Flame,
  User,
  Key,
  Calendar,
  Sparkles
};

const EBOOKS_DATA = [
  {
    id: "eb-1",
    title: "Tribunal Celestial",
    desc: "Eu posso garantir que este é um dos mais completos manuais sobre tribunal celestial já escritos. Se você ama este assunto, mergulhe neste conteúdo.",
    price: 49.00,
    coverColor: "from-slate-900 via-amber-950 to-slate-950",
    iconName: "Scale"
  },
  {
    id: "eb-2",
    title: "Denunciando Demônios no Tribunal",
    desc: "Neste e-book você aprenderá a acessar o Tribunal Celestial e liberar decretos de denúncia contra os demônios que tanto nos prejudicam com legalidades contra nós.",
    price: 49.00,
    coverColor: "from-indigo-950 via-slate-900 to-indigo-900",
    iconName: "Shield"
  },
  {
    id: "eb-3",
    title: "Yeshua",
    desc: "Talvez você já saiba que o verdadeiro nome de nosso Senhor não é Jesus. Mas que tal um entendimento mais maduro e aprofundado sobre esta tão preciosa verdade?",
    price: 49.00,
    coverColor: "from-amber-900 via-amber-950 to-slate-900",
    iconName: "Crown"
  },
  {
    id: "eb-4",
    title: "Segredo Profético das Letras",
    desc: "Este é um livro sobre o alfabeto hebraico e o poder secreto carregado por cada uma das 22 letras. É um livro profético. Com ele você poderá saber os segredos das letras de seu nome.",
    price: 49.00,
    coverColor: "from-emerald-950 via-teal-900 to-slate-950",
    iconName: "BookOpen"
  },
  {
    id: "eb-5",
    title: "Portal dos Sonhos",
    desc: "Muito mais do que saber o significado dos sonhos. Aqui eu te ensino a visitar os sonhos e navegar voluntariamente dentro deles, procurando segredos espirituais.",
    price: 49.00,
    coverColor: "from-purple-950 via-violet-900 to-slate-950",
    iconName: "Moon"
  },
  {
    id: "eb-6",
    title: "Poder Profético dos Nomes",
    desc: "Um dos assuntos que mais amo falar. Nomes são destinos. Deus mudou nomes para mudar destinos. Este possivelmente é o único livro que você vai encontrar com os segredos dos nomes.",
    price: 49.00,
    coverColor: "from-blue-950 via-slate-900 to-slate-950",
    iconName: "User"
  },
  {
    id: "eb-7",
    title: "O Mundo Espiritual",
    desc: "O mundo espiritual existe e se move bem diante dos nossos olhos, e não vemos. Neste livro eu te ensino a identificar o agir sobrenatural em diversos aspectos de nosso dia a dia.",
    price: 49.00,
    coverColor: "from-slate-900 via-zinc-800 to-slate-950",
    iconName: "Eye"
  },
  {
    id: "eb-8",
    title: "Asherá e Noel",
    desc: "Um livro ousado, que entrega toda a verdade sobre Noel e Asherá, e a perversidade espiritual que se oculta atrás das festas natalinas.",
    price: 49.00,
    coverColor: "from-rose-950 via-red-900 to-slate-950",
    iconName: "Flame"
  },
  {
    id: "eb-9",
    title: "O Casal e o Anjo",
    desc: "Uma aventura tremenda envolvendo um casal e um anjo, que os treina para a maior batalha espiritual de suas vidas. Um livro emocionante e cheio de ensinamento.",
    price: 49.00,
    coverColor: "from-cyan-950 via-blue-900 to-slate-950",
    iconName: "User"
  },
  {
    id: "eb-10",
    title: "Chaves de Davi",
    desc: "Este livro já emocionou centenas de pessoas. Imagine um treinamento de todos os assuntos envolvidos no dia a dia apostólico e profético, extraídos da vida de davi?",
    price: 49.00,
    coverColor: "from-amber-950 via-yellow-900 to-slate-950",
    iconName: "Key"
  },
  {
    id: "eb-11",
    title: "Calendário Bíblico vs Gregoriano",
    desc: "Este é o manual de calendário bíblico e guerra contra o calendário gregoriano que utilizamos em nosso ministério. Adquirindo este material, você também terá acesso.",
    price: 49.00,
    coverColor: "from-slate-950 via-zinc-900 to-slate-900",
    iconName: "Calendar"
  },
  {
    id: "eb-12",
    title: "Manual de Atos Proféticos",
    desc: "Atos Proféticos são orações teatralizadas, direcionadas por Deus, que quando realizadas podem fazer o céu tremer e o sobrenatural acontecer. Manual completo.",
    price: 49.00,
    coverColor: "from-fuchsia-950 via-purple-900 to-slate-950",
    iconName: "Sparkles"
  }
];

export default function EbooksPage() {
  const { books } = useDB();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const phone = "5521981116787";

  const getNumericPrice = (priceStr: string | number) => {
    if (typeof priceStr === "number") return priceStr;
    if (!priceStr) return 49;
    const cleaned = priceStr.replace(/[^\d]/g, "");
    if (cleaned.length === 0) return 49;
    const value = parseInt(cleaned, 10);
    if (priceStr.includes(",") || priceStr.includes(".")) {
      return value / 100;
    }
    return value;
  };

  const displayBooks = (books && books.length > 0 ? books : EBOOKS_DATA).map(b => {
    const priceStr = typeof b.price === "number" ? `R$ ${b.price.toFixed(2).replace(".", ",")}` : b.price;
    const numericPrice = getNumericPrice(b.price);
    const coverUrl = (b as any).cover_url || (b as any).coverColor || "";
    const desc = b.desc || "";

    // Determine cover icon and gradient dynamically or by fallback mapping
    const defaultCoverGradients: Record<string, string> = {
      "bk-1": "from-slate-900 via-amber-950 to-slate-950",
      "eb-1": "from-slate-900 via-amber-950 to-slate-950",
      "bk-2": "from-indigo-950 via-slate-900 to-indigo-900",
      "eb-2": "from-indigo-950 via-slate-900 to-indigo-900",
      "bk-3": "from-amber-900 via-amber-950 to-slate-900",
      "eb-3": "from-amber-900 via-amber-950 to-slate-900",
      "bk-4": "from-emerald-950 via-teal-900 to-slate-950",
      "eb-4": "from-emerald-950 via-teal-900 to-slate-950",
      "bk-5": "from-purple-950 via-violet-900 to-slate-950",
      "eb-5": "from-purple-950 via-violet-900 to-slate-950",
      "bk-6": "from-blue-950 via-slate-900 to-slate-950",
      "eb-6": "from-blue-950 via-slate-900 to-slate-950",
      "bk-7": "from-slate-900 via-zinc-800 to-slate-950",
      "eb-7": "from-slate-900 via-zinc-800 to-slate-950",
      "bk-8": "from-rose-950 via-red-900 to-slate-950",
      "eb-8": "from-rose-950 via-red-900 to-slate-950",
      "bk-9": "from-cyan-950 via-blue-900 to-slate-950",
      "eb-9": "from-cyan-950 via-blue-900 to-slate-950",
      "bk-10": "from-amber-950 via-yellow-900 to-slate-950",
      "eb-10": "from-amber-950 via-yellow-900 to-slate-950",
      "bk-11": "from-slate-950 via-zinc-900 to-slate-900",
      "eb-11": "from-slate-950 via-zinc-900 to-slate-900",
      "bk-12": "from-fuchsia-950 via-purple-900 to-slate-950",
      "eb-12": "from-fuchsia-950 via-purple-900 to-slate-950"
    };

    const defaultCoverIcons: Record<string, string> = {
      "bk-1": "Scale", "eb-1": "Scale",
      "bk-2": "Shield", "eb-2": "Shield",
      "bk-3": "Crown", "eb-3": "Crown",
      "bk-4": "BookOpen", "eb-4": "BookOpen",
      "bk-5": "Moon", "eb-5": "Moon",
      "bk-6": "User", "eb-6": "User",
      "bk-7": "Eye", "eb-7": "Eye",
      "bk-8": "Flame", "eb-8": "Flame",
      "bk-9": "User", "eb-9": "User",
      "bk-10": "Key", "eb-10": "Key",
      "bk-11": "Calendar", "eb-11": "Calendar",
      "bk-12": "Sparkles", "eb-12": "Sparkles"
    };

    const fallbackGradient = defaultCoverGradients[b.id] || "from-slate-900 via-zinc-800 to-slate-950";
    const coverGradient = coverUrl.startsWith("from-") ? coverUrl : fallbackGradient;
    const iconName = (b as any).iconName || defaultCoverIcons[b.id] || "BookOpen";

    return {
      id: b.id,
      title: b.title,
      desc,
      coverUrl,
      coverGradient,
      iconName,
      priceStr,
      numericPrice
    };
  });

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Calculate pricing
  const finalPrice = selectedBooks.reduce((acc, book) => acc + book.numericPrice, 0);

  // WhatsApp Message Generator
  const getWhatsAppMessage = () => {

    if (selectedBooks.length === 0) {
      return `Olá! Gostaria de mais informações sobre os e-books do Apóstolo Ricardo Ribeiro.`;
    }

    const booksList = selectedBooks.map((b, idx) => `${idx + 1}. E-book: ${b.title}`).join("\n");
    return `Olá! Escolhi os seguintes e-books:\n\n${booksList}\n\nTotal: R$ ${finalPrice.toFixed(2)}. Gostaria de solicitar os dados de pagamento (PIX ou Cartão).`;
  };

  const handleSendWhatsApp = () => {
    const text = getWhatsAppMessage();
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-slate-900">

      {/* 1. Hero Section */}
      <section className="relative bg-slate-950 text-white py-16 sm:py-20 overflow-hidden border-b border-slate-900">
        <div className="hidden sm:block absolute inset-0 bg-contain bg-right bg-no-repeat opacity-[0.95]" style={{ backgroundImage: "url('/biblioteca-banner.webp')" }} />
        <div className="hidden sm:block absolute inset-0 z-0 pointer-events-none" style={{ background: "linear-gradient(to right, #020617 0%, #020617 30%, rgba(2,6,23,0.9) 45%, rgba(2,6,23,0) 58%)" }} />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest transition-transform duration-300 hover:scale-105">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Coleção de E-books</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight uppercase max-w-4xl mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            EBOOKS DO <span className="text-brand-gradient">APÓSTOLO RICARDO RIBEIRO</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Aprofunde seus conhecimentos bíblicos, ative seus dons de revelação e alinhe sua caminhada ao tempo profético com os materiais de guerra espiritual e teologia avançada.
          </p>
        </div>
      </section>

      {/* 3. Grid dos Livros Digitais */}
      <section className="pb-16 pt-4 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col gap-5 border-b border-slate-100 pb-5">
            <div className="text-left space-y-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 uppercase">Escolha seus Livros</h2>
              <p className="text-xs text-slate-500 font-medium">Selecione os e-books que você deseja adquirir.</p>
            </div>

            {/* PONTO EXPLICATIVO INCLUÍDO COM DESTAQUE, FUNDO E CONTRASTE */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl shadow-lg relative overflow-hidden text-left">
              <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
              <strong className="text-amber-500 text-[13px] font-black uppercase tracking-wider block mb-2">
                🛒 Como comprar de forma fácil:
              </strong>
              <ol className="list-decimal pl-4.5 space-y-1.5 text-slate-300 font-semibold">
                <li>Selecione os livros desejados abaixo clicando neles.</li>
                <li>Veja o valor atualizado no <strong className="text-white font-black underline decoration-amber-500 underline-offset-2">Resumo do Pedido</strong> ao final da página.</li>
                <li>Faça o PIX e envie o comprovante pelo WhatsApp para receber seus e-books na hora.</li>
              </ol>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayBooks.map((book) => {
              const IconComponent = iconMap[book.iconName] || BookOpen;
              const isSelected = selectedIds.includes(book.id);

              return (
                <div
                  key={book.id}
                  onClick={() => handleToggleSelect(book.id)}
                  className={`bg-slate-50 border rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 group hover:shadow-md ${isSelected
                    ? "border-amber-500/80 bg-amber-500/[0.02] shadow-sm shadow-amber-500/5"
                    : "border-slate-200/60 hover:border-slate-350"
                    }`}
                >
                  <div className="space-y-4">
                    {/* Realistic Book Mockup Cover */}
                    <div className="w-full aspect-[3/4.2] rounded-xl overflow-hidden relative shadow-md group-hover:shadow-lg transition-shadow border border-slate-200 bg-slate-950 flex flex-col justify-between p-4.5">
                      {book.coverUrl.startsWith("from-") ? (
                        <div className={`absolute inset-0 bg-gradient-to-br ${book.coverGradient} opacity-95`} />
                      ) : (
                        <img src={book.coverUrl} alt={book.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-95" />
                      )}

                      {/* Book spine simulation overlay */}
                      <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-gradient-to-r from-black/30 via-white/10 to-transparent z-10" />

                      <div className="relative z-10 flex justify-end items-start">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${isSelected ? "bg-amber-500 border-amber-500 text-slate-950" : "bg-black/40 border-white/20 text-white"
                          }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                        </div>
                      </div>

                      {book.coverUrl.startsWith("from-") && (
                        <div className="relative z-10 space-y-2 mt-auto text-left">
                          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-xs font-black text-white leading-tight uppercase tracking-tight font-serif min-h-[2.5rem] flex items-end">
                            {book.title}
                          </h3>
                          <p className="text-[7px] text-slate-300/80 uppercase font-bold tracking-widest">E-book Digital PDF</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-450 uppercase tracking-wide">E-book PDF</span>
                        <span className="text-xs font-black text-slate-955 font-mono">{book.priceStr}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed min-h-[3.75rem]">
                        {book.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-4">
                    <button
                      type="button"
                      className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer border-0 ${isSelected
                        ? "bg-brand-gradient text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                    >
                      {isSelected ? "Selecionado" : "Selecionar E-book"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Como Adquirir / Painel de Compra Interativo */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Passo a Passo</span>
            <h2 className="text-3xl font-extrabold text-slate-955 tracking-tight uppercase leading-none">Como adquirir agora mesmo?</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">Siga as instruções abaixo para receber seus e-books imediatamente em sua conta.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* Bloco de Instruções */}
            <div className="space-y-6">

              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm space-y-6">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-500" />
                  <span>Método PIX Direto</span>
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-7 h-7 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-900 uppercase">Escolha Seus Temas</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">Marque os e-books desejados no catálogo acima para calcular o valor.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-7 h-7 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-900 uppercase">Envie o PIX do Valor</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">
                        Envie o valor total correspondente para a chave celular: <strong className="font-extrabold text-slate-900">21 98111-6787</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-7 h-7 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-900 uppercase">WhatsApp de Comprovante</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">Envie o comprovante para o mesmo número por WhatsApp informando os temas escolhidos.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-7 h-7 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      4
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-900 uppercase">Receba Imediatamente</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">Seus e-books no formato digital PDF serão enviados imediatamente pelo suporte.</p>
                    </div>
                  </div>
                </div>
              </div>

              </div>
            </div>

            {/* Painel Interativo de Fechamento */}
            <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 shadow-lg text-center space-y-6 md:sticky md:top-24">
              <div className="space-y-1 border-b border-slate-800 pb-4 text-left">
                <h3 className="text-xs font-black uppercase text-amber-500 tracking-wider">Resumo do Pedido</h3>
                <p className="text-[10px] text-slate-400 font-medium">Seus e-books selecionados.</p>
              </div>

              {/* Lista compacta de e-books selecionados */}
              <div className="max-h-40 overflow-y-auto space-y-2.5 scrollbar-thin text-left pr-1">
                {selectedBooks.length === 0 ? (
                  <p className="text-xs text-slate-400 font-bold italic py-4 text-center">Nenhum livro selecionado. Escolha no catálogo acima.</p>
                ) : (
                  selectedBooks.map((book) => (
                    <div key={book.id} className="flex justify-between items-center text-xs">
                      <span className="truncate max-w-[200px] text-slate-200 font-bold">✓ {book.title}</span>
                      <span className="font-mono text-slate-400 shrink-0">{book.priceStr}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Linha de Totais */}
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs uppercase font-black text-slate-400">Total a Pagar</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white font-mono">R$ {finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleSendWhatsApp}
                  disabled={selectedIds.length === 0}
                  className={`w-full py-4.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-0 transition-all duration-300 ${selectedIds.length === 0
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-[1.03]"
                    }`}
                >
                  <MessageSquare className="w-4.5 h-4.5 fill-white stroke-none" />
                  <span>Comprar via WhatsApp</span>
                </button>
              </div>

              <span className="text-[9px] text-slate-400 font-bold block">
                Chave PIX celular: 21981116787 (Ricardo Ribeiro)
              </span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
