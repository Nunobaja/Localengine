import { useState, useRef, useEffect } from "react";
import { MessageCircle, Instagram, ChevronDown, Send, X, Loader2, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";
import type { Message } from "@/components/AIChatBox";

// ─── Business data object ────────────────────────────────────────────────────
const BUSINESS = {
  name: "Atelier Lumière",
  tagline: "Belleza de alto nivel en México",
  about:
    "Somos un espacio exclusivo dedicado a la transformación y el cuidado del cuerpo. Con más de 10 años de experiencia, nuestros especialistas combinan técnicas europeas con los mejores productos del mercado para resultados que hablan por sí solos.",
  instagramHandle: "atelierlumiere.mx",
  whatsappNumber: "5215512345678",
  heroImage:
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=860&q=80",
  galleryImages: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80",
    "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&q=80",
    "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&q=80",
  ],
  services: [
    {
      id: "facial",
      name: "Facial Signature",
      description: "Limpieza profunda + hidratación con ácido hialurónico",
      duration: "90 min",
      price: "desde $1,800",
      whatsappHint: "el Facial Signature",
    },
    {
      id: "masaje",
      name: "Masaje Relajante",
      description: "Aceites esenciales importados, técnica sueca personalizada",
      duration: "60 min",
      price: "desde $1,200",
      whatsappHint: "el Masaje Relajante",
    },
    {
      id: "depilacion",
      name: "Depilación con Cera",
      description: "Cera de arándano, sin irritación, duración hasta 4 semanas",
      duration: "45 min",
      price: "desde $650",
      whatsappHint: "la Depilación con Cera",
    },
    {
      id: "manos",
      name: "Manicure de Lujo",
      description: "Esmalte semipermanente + tratamiento de cutícula + masaje",
      duration: "75 min",
      price: "desde $780",
      whatsappHint: "el Manicure de Lujo",
    },
  ],
  chatSystemPrompt: `Eres la asistente virtual de Atelier Lumière, un spa y salón de belleza premium en México.
Responde siempre en español, con un tono cálido pero sofisticado.
Ayuda a los visitantes a conocer nuestros servicios, resolver dudas sobre precios, disponibilidad y cuidados.
Servicios: Facial Signature ($1,800+, 90 min), Masaje Relajante ($1,200+, 60 min), Depilación con Cera ($650+, 45 min), Manicure de Lujo ($780+, 75 min).
Si preguntan por citas, invítalos a escribirnos por WhatsApp.
Nunca inventes información que no tienes.`,
};

// ─── WhatsApp CTA helper ──────────────────────────────────────────────────────
function buildWhatsAppUrl(serviceHint?: string) {
  const base = `https://wa.me/${BUSINESS.whatsappNumber}`;
  const msg = serviceHint
    ? `Hola, me interesa información sobre ${serviceHint} en Atelier Lumière.`
    : `Hola, me gustaría agendar una cita en Atelier Lumière.`;
  return `${base}?text=${encodeURIComponent(msg)}`;
}

// ─── Section: Hero ────────────────────────────────────────────────────────────
function HeroSection({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section className="relative h-[70vh] min-h-[480px] flex flex-col items-center justify-end overflow-hidden">
      {/* background */}
      <img
        src={BUSINESS.heroImage}
        alt={BUSINESS.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-[#0f0d0b]/60 to-transparent" />

      {/* content */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 pb-12 text-center">
        <div className="w-16 h-[1px] bg-[#c9a96e] mb-1" />
        <h1 className="text-white font-serif text-4xl leading-tight tracking-wide">
          {BUSINESS.name}
        </h1>
        <p className="text-[#c9a96e] text-sm tracking-[0.18em] uppercase">
          {BUSINESS.tagline}
        </p>
        <button
          onClick={onCTAClick}
          className="mt-4 px-8 py-3 bg-[#c9a96e] text-[#0f0d0b] text-sm font-semibold tracking-[0.12em] uppercase rounded-none hover:bg-[#e2c08a] transition-colors"
        >
          Agendar cita
        </button>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <ChevronDown size={18} />
      </div>
    </section>
  );
}

// ─── Section: Services ────────────────────────────────────────────────────────
function ServicesSection({
  onServiceTap,
}: {
  onServiceTap: (service: (typeof BUSINESS.services)[number]) => void;
}) {
  return (
    <section className="px-5 py-12 bg-[#0f0d0b]">
      <div className="mb-8 text-center">
        <p className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase mb-2">
          Lo que ofrecemos
        </p>
        <h2 className="text-white font-serif text-2xl">Servicios</h2>
      </div>

      <div className="flex flex-col gap-3">
        {BUSINESS.services.map((svc) => (
          <button
            key={svc.id}
            onClick={() => onServiceTap(svc)}
            className="group text-left bg-[#1a1713] border border-[#2e2a24] rounded-sm px-5 py-4 hover:border-[#c9a96e]/60 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-white font-medium text-base group-hover:text-[#c9a96e] transition-colors">
                  {svc.name}
                </p>
                <p className="text-[#a09080] text-sm mt-1 leading-relaxed">
                  {svc.description}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[#c9a96e] text-sm font-semibold">{svc.price}</p>
                <p className="text-[#6b5f50] text-xs mt-0.5">{svc.duration}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-[#6b5f50] text-xs mt-5">
        Toca un servicio para agendar por WhatsApp
      </p>
    </section>
  );
}

// ─── Section: Gallery ────────────────────────────────────────────────────────
function GallerySection() {
  return (
    <section className="py-12 bg-[#13110e]">
      <div className="mb-8 text-center px-5">
        <p className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase mb-2">
          Resultados
        </p>
        <h2 className="text-white font-serif text-2xl">Galería</h2>
      </div>

      <div className="grid grid-cols-3 gap-0.5">
        {BUSINESS.galleryImages.map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden">
            <img
              src={src}
              alt={`Galería ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <a
          href={`https://www.instagram.com/${BUSINESS.instagramHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#c9a96e] text-sm tracking-wide hover:text-[#e2c08a] transition-colors"
        >
          <Instagram size={16} />
          @{BUSINESS.instagramHandle}
        </a>
      </div>
    </section>
  );
}

// ─── Section: About ───────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="px-6 py-14 bg-[#0f0d0b]">
      <div className="mb-6 text-center">
        <p className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase mb-2">
          Nuestra historia
        </p>
        <h2 className="text-white font-serif text-2xl">Nosotros</h2>
      </div>
      <div className="w-8 h-[1px] bg-[#c9a96e]/40 mx-auto mb-6" />
      <p className="text-[#a09080] text-sm leading-7 text-center">{BUSINESS.about}</p>
    </section>
  );
}

// ─── AI Chatbot drawer ────────────────────────────────────────────────────────
function ChatDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: BUSINESS.chatSystemPrompt },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.bioPage.chat.useMutation({
    onSuccess: (res) => {
      const content =
        typeof res.content === "string" ? res.content : JSON.stringify(res.content);
      setMessages((prev) => [...prev, { role: "assistant", content }]);
    },
  });

  const displayMessages = messages.filter((m) => m.role !== "system");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatMutation.isPending]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || chatMutation.isPending) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    chatMutation.mutate({ messages: next });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col transition-transform duration-300 ${
        open ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ background: "#13110e" }}
    >
      {/* header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2e2a24]">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#c9a96e]" />
          <span className="text-white text-sm font-medium tracking-wide">
            Asistente Lumière
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-[#6b5f50] hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">
        {displayMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center text-[#6b5f50]">
            <Sparkles size={32} className="opacity-30" />
            <p className="text-sm">
              ¿Tienes dudas sobre nuestros servicios? ¡Pregúntame!
            </p>
            <div className="flex flex-col gap-2 mt-2 w-full">
              {[
                "¿Cuánto cuesta el facial?",
                "¿Qué incluye el masaje?",
                "¿Cómo agendo una cita?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    const next: Message[] = [
                      ...messages,
                      { role: "user", content: q },
                    ];
                    setMessages(next);
                    chatMutation.mutate({ messages: next });
                  }}
                  className="text-left text-sm px-4 py-2.5 rounded-sm border border-[#2e2a24] text-[#a09080] hover:border-[#c9a96e]/50 hover:text-[#c9a96e] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {displayMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] text-sm leading-relaxed px-4 py-2.5 rounded-sm ${
                msg.role === "user"
                  ? "bg-[#c9a96e] text-[#0f0d0b] font-medium"
                  : "bg-[#1a1713] text-[#d4c4a8] border border-[#2e2a24]"
              }`}
            >
              {msg.content as string}
            </div>
          </div>
        ))}

        {chatMutation.isPending && (
          <div className="flex justify-start">
            <div className="bg-[#1a1713] border border-[#2e2a24] px-4 py-2.5 rounded-sm">
              <Loader2 size={14} className="animate-spin text-[#c9a96e]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* input */}
      <div className="px-4 py-4 border-t border-[#2e2a24] flex gap-2 items-end bg-[#0f0d0b]">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Escribe tu pregunta..."
          rows={1}
          className="flex-1 bg-[#1a1713] border border-[#2e2a24] text-[#d4c4a8] placeholder-[#6b5f50] text-sm px-4 py-2.5 rounded-sm resize-none max-h-28 focus:outline-none focus:border-[#c9a96e]/60"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || chatMutation.isPending}
          className="shrink-0 w-10 h-10 bg-[#c9a96e] text-[#0f0d0b] flex items-center justify-center rounded-sm disabled:opacity-40 transition-opacity hover:bg-[#e2c08a]"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── CTA section ──────────────────────────────────────────────────────────────
function CTASection({ selectedService }: { selectedService?: (typeof BUSINESS.services)[number] }) {
  return (
    <section className="px-6 py-14 bg-[#13110e] text-center">
      <div className="w-12 h-[1px] bg-[#c9a96e]/40 mx-auto mb-8" />
      <p className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase mb-3">
        ¿Lista para transformarte?
      </p>
      <h2 className="text-white font-serif text-2xl mb-4">Agenda tu cita</h2>
      <p className="text-[#6b5f50] text-sm mb-8 leading-relaxed">
        Escríbenos directamente por WhatsApp y uno de nuestros especialistas te
        atenderá en menos de una hora.
      </p>
      <a
        href={buildWhatsAppUrl(selectedService?.whatsappHint)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25d366] text-white text-sm font-semibold tracking-wide rounded-sm hover:bg-[#1fb855] transition-colors"
      >
        <MessageCircle size={18} />
        {selectedService
          ? `Agendar — ${selectedService.name}`
          : "Agendar por WhatsApp"}
      </a>
      {selectedService && (
        <p className="text-[#6b5f50] text-xs mt-4">
          Consultando por: {selectedService.name}
        </p>
      )}
    </section>
  );
}

// ─── Sticky bottom bar ────────────────────────────────────────────────────────
function StickyBar({
  selectedService,
  onChatOpen,
}: {
  selectedService?: (typeof BUSINESS.services)[number];
  onChatOpen: () => void;
}) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 flex gap-0 border-t border-[#2e2a24] bg-[#0f0d0b]">
      <a
        href={buildWhatsAppUrl(selectedService?.whatsappHint)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#25d366] text-white text-sm font-semibold hover:bg-[#1fb855] transition-colors"
      >
        <MessageCircle size={18} />
        {selectedService ? `Agendar — ${selectedService.name}` : "Agendar cita"}
      </a>
      <button
        onClick={onChatOpen}
        className="w-14 flex items-center justify-center border-l border-[#2e2a24] text-[#c9a96e] hover:bg-[#1a1713] transition-colors"
      >
        <Sparkles size={18} />
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BioPage() {
  const [selectedService, setSelectedService] = useState<
    (typeof BUSINESS.services)[number] | undefined
  >();
  const [chatOpen, setChatOpen] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleServiceTap = (svc: (typeof BUSINESS.services)[number]) => {
    setSelectedService(svc);
    // open WhatsApp directly when tapping a service card
    window.open(buildWhatsAppUrl(svc.whatsappHint), "_blank");
  };

  const scrollToCTA = () => {
    ctaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0f0d0b]" style={{ fontFamily: "'Georgia', serif" }}>
      {/* constrain to mobile width, centered */}
      <div className="mx-auto w-full max-w-[430px] relative pb-16">
        <HeroSection onCTAClick={scrollToCTA} />
        <ServicesSection onServiceTap={handleServiceTap} />
        <GallerySection />
        <AboutSection />
        <div ref={ctaRef}>
          <CTASection selectedService={selectedService} />
        </div>
      </div>

      <StickyBar selectedService={selectedService} onChatOpen={() => setChatOpen(true)} />
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
