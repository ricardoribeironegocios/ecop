"use client";

import React, { useState } from "react";
import { useDB, ProductItem } from "@/context/DBContext";
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  ArrowUpRight, 
  Upload, 
  BookOpen, 
  FileText,
  X,
  HelpCircle,
  Hash,
  Link as LinkIcon,
  Tag,
  DollarSign
} from "lucide-react";

export default function AdminProductsPage() {
  const { products, createProduct, updateProduct, deleteProduct } = useDB();

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    lessons: 0,
    checkout_url: "",
    image_url: "",
    price_cash: 97,
    price_installments: "12x R$ 10,03",
    type: "individual" as "individual" | "package",
    description: "",
    destaque: false
  });

  const [uploading, setUploading] = useState(false);

  // Filter Products
  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query))
    );
  });

  // Handle opening modal for create or edit
  const openModal = (product: ProductItem | null = null) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        title: product.title,
        lessons: product.lessons,
        checkout_url: product.checkout_url,
        image_url: product.image_url || "",
        price_cash: product.price_cash,
        price_installments: product.price_installments,
        type: product.type,
        description: product.description || "",
        destaque: product.destaque || false
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        title: "",
        lessons: 0,
        checkout_url: "",
        image_url: "",
        price_cash: 97,
        price_installments: "12x R$ 10,03",
        type: "individual",
        description: "",
        destaque: false
      });
    }
    setIsModalOpen(true);
  };

  // Convert and compress uploaded file using HTML5 Canvas
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

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

        // Convert to WebP with 80% quality for optimal compression and quality
        const compressedBase64 = canvas.toDataURL("image/webp", 0.8);
        setFormData((prev) => ({ ...prev, image_url: compressedBase64 }));
        setUploading(false);
      };
      img.onerror = () => {
        setUploading(false);
        alert("Erro ao processar imagem.");
      };
    };
    reader.onerror = () => {
      setUploading(false);
      alert("Erro ao ler arquivo.");
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.checkout_url) return;

    const data = {
      title: formData.title,
      lessons: Number(formData.lessons),
      checkout_url: formData.checkout_url,
      image_url: formData.image_url,
      price_cash: Number(formData.price_cash),
      price_installments: formData.price_installments,
      type: formData.type,
      description: formData.description,
      destaque: formData.destaque
    };

    if (selectedProduct) {
      updateProduct(selectedProduct.id, data);
    } else {
      createProduct(data);
    }
    
    setIsModalOpen(false);
  };

  // Handle delete product
  const handleDelete = (id: string, name: string) => {
    if (confirm(`Deseja realmente remover o produto "${name}"?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="flex-1 p-6 sm:p-8 space-y-8 select-none text-slate-100 bg-slate-950 font-sans min-h-screen">
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-900">
        <div className="space-y-1.5">
          <h1 className="text-xl font-black uppercase tracking-tight text-white">Produtos da Vitrine</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Gerencie os cursos e pacotes que serão oferecidos na página da Universidade Profética
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="px-4.5 py-3 bg-amber-500 hover:bg-amber-455 text-slate-955 font-black text-xs uppercase tracking-wider rounded-xl border-0 shadow-lg shadow-amber-500/5 transition-all flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Produto</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
          <Search className="w-4.5 h-4.5" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar produto por nome, tipo ou descrição..."
          className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl focus:outline-none text-xs text-white placeholder-slate-500 font-medium"
        />
      </div>

      {/* Grid of existing products */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-4"
          >
            {/* Visual Cover Preview */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden relative border border-slate-800 bg-slate-950 flex items-center justify-center">
              {product.destaque && (
                <span className="absolute top-3 left-3 text-[8px] font-black uppercase bg-amber-500 text-white px-2 py-0.5 rounded-md border border-amber-400/30 z-10 shadow-sm">
                  ★ Destaque
                </span>
              )}
              {product.image_url ? (
                <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${product.type === "package" ? "from-purple-950 via-slate-900 to-indigo-950" : "from-slate-900 via-amber-950/40 to-slate-950"} p-4 flex flex-col justify-between`}>
                  <span className="text-[8px] font-black uppercase text-amber-500/80 tracking-widest bg-amber-500/5 border border-amber-500/20 px-2 py-0.5 rounded w-fit">
                    {product.type === "package" ? "Pacote Completo" : "Curso Individual"}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-white leading-tight uppercase font-serif tracking-tight">{product.title}</h4>
                    <p className="text-[7px] text-slate-500 uppercase font-black tracking-widest">{product.lessons} Aulas</p>
                  </div>
                </div>
              )}

              <span className="absolute top-3 right-3 text-[10px] font-black font-mono text-amber-500 bg-slate-950/80 border border-slate-800/80 px-2 py-0.5 rounded-lg shadow-sm">
                R$ {product.price_cash}
              </span>
            </div>

            {/* Product description and title */}
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-black text-white uppercase tracking-tight line-clamp-1">{product.title}</h3>
                <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full shrink-0">
                  {product.lessons} Aulas
                </span>
              </div>
              <p className="text-[10px] text-slate-450 font-medium leading-relaxed line-clamp-2">
                {product.description || "Nenhuma descrição fornecida."}
              </p>
              <div className="text-[10px] font-bold text-slate-300">
                Parcelas: <span className="text-amber-500 font-mono">{product.price_installments}</span>
              </div>
            </div>

            {/* Actions panel */}
            <div className="flex gap-2 pt-4 border-t border-slate-800/80">
              <button
                onClick={() => openModal(product)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer border-0 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar</span>
              </button>
              <button
                onClick={() => handleDelete(product.id, product.title)}
                className="py-2.5 px-3 bg-red-950/30 hover:bg-red-950/70 border border-red-900/40 text-red-400 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <a
                href={product.checkout_url}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl flex items-center justify-center transition-colors border-0"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500 space-y-2 border border-dashed border-slate-800 rounded-3xl">
            <HelpCircle className="w-8 h-8 text-slate-650 mx-auto" />
            <p className="text-xs font-bold uppercase tracking-wider">Nenhum produto encontrado</p>
            <p className="text-[10px] font-medium text-slate-550">Tente buscar por outro termo ou cadastre um novo produto.</p>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-fade-in max-h-[90vh] flex flex-col justify-between">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/80 sticky top-0 z-10">
              <h3 className="text-sm font-black uppercase text-white tracking-wide">
                {selectedProduct ? "Editar Produto" : "Novo Produto da Vitrine"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border-0 bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Scrollable */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-left">
              {/* Product Title */}
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Nome do Curso / Produto</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Curso Especial de Batalha Espiritual"
                  className="w-full px-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl focus:outline-none text-xs text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Product Type */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Tipo do Produto</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as "individual" | "package" }))}
                    className="w-full px-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl focus:outline-none text-xs text-white font-bold cursor-pointer"
                  >
                    <option value="individual">Curso Individual</option>
                    <option value="package">Pacote (Universidade VIP)</option>
                  </select>
                </div>

                {/* Lessons Quantity */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5" />
                    <span>Quantidade de Aulas</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.lessons}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lessons: Number(e.target.value) }))}
                    placeholder="Ex: 12"
                    className="w-full px-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl focus:outline-none text-xs text-white font-semibold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Cash Price */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Preço à Vista (R$)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.price_cash}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price_cash: Number(e.target.value) }))}
                    placeholder="Ex: 97"
                    className="w-full px-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl focus:outline-none text-xs text-white font-semibold font-mono"
                  />
                </div>

                {/* Installments Price String */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Mensalidade / Parcelado</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price_installments}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price_installments: e.target.value }))}
                    placeholder="Ex: 12x R$ 10,03"
                    className="w-full px-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl focus:outline-none text-xs text-white font-bold"
                  />
                </div>
              </div>

              {/* Checkout URL */}
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block flex items-center gap-1">
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Link de Checkout (Eduzz/WhatsApp)</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.checkout_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, checkout_url: e.target.value }))}
                  placeholder="https://chk.eduzz.com/..."
                  className="w-full px-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl focus:outline-none text-xs text-white font-medium"
                />
              </div>

              {/* Product Cover Image Upload / URL */}
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Foto do Produto / Curso</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={formData.image_url.startsWith("data:") ? "Foto Carregada (Base64)" : formData.image_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://suaimagem.com/foto.png ou use o botão de upload"
                    className="flex-1 px-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl focus:outline-none text-xs text-white font-medium truncate"
                  />
                  <div className="relative shrink-0">
                    <input
                      type="file"
                      accept="image/*"
                      id="modal-image-upload"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="modal-image-upload"
                      className="px-4 py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 border border-slate-700/80"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{uploading ? "Carregando..." : "Upload"}</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Descrição Curta</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Escreva um resumo do que é ensinado neste curso..."
                  className="w-full px-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl focus:outline-none text-xs text-white font-medium resize-none leading-relaxed"
                />
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl">
                <div className="space-y-1 text-left">
                  <label className="text-[10px] uppercase tracking-wider text-slate-350 font-black block">Destacar este curso na Página Inicial</label>
                  <p className="text-[9px] text-slate-500 font-bold leading-normal">
                    {formData.destaque 
                      ? "★ Curso em Destaque Atual - Aparecerá na home page." 
                      : "Defina este curso como a atração principal."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, destaque: !prev.destaque }))}
                  className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none relative border-0 cursor-pointer ${
                    formData.destaque ? "bg-amber-500" : "bg-slate-800"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                      formData.destaque ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-800 flex gap-3 justify-end sticky bottom-0 z-10 bg-slate-900/80">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4.5 py-3 bg-slate-850 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-black uppercase tracking-wider border-0 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-455 text-slate-955 rounded-xl text-xs font-black uppercase tracking-wider border-0 shadow-lg shadow-amber-500/5 cursor-pointer active:scale-98 transition-all"
                >
                  {selectedProduct ? "Salvar Alterações" : "Cadastrar Curso"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
