# Система Іконок (Font Awesome Pro)

У проекті Ways2Spain ми використовуємо **Font Awesome 6 Pro** (Regular, Solid, Light, Duotone). Це забезпечує єдиний стиль, професійну якість іконок та легкість масштабування.

## 1. Як це працює

Ми не використовуємо прямий імпорт Font Awesome у компонентах (щоб уникнути хаосу в коді). Замість цього ми маємо **централізований реєстр** і **універсальний компонент**.

### Основні файли

1.  `src/components/ui/icons/registry.tsx`: **Реєстр**. Тут ми імпортуємо іконку з пакета FA і даємо їй коротке ім'я (наприклад, `calendar` замість `faCalendarDays`).
2.  `src/components/ui/icons/types.ts`: **Типи**. Тут ми додаємо це коротке ім'я в список дозволених (`IconName`).
3.  `src/components/ui/icons/index.tsx`: **Компонент**. `<Icon />` відповідає за рендеринг і розміри.

---

## 2. Як додати нову іконку (Workflow)

Процес займає менше хвилини.

### Крок 1: Знайти іконку

Зайди на [Font Awesome Search](https://fontawesome.com/search) і знайди потрібну іконку (наприклад, `coffee` зі стилю Regular).

### Крок 2: Додати в код

Тобі потрібно оновити два файли.

**A. `src/components/ui/icons/registry.tsx`**

```tsx
import { faCoffee } from "@fortawesome/pro-regular-svg-icons"; // Імпорт

export const iconsRegistry = {
  // ... інші іконки
  coffee: faCoffee, // Додавання в об'єкт
};
```

**B. `src/components/ui/icons/types.ts`**

```tsx
export type IconName =
  | "calendar"
  // ...
  | "coffee"; // Додавання в тип
```

### Крок 3: Використати

```tsx
<Icon name="coffee" />
```

---

## 3. Пам'ятка по використанню (Cheatsheet)

### Базове використання

```tsx
<Icon name="user" />
```

За замовчуванням розмір - `md` (20px).

### Розміри (Фіксовані)

Використовуй ці пропси для стандартних кнопок та інтерфейсів:

```tsx
<Icon name="close" size="sm" /> // 16px (w-4 h-4)
<Icon name="user" size="md" />  // 20px (w-5 h-5) - Стандарт
<Icon name="arrowRight" size="lg" /> // 24px (w-6 h-6)
<Icon name="check" size="xl" /> // 32px (w-8 h-8)
```

### Розміри (Адаптивні / Responsive)

Якщо іконка має змінювати розмір на різних екранах (як у блозі), використовуй `size="responsive"` і Tailwind класи:

```tsx
<Icon
  name="clock"
  size="responsive"
  className="w-5 h-5 md:w-6 md:h-6 text-gray-500"
/>
```

### Стилізація (Колір, Відступи)

Колір успадковується від тексту (`currentColor`).

```tsx
<Icon name="warning" className="text-red-500 mr-2" />
```

### Анімація

```tsx
<Icon name="spinner" spin />
<Icon name="arrowRight" rotation={90} />
```

---

## 4. Промпти для AI Агента

Коли ти просиш агента додати іконки, використовуй такі формулювання:

**Додавання нової іконки:**

> "Додай іконку `map-pin` (Regular) з Font Awesome в систему. Назви її `mapPin`."

**Використання в компоненті:**

> "Встав іконку `mapPin` перед адресою. Використовуй розмір `sm` і світло-сірий колір."

**Адаптивна іконка:**

> "Додай іконку `search`. На мобільному вона має бути 20px, а на десктопі 24px."

---

## 5. Технічні деталі (Admin Only)

- Token: `FONTAWESOME_NPM_AUTH_TOKEN` (в `.env.local` та Vercel).
- Config: `.npmrc` налаштований на `npm.fontawesome.com`.
- Global CSS: Імпортований в `src/app/(site)/layout.tsx` (autoAddCss=false).
