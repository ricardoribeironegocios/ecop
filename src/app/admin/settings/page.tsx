"use client";

import React, { useState, useRef } from "react";
import { useDB, EventItem, BookItem } from "@/context/DBContext";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  BookOpen, 
  Calendar, 
  Save, 
  X, 
  Check, 
  ExternalLink,
  Info,
  Upload
} from "lucide-react";

export default function AdminSettingsPage() {
  const { 
    events, 
    books, 
    createEvent, 
    updateEvent, 
    deleteEvent, 
    updateBook, 
    createBook,
    deleteBook,
    isLoading 
  } = useDB();

  // Tab state
  const [activeTab, setActiveTab] = useState<"events" | "books">("events");

  // Book Form State (Modal)
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null); // Null means create new
  const [bookForm, setBookForm] = useState({
    title: "",
    price: "",
    cover_url: "",
    desc: ""
  });

  // Event Form State (Modal)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null); // Null means create new
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    register_url: "",
    is_featured: false
  });

  // Success message feedback
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3000);
  };

  // BOOK HANDLERS
  const handleOpenNewBook = () => {
    setSelectedBook(null);
    setBookForm({
      title: "",
      price: "",
      cover_url: "", // Required on create
      desc: ""
    });
    setIsBookModalOpen(true);
  };

  const handleOpenEditBook = (book: BookItem) => {
    setSelectedBook(book);
    setBookForm({
      title: book.title,
      price: book.price,
      cover_url: book.cover_url || (book as any).gradient || "",
      desc: book.desc
    });
    setIsBookModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (under 1.5MB as recommendation, but we will compress anyway)
      if (file.size > 1.5 * 1024 * 1024) {
        alert("A imagem da capa é muito grande. Escolha uma imagem de até 1.5 MB.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Convert to WebP with 80% quality for optimal compression and quality (very light)
          const compressedBase64 = canvas.toDataURL("image/webp", 0.8);
          setBookForm(prev => ({ ...prev, cover_url: compressedBase64 }));
        };
        img.onerror = () => {
          alert("Erro ao processar imagem.");
        };
      };
      reader.onerror = () => {
        alert("Erro ao ler arquivo.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookForm.title || !bookForm.price || !bookForm.desc || !bookForm.cover_url) {
      alert("Por favor, preencha todos os campos e faça o upload da imagem da capa.");
      return;
    }

    // Apply strict text limit check (double validation)
    const title = bookForm.title.substring(0, 40);
    const desc = bookForm.desc.substring(0, 150);
    const finalForm = { ...bookForm, title, desc };

    if (selectedBook) {
      updateBook(selectedBook.id, finalForm);
      showFeedback("E-book atualizado com sucesso!");
    } else {
      createBook(finalForm);
      showFeedback("Novo e-book cadastrado no acervo!");
    }

    setIsBookModalOpen(false);
  };

  const handleDeleteBook = (id: string) => {
    if (confirm("Deseja realmente remover este livro do acervo?")) {
      deleteBook(id);
      showFeedback("Livro removido com sucesso!");
    }
  };

  // EVENT HANDLERS
  const handleOpenNewEvent = () => {
    setSelectedEvent(null);
    setEventForm({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      register_url: "",
      is_featured: false
    });
    setIsEventModalOpen(true);
  };

  const handleOpenEditEvent = (event: EventItem) => {
    setSelectedEvent(event);
    setEventForm({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      register_url: event.register_url || "",
      is_featured: event.is_featured
    });
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date || !eventForm.location) return;

    if (selectedEvent) {
      updateEvent(selectedEvent.id, eventForm);
      showFeedback("Evento atualizado com sucesso!");
    } else {
      createEvent(eventForm);
      showFeedback("Novo evento cadastrado com sucesso!");
    }

    setIsEventModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("Deseja realmente excluir este evento permanentemente?")) {
      deleteEvent(id);
      showFeedback("Evento excluído permanentemente!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 font-sans text-xs font-bold text-slate-500 uppercase tracking-widest">
        Carregando Configurações...
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans select-none text-left pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase leading-none">Ajustes & Configurações</h1>
          <p className="text-xs text-slate-400 font-bold mt-1.5">Gerencie os preços dos livros e divulgue novas agendas e encontros ministeriais.</p>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-3.5 border border-emerald-800/20 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs font-bold text-center leading-normal animate-fade-in">
          {feedbackMsg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-1.5 pb-px">
        <button
          onClick={() => setActiveTab("events")}
          className={`px-4.5 py-3 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "events"
              ? "border-amber-500 text-amber-500 font-black"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Agenda & Eventos</span>
        </button>
        <button
          onClick={() => setActiveTab("books")}
          className={`px-4.5 py-3 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "books"
              ? "border-amber-500 text-amber-500 font-black"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Valores & Acervo de Livros</span>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        
        {/* TAB 1: EVENTS */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900/60 backdrop-blur-md border border-slate-800/85 rounded-2xl p-4.5 shadow-md">
              <div className="flex items-center gap-2.5 text-xs text-slate-400 font-semibold">
                <Info className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Os encontros adicionados aqui aparecem de forma dinâmica na Agenda da página inicial do site.</span>
              </div>
              <button
                onClick={handleOpenNewEvent}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-455 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-0 shadow-md cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4 text-slate-950" />
                <span>Cadastrar Encontro</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((evt) => (
                <div 
                  key={evt.id}
                  className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-lg text-left flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500">
                          {evt.date} às {evt.time}
                        </span>
                        <h3 className="text-sm font-black text-white uppercase tracking-tight leading-snug">{evt.title}</h3>
                        <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">{evt.location}</p>
                      </div>
                      {evt.is_featured && (
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded text-[9px] font-black uppercase tracking-wider border border-amber-500/20">
                          Destaque
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{evt.description}</p>
                    {evt.register_url && (
                      <a 
                        href={evt.register_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-slate-500 hover:text-white font-bold"
                      >
                        <span>Link de Inscrição: {evt.register_url}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="flex gap-2.5 pt-6 mt-6 border-t border-slate-800">
                    <button
                      onClick={() => handleOpenEditEvent(evt)}
                      className="px-3.5 py-2 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors bg-slate-950"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(evt.id)}
                      className="px-3.5 py-2 border border-red-950 hover:bg-red-500/10 text-red-450 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors bg-slate-955"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              ))}

              {events.length === 0 && (
                <div className="col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-16 text-center text-slate-500 font-bold shadow-lg">
                  Nenhum encontro ou evento agendado no momento.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: BOOKS */}
        {activeTab === "books" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900/60 backdrop-blur-md border border-slate-800/85 rounded-2xl p-4.5 shadow-md">
              <div className="flex items-center gap-2.5 text-xs text-slate-400 font-semibold">
                <Info className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Gerencie o catálogo de livros digitais da Home. Defina títulos curtos, descrições diretas e faça o upload da imagem da capa.</span>
              </div>
              <button
                onClick={handleOpenNewBook}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-455 text-slate-955 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-0 shadow-md cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4 text-slate-955" />
                <span>Cadastrar Livro</span>
              </button>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/40">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">Acervo de Livros Digitais ({books.length})</h2>
              </div>

              <div className="divide-y divide-slate-800">
                {books.map((book) => (
                  <div 
                    key={book.id} 
                    className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                  >
                    <div className="flex gap-4 items-start flex-1 min-w-0">
                      {/* Mini Book Cover thumbnail */}
                      <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 shadow border border-slate-800 relative bg-slate-950">
                        {(() => {
                          const cover = book.cover_url || (book as any).gradient || "";
                          return cover.startsWith("from-") ? (
                            <div className={`w-full h-full bg-gradient-to-br ${cover} p-1.5 flex flex-col justify-end`}>
                              <span className="text-[6px] font-black text-white font-serif uppercase tracking-tight block truncate">{book.title}</span>
                            </div>
                          ) : (
                            <img src={cover} alt={book.title} className="w-full h-full object-cover" />
                          );
                        })()}
                      </div>
                      <div className="space-y-1 text-left flex-1 min-w-0">
                        <h3 className="text-sm font-black text-white leading-tight flex items-center gap-2">
                          <span>{book.title}</span>
                          <span className="px-2 py-0.5 bg-slate-950 text-amber-500 border border-slate-850 rounded text-[8px] font-mono font-bold uppercase">{book.price}</span>
                        </h3>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed truncate-2-lines">{book.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleOpenEditBook(book)}
                        className="px-3.5 py-2 border border-slate-800 hover:bg-slate-800 text-slate-350 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors bg-slate-955"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.id)}
                        className="px-3.5 py-2 border border-red-955 hover:bg-red-500/10 text-red-400 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors bg-slate-955"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </div>
                ))}

                {books.length === 0 && (
                  <div className="p-16 text-center text-slate-500 font-bold">
                    Nenhum livro cadastrado no acervo.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* BOOK FORM MODAL */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative space-y-6">
            <button 
              onClick={() => setIsBookModalOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-850 rounded-lg text-slate-500 hover:text-white border-0 bg-transparent cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="text-left space-y-1">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                {selectedBook ? "Editar Livro" : "Cadastrar Novo Livro"}
              </h3>
              <p className="text-[10px] text-slate-450 font-bold">Preencha as informações básicas, preço e faça o upload do arquivo de imagem da capa.</p>
            </div>

            <form onSubmit={handleSaveBook} className="space-y-4 text-left text-xs font-bold text-slate-400">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Título do Livro</label>
                  <span className={`text-[9px] font-bold ${bookForm.title.length > 40 ? 'text-red-500' : 'text-slate-550'}`}>
                    {bookForm.title.length}/40 caracteres
                  </span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={40}
                  value={bookForm.title}
                  onChange={(e) => setBookForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Tribunal Celestial"
                  className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Preço de Venda (Formato texto)</label>
                <input
                  type="text"
                  required
                  value={bookForm.price}
                  onChange={(e) => setBookForm(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="Ex: R$ 37,90"
                  className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Descrição / Sinopse Curta</label>
                  <span className={`text-[9px] font-bold ${bookForm.desc.length > 150 ? 'text-red-500' : 'text-slate-555'}`}>
                    {bookForm.desc.length}/150 caracteres
                  </span>
                </div>
                <textarea
                  required
                  maxLength={150}
                  value={bookForm.desc}
                  onChange={(e) => setBookForm(prev => ({ ...prev, desc: e.target.value }))}
                  placeholder="Resuma o conteúdo do livro em até 150 caracteres para não quebrar o layout da Home..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold resize-none"
                />
              </div>

              {/* Book Cover Image File Upload */}
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Imagem da Capa (Upload)</label>
                
                <div className="flex items-center gap-4">
                  {bookForm.cover_url && (
                    <div className="w-16 h-20 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 relative shrink-0">
                      {(() => {
                        const cover = bookForm.cover_url || "";
                        return cover.startsWith("from-") ? (
                          <div className={`w-full h-full bg-gradient-to-br ${cover}`} />
                        ) : (
                          <img src={cover} className="w-full h-full object-cover" alt="Preview da capa" />
                        );
                      })()}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="relative group cursor-pointer">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        required={!bookForm.cover_url}
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="border-2 border-dashed border-slate-800 group-hover:border-amber-500 rounded-xl p-3 flex items-center justify-center gap-2 text-slate-500 group-hover:text-amber-500 transition-colors bg-slate-950/60">
                        <Upload className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Selecionar Arquivo</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-850/60 rounded-xl p-3 text-slate-400 text-[10px] leading-relaxed font-semibold">
                  💡 <strong>Instruções de Dimensão:</strong> Para obter o melhor resultado no carrossel, faça upload de uma imagem com <strong>proporção 3:4</strong> (ex: <strong>600x800px</strong> ou <strong>900x1200px</strong>) de até 1.5MB.
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-455 text-slate-950 rounded-xl font-black uppercase tracking-wider text-xs border-0 shadow-md flex items-center justify-center gap-1.5 cursor-pointer pt-4.5 transition-colors"
              >
                <Save className="w-4 h-4 text-slate-950" />
                <span>Salvar Livro</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EVENT FORM MODAL */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative space-y-6">
            <button 
              onClick={() => setIsEventModalOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-850 rounded-lg text-slate-500 hover:text-white border-0 bg-transparent cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="text-left space-y-1">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                {selectedEvent ? "Editar Encontro" : "Cadastrar Novo Encontro"}
              </h3>
              <p className="text-[10px] text-slate-450 font-bold">Preencha os dados e anuncie o próximo evento na Agenda do site.</p>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-left text-xs font-bold text-slate-400">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Título do Evento</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Escola de Capacitação Profética (ECOP)"
                  className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Data do Evento</label>
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Horário</label>
                  <input
                    type="time"
                    required
                    value={eventForm.time}
                    onChange={(e) => setEventForm(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Localização / Formato</label>
                <input
                  type="text"
                  required
                  value={eventForm.location}
                  onChange={(e) => setEventForm(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Ex: Auditório Central, SP ou Online via Zoom"
                  className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Link de Compra / Inscrição (Eduzz/Hotmart)</label>
                <input
                  type="url"
                  value={eventForm.register_url}
                  onChange={(e) => setEventForm(prev => ({ ...prev, register_url: e.target.value }))}
                  placeholder="Ex: https://sun.eduzz.com/..."
                  className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 block">Descrição curta do Evento</label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Explique resumidamente o evento, pré-requisitos, etc..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-950 text-white font-semibold resize-none"
                />
              </div>

              <div className="flex gap-2.5 items-center select-none cursor-pointer" onClick={() => setEventForm(prev => ({ ...prev, is_featured: !prev.is_featured }))}>
                <input
                  type="checkbox"
                  checked={eventForm.is_featured}
                  readOnly
                  className="rounded border-slate-800 text-amber-500 focus:ring-amber-500 bg-slate-950"
                />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Destacar este evento no topo da lista</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-455 text-slate-950 rounded-xl font-black uppercase tracking-wider text-xs border-0 shadow-md flex items-center justify-center gap-1.5 cursor-pointer pt-4.5 transition-colors"
              >
                <Save className="w-4 h-4 text-slate-955" />
                <span>Salvar Encontro</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
