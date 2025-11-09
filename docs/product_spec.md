# Local Business Growth Companion (LBGC) - Product Specification

## Executive Summary

**Local Business Growth Companion** es una plataforma SaaS diseñada para ayudar a negocios locales (barberías, salones, spas, restaurantes pequeños, gimnasios) a crecer orgánicamente sin depender de publicidad pagada. La plataforma automatiza la gestión de reputación, programas de referidos, campañas de reactivación y optimización de horarios.

## Objetivo del Producto

Proporcionar a propietarios de negocios locales una herramienta todo-en-uno que:
- Incremente la adquisición de clientes mediante referidos orgánicos
- Mejore la retención con campañas de reactivación automatizadas
- Optimice la reputación online con gestión proactiva de reseñas
- Maximice la ocupación detectando y llenando horarios lentos

## Usuarios Objetivo

### Personas Principales

**María - Propietaria de Barbería**
- Ubicación: Guadalajara, México
- Negocio: Barbería de 3 sillas
- Nivel técnico: Bajo
- Necesidades: Automatizaciones simples, mensajes WhatsApp, un clic para todo
- Objetivo: Más clientes recurrentes sin invertir en publicidad

**Luis - Manager de Salón**
- Ubicación: Ciudad de México
- Negocio: Salón de belleza mediano
- Nivel técnico: Medio
- Necesidades: Dashboard de métricas, campañas programadas, análisis de tendencias
- Objetivo: Optimizar ocupación y aumentar ticket promedio

**Ana - Propietaria de Spa**
- Ubicación: Monterrey, México
- Negocio: Spa boutique
- Nivel técnico: Medio
- Necesidades: Gestión de reputación, promociones para días lentos, eventos especiales
- Objetivo: Llenar horarios de media semana, mantener reseñas 5 estrellas

## MVP Feature Set

### 1. Dashboard de Métricas

**Descripción:** Panel central con KPIs clave del negocio.

**Métricas incluidas:**
- Visitas por semana
- Tasa de clientes recurrentes (30/60/90 días)
- Ticket promedio
- Reseñas en últimos 30 días con rating promedio
- Horarios lentos detectados

**Criterios de Aceptación:**
- Visualización en tiempo real de métricas
- Gráficos interactivos para tendencias
- Exportación de datos a CSV/Excel
- Filtros por rango de fechas

### 2. Motor de Reputación

**Descripción:** Sistema automatizado para gestionar reseñas online.

**Funcionalidades:**
- **Solicitud automática de reseñas** después de cada visita
- **Plantillas de respuesta** con un clic para reseñas positivas y negativas
- **Alertas de experiencias negativas** para intervención preventiva
- **Integración con Google Business Profile** para lectura/escritura de reseñas

**Flujo de Trabajo:**
1. Cliente completa visita → Sistema registra evento
2. Después de X horas → Envía solicitud de reseña por WhatsApp/SMS/Email
3. Cliente deja reseña → Sistema notifica al propietario
4. Propietario responde con plantilla personalizable
5. Si reseña es negativa → Alerta inmediata + plantilla de respuesta + alcance privado

**Criterios de Aceptación:**
- Timing configurable para solicitudes (inmediato, 2h, 24h, etc.)
- Soporte multicanal (WhatsApp, SMS, Email)
- Plantillas en español e inglés
- Respuestas públicas y privadas para reseñas negativas

### 3. Sistema de Referidos

**Descripción:** Programa de referidos con códigos QR y enlaces únicos.

**Funcionalidades:**
- Generación de códigos QR personalizados por cliente
- Enlaces cortos únicos para compartir
- Seguimiento de canjes y conversiones
- Asignación automática de recompensas
- Dashboard de top referrers

**Flujo de Trabajo:**
1. Cliente solicita código de referido
2. Sistema genera QR + enlace único
3. Cliente comparte con amigos/familia
4. Nuevo cliente escanea QR o usa enlace
5. Sistema registra referido y asigna recompensa
6. Ambos clientes reciben notificación de beneficio

**Criterios de Aceptación:**
- Códigos únicos no duplicables
- Tracking de fuente de referido
- Configuración flexible de recompensas (%, monto fijo, servicio gratis)
- Expiración configurable de códigos

### 4. Smart Filler (Relleno Inteligente)

**Descripción:** Detección automática de horarios de baja ocupación y promociones flash.

**Funcionalidades:**
- **Algoritmo de detección** de slots lentos basado en histórico
- **Promociones automáticas** de 24-48 horas
- **Sugerencias de colaboración** con negocios cercanos
- **Notificaciones push** a clientes cercanos geográficamente

**Flujo de Trabajo:**
1. Sistema analiza ocupación por día/hora
2. Detecta patrón de baja ocupación (ej: Martes 2-4pm)
3. Crea promoción flash automática (20% descuento)
4. Envía notificación a clientes inactivos + nuevos leads
5. Rastrea conversión y ajusta algoritmo

**Criterios de Aceptación:**
- Detección basada en mínimo 4 semanas de datos
- Promociones configurables (descuento, servicio adicional)
- Segmentación de audiencia (clientes inactivos, nuevos, VIP)
- Métricas de conversión por campaña

### 5. Campañas de Reactivación

**Descripción:** Secuencias automáticas para recuperar clientes inactivos.

**Funcionalidades:**
- **Detección de inactividad** configurable (30/60/90 días)
- **Secuencias de 3 toques** con escalamiento de incentivos
- **Personalización** basada en historial de servicios
- **A/B testing** de mensajes y ofertas

**Flujo de Trabajo:**
1. Sistema detecta cliente sin visita en 90 días
2. Toque 1 (Día 0): "Te extrañamos" + 10% descuento
3. Toque 2 (Día 7): "Última oportunidad" + 15% descuento
4. Toque 3 (Día 14): "Servicio gratis adicional" + 20% descuento
5. Si cliente reserva → Detiene secuencia
6. Si no responde → Marca como perdido

**Criterios de Aceptación:**
- Configuración de días de inactividad
- Personalización de secuencias por tipo de cliente
- Detención automática al re-engagement
- Métricas de tasa de reactivación

### 6. Integraciones Básicas

**Google Business Profile (GMB):**
- OAuth para conexión segura
- Lectura de reseñas existentes
- Publicación de respuestas
- Actualización de información del negocio

**Twilio (SMS/WhatsApp):**
- Envío de mensajes transaccionales
- Webhooks para respuestas entrantes
- Opt-in/opt-out management
- Templates aprobados para WhatsApp Business

**Stripe:**
- Procesamiento de pagos de suscripción
- Webhooks para eventos de pago
- Portal de cliente para gestión de suscripción

**SendGrid:**
- Envío de emails transaccionales
- Templates HTML responsivos
- Tracking de opens/clicks

**Calendly/Booking:**
- Integración de enlaces de reserva
- Sincronización de disponibilidad

### 7. Wizard de Onboarding

**Descripción:** Flujo guiado para configuración inicial del negocio.

**Pasos:**
1. **Bienvenida:** Explicación de valor y beneficios
2. **Conectar GMB:** OAuth flow con screenshots
3. **Configurar horarios:** Selector visual de horarios por día
4. **Importar contactos:** Upload CSV o entrada manual
5. **Configurar reseñas:** Timing y canales preferidos
6. **Checklist final:** Verificación de configuración completa

**Criterios de Aceptación:**
- Flujo completable en < 10 minutos
- Validación en cada paso
- Opción de "Completar después"
- Tutorial interactivo opcional

### 8. Roles y Permisos

**Roles disponibles:**
- **Owner:** Acceso completo, configuración, billing
- **Manager:** Gestión de campañas, contactos, reportes
- **Staff:** Solo registro de visitas y consulta de agenda

**Criterios de Aceptación:**
- Control granular por módulo
- Invitación por email
- Auditoría de acciones por usuario

## Arquitectura Técnica

### Stack Tecnológico

**Frontend:**
- React 19 + Vite
- Tailwind CSS 4
- shadcn/ui components
- tRPC client

**Backend:**
- Node.js + Express
- tRPC 11 para API type-safe
- Drizzle ORM
- MySQL/TiDB database

**Infraestructura:**
- Hosting: Manus Platform
- Database: Managed MySQL
- Storage: S3-compatible
- Queue: BullMQ (Redis)

### Modelo de Datos

**Entidades principales:**
- `businesses` - Negocios registrados
- `users` - Usuarios del sistema (owners, managers, staff)
- `contacts` - Clientes/contactos
- `visits` - Registro de visitas
- `reviews` - Reseñas online
- `referrals` - Programa de referidos
- `campaigns` - Campañas de marketing
- `messages` - Mensajes enviados
- `events` - Eventos del sistema para triggers
- `automation_flows` - Definición de automatizaciones
- `message_templates` - Plantillas de mensajes
- `slow_slots` - Horarios de baja ocupación

### Flujos de Automatización

**1. Post-Visit Review Request:**
- Trigger: `visit.completed`
- Delay: 2 horas (configurable)
- Channel: WhatsApp > SMS > Email (fallback)
- Success metric: Review posted within 7 days

**2. Pre-Visit Satisfaction Check:**
- Trigger: `visit.scheduled` (24h before)
- Delay: Immediate
- Channel: WhatsApp
- Success metric: Response received

**3. Slow Slot Filler:**
- Trigger: `slot.slow_detected`
- Delay: Immediate
- Channel: Push > WhatsApp > SMS
- Success metric: Booking within 24h

**4. Referral Onboarding:**
- Trigger: `referral.created`
- Delay: Immediate
- Channel: WhatsApp
- Success metric: Referral redeemed

**5. Reactivation Sequence:**
- Trigger: `contact.inactive_90_days`
- Delay: 3-touch sequence (0, 7, 14 days)
- Channel: WhatsApp > Email
- Success metric: Visit booked

## Pricing & Packaging

### Tier 1: Starter ($29/mes)
- 1 negocio
- Hasta 100 contactos
- Dashboard básico
- Solicitudes de reseñas automáticas
- 500 mensajes/mes
- Soporte por email

### Tier 2: Growth ($79/mes)
- 1 negocio
- Hasta 500 contactos
- Dashboard completo con analytics
- Sistema de referidos
- Campañas de reactivación
- Smart Filler
- 2,000 mensajes/mes
- Soporte prioritario

### Tier 3: Pro ($149/mes)
- Hasta 3 negocios
- Contactos ilimitados
- Todo de Growth +
- A/B testing
- API access
- White-label
- 10,000 mensajes/mes
- Soporte dedicado

**Prueba gratuita:** 14 días sin tarjeta de crédito
**Política de devolución:** 30 días money-back guarantee

## KPIs y Métricas de Éxito

### Métricas de Producto
- **Tasa de activación:** % usuarios que completan onboarding
- **Engagement semanal:** % usuarios activos por semana
- **Retention:** % usuarios activos mes a mes
- **NPS:** Net Promoter Score

### Métricas de Negocio (para clientes)
- **Incremento en clientes nuevos:** Baseline vs post-implementación
- **Tasa de repetición:** % clientes con 2+ visitas
- **Reviews generadas:** # reseñas nuevas por mes
- **Rating promedio:** Evolución de rating en GMB
- **Tasa de conversión de referidos:** % códigos canjeados
- **Tasa de reactivación:** % clientes inactivos recuperados

### Métricas de Revenue (SaaS)
- **MRR:** Monthly Recurring Revenue
- **Churn rate:** % cancelaciones mensuales
- **LTV:** Lifetime Value por cliente
- **CAC:** Customer Acquisition Cost
- **CAC Payback:** Meses para recuperar CAC

## Roadmap

### MVP (Sprints 1-6) - 6 semanas
- ✅ Arquitectura y scaffolding
- ✅ Esquema de base de datos
- ✅ Backend API (tRPC)
- ✅ Dashboard y páginas principales
- 🔄 Integraciones (GMB, Twilio, Stripe)
- 🔄 Automatizaciones básicas
- 🔄 Testing y QA

### v1.0 (Post-MVP) - 3 meses
- Onboarding wizard completo
- Plantillas de mensajes avanzadas
- A/B testing de campañas
- Analytics avanzado
- Mobile app (React Native)

### v2.0 (6 meses)
- IA para optimización de mensajes
- Predicción de churn
- Integración con POS systems
- Marketplace de partners locales
- White-label para agencias

## Seguridad y Privacidad

### Manejo de PII
- Encriptación en tránsito (TLS 1.3)
- Encriptación en reposo para campos sensibles
- Política de retención: 2 años después de última actividad
- Derecho al olvido (GDPR compliance)

### Consentimiento de Comunicaciones
- Opt-in explícito para SMS/WhatsApp
- Opt-out con un clic en cada mensaje
- Registro de consentimientos con timestamp
- Respeto a horarios (no mensajes 10pm-8am)

### Autenticación y Autorización
- OAuth 2.0 para integraciones
- JWT para sesiones
- 2FA opcional
- RBAC (Role-Based Access Control)

## Soporte y Operaciones

### Canales de Soporte
- Email: support@lbgc.app
- Chat en vivo (horario de oficina)
- Knowledge base / Help center
- Video tutorials en YouTube

### SLA
- Tier Starter: 48h response time
- Tier Growth: 24h response time
- Tier Pro: 4h response time + dedicated account manager

### Monitoreo
- Uptime monitoring (99.9% SLA)
- Error tracking (Sentry)
- Performance monitoring (APM)
- Alertas automáticas para fallas críticas

## Conclusión

Local Business Growth Companion está diseñado para ser la herramienta definitiva de crecimiento orgánico para negocios locales. Con automatizaciones inteligentes, integración profunda con plataformas clave y un enfoque en resultados medibles, LBGC ayudará a miles de negocios a crecer sin depender de publicidad pagada.

**Próximos pasos:**
1. Completar integraciones con GMB y Twilio
2. Implementar flujos de automatización
3. Testing con usuarios beta (10 negocios piloto)
4. Launch público con estrategia de primeros 100 clientes
