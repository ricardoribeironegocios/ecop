"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useDB, Order, FormTemplate, FormField } from "@/context/DBContext";
import { useSearchParams } from "next/navigation";
import { Compass, CheckCircle2, AlertCircle, Sparkles, Send, Upload, Eye } from "lucide-react";
import Link from "next/link";

function FormContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const { orders, formTemplates, updateOrder, isLoading } = useDB();

  const [order, setOrder] = useState<Order | null>(null);
  const [template, setTemplate] = useState<FormTemplate | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load order and corresponding form layout on mount
  useEffect(() => {
    if (!isLoading) {
      const isDemo = !id || id.toLowerCase() === "demo";
      
      if (isDemo) {
        // Modo de demonstração / visualização rápida
        const urlPlan = searchParams.get("plan") === "premium" ? "premium" : "standard";
        const dummyOrder: Order = {
          id: "demo",
          client_name: "Visitante de Teste",
          client_phone: "(00) 99999-9999",
          plan: urlPlan,
          status: "formulario_pendente",
          created_at: new Date().toISOString(),
          due_date: new Date().toISOString(),
          form_responses: {}
        };
        setOrder(dummyOrder);
        
        const foundTemplate = formTemplates.find((t) => t.id === urlPlan);
        if (foundTemplate) {
          setTemplate(foundTemplate);
          
          const populated: Record<string, any> = {};
          foundTemplate.fields.forEach((field) => {
            if (field.active) {
              populated[field.label] = "";
            }
          });
          setAnswers(populated);
        }
      } else {
        const foundOrder = orders.find((o) => o.id === id);
        if (foundOrder) {
          setOrder(foundOrder);
          
          // Find template by plan name
          const foundTemplate = formTemplates.find((t) => t.id === foundOrder.plan);
          if (foundTemplate) {
            setTemplate(foundTemplate);
            
            // Pre-populate fields if already partially answered
            const initialAnswers = foundOrder.form_responses || {};
            const populated: Record<string, any> = {};
            foundTemplate.fields.forEach((field) => {
              if (field.active) {
                populated[field.label] = initialAnswers[field.label] || "";
              }
            });
            setAnswers(populated);
          }
        }
      }
    }
  }, [id, orders, formTemplates, isLoading, searchParams]);

  const handleInputChange = (label: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order || !template) return;

    // Validate required fields
    const missing = template.fields
      .filter((f) => f.required && f.active && !answers[f.label])
      .map((f) => f.label);

    if (missing.length > 0) {
      setErrorMsg(`Por favor, preencha os campos obrigatórios: ${missing.join(", ")}`);
      return;
    }

    // Save form responses
    if (order.id !== "demo") {
      updateOrder(order.id, {
        form_responses: answers,
        status: "em_producao"
      });
    }
    setIsSubmitted(true);
    setErrorMsg("");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Carregando formulário...</p>
        </div>
      </div>
    );
  }

  // Invalid or not found
  if (!id || !order || !template) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Formulário não encontrado</h1>
          <p className="text-slate-400 mb-6">
            Este link de formulário pode estar expirado ou ser inválido. 
            Entre em contato com o Ministério Ricardo Ribeiro para obter um novo link.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl transition-colors font-medium"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Formulário enviado!</h1>
          <p className="text-slate-400 mb-2">
            Seus dados foram recebidos com sucesso.
          </p>
          <p className="text-slate-400 mb-6">
            O Pr. Ricardo Ribeiro já está preparando o seu Mapa Profético. 
            Em breve você receberá o retorno pelo WhatsApp.
          </p>
          <div className="p-4 bg-amber-900/20 border border-amber-800/30 rounded-xl">
            <p className="text-amber-300 text-sm">
              📿 Enquanto aguarda, continue acompanhando nossos ensinamentos nas redes sociais.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const planLabel = order.plan === "premium" ? "Mapa Profético Premium" : "Mapa Profético Padrão";

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-white">Ministério Ricardo Ribeiro</h1>
              <p className="text-amber-400 text-sm">Formulário Profético</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-900/20 border border-amber-800/30 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">{planLabel}</span>
          </div>
          <p className="text-slate-400 max-w-md mx-auto">
            Olá, <span className="text-white font-medium">{order.client_name}</span>! 
            Preencha o formulário abaixo para que o Pr. Ricardo possa preparar seu Mapa Profético com precisão e profundidade.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {template.fields
            .filter((f) => f.active)
            .map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  {field.label}
                  {field.required && <span className="text-amber-400 ml-1">*</span>}
                </label>
                {field.type === "longtext" ? (
                  <textarea
                    value={answers[field.label] || ""}
                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none transition-all"
                    placeholder={`Escreva aqui...`}
                  />
                ) : field.type === "date" ? (
                  <input
                    type="date"
                    value={answers[field.label] || ""}
                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                ) : (
                  <input
                    type="text"
                    value={answers[field.label] || ""}
                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder={`Digite aqui...`}
                  />
                )}
              </div>
            ))}

          {errorMsg && (
            <div className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-800/30 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{errorMsg}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-amber-500/25"
          >
            <Send className="w-5 h-5" />
            Enviar Formulário
          </button>
        </form>

      </div>
    </div>
  );
}

export default function FormPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <FormContent />
    </Suspense>
  );
}
