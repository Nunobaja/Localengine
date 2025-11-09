# Local Business Growth Companion - TODO

## MVP Feature Set

### Dashboard & Métricas
- [x] Dashboard principal con métricas clave (visitas/semana, tasa de repetición, ticket promedio, reseñas últimos 30 días, horarios lentos)
- [ ] Gráficos y visualizaciones de datos
- [ ] Exportación de reportes (CSV/Excel)

### Motor de Reputación
- [ ] Flujo automático de solicitud de reseñas (post-visita)
- [ ] Respuestas plantilla con un clic para reseñas (5 estrellas y negativas)
- [ ] Alertas para experiencias negativas inmediatas (manejo preventivo)
- [ ] Integración con Google Business Profile (lectura/escritura)

### Sistema de Referidos
- [ ] Generación de códigos QR y enlaces cortos de referidos
- [ ] Seguimiento de canjes y asignación de recompensas
- [ ] Panel de referidos para propietarios

### Smart Filler (Relleno Inteligente)
- [ ] Detección de horarios de baja ocupación
- [ ] Programación de promociones cortas automáticas
- [ ] Sugerencias de ofertas colaborativas con negocios cercanos

### Campañas de Reactivación
- [ ] Mensajes "No te hemos visto en X días" con CTA y enlace de reserva
- [ ] Secuencias de 3 toques para clientes inactivos
- [ ] Personalización de mensajes

### Integraciones Básicas
- [ ] Google Business Profile (GMB) - lectura/escritura
- [ ] Twilio SMS/WhatsApp para mensajería
- [ ] Stripe para pagos
- [ ] Soporte de enlaces de reserva (Calendly u otro sistema)
- [ ] SendGrid para emails

### Onboarding del Propietario
- [ ] Wizard de incorporación: conectar GMB
- [ ] Configuración de horarios de negocio
- [ ] Importación de contactos (CSV o manual)
- [ ] Configuración de timing y canales de solicitud de reseñas
- [ ] Checklist de preparación para lanzamiento

### Roles y Permisos
- [ ] Rol de Propietario (Owner)
- [ ] Rol de Manager
- [ ] Rol de Staff
- [ ] Control de acceso basado en roles

### Automatizaciones (Flows)
- [ ] Flujo de solicitud de reseña post-visita
- [ ] Verificación de satisfacción pre-visita (prevenir reseñas negativas)
- [ ] Flujo de relleno de horarios lentos
- [ ] Flujo de onboarding de referidos (escanear QR → enviar recompensa)
- [ ] Flujo de reactivación (90 días sin visita → secuencia de 3 toques)

### Plantillas de Mensajería
- [x] Plantillas WhatsApp/SMS solicitud de reseña (3 variaciones: corta, media, larga)
- [x] Plantillas verificación satisfacción pre-visita
- [x] Plantillas respuesta a reseñas negativas (pública + alcance privado)
- [x] Plantillas invitación de referidos (copia landing QR)
- [x] Plantillas mensaje de reactivación ("Te extrañamos")
- [x] Soporte bilingüe (Español/Inglés)

### Base de Datos
- [x] Tabla businesses (negocios)
- [x] Tabla contacts (contactos/clientes)
- [x] Tabla visits (visitas)
- [x] Tabla campaigns (campañas)
- [x] Tabla referrals (referidos)
- [x] Tabla reviews (reseñas)
- [x] Tabla messages (mensajes)
- [x] Tabla events (eventos)
- [x] Tabla api_keys (claves API)
- [x] Índices y queries optimizadas

### Artefactos de Especificación
- [x] product_spec.md (especificación completa del MVP)
- [ ] openapi.json (especificación de la API)
- [ ] database.sql (esquema de DB y datos de ejemplo)
- [x] onboarding_flow.md (flujo de incorporación)

### Testing y QA
- [ ] Tests de aceptación (Given/When/Then)
- [ ] Tests automatizados (unit + integration)
- [ ] Escenarios end-to-end
- [ ] Datos de prueba y usuarios de ejemplo

### Seguridad y Privacidad
- [ ] Política de manejo de PII
- [ ] Lenguaje de consentimiento SMS/WhatsApp (Español/Inglés)
- [ ] Encriptación de campos sensibles
- [ ] Control de acceso basado en roles

### Operaciones
- [ ] Logging estructurado (JSON)
- [ ] Umbrales de alertas
- [ ] Runbook operacional
- [ ] Monitoreo de trabajos fallidos

## Pricing & Packaging
- [ ] Tier Starter (definir características y precio)
- [ ] Tier Growth (definir características y precio)
- [ ] Tier Pro (definir características y precio)
- [ ] Política de prueba gratuita/devolución de dinero

## Launch Playbook
- [ ] Scripts de alcance (email, WhatsApp, teléfono)
- [ ] Estrategia de partnerships locales
- [ ] Programa de referidos incentivados para early adopters
- [ ] Plantilla de caso de estudio
- [ ] Experimentos A/B para retención


## Rediseño Visual (Follow-up)

### Sistema de Diseño
- [x] Implementar paleta de colores clara y profesional (grises claros, azul/naranja como acento)
- [x] Actualizar tema de oscuro a claro en ThemeProvider
- [x] Configurar variables CSS con nueva paleta de colores
- [x] Implementar sistema tipográfico (Poppins/Inter/Montserrat)
- [x] Definir espaciado y ritmo vertical consistente

### Landing Page
- [x] Reemplazar "LBGC" con nombre completo "Local Business Growth Companion"
- [x] Crear hero section profesional con headline y subheadline claros
- [x] Agregar CTA principal "Ver Demo" con alto contraste
- [x] Implementar fondo claro con gradiente sutil (#F7F9FA)
- [x] Actualizar secciones de features con diseño limpio
- [x] Agregar sombras suaves y divisores sutiles

### Componentes
- [x] Rediseñar botones con nueva paleta (azul #007BFF o naranja #FF6A00)
- [x] Actualizar cards con fondos blancos y sombras sutiles
- [x] Implementar jerarquía tipográfica (headline: bold 2xl, subheadline: medium lg, body: normal base)
- [x] Asegurar responsividad en todos los breakpoints
- [x] Optimizar espaciado y padding para balance visual

### Dashboard
- [x] Actualizar tema del dashboard a claro
- [x] Aplicar nueva paleta de colores a métricas y gráficos
- [x] Mejorar contraste de texto para legibilidad


## Correcciones Urgentes - Rediseño Atractivo

### Problemas Identificados
- [x] Diseño demasiado blanco y gris, sin atractivo visual
- [x] Contenido mezclado inglés/español
- [x] Falta de color vibrante y energía
- [x] Sin imágenes o elementos visuales llamativos

### Soluciones a Implementar
- [x] Paleta de colores vibrante (gradientes púrpura/rosa, azul/verde)
- [x] Traducir TODO el contenido a español 100%
- [x] Agregar fondos con gradientes coloridos
- [x] Usar colores de acento vibrantes en features
- [x] Mejorar contraste y jerarquía visual
- [x] Agregar más variedad de colores en secciones


## Funcionalidades Críticas - Frontend Funcional

### Onboarding
- [x] Pantalla de bienvenida después del login
- [x] Wizard de creación de negocio (nombre, tipo, horarios, idioma)
- [ ] Tutorial rápido de funcionalidades principales
- [x] Redirección automática al dashboard después de completar onboarding

### Dashboard Funcional
- [x] Mostrar métricas reales basadas en datos del usuario
- [x] Gráficos de visitas por semana
- [x] Lista de actividad reciente
- [x] Acciones rápidas (agregar contacto, registrar visita)
- [ ] Estado de horarios lentos con datos reales

### Contactos (CRUD Completo)
- [x] Tabla de contactos con búsqueda y filtros
- [x] Formulario para agregar nuevo contacto
- [ ] Editar contacto existente
- [ ] Ver historial de visitas por contacto
- [ ] Importar contactos desde CSV
- [ ] Exportar contactos a CSV

### Visitas (CRUD Completo)
- [x] Tabla de visitas con filtros por fecha
- [x] Formulario para registrar nueva visita
- [ ] Editar visita existente
- [x] Asociar visita con contacto
- [x] Calcular métricas automáticamente (ticket promedio, frecuencia)

### Reseñas
- [ ] Lista de reseñas con filtros por rating
- [ ] Agregar reseña manualmente
- [ ] Plantillas de respuesta a reseñas
- [ ] Estadísticas de reseñas (promedio, distribución)

### Referidos
- [ ] Generar código de referido único
- [ ] Mostrar QR code para compartir
- [ ] Lista de referidos activos y canjeados
- [ ] Estadísticas de top referrers

### Campañas
- [ ] Crear campaña de reactivación
- [ ] Seleccionar contactos inactivos
- [ ] Plantillas de mensajes predefinidas
- [ ] Programar envío de campaña
- [ ] Ver estado de campañas

### Configuración
- [ ] Editar información del negocio
- [ ] Configurar horarios de atención
- [ ] Gestionar plantillas de mensajes
- [ ] Configurar integraciones (placeholders)


## Cambios de Contenido

- [ ] Cambiar "Crecimiento sin publicidad pagada" por "30% más ventas sin Anuncios"


## Cambios de Branding y Contenido

- [x] Cambiar nombre de "Local Business Growth Companion" a "Local Engine"
- [x] Agregar subtítulo "Motor de Ventas"
- [x] Cambiar "Crecimiento sin publicidad pagada" por "30% más ventas sin Anuncios"


## Nuevo Branding - Prospectalo

- [x] Cambiar nombre a "Prospectalo"
- [x] Subtítulo "Motor de ventas"
- [x] Generar logotipo profesional
- [x] Actualizar header con nuevo logo
- [x] Actualizar footer con nuevo branding
- [x] Actualizar copyright a "© 2025 Prospectalo"


## Correcciones de Autenticación y Funcionalidad

- [x] Ocultar botón "Comenzar Gratis" cuando usuario está autenticado
- [x] Hacer funcional botón "Ir al Dashboard"
- [x] Implementar redirección automática a onboarding si usuario no tiene negocio
- [ ] Verificar que dashboard muestre datos correctamente
- [x] Corregir flujo completo: Login → Onboarding → Dashboard


## Correcciones de Onboarding

- [x] Cambiar "¡Bienvenido a LBGC!" por "¡Bienvenido a Prospectalo!"
- [ ] Corregir z-index del dropdown de tipo de negocio
- [ ] Mejorar diseño responsive del formulario de onboarding


## Correcciones de Formulario de Contactos

- [x] Actualizar título del DashboardLayout a "Prospectalo"
- [x] Corregir todos los placeholders de inputs en Contacts.tsx
- [x] Corregir todos los placeholders de inputs en Visits.tsx
- [x] Corregir todos los placeholders de inputs en Onboarding.tsx
- [x] Revisar y corregir inputs en todas las páginas
