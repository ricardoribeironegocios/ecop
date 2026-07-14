"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useDB, EventItem, ProductItem } from "@/context/DBContext";
import Link from "next/link";
import {
  Play,
  MessageSquare,
  Sparkles,
  BookOpen,
  Compass,
  Calendar,
  ChevronRight,
  ArrowRight,
  Check,
  Users,
  Globe,
  Award,
  X,
  ArrowUpRight,
  ChevronLeft,
  Book,
  BookOpenCheck,
  Sparkle
} from "lucide-react";

export default function Home() {
  const { events, settings, books, products } = useDB();
  const [videoOpen, setVideoOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  // Static course definitions (ECOP -> Suneduzz)
  const courses = [
    {
      id: "crs-1",
      title: "ECOP - Mentoria e Paternidade Espiritual",
      tagline: "Paternidade espiritual para uma vida de direção e maturidade.",
      price: "",
      description: "Relacionamento direto e exclusivo com o apóstolo Ricardo através de grupo no whatsapp e ZOOM, para aconselhamento, acompanhamento dos meses e festas bíblicas.",
      checkout_url: "https://api.whatsapp.com/send/?phone=5521981116787&text=Ol%C3%A1%21+Gostaria+de+obter+mais+informa%C3%A7%C3%B5es+sobre+a+Mentoria+e+Paternidade+Espiritual.&type=phone_number&app_absent=0",
      details_url: "",
      is_popular: true
    },
    {
      id: "crs-3",
      title: "Libertação de Cativeiros Espirituais",
      tagline: "Quebrando cadeias de gerações e destravando destinos apostólicos.",
      price: "12x R$ 30,72",
      description: "Aprenda a mapear e desarmar legalidades espirituais que impedem seu crescimento financeiro, familiar e ministerial através de ferramentas bíblicas práticas.",
      checkout_url: "https://chk.eduzz.com/o4ygtvo4",
      details_url: "/libertacao-cativeiros",
      is_popular: false
    }
  ];

  // YouTube Videos List
  const youtubeVideos = [
    { id: "yt-1", title: "005 MANUAL DE BATALHA ESPIRITUAL - A VERDADEIRA ORIGEM DE SATANÁS", url: "https://www.youtube.com/embed/Ic2ZmWH0Zlc", duration: "1h 15 min" },
    { id: "yt-2", title: "004 MARATONA DE BATALHA ESPIRITUAL - QUEM É SATANÁS?", url: "https://www.youtube.com/embed/-Yzo-URHR0Y", duration: "1h 05 min" },
    { id: "yt-3", title: "003 MARATONA DE BATALHA ESPIRITUAL - BATALHA ESPIRITUAL É PARA HOJE", url: "https://www.youtube.com/embed/VwjUw-6OI40", duration: "58 min" }
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

  const handleWhatsappCta = (plan: "Standard" | "Premium") => {
    const formattedPhone = settings.whatsapp_number.replace(/[^0-9]/g, "");
    const message = `Olá, gostaria de solicitar meu Mapa Profético ${plan}.`;
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleCaravanaWhatsapp = () => {
    window.open("https://wa.me/5521981116787?text=Olá! Gostaria de mais informações sobre a Caravana Profética para Israel.", "_blank");
  };

  // Carousel scroll handler
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Carousel scroll handler for courses
  const coursesCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCoursesCarousel = (direction: "left" | "right") => {
    if (coursesCarouselRef.current) {
      const scrollAmount = 320;
      coursesCarouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="font-sans antialiased bg-slate-50 text-slate-900 select-none">

      {/* 1. Hero Section */}
      <section id="home" className="relative min-h-[90vh] bg-slate-950 flex flex-col justify-center overflow-hidden">


        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-28 z-10 w-full">
          {/* Text and CTAs */}
          <div className="max-w-2xl xl:max-w-3xl space-y-6 text-left flex flex-col items-start relative z-10 pl-2 sm:pl-6 lg:pl-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>Conhecimento Profético</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl tracking-tight leading-tight">
              Descubra o Propósito <br />
              que <span className="text-brand-gradient">Deus Preparou</span> <br />
              <span className="text-brand-gradient">para Você</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 drop-shadow-md max-w-xl leading-relaxed font-medium">
              Capacitação, direção profética e experiências que irão transformar sua caminhada ministerial.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="#cursos"
                className="px-8 py-4 bg-brand-gradient text-white rounded-xl text-sm font-black flex items-center gap-2 shadow-xl border-0 cursor-pointer active:scale-98 transition-all"
              >
                <span>Conhecer a ECOP</span>
              </Link>
              <Link
                href="#mapa"
                className="px-8 py-4 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-sm font-black uppercase tracking-wider border border-slate-800 shadow-xl flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Solicitar Mapa Profético</span>
                <ArrowRight className="w-5 h-5 text-amber-500" />
              </Link>
            </div>
          </div>
        </div>

        {/* Large Portrait Image positioned absolutely */}
        <div className="absolute right-0 bottom-0 top-0 w-full lg:w-[58%] xl:w-[54%] hidden lg:block z-0 pointer-events-none select-none">
          <div className="relative w-full h-full">
            {/* Smooth transition gradient restricted to the left 22% to avoid reaching the face */}
            <div className="absolute left-0 top-0 bottom-0 w-[22%] bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent z-10" />
            <Image
              src="/hero-portrait-v8.webp"
              alt="Apóstolo Ricardo Ribeiro"
              fill
              style={{ objectFit: "cover", objectPosition: "right bottom" }}
              priority
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* 2. Quem Somos Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Presentation Info */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Quem Somos</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Alinhando vidas à voz do Eterno
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {settings.presentation_text}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setHistoryOpen(true)}
                  className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold border-0 cursor-pointer transition-colors shadow-md"
                >
                  Conheça Nossa História
                </button>
              </div>

              {/* Ministry Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                <div className="space-y-1">
                  <h4 className="text-2xl font-black text-slate-950 flex items-center gap-1">
                    <Users className="w-5 h-5 text-amber-500" />
                    <span>200k+</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Alunos Ativados</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-black text-slate-950 flex items-center gap-1">
                    <Globe className="w-5 h-5 text-amber-500" />
                    <span>18+</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Países Alcançados</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-black text-slate-950 flex items-center gap-1">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span>10y+</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">De Ministério</p>
                </div>
              </div>
            </div>

            {/* Presentation Video Preview Frame */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full aspect-video rounded-3xl bg-slate-950 border border-slate-200 shadow-2xl overflow-hidden relative group">
                <iframe
                  className="w-full h-full border-0"
                  src={settings.youtube_video_url}
                  title="Apresentação do Ministério"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Nova Seção: Vitrine de Cursos Online (Slider/Carousel) */}
      <section id="vitrine-cursos" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-left space-y-2">
              <span className="text-xs font-black uppercase text-amber-600 tracking-wider block">Capacitação Teológica</span>
              <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Cursos Online</h2>
              <p className="text-xs text-slate-500 font-bold">Estude e ative o seu chamado com a Universidade Profética Internacional.</p>
            </div>

            {/* Carousel navigation buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => scrollCoursesCarousel("left")}
                className="p-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCoursesCarousel("right")}
                className="p-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Slider */}
          <div
            ref={coursesCarouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pr-4"
            style={{ scrollbarWidth: "none" }}
          >
            {products.map((product, idx) => {
              return (
                <div
                  key={product.id}
                  className="snap-start w-[280px] bg-slate-50 border border-slate-200/50 rounded-3xl p-5 flex flex-col justify-between flex-shrink-0 text-left hover:border-slate-350 transition-all shadow-sm group"
                >
                  {/* Premium Mockup Course Cover */}
                  <div className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-lg border border-slate-200 bg-slate-950">
                    {renderProductCover(product)}
                  </div>

                  <div className="mt-4 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed min-h-[32px]">{product.description}</p>
                      <div className="flex justify-between items-center text-xs pt-1">
                        <span className="text-[9px] text-slate-450 uppercase font-bold">Investimento</span>
                        <span className="font-mono text-slate-950 font-black">
                          {product.price_installments || `R$ ${product.price_cash}`}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedCourse(product)}
                        className="py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider text-center cursor-pointer"
                      >
                        Detalhes
                      </button>
                      <a
                        href={product.checkout_url}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider text-center cursor-pointer border-0"
                      >
                        Matricular
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4">
            <Link
              href="/cursos-online"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer shadow-md hover:scale-[1.02] active:scale-98 transition-all border-0"
            >
              <span>Ver todos os Cursos</span>
              <ArrowRight className="w-4 h-4 text-amber-500 animate-pulse" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Nova Seção: E-books (Slider/Carousel) */}
      <section id="ebooks" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-left space-y-2">
              <span className="text-xs font-black uppercase text-amber-600 tracking-wider block">Estudo Avançado</span>
              <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">E-books</h2>
              <p className="text-xs text-slate-500 font-bold">Aprofunde seu conhecimento com os e-books do Apóstolo Ricardo Ribeiro.</p>
            </div>

            {/* Carousel navigation buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                className="p-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="p-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Slider */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pr-4"
            style={{ scrollbarWidth: "none" }}
          >
            {books.map((book) => (
              <div
                key={book.id}
                className="snap-start w-[280px] bg-slate-50 border border-slate-200/50 rounded-3xl p-5 flex flex-col justify-between flex-shrink-0 text-left hover:border-slate-350 transition-colors shadow-sm"
              >
                {/* Premium Mockup Book Cover */}
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative shadow-lg border border-slate-200 bg-slate-950">
                  {(() => {
                    const cover = book.cover_url || (book as any).gradient || "";
                    return cover.startsWith("from-") ? (
                      <div className={`w-full h-full bg-gradient-to-br ${cover} p-4 flex flex-col justify-end`}>
                        <div className="space-y-1 text-left">
                          <h4 className="text-sm font-black text-white leading-tight font-serif uppercase tracking-tight">{book.title}</h4>
                          <p className="text-[7px] text-slate-400 uppercase font-black tracking-widest">Livro Digital</p>
                        </div>
                      </div>
                    ) : (
                      <img src={cover} alt={book.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    );
                  })()}
                  <div className="absolute right-3 top-3 w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-amber-500/80" />
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xs font-black text-slate-900 truncate">{book.title}</h3>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[9px] text-slate-450 uppercase font-bold">E-book PDF</span>
                      <span className="font-mono text-slate-950 font-black">{book.price}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer"
                    >
                      Detalhes
                    </button>
                    <a
                      href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Olá! Quero comprar o livro digital ${book.title}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider text-center cursor-pointer border-0"
                    >
                      Comprar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/ebooks"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer shadow-md hover:scale-[1.02] active:scale-98 transition-all border-0"
            >
              <span>Ver todos os E-books</span>
              <ArrowRight className="w-4 h-4 text-amber-500 animate-pulse" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Cursos ECOP Section */}
      <section id="cursos" className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">

          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">ECOP Treinamentos</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-none">Cursos e Ativações de Destino</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">Capacitações hospedadas e validadas pela plataforma Suneduzz para garantir sua total segurança.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`bg-white border rounded-3xl p-6 shadow-premium flex flex-col justify-between text-left transition-all hover:scale-[1.01] hover:-translate-y-1 ${course.is_popular ? "border-amber-500/80 shadow-amber-500/5 relative" : "border-slate-100"
                  }`}
              >
                {course.is_popular && (
                  <span className="absolute -top-3.5 left-6 px-3 py-1 bg-amber-500 text-slate-950 font-black uppercase tracking-wider text-[9px] rounded-full">
                    Mais Procurado
                  </span>
                )}

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">{course.title}</h3>
                    <p className="text-xs text-slate-400 font-bold leading-normal">{course.tagline}</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{course.description}</p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 space-y-4">
                  {course.price && (
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-slate-450 uppercase font-black">Investimento</span>
                      <span className="text-sm font-black text-slate-950 font-mono">{course.price}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    {course.id !== "crs-1" && (
                      <a
                        href={course.details_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:border-slate-350 bg-slate-50 hover:bg-slate-100 transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Saiba Mais</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                      </a>
                    )}

                    <a
                      href={course.checkout_url}
                      target={course.checkout_url.startsWith("http") ? "_blank" : undefined}
                      rel={course.checkout_url.startsWith("http") ? "noreferrer" : undefined}
                      className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors border-0 cursor-pointer ${course.is_popular
                        ? "bg-brand-gradient text-white"
                        : "bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                        }`}
                    >
                      <span>{course.id === "crs-1" ? "Saiba Mais" : "Matricular-se"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Nova Seção: Experiências do Ministério (Caravana Israel) */}
      <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
        {/* Large Jerusalem background with dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/jerusalem-modern.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950 z-0" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Experiências do Ministério
              </span>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                🇮🇱 Caravana Profética para Israel
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                Muito mais do que turismo. <br />
                Uma experiência espiritual conduzida pelo Apóstolo Ricardo Ribeiro nos lugares onde a Bíblia aconteceu. Viaje com acompanhamento completo, ministrações, atos proféticos e uma experiência inesquecível na Terra Santa.
              </p>

              {/* Grid of benefits */}
              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Acompanhamento espiritual</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Guia especializado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Hotéis selecionados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Ônibus executivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Café da manhã e jantar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Atos Proféticos</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/caravana-israel"
                  className="px-5 py-3.5 bg-brand-gradient text-white font-black rounded-xl text-xs uppercase tracking-wider transition-colors border-0"
                >
                  Conhecer a Caravana
                </Link>
                <button
                  onClick={handleCaravanaWhatsapp}
                  className="px-5 py-3.5 bg-transparent hover:bg-white/10 text-white rounded-xl text-xs font-black uppercase tracking-wider border border-white/20 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-white stroke-none" />
                  <span>Falar no WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              {/* Elegant floating visual element */}
              <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                <Image
                  src="/jerusalem-modern.png"
                  alt="Jerusalém"
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 0px, 40vw"
                  style={{ objectFit: "cover" }}
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-6 text-[10px] font-black tracking-widest uppercase text-amber-500">Jerusalém Moderna</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Mapa Profético Section */}
      <section id="mapa" className="py-24 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 relative z-10">

          <div className="space-y-4">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Direcionamento Pessoal</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-955 tracking-tight leading-none">Solicite Seu Mapa Profético</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">Um diagnóstico profundo de chamado, revelação de bloqueios e atalho espiritual desenhado manualmente.</p>
            <div className="pt-2">
              <Link
                href="/entenda-o-mapa"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-98 transition-all border-0"
              >
                <span>Conhecer Melhor o Mapa</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Premium Plan */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left hover:border-amber-500/40 relative shadow-2xl">
              <span className="absolute -top-3 left-6 px-3 py-1 bg-brand-gradient text-white font-black uppercase tracking-wider text-[9px] rounded-full">
                Recomendado
              </span>

              <div className="space-y-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-white">Mapa Premium</h3>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">Mapeamento Avançado</p>
                  </div>
                  <span className="text-xs font-black text-white bg-brand-gradient px-2.5 py-1 rounded-lg">Avançado</span>
                </div>

                <div className="py-1">
                  <span className="text-3xl font-black text-white font-mono">R$ 297</span>
                  <span className="text-[10px] text-slate-440 font-bold ml-1">/ Preço Promocional</span>
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

              <div className="pt-8 mt-8 border-t border-slate-800 space-y-4">
                <button
                  onClick={() => handleWhatsappCta("Premium")}
                  className="w-full py-3.5 bg-brand-gradient text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors border-0"
                >
                  <MessageSquare className="w-4 h-4 fill-white stroke-none" />
                  <span>Solicitar no WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Standard Plan */}
            <div className="bg-slate-50/50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left hover:border-slate-350 hover:bg-white transition-all">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-slate-950">Mapa Standard</h3>
                    <p className="text-xs text-slate-450 font-bold mt-0.5">Diagnóstico Fundamental</p>
                  </div>
                  <span className="text-xs font-black text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-lg">Essencial</span>
                </div>

                <div className="py-1">
                  <span className="text-3xl font-black text-slate-955 font-mono">R$ 77</span>
                  <span className="text-[10px] text-slate-455 font-bold ml-1">/ Super Preço</span>
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
                    <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-through">NOME DA TRIBO E ESTUDO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-through">NOME DO MÊS BÍBLICO E ESTUDO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-through">TABELAS DE ESTUDO EM ANEXO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-through">ESTUDO SOBRE CADA LETRA BÍBLICA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>CERCA DE 4 PÁGINAS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-through">MAIS DE 15 PÁGINAS</span>
                  </li>
                  <li className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>ENTREGA EM 2 HORAS!!!!</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-200/60 space-y-4">
                <button
                  onClick={() => handleWhatsappCta("Standard")}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors border-0"
                >
                  <MessageSquare className="w-4 h-4 fill-white stroke-none" />
                  <span>Solicitar no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Core Info Flow Banner */}
          <div className="bg-white border border-slate-200/60 shadow-sm rounded-3xl p-8 sm:p-10 max-w-5xl mx-auto relative overflow-hidden">
            <h4 className="text-xs font-black uppercase text-slate-955 tracking-wider text-center mb-8 relative z-10">Como funciona o processo?</h4>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 relative z-10">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-[2px] bg-slate-100 z-0" />

              <div className="relative z-10 flex flex-col items-center text-center space-y-3 group">
                <div className="w-10 h-10 rounded-full bg-slate-955 text-white flex items-center justify-center font-black text-sm shadow-md group-hover:scale-110 transition-transform">1</div>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider leading-relaxed">Solicite no<br />WhatsApp</p>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-3 group">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center font-black text-sm group-hover:border-slate-400 group-hover:text-slate-600 transition-all">2</div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-relaxed">Envie o PIX<br />Manual</p>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-3 group">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center font-black text-sm group-hover:border-slate-400 group-hover:text-slate-600 transition-all">3</div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-relaxed">Receba o Link<br />do Formulário</p>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-3 group">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center font-black text-sm group-hover:border-slate-400 group-hover:text-slate-600 transition-all">4</div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-relaxed">Preencha<br />seu Perfil</p>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-3 group">
                <div className="w-10 h-10 rounded-full bg-brand-gradient text-white flex items-center justify-center font-black text-sm shadow-lg group-hover:scale-110 transition-transform">5</div>
                <p className="text-[10px] font-black text-slate-950 uppercase tracking-wider leading-relaxed">Receba o Mapa<br />em PDF</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Eventos Section */}
      <section id="eventos" className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">

          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Agenda & Eventos</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-none">Próximos Encontros</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">Participe presencialmente ou online das nossas convocações e imersões proféticas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {events.map((event) => (
              <div
                key={event.id}
                className={`bg-white border border-slate-100 rounded-3xl p-6 text-left flex flex-col justify-between shadow-premium transition-all hover:border-slate-300 ${event.is_featured ? "ring-2 ring-amber-500/20" : ""
                  }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{event.date} às {event.time}</span>
                    {event.is_featured && (
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-amber-700 rounded-md">Destaque</span>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">{event.title}</h3>
                    <p className="text-[10px] text-amber-600 uppercase font-black tracking-wide flex items-center gap-1">📍 {event.location}</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{event.description}</p>
                </div>

                {event.register_url && (
                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <a
                      href={event.register_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-1 border-0 cursor-pointer"
                    >
                      <span>Inscrição Garantida</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Nova Seção: Conteúdo Gratuito (Youtube) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">

          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Estudo e Edificação</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-none">Últimas Ministrações</h2>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">Acompanhe as pregações e ativações mais recentes disponibilizadas no nosso canal do YouTube.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {youtubeVideos.map((video) => (
              <div
                key={video.id}
                className="bg-slate-50 border border-slate-200/50 rounded-3xl p-5 flex flex-col justify-between text-left hover:border-slate-350 transition-colors shadow-sm"
              >
                <div className="space-y-4">
                  <div className="w-full aspect-video rounded-2xl bg-slate-950 overflow-hidden relative flex items-center justify-center border border-slate-200">
                    <iframe
                      className="w-full h-full border-0"
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>YouTube</span>
                      <span>{video.duration}</span>
                    </div>
                    <h3 className="text-xs font-black text-slate-900 leading-snug">{video.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <a
              href="https://www.youtube.com/@ecop_escolaprofetica/" // Canal oficial da ECOP
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs rounded-xl uppercase tracking-wider shadow-md flex items-center gap-2"
            >
              <svg className="w-4.5 h-4.5 text-red-500 fill-red-500 stroke-none animate-pulse" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>Assistir Canal</span>
            </a>
          </div>

        </div>
      </section>

      {/* 9. Institutional Video Modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2.5 bg-black/60 hover:bg-black text-white rounded-xl border border-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              className="w-full h-full border-0"
              src={settings.youtube_video_url}
              title="Apresentação do Ministério"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Quem Somos: História Modal */}
      {historyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xl relative space-y-6 text-left">
            <button
              onClick={() => setHistoryOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 border-0 bg-transparent cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="text-xs font-black uppercase text-amber-600 tracking-wider">A História</span>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight leading-none">Apóstolo Ricardo Ribeiro</h3>
            </div>
            <p className="text-xs text-slate-650 font-medium leading-relaxed">
              O Apóstolo Ricardo Ribeiro tem dedicado sua jornada de vida a restaurar o ensino bíblico do ministério profético no Brasil e no exterior. Com formação teológica e anos de atuação prática, ele lidera a Escola de Capacitação Profética (ECOP) e orienta milhares de cristãos a descobrirem, compreenderem e andarem ativamente no seu chamado profético de forma madura, séria e equilibrada.
              <br /><br />
              Através de seminários, materiais de estudo avançado e aconselhamento pessoal, o ministério visa destrinchar legalidades que retêm destinos espirituais, ativando dons e erguendo ministros consolidados nas verdades eternas.
            </p>
          </div>
        </div>
      )}

      {/* Book details Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xl relative space-y-6 text-left">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 border-0 bg-transparent cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
            <div className="flex gap-4">
              <div className="w-24 h-32 rounded-xl overflow-hidden shrink-0 shadow-md border border-slate-200 relative bg-slate-950">
                {(() => {
                  const cover = selectedBook.cover_url || (selectedBook as any).gradient || "";
                  return cover.startsWith("from-") ? (
                    <div className={`w-full h-full bg-gradient-to-br ${cover} p-2 flex flex-col justify-end`}>
                      <span className="text-[9px] font-black text-white font-serif uppercase tracking-tight leading-tight">{selectedBook.title}</span>
                    </div>
                  ) : (
                    <img src={cover} alt={selectedBook.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  );
                })()}
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <span className="text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md uppercase tracking-wider">E-book</span>
                <h3 className="text-base font-black text-slate-950 leading-snug">{selectedBook.title}</h3>
                <span className="font-mono text-sm font-black text-slate-950">{selectedBook.price}</span>
              </div>
            </div>
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <h4 className="text-[9px] uppercase tracking-wider text-slate-450 font-black">Sinopse do Livro</h4>
              <p className="text-xs text-slate-650 font-medium leading-relaxed">{selectedBook.desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setSelectedBook(null)}
                className="py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Voltar
              </button>
              <a
                href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Olá! Gostaria de comprar o livro digital ${selectedBook.title}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center cursor-pointer border-0"
              >
                Comprar Agora
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Course details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xl relative space-y-6 text-left">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 border-0 bg-transparent cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-md border border-slate-200 relative bg-slate-950">
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-emerald-955 to-slate-950 p-3 flex flex-col justify-between">
                  <BookOpenCheck className="w-4 h-4 text-slate-300" />
                  <span className="text-[9px] font-black text-white font-serif uppercase tracking-tight leading-tight">{selectedCourse.title}</span>
                </div>
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <span className="text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {selectedCourse.type === "package" ? "Formação" : "Curso"}
                </span>
                <h3 className="text-base font-black text-slate-950 leading-snug">{selectedCourse.title}</h3>
                <span className="font-mono text-sm font-black text-slate-950">
                  {selectedCourse.price_installments || `R$ ${selectedCourse.price_cash}`}
                </span>
              </div>
            </div>
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <h4 className="text-[9px] uppercase tracking-wider text-slate-450 font-black">Descrição do Curso</h4>
              <p className="text-xs text-slate-650 font-medium leading-relaxed">{selectedCourse.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setSelectedCourse(null)}
                className="py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Voltar
              </button>
              <a
                href={selectedCourse.checkout_url}
                target="_blank"
                rel="noreferrer"
                className="py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center cursor-pointer border-0"
              >
                Matricular
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
