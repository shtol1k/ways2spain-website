---
name: Guides Implementation V2
overview: Розробка повнофункціонального розділу Гайдів з підтримкою категорій, accordion кроків (через blocks), PDF експорт через Print CSS, callout блоків, FAQ секції та інтеграцією з Payload CMS. Використовується правильний workflow міграцій через вбудовані механізми Payload.
todos:
  - id: backend-collections
    content: Створити Payload CMS колекції GuideCategories та Guides (з blocks для кроків) та зареєструвати їх в config
    status: pending
  - id: migrations
    content: Згенерувати та застосувати міграції через payload migrate:create, перевірити в admin panel
    status: pending
  - id: api-functions
    content: Створити API функції для guides (getGuides, getGuideBySlug, getGuidesByCategory, тощо)
    status: pending
  - id: core-components
    content: "Створити основні компоненти: Callout, GuideStep, GuideSummary"
    status: pending
  - id: pages-foundation
    content: "Створити pages: /guides (список), /guides/[category]/[slug] (окремий гайд)"
    status: pending
  - id: supporting-components
    content: "Створити допоміжні компоненти: GuideResources, TableOfContents, GuideFAQ, GuideCard, PrintButton, PrintStyles"
    status: pending
  - id: seo-optimization
    content: "Додати SEO: metadata, sitemap entries, JSON-LD schemas (HowTo, FAQ, Breadcrumbs)"
    status: pending
  - id: integration-testing
    content: Інтегрувати в навігацію, протестувати всі функції та responsive дизайн
    status: pending
isProject: false
---

# План розробки розділу Гайдів (Guides)

## Огляд функціоналу

Розділ Гайдів призначений для пошагових інструкцій щодо складних державних процедур в Іспанії (отримання візи Digital Nomad, відкриття autónomo, перереєстрація автомобіля тощо). Гайди з підтримкою категорій, експорту в PDF, інтерактивних кроків з accordion, callout блоків та FAQ секцій.

**Ключові зміни від попереднього плану:**

- ❌ Окремої колекції GuideSteps не буде — кроки це blocks в Lexical editor
- ✅ Міграції створюються ЛИШЕ через `payload migrate:create` (автоматично)
- ✅ Ручні міграції — тільки для seed-даних

## Структура URL та роутинг

```
/guides — список всіх гайдів з фільтрацією за категоріями
/guides/[category]/[slug] — окремий гайд з повним контентом
```

---

## Фаза 1: Backend — Payload CMS колекції

### 1.1 Створення колекції GuideCategories

**Файл:** `[src/collections/GuideCategories.ts](src/collections/GuideCategories.ts)`

**Поля:**

- `name` (text, required) — назва категорії
- `slug` (text, required, unique) — URL-ідентифікатор (автогенерація з name)
- `description` (textarea) — опис категорії
- `icon` (text) — назва іконки (напр. "FileText", "Car")
- `order` (number, default: 0) — порядок сортування
- `color` (text) — колір для badges (hex, напр. "#3b82f6")

**Особливості:**

- Доступ: публічне читання; admin/manager — створення/редагування
- Сортування за `order`
- Група в адмінці: "Guides"
- Slug з транслітерацією (як у Posts)

### 1.2 Створення колекції Guides

**Файл:** `[src/collections/Guides.ts](src/collections/Guides.ts)`

**Базові дані:**

- `title` (text, required) — заголовок гайду
- `slug` (text, required, unique) — автогенерація з title
- `excerpt` (textarea, required) — короткий опис (150-200 символів)
- `category` (relationship → guide-categories, required) — категорія
- `featuredImage` (upload → media) — головне зображення

**Summary блок (group):**

- `totalCost` (text) — вартість держмита
- `estimatedDuration` (text) — тривалість процесу
- `format` (select, hasMany) — формат: online, hybrid, offline
- `requirements` (array of text) — вимоги до виконавця
- `lastUpdated` (date) — дата оновлення

**Контент:**

- `introduction` (richText) — вступний текст
- `introduction_html` (lexicalHTML)
- `steps` (blocks) — **⚠️ ВАЖЛИВО: blocks array замість relationship!**
  - Block slug: `guideStep`
  - Поля кожного block:
    - `title` (text, required) — назва кроку
    - `content` (richText, required) — опис кроку
    - `content_html` (lexicalHTML)
    - `estimatedTime` (text) — час виконання
    - `difficulty` (select) — easy/medium/hard
    - `requiredDocuments` (array of text)
    - `callouts` (blocks) — вкладені callout блоки:
      - Block slug: `callout`
      - `type` (select): info/warning/alert/success
      - `title` (text)
      - `content` (richText)
- `conclusion` (richText) — підсумковий текст
- `conclusion_html` (lexicalHTML)

**Resources блок (array):**

- `title` (text) — назва ресурсу
- `url` (text) — URL
- `type` (select) — website/pdf/video/form
- `description` (text) — короткий опис

**FAQ блок (array):**

- `question` (text, required)
- `answer` (richText, required)
- `answer_html` (lexicalHTML)

**SEO поля (tab):**

- `metaTitle`, `metaDescription`, `metaImage`

**Особливості:**

- Версійність (drafts: true)
- Доступ: публічне читання опублікованих; admin/manager — CRUD
- Hooks: `afterChange`, `afterDelete` для revalidation

### 1.3 Реєстрація колекцій

**Оновити:** `[payload.config.ts](payload.config.ts)`

```typescript
collections: [
  Users,
  Testimonials,
  Media,
  Categories,
  Tags,
  Authors,
  Posts,
  GuideCategories, // нова
  Guides,          // нова
],
```

### 1.4 Створення та застосування міграцій ⚠️

**КРИТИЧНО ВАЖЛИВО:** Використовувати ЛИШЕ вбудовані механізми Payload CMS!

**Workflow згідно з `[documentation/MIGRATION_WORKFLOW.md](documentation/MIGRATION_WORKFLOW.md)`:**

**Крок 1: Після створення файлів колекцій**

```bash
npm run payload -- migrate:create add-guides-collections
```

**Що відбудеться автоматично:**

- Payload проаналізує різницю між кодом та БД
- Створить міграцію в `src/migrations/YYYYMMDD_HHMMSS_add-guides-collections.ts`
- Згенерує SQL для:
  - `CREATE TABLE guide_categories`
  - `CREATE TABLE guides`
  - `ALTER TABLE payload_locked_documents_rels` (додасть guide_categories_id, guides_id)
  - CREATE INDEX для всіх необхідних полів
  - Таблиці для blocks якщо потрібно

**Крок 2: Перевірити міграцію**

- Відкрити згенерований файл
- Переконатись що SQL коректний
- Перевірити наявність колонок у `payload_locked_documents_rels`

**Крок 3: Застосувати міграцію**

```bash
npm run migrate
```

**Крок 4: Перезапустити dev server**

```bash
npm run dev:next
```

**Крок 5: Перевірити в admin panel**

- Відкрити [http://localhost:3000/admin](http://localhost:3000/admin)
- Перевірити що колекції видимі
- Спробувати створити тестовий гайд
- Спробувати відредагувати (перевірка locked_documents)

**Чеклист:**

- Міграція створена через `payload migrate:create`
- SQL перевірений вручну
- Міграція застосована через `npm run migrate`
- Dev server перезапущений
- Колекції видимі в admin
- Можна створювати/редагувати записи
- Немає hydration errors

**Seed-дані (опціонально):**

Після успішних міграцій можна створити ручну міграцію для початкових категорій:

```bash
npm run payload -- migrate:create seed-guide-categories
```

Приклад seed-міграції:

```typescript
// src/migrations/20260207_XXXXXX_seed-guide-categories.ts
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    INSERT INTO "guide_categories" ("name", "slug", "description", "order", "color") VALUES 
    ('Візи та дозволи', 'visas', 'Інструкції з отримання віз та дозволів на проживання', 1, '#3b82f6'),
    ('Документи', 'documents', 'Оформлення документів та посвідчень', 2, '#10b981'),
    ('Автомобілі', 'vehicles', 'Реєстрація та перереєстрація транспорту', 3, '#f59e0b'),
    ('Медицина', 'healthcare', 'Медичне страхування та лікування', 4, '#ef4444'),
    ('Бізнес', 'business', 'Відкриття та ведення бізнесу', 5, '#8b5cf6');
  `)
}
```

---

## Фаза 2: API функції

**Файл:** `[src/api/guides.ts](src/api/guides.ts)`

**Функції:**

```typescript
// Отримати всі гайди з пагінацією
export async function getGuides(page = 1, limit = 12): Promise<GuidesResponse>

// Отримати гайд за category slug та guide slug
export async function getGuideBySlug(
  categorySlug: string, 
  slug: string
): Promise<Guide | null>

// Отримати гайди за категорією
export async function getGuidesByCategory(
  categorySlug: string, 
  page = 1, 
  limit = 12
): Promise<GuidesResponse>

// Отримати всі категорії
export async function getGuideCategories(): Promise<GuideCategory[]>

// Отримати категорію за slug
export async function getGuideCategoryBySlug(slug: string): Promise<GuideCategory | null>

// Отримати пов'язані гайди
export async function getRelatedGuides(
  categoryId: number, 
  excludeId: number, 
  limit = 3
): Promise<Guide[]>
```

**Важливо:**

- Використовувати `depth: 2` для populate relationships
- Кроки вже в контенті гайду (blocks), не потрібна окрема функція

---

## Фаза 3: Frontend компоненти

### 3.1 Callout компонент

**Файл:** `[src/components/ui/callout.tsx](src/components/ui/callout.tsx)`

Базується на `alert.tsx`, додаємо варіанти:

- `info` (синій) — Info icon
- `warning` (жовтий) — AlertTriangle icon
- `alert` (червоний) — AlertCircle icon
- `success` (зелений) — CheckCircle icon

### 3.2 GuideStep компонент

**Файл:** `[src/components/guides/GuideStep.tsx](src/components/guides/GuideStep.tsx)`

**Props:**

```typescript
interface GuideStepProps {
  step: {
    title: string
    content: any // Lexical JSON або HTML
    estimatedTime?: string
    difficulty?: 'easy' | 'medium' | 'hard'
    requiredDocuments?: string[]
    callouts?: Callout[]
  }
  stepNumber: number
}
```

**Рендеринг:**

- Використовує shadcn Accordion
- Номер кроку як badge
- Парсить та відображає Lexical content
- Рендерить вкладені callouts

### 3.3 GuideSummary компонент

**Файл:** `[src/components/guides/GuideSummary.tsx](src/components/guides/GuideSummary.tsx)`

Card компонент з іконками:

- 💰 Вартість
- ⏱️ Тривалість
- 📋 Вимоги (badges)
- 🌐 Формат
- 📅 Актуальність

### 3.4 GuideResources компонент

**Файл:** `[src/components/guides/GuideResources.tsx](src/components/guides/GuideResources.tsx)`

Sidebar з посиланнями:

- Favicon через Google API: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
- Fallback іконка якщо немає favicon
- Іконки типів ресурсів

### 3.5 TableOfContents компонент

**Файл:** `[src/components/guides/TableOfContents.tsx](src/components/guides/TableOfContents.tsx)`

**Props:**

```typescript
interface TableOfContentsProps {
  steps: Array<{
    title: string
    id?: string
  }>
}
```

- Парсить кроки з blocks
- Smooth scroll
- Active state

### 3.6 GuideFAQ компонент

**Файл:** `[src/components/guides/GuideFAQ.tsx](src/components/guides/GuideFAQ.tsx)`

- Використовує shadcn Accordion (type: "single")
- З bordered variant
- FAQ Schema markup

### 3.7 GuideCard компонент

**Файл:** `[src/components/guides/GuideCard.tsx](src/components/guides/GuideCard.tsx)`

Картка для списків з:

- Featured image
- Category badge з кольором
- Title, excerpt
- Іконки метаданих
- Link на `/guides/[category]/[slug]`

### 3.8 PrintStyles компонент

**Файл:** `[src/components/guides/PrintStyles.tsx](src/components/guides/PrintStyles.tsx)`

CSS з `@media print`:

- Приховати UI елементи
- Розгорнути всі accordion
- Оптимізація для друку

---

## Фаза 4: Pages та роутинг

### 4.1 Сторінка списку

**Файл:** `[src/app/(site)/guides/page.tsx](src/app/(site)`/guides/page.tsx)

Server Component з:

- Hero секція
- Filter за категоріями
- Grid гайдів (GuideCard компоненти)
- SEO metadata

### 4.2 Сторінка окремого гайду

**Файл:** `[src/app/(site)/guides/[category]/[slug]/page.tsx](src/app/(site)`/guides/[category]/[slug]/page.tsx)

**Layout:**

- Main: Breadcrumbs, Header, Summary, Intro, Steps (Accordion), Conclusion, FAQ
- Sidebar: ToC, Resources, Print button

**Features:**

- `generateStaticParams()` для всіх гайдів
- `generateMetadata()` для SEO
- `revalidate = 60` для ISR

---

## Фаза 5: SEO та оптимізація

### 5.1 Metadata

- Open Graph tags
- Twitter Cards
- Canonical URLs

### 5.2 JSON-LD schemas

**Файл:** `[src/lib/guideSchema.ts](src/lib/guideSchema.ts)`

Функції для:

- HowTo schema
- FAQ schema
- Breadcrumb schema

### 5.3 Sitemap

**Оновити:** `[src/app/sitemap.ts](src/app/sitemap.ts)`

Додати entries для:

- `/guides`
- `/guides/[category]/[slug]`

---

## Фаза 6: Hooks та utilities

### 6.1 Revalidation hook

**Файл:** `[src/hooks/revalidateGuide.ts](src/hooks/revalidateGuide.ts)`

Revalidate шляхи після змін:

- `/guides`
- `/guides/[category]/[slug]`
- `/`

### 6.2 Slug generation

Використати існуючий `[src/utilities/transliterate.ts](src/utilities/transliterate.ts)`

---

## Важливі технічні деталі

### Робота з blocks в Lexical

Кроки зберігаються як blocks:

```typescript
{
  name: 'steps',
  type: 'blocks',
  blocks: [
    {
      slug: 'guideStep',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richText', required: true },
        {
          name: 'callouts',
          type: 'blocks',
          blocks: [
            {
              slug: 'callout',
              fields: [
                { name: 'type', type: 'select', options: [...] },
                { name: 'title', type: 'text' },
                { name: 'content', type: 'richText' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
```

### Рендеринг blocks у frontend

```tsx
// Приклад
{guide.steps?.map((step, index) => (
  <GuideStep
    key={step.id}
    step={step}
    stepNumber={index + 1}
  />
))}
```

---

## Порядок виконання

1. **Backend Setup**
  - Створити GuideCategories.ts
  - Створити Guides.ts (з blocks для кроків)
  - Зареєструвати в config
  - **Створити міграцію:** `npm run payload -- migrate:create add-guides-collections`
  - **Застосувати:** `npm run migrate`
  - **Перевірити** в admin panel
2. **API Layer**
  - Створити guides.ts
  - Протестувати через admin
3. **Core Components**
  - Callout, GuideStep, GuideSummary
4. **Pages**
  - /guides (список)
  - /guides/[category]/[slug] (окремий гайд)
5. **Supporting Components**
  - GuideResources, TableOfContents, GuideFAQ, GuideCard, PrintButton/Styles
6. **SEO**
  - Metadata, schemas, sitemap
7. **Integration**
  - Навігація, тестування

---

## Файли що будуть створені

### Collections (2 файли)

- `src/collections/GuideCategories.ts`
- `src/collections/Guides.ts`

### API (1 файл)

- `src/api/guides.ts`

### Components (11 файлів)

- `src/components/ui/callout.tsx`
- `src/components/guides/GuideStep.tsx`
- `src/components/guides/GuideSummary.tsx`
- `src/components/guides/GuideResources.tsx`
- `src/components/guides/TableOfContents.tsx`
- `src/components/guides/GuideFAQ.tsx`
- `src/components/guides/GuideCard.tsx`
- `src/components/guides/PrintStyles.tsx`
- `src/components/guides/PrintButton.tsx`
- `src/components/guides/GuideHeader.tsx`
- `src/components/guides/CategoryFilter.tsx`

### Pages (2 роути)

- `src/app/(site)/guides/page.tsx`
- `src/app/(site)/guides/[category]/[slug]/page.tsx`

### Utils (2 файли)

- `src/lib/guideSchema.ts`
- `src/hooks/revalidateGuide.ts`

### Оновлення

- `payload.config.ts`
- `src/app/sitemap.ts`
- `src/payload-types.ts` (автогенерується)

### Міграції (автоматично створені)

- `src/migrations/YYYYMMDD_HHMMSS_add-guides-collections.ts`
- `src/migrations/YYYYMMDD_HHMMSS_seed-guide-categories.ts` (опціонально)

---

## Оціночний час

- Backend (колекції, міграції, API): 3-5 годин
- Frontend компоненти: 8-12 годин
- Pages та інтеграція: 4-6 годин
- SEO та оптимізація: 2-3 години
- Тестування: 3-4 години

**Загалом:** 20-30 годин

**Примітка:** Час зменшився завдяки використанню blocks замість окремої колекції.

---

## Чеклист перед виконанням

- Прочитано `[documentation/MIGRATION_WORKFLOW.md](documentation/MIGRATION_WORKFLOW.md)`
- Розумію що GuideSteps — це blocks, не окрема колекція
- Знаю як використовувати `payload migrate:create`
- Готовий перевіряти міграції вручну перед застосуванням
- Розумію що ручні міграції — тільки для seed-даних

План готовий до виконання! 🚀