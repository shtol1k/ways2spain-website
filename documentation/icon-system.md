# Icon System Documentation

The Ways2Spain project uses **Font Awesome Pro 6** as the core icon system. This provides a consistent, high-quality, and scalable set of icons (Solid, Regular, Light, Duotone brands).

## Architecture

The system is built around a centralized registry and a unified `<Icon />` component. We **do not** import Font Awesome icons directly in UI components. Instead, we use a semantic name (e.g., `calendar`) which maps to a specific Font Awesome definition.

### Key Files

- `src/components/ui/icons/registry.tsx`: **The Source of Truth**. Maps internal icon names to Font Awesome icon definitions.
- `src/components/ui/icons/index.tsx`: The `<Icon />` component. Handles sizing, styling, and rendering.
- `src/components/ui/icons/types.ts`: TypeScript definitions for icon names and props.

## Usage

Use the `<Icon />` component anywhere in the application.

```tsx
import { Icon } from "@/components/ui/icons";

// Basic usage (defaults to size="md" which is 20px)
<Icon name="calendar" />

// Sizing
<Icon name="clock" size="sm" /> // 16px
<Icon name="clock" size="md" /> // 20px
<Icon name="clock" size="lg" /> // 24px
<Icon name="clock" size="xl" /> // 32px

// Styling (Tailwind classes pass through)
<Icon name="warning" className="text-red-500" />
```

## Adding New Icons

To use a new icon from Font Awesome:

1.  **Find the icon**: Go to [Font Awesome Search](https://fontawesome.com/search).
2.  **Update Registry**:
    - Open `src/components/ui/icons/registry.tsx`.
    - Import the icon from the appropriate package (e.g., `@fortawesome/pro-regular-svg-icons`).
    - Add it to the `iconsRegistry` object with a descriptive name.

```tsx
// registry.tsx
import { faCoffee } from "@fortawesome/pro-regular-svg-icons";

export const iconsRegistry = {
  // ... existing icons
  coffee: faCoffee,
};
```

3.  **Update Types**:
    - Open `src/components/ui/icons/types.ts`.
    - Add the new name to the `IconName` type union.

```ts
// types.ts
export type IconName =
  | "calendar"
  // ...
  | "coffee";
```

## Configuration

- **Authentication**: Font Awesome Pro packages are installed via `.npmrc` using the `FONTAWESOME_NPM_AUTH_TOKEN` environment variable.
- **Vercel**: The environment variable must be set in Vercel Project Settings for deployment to work.
