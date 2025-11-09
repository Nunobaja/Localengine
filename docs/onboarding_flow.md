# Flujo de Onboarding - Local Business Growth Companion

## Objetivo

Guiar al propietario del negocio desde el registro hasta tener su cuenta completamente configurada y lista para generar resultados en menos de 10 minutos.

## Principios de Diseño

- **Simplicidad:** Cada paso debe ser claro y directo
- **Progreso visible:** Barra de progreso en todo momento
- **Validación inmediata:** Feedback instantáneo en cada acción
- **Flexibilidad:** Opción de "Completar después" en cada paso
- **Educación contextual:** Tips y ejemplos en cada pantalla

## Pantallas del Wizard

### Pantalla 1: Bienvenida

**Objetivo:** Establecer expectativas y generar entusiasmo.

**Contenido:**

```
🎉 ¡Bienvenido a Local Business Growth Companion!

Estás a solo 5 pasos de comenzar a hacer crecer tu negocio sin publicidad pagada.

En los próximos minutos vas a:
✓ Conectar tu perfil de Google Business
✓ Configurar tus horarios de atención
✓ Importar tus clientes existentes
✓ Activar solicitudes automáticas de reseñas
✓ Lanzar tu primera campaña

Tiempo estimado: 8 minutos

[Comenzar] [Ver demo primero]
```

**Elementos visuales:**
- Ilustración de negocio local próspero
- Iconos para cada paso del proceso
- Barra de progreso: 0/5

**Criterios de validación:**
- Usuario hace clic en "Comenzar" → Avanza a Pantalla 2
- Usuario hace clic en "Ver demo" → Abre video tutorial en modal

---

### Pantalla 2: Conectar Google Business Profile

**Objetivo:** Establecer integración con GMB para gestión de reputación.

**Contenido:**

```
Paso 1 de 5: Conecta tu Google Business Profile

Para gestionar tus reseñas automáticamente, necesitamos conectar tu perfil de Google Business.

¿Por qué es importante?
• Solicita reseñas automáticamente después de cada visita
• Responde a reseñas con un clic
• Monitorea tu reputación en tiempo real

[Conectar con Google Business]

¿No tienes Google Business Profile?
[Crear uno ahora] (abre Google Business en nueva pestaña)

[← Atrás] [Omitir por ahora]
```

**Flujo técnico:**
1. Usuario hace clic en "Conectar con Google Business"
2. Redirect a OAuth flow de Google
3. Usuario autoriza permisos (lectura/escritura de reviews, info del negocio)
4. Callback con access token y refresh token
5. Sistema guarda tokens encriptados en DB
6. Sistema obtiene info del negocio (nombre, dirección, categoría)
7. Auto-completa campos del negocio
8. Avanza a Pantalla 3

**Elementos visuales:**
- Screenshot del perfil de Google Business
- Iconos de seguridad/privacidad
- Barra de progreso: 1/5

**Criterios de validación:**
- Conexión exitosa → Avanza automáticamente
- Error de conexión → Muestra mensaje de error + opción de reintentar
- Usuario omite → Marca como pendiente + avanza a Pantalla 3

---

### Pantalla 3: Configurar Horarios de Negocio

**Objetivo:** Definir horarios de operación para Smart Filler y scheduling.

**Contenido:**

```
Paso 2 de 5: ¿Cuáles son tus horarios de atención?

Esto nos ayuda a detectar horarios lentos y enviar promociones en el momento perfecto.

[Selector visual de horarios por día de la semana]

Lunes    [09:00] a [18:00]  [✓ Abierto] [✗ Cerrado]
Martes   [09:00] a [18:00]  [✓ Abierto] [✗ Cerrado]
...
Domingo  [Cerrado]

[Copiar horarios a todos los días]
[Usar horarios de Google Business] (si GMB conectado)

[← Atrás] [Continuar →]
```

**Flujo técnico:**
1. Si GMB conectado → Pre-llena horarios desde Google
2. Usuario ajusta horarios con dropdowns
3. Validación: hora de cierre > hora de apertura
4. Guarda en tabla `business_hours`
5. Avanza a Pantalla 4

**Elementos visuales:**
- Selector de tiempo visual (no text input)
- Preview de semana completa
- Barra de progreso: 2/5

**Criterios de validación:**
- Al menos 1 día debe estar abierto
- Horarios válidos (cierre después de apertura)
- Click en "Continuar" → Avanza a Pantalla 4

---

### Pantalla 4: Importar Contactos

**Objetivo:** Poblar la base de datos de clientes para comenzar campañas.

**Contenido:**

```
Paso 3 de 5: Agrega tus clientes

Importa tu lista de clientes para comenzar a enviar campañas de inmediato.

Opciones de importación:

📄 Subir archivo CSV
   [Descargar plantilla] | [Seleccionar archivo]
   
   Formato requerido:
   nombre, teléfono, email, idioma_preferido
   
📝 Agregar manualmente
   [+ Agregar cliente]
   
   Nombre: [________]
   Teléfono: [________]
   Email: [________]
   Idioma: [Español ▼]
   
   [Guardar y agregar otro] [Guardar]

Clientes agregados: 0

[← Atrás] [Continuar →] [Omitir por ahora]
```

**Flujo técnico:**

**Opción CSV:**
1. Usuario descarga plantilla (CSV con headers)
2. Usuario sube archivo
3. Sistema valida formato y datos
4. Muestra preview de primeros 5 registros
5. Usuario confirma importación
6. Sistema crea registros en tabla `contacts`
7. Muestra resumen: X contactos importados, Y errores

**Opción Manual:**
1. Usuario llena formulario
2. Validación en tiempo real (teléfono válido, email válido)
3. Click en "Guardar" → Crea contacto
4. Formulario se limpia para siguiente entrada

**Elementos visuales:**
- Drag & drop zone para CSV
- Lista de contactos agregados con opción de editar/eliminar
- Barra de progreso: 3/5

**Criterios de validación:**
- CSV válido (headers correctos, datos válidos)
- Al menos 1 contacto agregado para continuar
- Teléfonos en formato internacional (+52...)

---

### Pantalla 5: Configurar Solicitudes de Reseñas

**Objetivo:** Activar automatización de solicitudes de reseñas.

**Contenido:**

```
Paso 4 de 5: Activa solicitudes automáticas de reseñas

Configura cuándo y cómo solicitar reseñas a tus clientes.

¿Cuándo enviar la solicitud?
○ Inmediatamente después de la visita
● 2 horas después de la visita (recomendado)
○ 24 horas después de la visita
○ Personalizado: [__] horas

¿Por qué canal?
☑ WhatsApp (preferido)
☑ SMS (fallback si no tiene WhatsApp)
☐ Email

Plantilla de mensaje (editable):
┌─────────────────────────────────────┐
│ Hola {nombre}, gracias por          │
│ visitarnos hoy en {negocio}.        │
│ ¿Te importaría dejar una reseña     │
│ rápida? ¡Nos ayudaría muchísimo!    │
│ {enlace_reseña}                     │
└─────────────────────────────────────┘

[Vista previa] [Editar plantilla]

[← Atrás] [Continuar →]
```

**Flujo técnico:**
1. Usuario selecciona timing y canales
2. Sistema crea `automation_flow` con tipo `review_request`
3. Configuración se guarda en tabla `automation_flows`
4. Sistema activa worker para procesar eventos `visit.completed`
5. Avanza a Pantalla 6

**Elementos visuales:**
- Radio buttons para timing
- Checkboxes para canales
- Editor de texto con variables destacadas
- Preview en dispositivo móvil
- Barra de progreso: 4/5

**Criterios de validación:**
- Al menos 1 canal seleccionado
- Timing válido (0-72 horas)
- Plantilla contiene variables requeridas

---

### Pantalla 6: Checklist de Lanzamiento

**Objetivo:** Verificar configuración completa y celebrar el logro.

**Contenido:**

```
🎉 ¡Felicidades! Tu cuenta está lista

Checklist de configuración:
✓ Google Business Profile conectado
✓ Horarios de negocio configurados
✓ 15 clientes importados
✓ Solicitudes de reseñas activadas

Próximos pasos recomendados:

1. 📊 Explora tu Dashboard
   Ve tus métricas en tiempo real
   [Ir al Dashboard]

2. 📝 Registra tu primera visita
   Activa la automatización de reseñas
   [Registrar visita]

3. 🎁 Crea tu primer código de referidos
   Comienza a crecer con boca a boca
   [Crear referido]

4. 📚 Aprende más
   Ve nuestros tutoriales en video
   [Ver tutoriales]

[Ir al Dashboard →]

¿Necesitas ayuda?
[Chat con soporte] [Agendar demo personalizada]
```

**Flujo técnico:**
1. Sistema verifica completitud de cada paso
2. Muestra checkmarks para pasos completados
3. Muestra warnings para pasos omitidos
4. Crea evento `onboarding.completed`
5. Envía email de bienvenida con recursos
6. Redirect a Dashboard

**Elementos visuales:**
- Confetti animation al cargar
- Checklist visual con iconos
- Cards para próximos pasos
- Barra de progreso: 5/5 ✓

**Criterios de validación:**
- Click en "Ir al Dashboard" → Redirect a `/dashboard`
- Marca usuario como `onboarded` en DB

---

## Flujo de Datos

### Información Recolectada

**De Google Business Profile:**
- Nombre del negocio
- Dirección completa
- Categoría de negocio
- Teléfono
- Horarios (si disponibles)
- URL de reseñas

**Del Usuario:**
- Horarios de operación (confirmación/ajuste)
- Lista de contactos (CSV o manual)
- Preferencias de automatización (timing, canales)
- Plantillas de mensajes personalizadas

### Tablas Pobladas

1. `businesses` - Info del negocio
2. `business_hours` - Horarios por día
3. `contacts` - Clientes importados
4. `automation_flows` - Flujo de review request
5. `message_templates` - Plantilla personalizada (si editada)

---

## Métricas de Éxito del Onboarding

### Métricas de Completitud
- **Tasa de inicio:** % usuarios que comienzan onboarding
- **Tasa de completitud:** % usuarios que completan todos los pasos
- **Tiempo promedio:** Minutos para completar
- **Tasa de abandono por paso:** % que abandona en cada pantalla

### Objetivos
- Tasa de completitud > 70%
- Tiempo promedio < 10 minutos
- Tasa de abandono en Paso 2 (GMB) < 20%

### Puntos de Fricción Comunes
- **Paso 2 (GMB):** OAuth puede fallar, usuario no tiene GMB
- **Paso 4 (Contactos):** CSV mal formateado, no tienen lista digital
- **Paso 5 (Reseñas):** Confusión sobre timing óptimo

### Optimizaciones Futuras
- Video tutorial embebido en cada paso
- Chat de soporte en vivo durante onboarding
- Opción de "Completar por mí" con valores por defecto
- Onboarding asistido por IA (chatbot)

---

## Variaciones por Tipo de Negocio

### Barbería/Salón
- Énfasis en horarios lentos (Smart Filler)
- Plantillas de mensajes más casuales
- Sugerencia de programa de lealtad

### Spa
- Énfasis en experiencia premium
- Plantillas de mensajes más formales
- Sugerencia de paquetes y membresías

### Restaurante
- Énfasis en reseñas de comida
- Integración con delivery platforms
- Sugerencia de promociones por horario

---

## Soporte Durante Onboarding

### Tooltips Contextuales
- Cada campo tiene "?" con explicación
- Ejemplos de datos correctos
- Links a help center

### Intercom/Chat
- Bot responde preguntas frecuentes
- Escalación a humano si necesario
- Horario: 9am-6pm hora local

### Email de Seguimiento
- Si usuario abandona → Email a las 24h
- "¿Necesitas ayuda para completar tu configuración?"
- Link directo al paso donde abandonó

---

## Conclusión

El flujo de onboarding es crítico para la activación de usuarios. Un onboarding bien diseñado reduce el time-to-value y aumenta la retención a largo plazo. Este flujo debe ser constantemente optimizado basado en datos de comportamiento de usuarios reales.
