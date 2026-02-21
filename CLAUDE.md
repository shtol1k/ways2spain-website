# Claude Code Instructions — Ways2Spain Landing

## Stack

- **Framework:** Next.js 16 (App Router) + Payload CMS 3.74
- **Language:** TypeScript 5.8+
- **Styling:** Tailwind CSS 4.1.18 via PostCSS
- **UI Primitives:** shadcn/ui (Radix UI + CVA)
- **Icons:** Custom SVG registry (Font Awesome Pro subset)
- **Path alias:** `@/*` → `./src/*`

---

## Component Organization

```
src/components/
├── ui/           # shadcn/ui primitives — reuse these first
│   └── icons/    # Custom icon registry
├── blocks/       # CMS-driven page sections
├── blog/         # Blog-specific components
├── guides/       # Guide-specific components
└── admin/        # Payload admin overrides
```

- **IMPORTANT:** Always check `src/components/ui/` for existing components before creating new ones.
- New page-level components live in `src/components/` (flat, PascalCase filenames).
- New UI primitives live in `src/components/ui/`.
- Feature-specific components live in the matching subdirectory (`blog/`, `guides/`, etc.).

---

## Styling Rules

### Tailwind Utilities

- Use Tailwind utility classes for all styling. No inline styles.
- Custom utilities are registered in `src/styles/theme.css` via `@utility` and `src/app/globals.css` via `@layer utilities`.

### Design Tokens — Colors

**IMPORTANT: Never hardcode hex/HSL colors. Always use the semantic tokens below.**

**Content (text & icons) — use `color-content-*` utilities:**

| Utility | Use case |
|---|---|
| `color-content-primary` | Main headings, high-emphasis text |
| `color-content-secondary` | Body text, descriptions |
| `color-content-tertiary` | Captions, placeholders |
| `color-content-brand` | Brand accents (orange) |
| `color-content-link` | Links (orange) |
| `color-content-info` | Informational (sky) |
| `color-content-notice` | Warnings (yellow) |
| `color-content-negative` | Errors (red) |
| `color-content-positive` | Success (green) |
| `color-content-primary-inverse` | Text on dark backgrounds |
| `color-content-secondary-inverse` | Secondary text on dark backgrounds |

**Backgrounds — use `bg-fill-*` utilities:**

| Utility | Use case |
|---|---|
| `bg-fill-primary` | White surface (default) |
| `bg-fill-primary-hover` | Hover state on white |
| `bg-fill-primary-inverse` | Dark surface |
| `bg-fill-secondary` | Subtle grey surface |
| `bg-fill-tertiary` | Mid-grey surface |
| `bg-fill-brand` | Orange brand background |

**Borders — use CSS variables directly:**

```
border-[var(--color-border-primary)]    /* slate-200 */
border-[var(--color-border-secondary)]  /* slate-300 */
border-[var(--color-border-brand)]      /* orange-600 */
```

**shadcn semantic tokens (used inside shadcn components):**

- `bg-primary / text-primary-foreground` — dark navy (primary action)
- `bg-secondary / text-secondary-foreground` — amber (secondary action)
- `bg-muted / text-muted-foreground` — slate-100 / slate-500
- `bg-background / text-foreground` — white / slate-900

### Typography Utilities

Use semantic typography classes instead of arbitrary Tailwind size classes:

| Class | Description |
|---|---|
| `text-body-large` | 18px / leading-7 |
| `text-body-base` | 16px / leading-6 |
| `text-body-small` | 14px / leading-5 |
| `text-body-extra-small` | 12px / leading-4 |
| `text-ui-nav` | Navigation labels |
| `text-ui-btn-l` | Large button labels |
| `text-ui-btn-m` | Medium button labels |
| `text-ui-label` | Form labels, tags |

Headings (`h1`–`h6`) are styled globally in `src/styles/typography.css` — do not override their `font-size`, `font-weight`, `letter-spacing`, or `color` with Tailwind classes.

### Gradients, Shadows, Transitions

Use utility classes — never reproduce the CSS values inline:

```
gradient-hero        /* Dark navy gradient (hero sections) */
gradient-accent      /* Amber gradient (CTAs, premium) */
gradient-subtle      /* Subtle white→grey (section backgrounds) */
shadow-elegant       /* Soft card shadow */
shadow-strong        /* Prominent shadow (hero cards) */
transition-smooth    /* all 0.3s cubic-bezier(0.4, 0, 0.2, 1) */
```

---

## Button Component

Always use `Button` from `@/components/ui/button`. Do not create raw `<button>` elements for UI actions.

```tsx
import { Button } from "@/components/ui/button";

// Variants: default | destructive | outline | secondary | amber | ghost | link | hero | premium
// Sizes:    default | sm | lg | xl | icon
<Button variant="amber" size="lg">Get Started</Button>
<Button variant="hero" size="xl" asChild><a href="/contact">Contact Us</a></Button>
```

---

## Icon System

**IMPORTANT: Do NOT install new icon packages.**

Icons are custom SVG React components registered in `src/components/ui/icons/registry.tsx`.

**To use an existing icon:**

```tsx
import { Icon } from "@/components/ui/icons";
<Icon name="calendar" size="md" />  // size: "md" (20px) | "lg" (24px)
```

**To register a new icon** (see `src/components/ui/icons/AGENT_INSTRUCTIONS.md`):

1. Place SVG file(s) in `src/assets/icons/input/` following naming: `icon-name.svg` or `icon-name-md.svg` / `icon-name-lg.svg`
2. Create React component(s) in `src/components/ui/icons/custom/<icon-name>/`
3. Set `viewBox` exactly as in the SVG export; remove `width`/`height` attributes
4. Replace hardcoded colors with `currentColor`
5. Register in `src/components/ui/icons/registry.tsx`
6. Move processed SVGs to `src/assets/icons/archive/`

---

## Figma MCP Integration

### Required Workflow

1. Run `get_design_context` for the target node to get structured design data
2. If response is too large, run `get_metadata` first, then `get_design_context` on specific child nodes
3. Run `get_screenshot` for visual reference
4. Download any assets provided via localhost URLs from the Figma MCP server
5. Translate to the project's conventions (tokens, components, typography classes)
6. Validate the final UI against the Figma screenshot before marking complete

### Translation Rules

- The Figma MCP output is React + Tailwind — treat it as a design specification, not final code
- Map Figma color styles to `color-content-*`, `bg-fill-*`, and CSS variable tokens
- Map Figma text styles to `text-body-*`, `text-ui-*`, and heading elements
- Replace generic Tailwind shadows with `shadow-elegant` / `shadow-strong`
- Replace generic Tailwind gradients with `gradient-hero` / `gradient-accent` / `gradient-subtle`
- Use the `Button` component with appropriate variant instead of raw styled buttons
- Use existing shadcn/ui components (`Card`, `Badge`, `Avatar`, etc.) when the design matches

### Asset Rules

- **IMPORTANT:** If Figma MCP returns a localhost source for an image or SVG, use that URL directly — do not replace with placeholders
- Register new icons via the icon registry (see above); do not embed SVGs inline
- Store downloaded raster images in `public/assets/`

---

## Payload CMS Conventions

- Content blocks are defined in `src/blocks/` and registered in `payload.config.ts`
- CMS collections live in `src/collections/`
- Do not modify Payload admin routes in `src/app/(payload)/` unless explicitly asked
- Server Components are the default — only add `"use client"` when interactivity requires it

---

## Code Conventions

- **Imports:** Use `@/` alias — never relative paths beyond one level
- **Component exports:** Named exports for UI components, default exports for page components
- **cn() utility:** Always use `cn()` from `@/lib/utils` to merge class names
- **No magic values:** Do not hardcode pixel values, colors, or font sizes that exist as tokens
- **TypeScript:** Prefer explicit types for component props; extend HTML element attributes where appropriate

---

## File Naming

| Type | Convention | Example |
|---|---|---|
| React components | PascalCase | `CTASection.tsx` |
| shadcn/ui primitives | kebab-case | `button.tsx` |
| Utilities / helpers | camelCase | `formatDate.ts` |
| CSS modules | kebab-case | `hero-section.module.css` |
