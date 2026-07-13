"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDB } from "@/context/DBContext";
import { Compass, BookOpen, ShieldCheck, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const { settings } = useDB();

  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) return null; // Admin has its own footer

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 font-sans select-none mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-slate-900 pb-8">
          
          {/* Main Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo-ecop-white.png"
                alt="ECOP Logo"
                width={120}
                height={36}
                loading="lazy"
                decoding="async"
                className="h-9 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm">
              Ministério de capacitação apostólica e ativação profética. Apoiando a igreja local no despertamento de dons e alinhamento com o destino divino de cada filho de Deus.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://www.instagram.com/ecop_escolaprofetica/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-lg transition-colors text-slate-400"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@ecop_escolaprofetica/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-lg transition-colors text-slate-400"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.52 3.545 12 3.545 12 3.545s-7.52 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.868.507 9.388.507 9.388.507s7.52 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">Acesso Rápido</h4>
            <nav className="flex flex-col gap-2 transition-all text-xs font-bold">
              <Link href="/#cursos" className="hover:text-white transition-colors">ECOP</Link>
              <Link href="/#cursos" className="hover:text-white transition-colors">Cursos</Link>
              <Link href="/caravana-israel" className="hover:text-white transition-colors text-amber-500">Caravana Israel 🇮🇱</Link>
              <Link href="/ebooks" className="hover:text-white transition-colors">E-books</Link>
              <Link href="/#mapa" className="hover:text-white transition-colors">Mapa Profético</Link>
              <Link href="/#eventos" className="hover:text-white transition-colors">Eventos</Link>
              <a 
                href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, "")}`} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-white transition-colors text-emerald-500"
              >
                WhatsApp
              </a>
            </nav>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">Contato</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-medium">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>{settings.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="text-[10px] leading-tight text-slate-500">Brasília - Brasil</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal area */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[10px] text-slate-650 font-bold gap-4">
          <span>&copy; {new Date().getFullYear()} Ministério Ricardo Ribeiro & ECOP. Todos os direitos reservados.</span>
          <span className="text-slate-550">
            Desenvolvido por{" "}
            <a 
              href="https://gdsdesign.site/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-500 hover:text-amber-450 hover:underline transition-colors"
            >
              GDS Design
            </a>
          </span>
          <span className="mt-2 sm:mt-0 flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-slate-400 cursor-pointer">Política de Privacidade</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
