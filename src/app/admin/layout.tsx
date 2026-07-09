"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  ArrowLeft, 
  Menu, 
  X, 
  ShieldAlert, 
  Sparkles, 
  Settings, 
  Eye, 
  EyeOff, 
  LogOut, 
  Lock,
  BookOpen
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("admin_authenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default password as requested: "admin123" or "ecop123" or "ricardo123"
    if (password === "admin123" || password === "ecop123" || password === "ricardo123") {
      localStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  const handleLogout = () => {
    if (confirm("Deseja realmente sair do painel administrativo?")) {
      localStorage.removeItem("admin_authenticated");
      setIsAuthenticated(false);
      setPassword("");
    }
  };

  const menuItems = [
    { label: "Painel Hoje", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Formulários do Mapa", href: "/admin/forms", icon: <FileText className="w-5 h-5" /> },
    { label: "Produtos da Vitrine", href: "/admin/products", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Configurações", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans text-xs uppercase tracking-widest font-black">
        <span>Autenticando...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 font-sans select-none relative overflow-hidden">
        {/* Visual gradients */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative z-10">
          <div className="text-center space-y-3">
            <span className="w-12 h-12 bg-amber-500 text-slate-950 rounded-2xl font-black flex items-center justify-center text-xl mx-auto shadow-lg shadow-amber-500/10">
              R
            </span>
            <div className="space-y-1">
              <h2 className="text-lg font-black tracking-tight uppercase text-white">Painel Administrativo</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Acesso Restrito ao Apóstolo & Equipe</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Digite a Senha de Acesso</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  required
                  className="w-full pl-3.5 pr-10 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl focus:outline-none text-white font-semibold text-center tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-0.5 rounded transition-colors bg-transparent border-0 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[10px] text-red-500 font-bold text-center leading-relaxed">
                ⚠️ {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-455 text-slate-955 font-black rounded-xl text-xs uppercase tracking-wider border-0 shadow-lg shadow-amber-500/5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              Entrar no Painel
            </button>
          </form>

          <div className="text-center pt-2">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-slate-400 font-bold uppercase tracking-wide transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Site Principal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row text-slate-100 font-sans">
      
      <header className="lg:hidden bg-slate-900 text-white px-4 py-4.5 flex items-center justify-between shadow-sm border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 bg-amber-500 text-slate-950 rounded-lg font-black flex items-center justify-center text-sm">R</span>
          <span className="text-xs font-black tracking-widest uppercase">Ricardo Admin</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 hover:bg-slate-800 rounded-lg text-white border-0 bg-transparent cursor-pointer"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex w-full bg-slate-950 relative min-h-screen">
        
        {/* Sidebar Container */}
        <aside
          className={`w-64 bg-slate-900 border-r border-slate-800 text-slate-100 flex-shrink-0 flex flex-col justify-between p-6 lg:sticky lg:top-0 lg:h-screen z-40 fixed inset-y-0 left-0 transform lg:transform-none transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="space-y-8">
            {/* Logo area */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 bg-amber-500 text-slate-950 rounded-lg font-black flex items-center justify-center text-lg">R</span>
                <div className="flex flex-col text-left">
                  <span className="font-black text-white tracking-wider uppercase text-xs">Ricardo</span>
                  <span className="text-[9px] text-amber-500 font-black uppercase tracking-widest leading-none">Painel ECOP</span>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white border-0 bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                      isActive
                        ? "bg-amber-500 text-slate-955 shadow-md shadow-amber-500/10 font-black"
                        : "hover:bg-slate-800 hover:text-white text-slate-400"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer controls */}
          <div className="border-t border-slate-800 pt-4 space-y-1.5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-500/10 hover:text-red-400 text-slate-400 transition-colors bg-transparent border-0 cursor-pointer text-left"
            >
              <LogOut className="w-4.5 h-4.5" />
              <span>Sair do Painel</span>
            </button>
            <Link
              href="/"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-white text-slate-400 transition-colors"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
              <span>Voltar ao Site</span>
            </Link>
          </div>
        </aside>

        {/* Sidebar Backdrop Overlay on Mobile */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 lg:hidden"
          />
        )}

        {/* Dynamic page container */}
        <main className="flex-1 overflow-x-hidden p-6 sm:p-8 lg:p-10 w-full relative">
          
          {/* Subtle background mesh */}
          <div className="absolute inset-0 z-0 opacity-[0.01] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className="relative z-10">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
