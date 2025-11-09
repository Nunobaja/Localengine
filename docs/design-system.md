# Local Business Growth Companion - Design System

## Overview

Este documento define el sistema de diseño visual para Local Business Growth Companion, una plataforma SaaS profesional dirigida a propietarios de negocios locales.

---

## Color Palette

### Primary Colors

**Blue (#007BFF)**
- Usage: Primary CTAs, links, active states
- HSL: `215 100% 50%`
- Foreground: White `#FFFFFF`

### Background Colors

**Very Light Gray (#F7F9FA)**
- Usage: Main background, page base
- HSL: `210 20% 98%`
- Creates a clean, professional atmosphere

**White (#FFFFFF)**
- Usage: Cards, modals, elevated surfaces
- HSL: `0 0% 100%`
- Provides clear content separation

### Text Colors

**Foreground (#1C2127)**
- Usage: Primary text, headings
- HSL: `222 47% 11%`
- High contrast for excellent readability

**Muted Foreground (#6B7280)**
- Usage: Secondary text, descriptions, labels
- HSL: `215 16% 47%`
- Softer contrast for supporting content

### Accent Colors (Feature Icons)

- **Yellow (#FEF3C7)**: Reviews, ratings - `bg-yellow-100`
- **Blue (#DBEAFE)**: Contacts, analytics - `bg-blue-100`
- **Green (#D1FAE5)**: Growth, success - `bg-green-100`
- **Purple (#E9D5FF)**: Automation, smart features - `bg-purple-100`
- **Pink (#FCE7F3)**: Referrals, social - `bg-pink-100`
- **Orange (#FED7AA)**: Alerts, promotions - `bg-orange-100`

### Borders & Dividers

**Border (#E5E7EB)**
- Usage: Card borders, dividers, input borders
- HSL: `214 32% 91%`
- Subtle separation without visual noise

---

## Typography

### Font Family

**Primary: Inter**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

**Weights Available:**
- Light (300): Rarely used
- Regular (400): Body text
- Medium (500): Subheadings, labels
- Semibold (600): Section titles
- Bold (700): Main headings
- Extra Bold (800): Hero headlines

### Type Scale

**H1 - Hero Headline**
```css
font-size: 3rem (48px) / 3.75rem (60px) on desktop
font-weight: 700 (bold)
line-height: tight
```

**H2 - Section Headline**
```css
font-size: 1.875rem (30px) / 2.25rem (36px) on desktop
font-weight: 700 (bold)
line-height: tight
```

**H3 - Card Title**
```css
font-size: 1.25rem (20px) / 1.5rem (24px) on desktop
font-weight: 600 (semibold)
```

**Body Text**
```css
font-size: 1rem (16px)
font-weight: 400 (regular)
line-height: 1.5
```

**Small Text**
```css
font-size: 0.875rem (14px)
font-weight: 400 (regular)
color: muted-foreground
```

---

## Spacing System

Based on 4px base unit (Tailwind default):

- **xs**: 0.5rem (8px) - Tight spacing
- **sm**: 0.75rem (12px) - Compact spacing
- **base**: 1rem (16px) - Default spacing
- **lg**: 1.5rem (24px) - Comfortable spacing
- **xl**: 2rem (32px) - Section spacing
- **2xl**: 3rem (48px) - Large section spacing
- **3xl**: 4rem (64px) - Hero spacing

### Vertical Rhythm

- **Between sections**: 5rem (80px) - `py-20`
- **Between cards**: 1.5rem (24px) - `gap-6`
- **Card padding**: 1.5rem (24px) - `p-6`
- **Container padding**: 1rem mobile / 2rem desktop

---

## Components

### Buttons

**Primary Button**
```tsx
<Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
  Ver Demo
</Button>
```
- Background: Blue #007BFF
- Hover: 90% opacity
- Text: White, semibold
- Padding: px-8 py-6 (large), px-6 py-3 (default)
- Shadow: Soft shadow that increases on hover

**Secondary Button**
```tsx
<Button variant="outline" className="border-2 border-border hover:bg-accent">
  Conocer Más
</Button>
```
- Border: 2px solid border color
- Hover: Light gray background
- Text: Foreground color

### Cards

**Standard Card**
```tsx
<Card className="border border-border bg-white hover:shadow-md transition-shadow">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>
```
- Background: White
- Border: 1px solid border color
- Border radius: 0.5rem (8px)
- Shadow: Subtle on default, medium on hover
- Transition: Smooth shadow transition

**Feature Card (with icon)**
```tsx
<div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
  <Icon className="h-6 w-6 text-blue-600" />
</div>
```
- Icon container: 48x48px, rounded-lg
- Icon size: 24x24px
- Background: Pastel color (100 shade)
- Icon color: Darker shade (600)

### Metrics Cards

**Dashboard Metric**
```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium text-muted-foreground">
      Label
    </CardTitle>
    <Icon className="h-4 w-4" />
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold text-foreground">123</div>
    <p className="text-xs text-muted-foreground">Description</p>
  </CardContent>
</Card>
```
- Label: Small, muted
- Value: 3xl, bold, foreground
- Description: xs, muted
- Icon: 16x16px, positioned top-right

---

## Layout Patterns

### Hero Section

```tsx
<section className="py-20 md:py-32 bg-gradient-to-b from-blue-50/50 to-white">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
        ...
      </div>
      
      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-bold">...</h1>
      
      {/* Subheadline */}
      <p className="text-xl text-muted-foreground">...</p>
      
      {/* CTAs */}
      <div className="flex gap-4">...</div>
      
      {/* Trust indicators */}
      <div className="flex gap-6 text-sm">...</div>
    </div>
  </div>
</section>
```

### Features Grid

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
  {features.map(feature => (
    <Card>...</Card>
  ))}
</div>
```
- 1 column mobile
- 2 columns tablet
- 3 columns desktop
- Gap: 1.5rem (24px)
- Max width: 1152px (6xl)

### Dashboard Layout

- Sidebar: White background, border-right
- Main content: Light gray background
- Cards: White with subtle shadows
- Metrics: 4-column grid on desktop, 2 on tablet, 1 on mobile

---

## Shadows

**Subtle (Default Cards)**
```css
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
```

**Medium (Hover State)**
```css
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
```

**Large (CTAs)**
```css
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
```

---

## Accessibility

### Contrast Ratios

- **Foreground on Background**: 15.8:1 (AAA)
- **Muted Foreground on Background**: 4.6:1 (AA)
- **Primary on White**: 4.5:1 (AA)

### Focus States

All interactive elements have visible focus rings:
```css
outline: 2px solid hsl(var(--ring) / 0.5);
```

### Responsive Design

- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch targets: Minimum 44x44px
- Font scaling: Responsive type scale

---

## Best Practices

### Do's ✅

- Use semantic color tokens (`bg-background`, `text-foreground`)
- Maintain consistent spacing with Tailwind utilities
- Apply hover states to interactive elements
- Use soft shadows for depth
- Keep text hierarchy clear with font sizes and weights
- Ensure sufficient color contrast
- Use icons from lucide-react for consistency

### Don'ts ❌

- Don't use hard-coded color values
- Don't mix different shadow styles
- Don't use more than 3 font weights per page
- Don't create custom spacing values
- Don't use saturated colors for large areas
- Don't forget mobile responsiveness
- Don't use emoji in professional contexts

---

## Component Library

All components use shadcn/ui as the base:
- Button
- Card
- Input
- Select
- Dialog
- Toast
- Tooltip

Customizations are applied via Tailwind classes and CSS variables in `index.css`.

---

## File References

- **Colors & Theme**: `client/src/index.css`
- **Typography**: `client/index.html` (Google Fonts), `client/src/index.css` (base styles)
- **Components**: `client/src/components/ui/*`
- **Landing Page**: `client/src/pages/Home.tsx`
- **Dashboard**: `client/src/pages/Dashboard.tsx`

---

**Last Updated**: November 2025
**Version**: 2.0 (Visual Redesign)
