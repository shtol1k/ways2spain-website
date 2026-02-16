# Інструкція для AI Agent: Реєстрація Іконок

Коли користувач просить "Зареєструвати іконки" з папки `src/assets/icons/input/`, виконуй наступні кроки:

## 1. Аналіз вхідних файлів

Перевір папку `src/assets/icons/input/`.
Шукай пари файлів або поодинокі файли:

- `icon-name.svg` (Універсальна)
- `icon-name-md.svg` (Тільки для MD - 20px)
- `icon-name-lg.svg` (Тільки для LG - 24px)

## 2. Генерація React Компонентів

Для кожного SVG файлу створи компонент у папці `src/components/ui/icons/custom/<icon-name>/`.

**Шаблон компонента (TypeScript):**

```tsx
import React from "react";
import { LucideProps } from "lucide-react";

export const IconNameSize = ({ ...props }: LucideProps) => (
  <svg
    viewBox="0 0 24 24" // ВАЖЛИВО: Бери viewBox з оригінального SVG! (для MD може бути 0 0 20 20)
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Дозволяє передавати кольори та стилі
  >
    {/* Встав вміст SVG тегу (path, circle, etc.) */}
    {/* Заміни фіксовані кольори (наприклад, #333) на "currentColor" */}
  </svg>
);
```

**Правила обробки SVG:**

1. **ViewBox**: Обов'язково зберігай `viewBox` як у Figma експорті. Це гарантує правильні відступи.
2. **Розміри**: Видали атрибути `width` та `height` із кореневого тегу `<svg>`. Розмір контролюється CSS-класами батьківського контейнера.
3. **Колір**: Заміни всі `stroke="..."` або `fill="..."` (якщо вони не `none`) на `currentColor`.

## 3. Оновлення Реєстру

Відкрий `src/components/ui/icons/registry.tsx`.
Імпортуй нові компоненти.
Додай запис у об'єкт `iconsRegistry`:

**Варіант А: Окремі іконки для розмірів (Twin-icon pattern)**

```typescript
import { CalendarMd } from "./custom/calendar/CalendarMd";
import { CalendarLg } from "./custom/calendar/CalendarLg";

export const iconsRegistry = {
  // ...
  calendar: {
    md: CalendarMd, // Буде використано для size="md" (20px container)
    lg: CalendarLg, // Буде використано для size="lg" (24px container)
  },
};
```

**Варіант Б: Одна універсальна іконка**

```typescript
import { MyIcon } from "./custom/my-icon/MyIcon";

export const iconsRegistry = {
  // ...
  myIcon: MyIcon, // Масштабується однаково для всіх
};
```

## 4. Очищення

Після успішної реєстрації запропонуй перемістити SVG файли з `src/assets/icons/input/` в архів `src/assets/icons/archive/` або видалити їх.
