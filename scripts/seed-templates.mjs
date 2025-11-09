import { drizzle } from "drizzle-orm/mysql2";
import { messageTemplates } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const defaultTemplates = [
  // Review Request Templates - Spanish
  {
    businessId: null,
    name: "Solicitud de Reseña - Corta (ES)",
    type: "review_request",
    language: "es",
    channel: "whatsapp",
    subject: null,
    content: "Hola {customer_name}, gracias por visitarnos hoy en {business_name}. ¿Te importaría dejar una reseña rápida? ¡Nos ayudaría muchísimo! {review_link}",
    variables: JSON.stringify(["customer_name", "business_name", "review_link"]),
    isDefault: true,
  },
  {
    businessId: null,
    name: "Solicitud de Reseña - Media (ES)",
    type: "review_request",
    language: "es",
    channel: "whatsapp",
    subject: null,
    content: "¡Hola {customer_name}! Esperamos que hayas disfrutado tu visita a {business_name}. Tu opinión es muy importante para nosotros. ¿Podrías tomarte un momento para compartir tu experiencia? {review_link}\n\n¡Muchas gracias! 🙏",
    variables: JSON.stringify(["customer_name", "business_name", "review_link"]),
    isDefault: true,
  },
  {
    businessId: null,
    name: "Solicitud de Reseña - Larga (ES)",
    type: "review_request",
    language: "es",
    channel: "email",
    subject: "¿Cómo fue tu experiencia en {business_name}?",
    content: "Estimado/a {customer_name},\n\nGracias por elegir {business_name} para {service}. Nos encantaría conocer tu opinión sobre tu experiencia.\n\nTu feedback nos ayuda a mejorar continuamente y a ofrecer el mejor servicio posible. ¿Podrías tomarte 2 minutos para dejarnos una reseña?\n\n{review_link}\n\nComo agradecimiento, recibirás un {discount_code} en tu próxima visita.\n\n¡Esperamos verte pronto!\n\nEquipo de {business_name}",
    variables: JSON.stringify(["customer_name", "business_name", "service", "review_link", "discount_code"]),
    isDefault: true,
  },

  // Review Request Templates - English
  {
    businessId: null,
    name: "Review Request - Short (EN)",
    type: "review_request",
    language: "en",
    channel: "sms",
    subject: null,
    content: "Hi {customer_name}, thanks for visiting {business_name} today! Would you mind leaving us a quick review? It would help us a lot! {review_link}",
    variables: JSON.stringify(["customer_name", "business_name", "review_link"]),
    isDefault: true,
  },

  // Satisfaction Check Templates - Spanish
  {
    businessId: null,
    name: "Verificación de Satisfacción (ES)",
    type: "satisfaction_check",
    language: "es",
    channel: "whatsapp",
    subject: null,
    content: "Hola {customer_name}, mañana tienes tu cita en {business_name}. ¿Hay algo especial que quieras que sepamos para hacer tu experiencia perfecta? 😊",
    variables: JSON.stringify(["customer_name", "business_name"]),
    isDefault: true,
  },

  // Reactivation Templates - Spanish
  {
    businessId: null,
    name: "Reactivación - Te Extrañamos (ES)",
    type: "reactivation",
    language: "es",
    channel: "whatsapp",
    subject: null,
    content: "¡Te extrañamos, {customer_name}! 😊 Han pasado {days_inactive} días desde tu última visita a {business_name}. Reserva esta semana y obtén {discount_code} para tu próxima visita: {booking_link}",
    variables: JSON.stringify(["customer_name", "days_inactive", "business_name", "discount_code", "booking_link"]),
    isDefault: true,
  },
  {
    businessId: null,
    name: "Reactivación - Oferta Especial (ES)",
    type: "reactivation",
    language: "es",
    channel: "email",
    subject: "¡Te extrañamos en {business_name}!",
    content: "Hola {customer_name},\n\nHemos notado que no te hemos visto en un tiempo. ¡Te extrañamos! 💙\n\nComo cliente especial, queremos ofrecerte un {discount_code} en tu próximo servicio de {service}.\n\nReserva ahora: {booking_link}\n\nEsta oferta es válida hasta {expiry_date}.\n\n¡Esperamos verte pronto!\n\n{business_name}",
    variables: JSON.stringify(["customer_name", "business_name", "discount_code", "service", "booking_link", "expiry_date"]),
    isDefault: true,
  },

  // Referral Templates - Spanish
  {
    businessId: null,
    name: "Invitación de Referido (ES)",
    type: "referral",
    language: "es",
    channel: "whatsapp",
    subject: null,
    content: "¡Hola {customer_name}! 🎁 Comparte {business_name} con tus amigos y ambos recibirán {reward_value} de descuento. Tu código único: {referral_code}\n\nComparte este enlace: {referral_link}",
    variables: JSON.stringify(["customer_name", "business_name", "reward_value", "referral_code", "referral_link"]),
    isDefault: true,
  },

  // Negative Review Response Templates - Spanish
  {
    businessId: null,
    name: "Respuesta Reseña Negativa - Pública (ES)",
    type: "negative_review_response",
    language: "es",
    channel: "email",
    subject: null,
    content: "Hola {customer_name}, sentimos mucho que tu experiencia no haya sido la esperada. Tu satisfacción es nuestra prioridad. Por favor envíanos un mensaje privado o llama al {business_phone} para que podamos resolverlo de inmediato. Gracias por darnos la oportunidad de mejorar.",
    variables: JSON.stringify(["customer_name", "business_phone"]),
    isDefault: true,
  },
  {
    businessId: null,
    name: "Respuesta Reseña Negativa - Privada (ES)",
    type: "negative_review_response",
    language: "es",
    channel: "whatsapp",
    subject: null,
    content: "Hola {customer_name}, vimos tu reseña y lamentamos mucho que no hayas tenido una buena experiencia en {business_name}. Nos gustaría hablar contigo personalmente para entender qué pasó y hacer las cosas bien. ¿Podríamos ofrecerte {compensation} como disculpa? Por favor llámanos al {business_phone} o responde a este mensaje.",
    variables: JSON.stringify(["customer_name", "business_name", "compensation", "business_phone"]),
    isDefault: true,
  },

  // Smart Filler Templates - Spanish
  {
    businessId: null,
    name: "Promoción Horario Lento (ES)",
    type: "smart_filler",
    language: "es",
    channel: "whatsapp",
    subject: null,
    content: "🔥 ¡Oferta Flash! Tenemos disponibilidad HOY de {time_start} a {time_end} en {business_name}. Reserva ahora y obtén {discount_value} de descuento. ¡Solo por 24 horas! {booking_link}",
    variables: JSON.stringify(["time_start", "time_end", "business_name", "discount_value", "booking_link"]),
    isDefault: true,
  },
];

async function seedTemplates() {
  console.log("🌱 Seeding default message templates...");
  
  try {
    for (const template of defaultTemplates) {
      await db.insert(messageTemplates).values(template);
      console.log(`✅ Created template: ${template.name}`);
    }
    
    console.log("\n✨ Seeding completed successfully!");
    console.log(`📝 Total templates created: ${defaultTemplates.length}`);
  } catch (error) {
    console.error("❌ Error seeding templates:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

seedTemplates();
