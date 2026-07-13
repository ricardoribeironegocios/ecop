"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface FormField {
  id: string;
  type: "text" | "longtext" | "date" | "number" | "select" | "boolean" | "image";
  label: string;
  options?: string[];
  required: boolean;
  active: boolean;
}

export interface FormTemplate {
  id: "standard" | "premium";
  fields: FormField[];
}

export interface Order {
  id: string;
  client_name: string;
  client_phone: string;
  plan: "standard" | "premium";
  status: "pagamento_pendente" | "formulario_pendente" | "em_producao" | "pronto_entrega" | "entregue";
  form_responses?: Record<string, any>;
  pdf_url?: string;
  created_at: string;
  due_date: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  banner_url?: string;
  register_url?: string;
  is_featured: boolean;
}

export interface GlobalSettings {
  whatsapp_number: string;
  email: string;
  youtube_video_url: string;
  presentation_text: string;
}
export interface BookItem {
  id: string;
  title: string;
  price: string;
  cover_url: string;
  desc: string;
}

export interface ProductItem {
  id: string;
  title: string;
  lessons: number;
  checkout_url: string;
  image_url?: string;
  price_cash: number;
  price_installments: string;
  type: "individual" | "package";
  description?: string;
}

interface DBContextType {
  orders: Order[];
  formTemplates: FormTemplate[];
  events: EventItem[];
  settings: GlobalSettings;
  books: BookItem[];
  products: ProductItem[];
  createOrder: (order: Omit<Order, "id" | "created_at" | "due_date">) => Order;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  saveFormTemplate: (plan: "standard" | "premium", fields: FormField[]) => void;
  createEvent: (event: Omit<EventItem, "id">) => void;
  updateEvent: (id: string, updates: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  updateSettings: (updates: Partial<GlobalSettings>) => void;
  updateBook: (id: string, updates: Partial<BookItem>) => void;
  createBook: (book: Omit<BookItem, "id">) => void;
  deleteBook: (id: string) => void;
  createProduct: (product: Omit<ProductItem, "id">) => void;
  updateProduct: (id: string, updates: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;
  isLoading: boolean;
}

const DBContext = createContext<DBContextType | undefined>(undefined);

// Initial dynamic forms seed
const defaultFormTemplates: FormTemplate[] = [
  {
    id: "standard",
    fields: [
      { id: "std-1", type: "text", label: "Nome Completo", required: true, active: true },
      { id: "std-2", type: "date", label: "Data de Nascimento", required: true, active: true },
      { id: "std-3", type: "text", label: "Horário aproximado de Nascimento", required: false, active: true },
      { id: "std-4", type: "text", label: "Cidade e Estado/País de Nascimento", required: true, active: true },
      { id: "std-5", type: "longtext", label: "Fale brevemente sobre sua motivação para este Mapa Profético", required: false, active: true },
    ]
  },
  {
    id: "premium",
    fields: [
      { id: "pre-1", type: "text", label: "Nome Completo", required: true, active: true },
      { id: "pre-2", type: "date", label: "Data de Nascimento", required: true, active: true },
      { id: "pre-3", type: "text", label: "Horário exato de Nascimento", required: true, active: true },
      { id: "pre-4", type: "text", label: "Cidade e Estado/País de Nascimento", required: true, active: true },
      { id: "pre-5", type: "text", label: "Profissão / Área de Atuação", required: false, active: true },
      { id: "pre-6", type: "longtext", label: "Descreva sua maior busca espiritual, conflito ou dúvida ministerial atualmente", required: true, active: true },
      { id: "pre-7", type: "image", label: "Carregue uma Foto de Perfil (Opcional - para conexão ministerial)", required: false, active: true },
    ]
  }
];

// Initial mock events seed
const defaultEvents: EventItem[] = [
  {
    id: "evt-1",
    title: "Escola de Capacitação Profética (ECOP) - Imersão Presencial",
    date: "2026-08-15",
    time: "19:00",
    location: "Auditório Central, São Paulo - SP",
    description: "Três dias de ativação profética, ensino profundo da Palavra de Deus e despertamento ministerial. Garanta sua vaga com desconto antecipado.",
    is_featured: true,
    register_url: "https://sun.eduzz.com/exemplo-ecop"
  },
  {
    id: "evt-2",
    title: "Mentoria Especial: O Despertar das Nações",
    date: "2026-09-02",
    time: "20:00",
    location: "Online (Transmissão via Zoom)",
    description: "Encontro exclusivo para alunos formados na ECOP e portadores do Mapa Profético Avançado. Chaves de destravamento de destino.",
    is_featured: false,
    register_url: "https://sun.eduzz.com/exemplo-mentoria"
  }
];

// Initial default settings
const defaultSettings: GlobalSettings = {
  whatsapp_number: "+5521981116787",
  email: "contato@ministerioricardoribeiro.com",
  youtube_video_url: "https://www.youtube.com/embed/qW6xy31Cy_4", // Video de apresentação do Apóstolo
  presentation_text: "O Ministério Ricardo Ribeiro é dedicado a ativar o chamado de líderes, pastores e cristãos em todo o mundo. Através da Escola de Capacitação Profética (ECOP), ensinamos a voz de Deus de forma bíblica, séria e transformadora, ajudando você a alinhar seu destino profético com os céus."
};

const defaultBooks: BookItem[] = [
  { id: "bk-1", title: "Tribunal Celestial", price: "R$ 49,00", cover_url: "from-slate-900 via-amber-950 to-slate-950", desc: "Eu posso garantir que este é um dos mais completos manuais sobre tribunal celestial já escritos. Se você ama este assunto, mergulhe neste conteúdo." },
  { id: "bk-2", title: "Denunciando Demônios no Tribunal", price: "R$ 49,00", cover_url: "from-indigo-950 via-slate-900 to-indigo-900", desc: "Neste e-book você aprenderá a acessar o Tribunal Celestial e liberar decretos de denúncia contra os demônios que tanto nos prejudicam com legalidades contra nós." },
  { id: "bk-3", title: "Yeshua", price: "R$ 49,00", cover_url: "from-amber-900 via-amber-950 to-slate-900", desc: "Talvez você já saiba que o verdadeiro nome de nosso Senhor não é Jesus. Mas que tal um entendimento mais maduro e aprofundado sobre esta tão preciosa verdade?" },
  { id: "bk-4", title: "Segredo Profético das Letras", price: "R$ 49,00", cover_url: "from-emerald-950 via-teal-900 to-slate-950", desc: "Este é um livro sobre o alfabeto hebraico e o poder secreto carregado por cada uma das 22 letras. É um livro profético. Com ele você poderá saber os segredos das letras de seu nome." },
  { id: "bk-5", title: "Portal dos Sonhos", price: "R$ 49,00", cover_url: "from-purple-950 via-violet-900 to-slate-950", desc: "Muito mais do que saber o significado dos sonhos. Aqui eu te ensino a visitar os sonhos e navegar voluntariamente dentro deles, procurando segredos espirituais." },
  { id: "bk-6", title: "Poder Profético dos Nomes", price: "R$ 49,00", cover_url: "from-blue-950 via-slate-900 to-slate-950", desc: "Um dos assuntos que mais amo falar. Nomes são destinos. Deus mudou nomes para mudar destinos. Este possivelmente é o único livro que você vai encontrar com os segredos dos nomes." },
  { id: "bk-7", title: "O Mundo Espiritual", price: "R$ 49,00", cover_url: "from-slate-900 via-zinc-800 to-slate-950", desc: "O mundo espiritual existe e se move bem diante dos nossos olhos, e não vemos. Neste livro eu te ensino a identificar o agir sobrenatural em diversos aspectos de nosso dia a dia." },
  { id: "bk-8", title: "Asherá e Noel", price: "R$ 49,00", cover_url: "from-rose-950 via-red-900 to-slate-950", desc: "Um livro ousado, que entrega toda a verdade sobre Noel e Asherá, e a perversidade espiritual que se oculta atrás das festas natalinas." },
  { id: "bk-9", title: "O Casal e o Anjo", price: "R$ 49,00", cover_url: "from-cyan-950 via-blue-900 to-slate-950", desc: "Uma aventura tremenda envolvendo um casal e um anjo, que os treina para a maior batalha espiritual de suas vidas. Um livro emocionante e cheio de ensinamento." },
  { id: "bk-10", title: "Chaves de Davi", price: "R$ 49,00", cover_url: "from-amber-950 via-yellow-900 to-slate-950", desc: "Este livro já emocionou centenas de pessoas. Imagine um treinamento de todos os assuntos envolvidos no dia a dia apostólico e profético, extraídos da vida de davi?" },
  { id: "bk-11", title: "Calendário Bíblico vs Gregoriano", price: "R$ 49,00", cover_url: "from-slate-950 via-zinc-900 to-slate-900", desc: "Este é o manual de calendário bíblico e guerra contra o calendário gregoriano que utilizamos em nosso ministério. Adquirindo este material, você também terá acesso." },
  { id: "bk-12", title: "Manual de Atos Proféticos", price: "R$ 49,00", cover_url: "from-fuchsia-950 via-purple-900 to-slate-950", desc: "Atos Proféticos são orações teatralizadas, direcionadas por Deus, que quando realizadas podem fazer o céu tremer e o sobrenatural acontecer. Manual completo." }
];

const defaultProducts: ProductItem[] = [
  {
    id: "prod-1",
    title: "Curso Tribunal Celestial",
    lessons: 20,
    checkout_url: "https://chk.eduzz.com/6W4GEB5O0Z",
    image_url: "",
    price_cash: 97,
    price_installments: "12x R$ 10,03",
    type: "individual",
    description: "Aprenda a operar no âmbito legal dos céus e a revogar decretos contrários ao seu destino."
  },
  {
    id: "prod-2",
    title: "Curso Oração em Línguas",
    lessons: 16,
    checkout_url: "https://chk.eduzz.com/KW8Z6QD201",
    image_url: "",
    price_cash: 97,
    price_installments: "12x R$ 10,03",
    type: "individual",
    description: "Mergulhe no mistério do falar em línguas e ative uma comunicação de nível profético com o Pai."
  },
  {
    id: "prod-3",
    title: "Curso de Ministério dos Anjos",
    lessons: 8,
    checkout_url: "https://chk.eduzz.com/89AX7G180D",
    image_url: "",
    price_cash: 97,
    price_installments: "12x R$ 10,03",
    type: "individual",
    description: "Entenda o serviço e a ativação dos seres celestiais enviados para cooperar com os herdeiros da salvação."
  },
  {
    id: "prod-4",
    title: "Formação Cativeiros Espirituais",
    lessons: 12,
    checkout_url: "https://wa.me/5521981116787?text=Olá! Quero me inscrever na Formação Cativeiros Espirituais.",
    image_url: "",
    price_cash: 297,
    price_installments: "12x R$ 30,72",
    type: "individual",
    description: "Identifique e desmonte as legalidades que prendem famílias, finanças e ministérios em prisões espirituais."
  },
  {
    id: "prod-5",
    title: "Curso Avançado de Libertação Individual",
    lessons: 26,
    checkout_url: "https://wa.me/5521981116787?text=Olá! Quero me inscrever no Curso Avançado de Libertação Individual.",
    image_url: "",
    price_cash: 297,
    price_installments: "12x R$ 30,72",
    type: "individual",
    description: "Um guia prático e teológico passo a passo para libertação e cura interior profunda."
  },
  {
    id: "prod-6",
    title: "Universidade Profética VIP",
    lessons: 150,
    checkout_url: "https://chk.eduzz.com/797ZDYPA0E",
    image_url: "",
    price_cash: 297,
    price_installments: "12x R$ 30,72",
    type: "package",
    description: "O pacote completo e vitalício com acesso a todos os 12 cursos proféticos e lives exclusivas."
  }
];

export const DBProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [formTemplates, setFormTemplates] = useState<FormTemplate[]>(defaultFormTemplates);
  const [events, setEvents] = useState<EventItem[]>(defaultEvents);
  const [settings, setSettings] = useState<GlobalSettings>(defaultSettings);
  const [books, setBooks] = useState<BookItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize DB from localStorage (single source of truth fallback) and load from Supabase
  useEffect(() => {
    async function loadSupabaseData() {
      try {
        // Load Settings
        const { data: setD } = await supabase.from("mr_settings").select("*");
        if (setD && setD.length > 0) {
          const parsed = setD[0];
          const newSettings = {
            whatsapp_number: parsed.whatsapp_number,
            email: parsed.email,
            youtube_video_url: parsed.youtube_video_url,
            presentation_text: parsed.presentation_text
          };
          setSettings(newSettings);
          localStorage.setItem("mr_settings", JSON.stringify(newSettings));
        }

        // Load Books
        const { data: bD } = await supabase.from("mr_books").select("*").order("title", { ascending: true });
        if (bD) {
          if (bD.length > 0) {
            setBooks(bD);
            localStorage.setItem("mr_books", JSON.stringify(bD));
          } else {
            // Seed Supabase with defaultBooks if database is empty
            const { error: seedErr } = await supabase.from("mr_books").insert(defaultBooks);
            if (!seedErr) {
              setBooks(defaultBooks);
              localStorage.setItem("mr_books", JSON.stringify(defaultBooks));
            } else {
              console.error("Failed to seed default books to Supabase:", seedErr);
            }
          }
        }

        // Load Events
        const { data: eD } = await supabase.from("mr_events").select("*");
        if (eD) {
          setEvents(eD);
          localStorage.setItem("mr_events", JSON.stringify(eD));
        }

        // Load Orders
        const { data: oD } = await supabase.from("mr_orders").select("*");
        if (oD) {
          setOrders(oD);
          localStorage.setItem("mr_orders", JSON.stringify(oD));
        }

        // Load Templates
        const { data: tD } = await supabase.from("mr_form_templates").select("*");
        if (tD && tD.length > 0) {
          const formatted = tD.map((item: any) => ({
            id: item.id,
            fields: Array.isArray(item.fields) ? item.fields : JSON.parse(item.fields)
          }));
          setFormTemplates(formatted);
          localStorage.setItem("mr_templates", JSON.stringify(formatted));
        }

        // Load Products
        const { data: pD } = await supabase.from("mr_products").select("*").order("title", { ascending: true });
        if (pD && pD.length > 0) {
          setProducts(pD);
          localStorage.setItem("mr_products", JSON.stringify(pD));
        }
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to local storage.", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (typeof window !== "undefined") {
      const storedOrders = localStorage.getItem("mr_orders");
      const storedTemplates = localStorage.getItem("mr_templates");
      const storedEvents = localStorage.getItem("mr_events");
      const storedSettings = localStorage.getItem("mr_settings");
      const storedBooks = localStorage.getItem("mr_books");

      if (storedOrders) {
        try { setOrders(JSON.parse(storedOrders)); } catch (e) {}
      } else {
        // Seed mock orders
        const mockOrders: Order[] = [
          {
            id: "ord-1",
            client_name: "Guilherme Santos",
            client_phone: "+5545999887766",
            plan: "premium",
            status: "formulario_pendente",
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            due_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: "ord-2",
            client_name: "Maria Eduarda",
            client_phone: "+5511988776655",
            plan: "standard",
            status: "em_producao",
            form_responses: {
              "Nome Completo": "Maria Eduarda de Souza",
              "Data de Nascimento": "1994-05-12",
              "Horário aproximado de Nascimento": "Por volta das 14h",
              "Cidade e Estado/País de Nascimento": "Belo Horizonte - MG",
              "Fale brevemente sobre sua motivação para este Mapa Profético": "Gostaria de entender melhor a direção ministerial para a minha família."
            },
            created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: "ord-3",
            client_name: "Pastor Antônio Lima",
            client_phone: "+5521977665544",
            plan: "premium",
            status: "pagamento_pendente",
            created_at: new Date(Date.now()).toISOString(),
            due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
        setOrders(mockOrders);
        localStorage.setItem("mr_orders", JSON.stringify(mockOrders));
      }

      if (storedTemplates) {
        try { setFormTemplates(JSON.parse(storedTemplates)); } catch (e) {}
      } else {
        localStorage.setItem("mr_templates", JSON.stringify(defaultFormTemplates));
      }

      if (storedEvents) {
        try { setEvents(JSON.parse(storedEvents)); } catch (e) {}
      } else {
        localStorage.setItem("mr_events", JSON.stringify(defaultEvents));
      }

      if (storedSettings) {
        try {
          const parsed = JSON.parse(storedSettings);
          if (parsed.youtube_video_url === "https://www.youtube.com/embed/dQw4w9WgXcQ") {
            parsed.youtube_video_url = "https://www.youtube.com/embed/qW6xy31Cy_4";
            localStorage.setItem("mr_settings", JSON.stringify(parsed));
          }
          setSettings(parsed);
        } catch (e) {}
      } else {
        localStorage.setItem("mr_settings", JSON.stringify(defaultSettings));
      }

      if (storedBooks) {
        try { 
          const parsed = JSON.parse(storedBooks);
          setBooks(parsed);
        } catch (e) {
          setBooks(defaultBooks);
          localStorage.setItem("mr_books", JSON.stringify(defaultBooks));
        }
      } else {
        setBooks(defaultBooks);
        localStorage.setItem("mr_books", JSON.stringify(defaultBooks));
      }

      const storedProducts = localStorage.getItem("mr_products");
      if (storedProducts) {
        try {
          setProducts(JSON.parse(storedProducts));
        } catch (e) {
          setProducts(defaultProducts);
          localStorage.setItem("mr_products", JSON.stringify(defaultProducts));
        }
      } else {
        setProducts(defaultProducts);
        localStorage.setItem("mr_products", JSON.stringify(defaultProducts));
      }

      // Sync from Supabase
      loadSupabaseData();
    }
  }, []);

  // Helpers to persist values
  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem("mr_orders", JSON.stringify(updated));
  };

  const saveEvents = (updated: EventItem[]) => {
    setEvents(updated);
    localStorage.setItem("mr_events", JSON.stringify(updated));
  };

  // CRUD Implementations
  const createOrder = (orderData: Omit<Order, "id" | "created_at" | "due_date">) => {
    const id = "ord-" + Math.random().toString(36).substring(2, 9);
    const created_at = new Date().toISOString();
    const due_date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    
    const newOrder: Order = {
      ...orderData,
      id,
      created_at,
      due_date
    };

    saveOrders([...orders, newOrder]);

    // Supabase background sync
    supabase.from("mr_orders").insert([newOrder]).then(({ error }) => {
      if (error) console.error("Error syncing createOrder to Supabase:", error);
    });

    return newOrder;
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, ...updates } : o));
    saveOrders(updated);

    // Supabase background sync
    supabase.from("mr_orders").update(updates).eq("id", id).then(({ error }) => {
      if (error) console.error("Error syncing updateOrder to Supabase:", error);
    });
  };

  const deleteOrder = (id: string) => {
    const updated = orders.filter((o) => o.id !== id);
    saveOrders(updated);

    // Supabase background sync
    supabase.from("mr_orders").delete().eq("id", id).then(({ error }) => {
      if (error) console.error("Error syncing deleteOrder to Supabase:", error);
    });
  };

  const saveFormTemplate = (plan: "standard" | "premium", fields: FormField[]) => {
    const updated = formTemplates.map((t) => (t.id === plan ? { ...t, fields } : t));
    setFormTemplates(updated);
    localStorage.setItem("mr_templates", JSON.stringify(updated));

    // Supabase background sync
    supabase.from("mr_form_templates").upsert([{ id: plan, fields }]).then(({ error }) => {
      if (error) console.error("Error syncing saveFormTemplate to Supabase:", error);
    });
  };

  const createEvent = (evtData: Omit<EventItem, "id">) => {
    const id = "evt-" + Math.random().toString(36).substring(2, 9);
    const newEvent: EventItem = { ...evtData, id };
    const updated = [...events, newEvent];
    saveEvents(updated);

    // Supabase background sync
    supabase.from("mr_events").insert([newEvent]).then(({ error }) => {
      if (error) console.error("Error syncing createEvent to Supabase:", error);
    });
  };

  const updateEvent = (id: string, updates: Partial<EventItem>) => {
    const updated = events.map((e) => (e.id === id ? { ...e, ...updates } : e));
    saveEvents(updated);

    // Supabase background sync
    supabase.from("mr_events").update(updates).eq("id", id).then(({ error }) => {
      if (error) console.error("Error syncing updateEvent to Supabase:", error);
    });
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    saveEvents(updated);

    // Supabase background sync
    supabase.from("mr_events").delete().eq("id", id).then(({ error }) => {
      if (error) console.error("Error syncing deleteEvent to Supabase:", error);
    });
  };

  const updateSettings = (updates: Partial<GlobalSettings>) => {
    const updated = { ...settings, ...updates };
    setSettings(updated);
    localStorage.setItem("mr_settings", JSON.stringify(updated));

    // Supabase background sync
    supabase.from("mr_settings").upsert([{ id: 1, ...updated }]).then(({ error }) => {
      if (error) console.error("Error syncing updateSettings to Supabase:", error);
    });
  };

  const saveBooks = (updated: BookItem[]) => {
    setBooks(updated);
    // Remove strings Base64 gigantes do localStorage para evitar QuotaExceededError (limite de 5MB)
    const cleaned = updated.map((b) => ({
      ...b,
      cover_url: b.cover_url && b.cover_url.startsWith("data:") ? "" : b.cover_url,
    }));
    localStorage.setItem("mr_books", JSON.stringify(cleaned));
  };

  const updateBook = (id: string, updates: Partial<BookItem>) => {
    const updated = books.map((b) => (b.id === id ? { ...b, ...updates } : b));
    saveBooks(updated);

    // Supabase background sync
    supabase.from("mr_books").update(updates).eq("id", id).then(({ error }) => {
      if (error) console.error("Error syncing updateBook to Supabase:", error);
    });
  };

  const createBook = (bookData: Omit<BookItem, "id">) => {
    const id = "bk-" + Math.random().toString(36).substring(2, 9);
    const newBook: BookItem = { ...bookData, id };
    const updated = [...books, newBook];
    saveBooks(updated);

    // Supabase background sync
    supabase.from("mr_books").insert([newBook]).then(({ error }) => {
      if (error) console.error("Error syncing createBook to Supabase:", error);
    });
  };

  const deleteBook = (id: string) => {
    const updated = books.filter((b) => b.id !== id);
    saveBooks(updated);

    // Supabase background sync
    supabase.from("mr_books").delete().eq("id", id).then(({ error }) => {
      if (error) console.error("Error syncing deleteBook to Supabase:", error);
    });
  };

  const saveProducts = (updated: ProductItem[]) => {
    setProducts(updated);
    // Remove strings Base64 gigantes do localStorage para evitar QuotaExceededError (limite de 5MB)
    const cleaned = updated.map((p) => ({
      ...p,
      image_url: p.image_url && p.image_url.startsWith("data:") ? "" : p.image_url,
    }));
    localStorage.setItem("mr_products", JSON.stringify(cleaned));
  };

  const createProduct = (prodData: Omit<ProductItem, "id">) => {
    const id = "prod-" + Math.random().toString(36).substring(2, 9);
    const newProduct: ProductItem = { ...prodData, id };
    const updated = [...products, newProduct];
    saveProducts(updated);

    // Supabase background sync
    supabase.from("mr_products").insert([newProduct]).then(({ error }) => {
      if (error) console.error("Error syncing createProduct to Supabase:", error);
    });
  };

  const updateProduct = (id: string, updates: Partial<ProductItem>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveProducts(updated);

    // Supabase background sync
    supabase.from("mr_products").update(updates).eq("id", id).then(({ error }) => {
      if (error) console.error("Error syncing updateProduct to Supabase:", error);
    });
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);

    // Supabase background sync
    supabase.from("mr_products").delete().eq("id", id).then(({ error }) => {
      if (error) console.error("Error syncing deleteProduct to Supabase:", error);
    });
  };

  return (
    <DBContext.Provider
      value={{
        orders,
        formTemplates,
        events,
        settings,
        books,
        products,
        createOrder,
        updateOrder,
        deleteOrder,
        saveFormTemplate,
        createEvent,
        updateEvent,
        deleteEvent,
        updateSettings,
        updateBook,
        createBook,
        deleteBook,
        createProduct,
        updateProduct,
        deleteProduct,
        isLoading
      }}
    >
      {children}
    </DBContext.Provider>
  );
};

export const useDB = () => {
  const context = useContext(DBContext);
  if (!context) {
    throw new Error("useDB must be used within a DBProvider");
  }
  return context;
};
