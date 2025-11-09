# Local Business Growth Companion (LBGC)

**Plataforma SaaS de automatización de crecimiento para negocios locales sin publicidad pagada.**

## 🎯 Descripción

Local Business Growth Companion es una solución completa que ayuda a barberías, salones, spas, restaurantes y gimnasios a:

- **Incrementar clientes nuevos** mediante programas de referidos automatizados
- **Mejorar retención** con campañas de reactivación inteligentes
- **Gestionar reputación** con solicitudes automáticas de reseñas
- **Optimizar ocupación** detectando y llenando horarios lentos

## ✨ Características Principales

### Dashboard de Métricas
- Visitas por semana
- Tasa de clientes recurrentes
- Ticket promedio
- Reseñas y rating promedio
- Detección de horarios lentos

### Motor de Reputación
- Solicitudes automáticas de reseñas post-visita
- Plantillas de respuesta con un clic
- Alertas de experiencias negativas
- Integración con Google Business Profile

### Sistema de Referidos
- Generación de códigos QR únicos
- Enlaces cortos para compartir
- Seguimiento de canjes y conversiones
- Dashboard de top referrers

### Smart Filler
- Detección automática de horarios lentos
- Promociones flash de 24-48 horas
- Segmentación de audiencia
- Métricas de conversión

### Campañas de Reactivación
- Detección de clientes inactivos
- Secuencias de 3 toques automatizadas
- Personalización basada en historial
- A/B testing de mensajes

## 🛠️ Stack Tecnológico

### Frontend
- React 19 + Vite
- Tailwind CSS 4
- shadcn/ui components
- tRPC client (type-safe API)

### Backend
- Node.js + Express
- tRPC 11 (end-to-end type safety)
- Drizzle ORM
- MySQL/TiDB database

### Integraciones
- Google Business Profile (OAuth)
- Twilio (SMS/WhatsApp)
- Stripe (pagos)
- SendGrid (email)

## 📁 Estructura del Proyecto

```
lbgc-companion/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── components/    # Componentes reutilizables
│   │   ├── lib/           # Utilidades y configuración
│   │   └── App.tsx        # Configuración de rutas
│   └── public/            # Assets estáticos
├── server/                # Backend Express + tRPC
│   ├── routers.ts         # Definición de procedimientos tRPC
│   ├── db.ts              # Funciones de base de datos
│   └── _core/             # Infraestructura del framework
├── drizzle/               # Esquema de base de datos
│   └── schema.ts          # Definición de tablas
├── docs/                  # Documentación
│   ├── product_spec.md    # Especificación del producto
│   └── onboarding_flow.md # Flujo de onboarding
├── scripts/               # Scripts de utilidad
│   └── seed-templates.mjs # Plantillas de mensajes
└── todo.md                # Lista de tareas del proyecto
```

## 🗄️ Esquema de Base de Datos

### Tablas Principales

- **businesses** - Información de negocios registrados
- **users** - Usuarios del sistema (owners, managers, staff)
- **contacts** - Clientes/contactos
- **visits** - Registro de visitas
- **reviews** - Reseñas online
- **referrals** - Programa de referidos
- **campaigns** - Campañas de marketing
- **messages** - Mensajes enviados
- **events** - Eventos del sistema para triggers
- **automation_flows** - Definición de automatizaciones
- **message_templates** - Plantillas de mensajes
- **business_hours** - Horarios de operación
- **slow_slots** - Horarios de baja ocupación

## 🚀 Inicio Rápido

### Desarrollo Local

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Configurar base de datos:**
   ```bash
   pnpm db:push
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   pnpm dev
   ```

4. **Acceder a la aplicación:**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api/trpc

### Seed de Plantillas

Para poblar la base de datos con plantillas de mensajes predeterminadas:

```bash
node scripts/seed-templates.mjs
```

## 📊 API (tRPC)

### Endpoints Principales

**Businesses:**
- `businesses.create` - Crear negocio
- `businesses.list` - Listar negocios del usuario
- `businesses.getDashboard` - Obtener métricas del dashboard

**Contacts:**
- `contacts.create` - Crear contacto
- `contacts.list` - Listar contactos
- `contacts.getInactive` - Obtener contactos inactivos

**Visits:**
- `visits.create` - Registrar visita
- `visits.list` - Listar visitas

**Reviews:**
- `reviews.create` - Crear reseña
- `reviews.list` - Listar reseñas
- `reviews.respond` - Responder a reseña

**Referrals:**
- `referrals.create` - Crear código de referido
- `referrals.redeem` - Canjear código
- `referrals.getTopReferrers` - Top referidores

**Campaigns:**
- `campaigns.create` - Crear campaña
- `campaigns.list` - Listar campañas

**Messages:**
- `messages.create` - Enviar mensaje
- `messages.list` - Listar mensajes

**Automations:**
- `automations.create` - Crear flujo de automatización
- `automations.list` - Listar automatizaciones

## 🎨 Diseño

### Tema
- **Modo oscuro** por defecto
- **Colores principales:** Púrpura, Rosa, Azul
- **Tipografía:** System fonts (sans-serif)

### Componentes UI
- Basados en **shadcn/ui**
- Totalmente personalizables
- Responsive design

## 📝 Plantillas de Mensajes

El sistema incluye 12 plantillas predeterminadas en **español e inglés**:

### Solicitud de Reseñas
- Corta (WhatsApp/SMS)
- Media (WhatsApp)
- Larga (Email con incentivo)

### Reactivación
- "Te extrañamos" (WhatsApp)
- Oferta especial (Email)

### Referidos
- Invitación con código único

### Reseñas Negativas
- Respuesta pública
- Alcance privado

### Smart Filler
- Promoción flash para horarios lentos

### Satisfacción
- Verificación pre-visita

## 🔐 Seguridad

- **Autenticación:** OAuth 2.0 + JWT
- **Roles:** Owner, Manager, Staff
- **Encriptación:** TLS 1.3 en tránsito
- **PII:** Encriptación de campos sensibles
- **Consentimiento:** Opt-in explícito para comunicaciones

## 📈 Métricas y KPIs

### Para el Negocio
- Incremento en clientes nuevos
- Tasa de repetición de clientes
- Reviews generadas por mes
- Rating promedio
- Tasa de conversión de referidos
- Tasa de reactivación

### Para el Producto (SaaS)
- MRR (Monthly Recurring Revenue)
- Churn rate
- LTV (Lifetime Value)
- CAC (Customer Acquisition Cost)
- Tasa de activación
- Engagement semanal

## 🗺️ Roadmap

### ✅ MVP (Completado)
- Arquitectura y scaffolding
- Esquema de base de datos
- Backend API (tRPC)
- Dashboard y páginas principales
- Plantillas de mensajes
- Documentación

### 🔄 v1.0 (En progreso)
- Integraciones (GMB, Twilio, Stripe)
- Automatizaciones completas
- Wizard de onboarding
- Testing y QA

### 📅 v2.0 (Futuro)
- IA para optimización de mensajes
- Predicción de churn
- Integración con POS systems
- Mobile app (React Native)
- White-label para agencias

## 📚 Documentación

- [Especificación del Producto](docs/product_spec.md)
- [Flujo de Onboarding](docs/onboarding_flow.md)
- [Lista de Tareas](todo.md)

## 🤝 Contribución

Este es un proyecto MVP en desarrollo activo. Para contribuir:

1. Revisa el archivo `todo.md` para ver tareas pendientes
2. Crea un branch para tu feature
3. Implementa con tests
4. Envía pull request

## 📄 Licencia

Propietario - Local Business Growth Companion

## 📧 Contacto

Para soporte o consultas: support@lbgc.app

---

**Hecho con ❤️ para negocios locales que quieren crecer sin publicidad pagada.**
