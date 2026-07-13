"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, BookOpen, Compass, Calendar, ShieldCheck } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Início", href: "/#home", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: "Cursos Online", href: "/cursos-online", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: "Caravana", href: "/caravana-israel", icon: <Compass className="w-3.5 h-3.5" /> },
    { label: "Biblioteca", href: "/biblioteca", icon: <Compass className="w-3.5 h-3.5" /> },
    { label: "Agenda", href: "/#eventos", icon: <Calendar className="w-3.5 h-3.5" /> }
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) return null; // Admin has its own navigation/sidebar

  return (
    <header className="sticky top-0 z-50 w-full bg-white/75 border-b border-slate-100 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo / Branding */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo-ecop.png"
              alt="ECOP Logo"
              width={160}
              height={56}
              priority
              fetchPriority="high"
              decoding="async"
              className="h-14 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors uppercase tracking-wider flex items-center gap-1.5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Toolbar buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin"
              className="text-xs font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 px-4.5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>Painel</span>
            </Link>
            <Link
              href="/#mapa"
              className="text-xs font-black text-white bg-brand-gradient border-0 px-4.5 py-2.5 rounded-xl transition-all shadow-md shadow-amber-950/10 uppercase tracking-wider hover:scale-[1.02]"
            >
              Mapa Profético
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200/50"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-6 space-y-6 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={handleLinkClick}
                className="text-sm font-bold text-slate-700 hover:text-slate-950 transition-colors flex items-center gap-2"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-4">
            <Link
              href="/admin"
              onClick={handleLinkClick}
              className="w-full text-center text-sm font-bold text-slate-700 border border-slate-200 py-3 rounded-xl flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>Acessar Painel</span>
            </Link>
            <Link
              href="/#mapa"
              onClick={handleLinkClick}
              className="w-full text-center text-sm font-extrabold text-white bg-brand-gradient py-3 rounded-xl uppercase tracking-wider"
            >
              Solicitar Mapa Profético
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
