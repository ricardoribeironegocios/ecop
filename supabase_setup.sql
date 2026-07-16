-- Supabase Schema for Ricardo Ribeiro & ECOP Website
-- Run this in your Supabase SQL Editor to initialize the tables.
-- These tables are prefixed with 'mr_' to avoid mixing with muebles-py or other projects.

-- 1. Table for Global Settings
CREATE TABLE IF NOT EXISTS mr_settings (
  id INT PRIMARY KEY DEFAULT 1,
  whatsapp_number TEXT NOT NULL DEFAULT '+5521981116787',
  email TEXT NOT NULL DEFAULT 'suporte@ministerioricardoribeiro.com.br',
  youtube_video_url TEXT NOT NULL DEFAULT 'https://www.youtube.com/embed/qW6xy31Cy_4',
  presentation_text TEXT NOT NULL DEFAULT 'O Ministério Ricardo Ribeiro é dedicado a ativar o chamado de líderes...',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default settings row if not exists
INSERT INTO mr_settings (id, whatsapp_number, email, youtube_video_url, presentation_text)
VALUES (1, '+5521981116787', 'suporte@ministerioricardoribeiro.com.br', 'https://www.youtube.com/embed/qW6xy31Cy_4', 'O Ministério Ricardo Ribeiro é dedicado a ativar o chamado de líderes, pastores e cristãos em todo o mundo. Através da Escola de Capacitação Profética (ECOP), ensinamos a voz de Deus de forma bíblica, séria e transformadora, ajudando você a alinhar seu destino profético com os céus.')
ON CONFLICT (id) DO NOTHING;

-- 2. Table for E-books
CREATE TABLE IF NOT EXISTS mr_books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  cover_url TEXT NOT NULL,
  desc TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default books
INSERT INTO mr_books (id, title, price, cover_url, desc) VALUES
('bk-1', 'Tribunal Celestial', 'R$ 49,00', 'from-slate-900 via-amber-950 to-slate-950', 'Eu posso garantir que este é um dos mais completos manuais sobre tribunal celestial já escritos. Se você ama este assunto, mergulhe neste conteúdo.'),
('bk-2', 'Denunciando Demônios no Tribunal', 'R$ 49,00', 'from-indigo-950 via-slate-900 to-indigo-900', 'Neste e-book você aprenderá a acessar o Tribunal Celestial e liberar decretos de denúncia contra os demônios que tanto nos prejudicam com legalidades contra nós.'),
('bk-3', 'Yeshua', 'R$ 49,00', 'from-amber-900 via-amber-950 to-slate-900', 'Talvez você já saiba que o verdadeiro nome de nosso Senhor não é Jesus. Mas que tal um entendimento mais maduro e aprofundado sobre esta tão preciosa verdade?'),
('bk-4', 'Segredo Profético das Letras', 'R$ 49,00', 'from-emerald-950 via-teal-900 to-slate-950', 'Este é um livro sobre o alfabeto hebraico e o poder secreto carregado por cada uma das 22 letras. É um livro profético. Com ele você poderá saber os segredos das letras de seu nome.'),
('bk-5', 'Portal dos Sonhos', 'R$ 49,00', 'from-purple-950 via-violet-900 to-slate-950', 'Muito mais do que saber o significado dos sonhos. Aqui eu te ensino a visitar os sonhos e navegar voluntariamente dentro deles, procurando segredos espirituais.'),
('bk-6', 'Poder Profético dos Nomes', 'R$ 49,00', 'from-blue-950 via-slate-900 to-slate-950', 'Um dos assuntos que mais amo falar. Nomes são destinos. Deus mudou nomes para mudar destinos. Este possivelmente é o único livro que você vai encontrar com os segredos dos nomes.'),
('bk-7', 'O Mundo Espiritual', 'R$ 49,00', 'from-slate-900 via-zinc-800 to-slate-950', 'O mundo espiritual existe e se move bem diante dos nossos olhos, e não vemos. Neste livro eu te ensino a identificar o agir sobrenatural em diversos aspectos de nosso dia a dia.'),
('bk-8', 'Asherá e Noel', 'R$ 49,00', 'from-rose-950 via-red-900 to-slate-950', 'Um livro ousado, que entrega toda a verdade sobre Noel e Asherá, e a perversidade espiritual que se oculta atrás das festas natalinas.'),
('bk-9', 'O Casal e o Anjo', 'R$ 49,00', 'from-cyan-950 via-blue-900 to-slate-950', 'Uma aventura tremenda envolvendo um casal e um anjo, que os treina para a maior batalha espiritual de suas vidas. Um livro emocionante e cheio de ensinamento.'),
('bk-10', 'Chaves de Davi', 'R$ 49,00', 'from-amber-950 via-yellow-900 to-slate-950', 'Este livro já emocionou centenas de pessoas. Imagine um treinamento de todos os assuntos envolvidos no dia a dia apostólico e profético, extraídos da vida de davi?'),
('bk-11', 'Calendário Bíblico vs Gregoriano', 'R$ 49,00', 'from-slate-950 via-zinc-900 to-slate-900', 'Este é o manual de calendário bíblico e guerra contra o calendário gregoriano que utilizamos em nosso ministério. Adquirindo este material, você também terá acesso.'),
('bk-12', 'Manual de Atos Proféticos', 'R$ 49,00', 'from-fuchsia-950 via-purple-900 to-slate-950', 'Atos Proféticos são orações teatralizadas, direcionadas por Deus, que quando realizadas podem fazer o céu tremer e o sobrenatural acontecer. Manual completo.')
ON CONFLICT (id) DO NOTHING;

-- 3. Table for Events / Agenda
CREATE TABLE IF NOT EXISTS mr_events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  banner_url TEXT,
  register_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default events
INSERT INTO mr_events (id, title, date, time, location, description, register_url, is_featured) VALUES
('evt-1', 'Escola Capacitação Profética - Módulo Avançado', '18 a 20 de Julho', '19:30', 'Auditório Central, Brasília - DF', 'Três dias de ativação ministerial intensiva com foco no mover profético, discernimento espiritual e mapeamento estratégico de territórios.', 'https://chk.eduzz.com/797ZDYPA0E', true),
('evt-2', 'Seminário de Libertação e Quebra de Vínculos', '08 de Agosto', '14:00', 'Auditório Brasília - Centro', 'Estudo bíblico e ministração focados na libertação espiritual avançada de cativeiros de alma e quebra de legalidades hereditárias.', 'https://chk.eduzz.com/o4ygtvo4', false)
ON CONFLICT (id) DO NOTHING;

-- 4. Table for Orders / Leads
CREATE TABLE IF NOT EXISTS mr_orders (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  plan TEXT NOT NULL,
  status TEXT NOT NULL,
  form_responses JSONB,
  pdf_url TEXT,
  due_date TEXT,
  created_at TEXT NOT NULL
);

-- 5. Table for Dynamic Form Templates
CREATE TABLE IF NOT EXISTS mr_form_templates (
  id TEXT PRIMARY KEY,
  fields JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default templates
INSERT INTO mr_form_templates (id, fields) VALUES
('standard', '[
  {"id": "std-1", "type": "text", "label": "Nome Completo", "required": true, "active": true},
  {"id": "std-2", "type": "date", "label": "Data de Nascimento", "required": true, "active": true},
  {"id": "std-3", "type": "text", "label": "Horário aproximado de Nascimento", "required": false, "active": true},
  {"id": "std-4", "type": "text", "label": "Cidade e Estado/País de Nascimento", "required": true, "active": true},
  {"id": "std-5", "type": "longtext", "label": "Fale brevemente sobre sua motivação para este Mapa Profético", "required": false, "active": true}
]'),
('premium', '[
  {"id": "pre-1", "type": "text", "label": "Nome Completo", "required": true, "active": true},
  {"id": "pre-2", "type": "date", "label": "Data de Nascimento", "required": true, "active": true},
  {"id": "pre-3", "type": "text", "label": "Horário exato de Nascimento", "required": true, "active": true},
  {"id": "pre-4", "type": "text", "label": "Cidade e Estado/País de Nascimento", "required": true, "active": true},
  {"id": "pre-5", "type": "text", "label": "Profissão / Área de Atuação", "required": false, "active": true},
  {"id": "pre-6", "type": "longtext", "label": "Descreva sua maior busca espiritual, conflito ou dúvida ministerial atualmente", "required": true, "active": true}
]')
ON CONFLICT (id) DO NOTHING;

-- 6. Table for Showcase Products (Universidade Profética Vitrine)
CREATE TABLE IF NOT EXISTS mr_products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  lessons INT NOT NULL DEFAULT 0,
  checkout_url TEXT NOT NULL,
  image_url TEXT,
  price_cash NUMERIC NOT NULL,
  price_installments TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'individual', -- 'individual' or 'package'
  description TEXT,
  destaque BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default products
INSERT INTO mr_products (id, title, lessons, checkout_url, image_url, price_cash, price_installments, type, description) VALUES
('prod-1', 'Curso Tribunal Celestial', 20, 'https://chk.eduzz.com/6W4GEB5O0Z', '', 97.00, '12x R$ 10,03', 'individual', 'Aprenda a operar no âmbito legal dos céus e a revogar decretos contrários ao seu destino.'),
('prod-2', 'Curso Oração em Línguas', 16, 'https://chk.eduzz.com/KW8Z6QD201', '', 97.00, '12x R$ 10,03', 'individual', 'Mergulhe no mistério do falar em línguas e ative uma comunicação de nível profético com o Pai.'),
('prod-3', 'Curso de Ministério dos Anjos', 8, 'https://chk.eduzz.com/89AX7G180D', '', 97.00, '12x R$ 10,03', 'individual', 'Entenda o serviço e a ativação dos seres celestiais enviados para cooperar com os herdeiros da salvação.'),
('prod-4', 'Formação Cativeiros Espirituais', 12, 'https://wa.me/5521981116787?text=Olá! Quero me inscrever na Formação Cativeiros Espirituais.', '', 297.00, '12x R$ 30,72', 'individual', 'Identifique e desmonte as legalidades que prendem famílias, finanças e ministérios em prisões espirituais.'),
('prod-5', 'Curso Avançado de Libertação Individual', 26, 'https://wa.me/5521981116787?text=Olá! Quero me inscrever no Curso Avançado de Libertação Individual.', '', 297.00, '12x R$ 30,72', 'individual', 'Um guia prático e teológico passo a passo para libertação e cura interior profunda.'),
('prod-6', 'Universidade Profética VIP', 150, 'https://chk.eduzz.com/797ZDYPA0E', '', 297.00, '12x R$ 30,72', 'package', 'O pacote completo e vitalício com acesso a todos os 12 cursos proféticos e lives exclusivas.')
ON CONFLICT (id) DO NOTHING;

