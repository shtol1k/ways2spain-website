# Blog Implementation Plan

Детальний план інтеграції блогу з Payload CMS для управління контентом.

**Створено**: 2026-02-03  
**Статус**: В процесі

---

## 📋 Зміст

1. [Фаза 1: Backend - Колекції Payload](#фаза-1-backend---колекції-payload)
2. [Фаза 2: Frontend - Сторінки блогу](#фаза-2-frontend---сторінки-блогу)
3. [Фаза 3: SEO оптимізація](#фаза-3-seo-оптимізація)
4. [Фаза 4: Додатковий функціонал](#фаза-4-додатковий-функціонал)
5. [Майбутні покращення](#майбутні-покращення)

---

## Фаза 1: Backend - Колекції Payload

### 1.1 Колекція Categories ✅

- [✓] Створити колекцію `Categories` з полями:
  - `name` (text, required) — назва категорії
  - `slug` (text, unique) — URL-friendly ідентифікатор
  - `description` (textarea) — опис категорії
  - `order` (number) — порядок сортування
- [✓] Створити міграцію для таблиці categories
  - Файл: `20260203_180000_create-categories-table.ts`
- [✓] Додати колекцію до `payload.config.ts`
- [✓] Налаштувати права доступу (read: public, write: admin/manager)
- [✓] Додати початкові категорії (seed data через міграцію):
  - Файл: `20260203_180100_seed-blog-categories.ts`
  - Інструкції, Документи, Податки, Поради, Родина, Порівняння
- [✓] Запустити міграції (`npx payload migrate`)
- [✓] Виправити проблему з `payload_locked_documents_rels`
  - Файл: `20260203_180200_add-categories-to-locked-docs.ts`

### 1.2 Колекція Tags

- [✓] Створити колекцію `Tags` з полями:
  - `name` (text, required) — назва тега
  - `slug` (text, unique) — URL-friendly ідентифікатор
- [✓] Створити міграцію для таблиці tags
- [✓] Додати колекцію до `payload.config.ts`
- [✓] Налаштувати права доступу (read: public, write: admin/manager)

### 1.3 Колекція Authors

- [✓] Створити колекцію `Authors` з полями:
  - `name` (text, required) — ім'я автора
  - `slug` (text, unique) — URL-friendly ідентифікатор
  - `photo` (upload → Media) — фото автора
  - `bio` (textarea) — коротка біографія
  - `role` (text) — посада/роль
  - `socialLinks` (array):
    - `platform` (select: linkedin, twitter, instagram, facebook)
    - `url` (text)
  - `user` (relationship → Users, optional) — зв'язок з користувачем CMS
- [✓] Створити міграцію для таблиці authors
- [✓] Додати колекцію до `payload.config.ts`
- [✓] Налаштувати права доступу

### 1.4 Колекція Posts

- [✓] Створити колекцію `Posts` з полями:
  - **Основний контент:**
    - `title` (text, required) — заголовок статті
    - `slug` (text, unique, required) — URL-friendly ідентифікатор
    - `excerpt` (textarea, required) — короткий опис для карток
    - `content` (richText/Lexical) — повний контент статті
    - `featuredImage` (upload → Media) — головне зображення
  - **Метадані:**
    - `author` (relationship → Authors) — автор статті
    - `category` (relationship → Categories) — категорія
    - `tags` (relationship → Tags, hasMany) — теги
    - `readTime` (number) — час читання в хвилинах
  - **Публікація:**
    - `status` (select: draft, published, scheduled) — статус
    - `publishedAt` (date) — дата публікації
    - `scheduledFor` (date, optional) — запланована дата публікації
  - **SEO:**
    - `metaTitle` (text) — SEO заголовок
    - `metaDescription` (textarea) — SEO опис
    - `metaImage` (upload → Media, optional) — OG image якщо відрізняється від featuredImage
  - **Зв'язки:**
    - `relatedPosts` (relationship → Posts, hasMany) — пов'язані статті
  - **Системні:**
    - `isFeatured` (checkbox) — показувати як головну статтю
    - `views` (number, hidden) — кількість переглядів (опціонально)
- [✓] Створити міграцію для таблиці posts та зв'язків
- [✓] Додати колекцію до `payload.config.ts`
- [✓] Налаштувати права доступу:
  - read: публічний для published статей
  - create/update: admin/manager
  - delete: admin
- [ ] Налаштувати автоматичну генерацію slug з title
- [✓] Додати валідацію (required fields, slug format)
- [✓] Додати хуки для автоматичного розрахунку readTime

---

## Фаза 2: Frontend - Сторінки блогу

### 2.1 API та утиліти

- [✓] Створити API функції для отримання даних з Payload:
  - `getPosts()` — список статей з пагінацією
  - `getPostBySlug(slug)` — окрема стаття
  - `getCategories()` — список категорій
  - `getTags()` — список тегів
  - `getPostsByCategory(slug)` — статті за категорією
  - `getPostsByTag(slug)` — статті за тегом
  - `getFeaturedPost()` — головна стаття
  - `getRelatedPosts(postId)` — пов'язані статті
- [✓] Налаштувати кешування (ISR/revalidate)

### 2.2 Сторінка списку статей `/blog`

- [✓] Оновити `src/app/(site)/blog/page.tsx`:
  - Замінити хардкод дані на API виклики
  - Відображати Featured Post
  - Відображати сітку статей
- [✓] Реалізувати пагінацію:
  - Кнопки "Попередня" / "Наступна"
  - URL параметри: `/blog?page=2`
- [✓] Додати фільтрацію за категорією
- [✓] Відображати категорію, дату, час читання, featuredImage

### 2.3 Сторінка статті `/blog/[slug]`

- [✓] Оновити роутинг з `[id]` на `[slug]`
- [✓] Оновити `BlogPostContent.tsx`:
  - Рендеринг Lexical richText контенту
  - Відображення featuredImage
  - Інформація про автора
  - Категорія та теги
  - Дата публікації та час читання
- [✓] Компонент Related Posts
- [✓] Компонент Author Card
- [✓] Breadcrumbs навігація
- [✓] Кнопки шарингу (оновити функціонал)

### 2.4 Сторінки категорій `/blog/category/[slug]`

- [✓] Створити динамічну сторінку для категорій
- [✓] Відображати статті відфільтровані за категорією
- [✓] Пагінація в межах категорії
- [✓] SEO метадані для категорій

### 2.5 Сторінки тегів `/blog/tag/[slug]`

- [✓] Створити динамічну сторінку для тегів
- [✓] Відображати статті відфільтровані за тегом
- [✓] Пагінація в межах тега
- [✓] SEO метадані для тегів

### 2.6 Сторінки авторів `/blog/author/[slug]`

- [✓] Створити динамічну сторінку для авторів
- [✓] Відображати статті автора
- [✓] Author Card компонент з біографією
- [✓] SEO метадані для авторів

---

## Фаза 3: SEO оптимізація

### 3.1 Метадані

- [✓] Динамічні `<title>` та `<meta description>` для статей
- [✓] Open Graph теги:
  - `og:title`
  - `og:description`
  - `og:image`
  - `og:type: article`
  - `og:url`
  - `article:published_time`
  - `article:author`
  - `article:section` (category)
  - `article:tag`
- [ ] Twitter Card теги

### 3.2 Структуровані дані (JSON-LD)

- [✓] Schema.org `Article` / `BlogPosting` для статей
- [✓] Schema.org `BreadcrumbList` для навігації
- [✓] Schema.org `Person` для авторів
- [✓] Schema.org `ItemList` для списку статей

### 3.3 Технічний SEO

- [✓] Canonical URLs для всіх сторінок блогу
- [✓] Оновити `sitemap.xml` — додати всі статті
- [✓] Оновити `robots.txt`
- [✓] Налаштувати proper 404 для неіснуючих статей
- [ ] Редіректи зі старих URL (`/blog/1` → `/blog/slug`) якщо потрібно

---

## Фаза 4: Додатковий функціонал

### 4.1 Пошук

- [✓] Базовий пошук по заголовку та контенту
- [✓] UI компонент пошуку
- [✓] Відображення результатів

### 4.2 Фільтрація

- [✓] Sidebar або dropdown для фільтрації за категорією
- [✓] Фільтрація за тегами
- [✓] Комбінована фільтрація

### 4.3 Запланована публікація (Scheduled Publishing)

- [ ] Логіка перевірки дати публікації при запитах
- [ ] Автоматичне оновлення статусу (cron job або Vercel функція)
- [ ] UI в адмін панелі для вибору дати

### 4.4 Міграція існуючого контенту

- [ ] Створити міграцію для перенесення хардкод статей з `blogPosts.ts`
- [ ] Трансформувати markdown-подібний контент в Lexical формат
- [ ] Видалити `src/data/blogPosts.ts` після міграції

---

## Майбутні покращення

### Локалізація (i18n)

- [ ] Налаштувати Payload i18n для колекцій
- [ ] Поля `title`, `excerpt`, `content` — локалізовані
- [ ] Підтримка UA, EN, ES
- [ ] Мовний перемикач на фронтенді

### RSS Feed

- [✓] Створити `/blog/rss.xml`
- [✓] Генерувати RSS на основі опублікованих статей
- [ ] Додати `<link rel="alternate" type="application/rss+xml">`

### Аналітика

- [ ] Підрахунок переглядів статей
- [ ] Інтеграція з Google Analytics / Plausible
- [ ] Dashboard в адмін панелі (опціонально)

### Newsletter

- [ ] Форма підписки (вже є UI)
- [ ] Інтеграція з email сервісом (Mailchimp, Resend, etc.)
- [ ] Зберігання підписників в Payload

---

## 📝 Нотатки

### Порядок виконання міграцій

1. `categories` — немає залежностей
2. `tags` — немає залежностей  
3. `authors` — залежить від `media`
4. `posts` — залежить від `categories`, `tags`, `authors`, `media`
5. `seed_categories` — початкові дані для категорій
6. `migrate_blog_content` — перенесення існуючих статей

### ⚠️ ВАЖЛИВО: Правила роботи з міграціями

> Детальна документація: **[PAYLOAD_MIGRATIONS_GUIDE.md](./PAYLOAD_MIGRATIONS_GUIDE.md)**

**Основне правило:**
> Завжди використовуй `npx payload migrate:create` для змін схеми БД!

**Чому НЕ ручні міграції для схеми:**
- Payload автоматично додає зв'язки до `payload_locked_documents_rels`
- Генерує правильні індекси
- Враховує системні таблиці

**Workflow для нової колекції:**
```bash
# 1. Створити файл колекції в src/collections/
# 2. Додати до payload.config.ts
# 3. Згенерувати міграцію АВТОМАТИЧНО:
npx payload migrate:create --name add-tags-collection
# 4. Запустити міграцію:
npx payload migrate
# 5. (Опціонально) Seed-дані — окрема ручна міграція
```

**Ручні міграції — тільки для:**
- Seed-дані (INSERT)
- Міграція/трансформація даних
- Очищення застарілих таблиць

### Корисні команди

```bash
# Створити нову міграцію (АВТОМАТИЧНО)
npx payload migrate:create --name add-posts-collection

# Запустити міграції локально
npx payload migrate

# Перевірити статус міграцій
npx payload migrate:status

# Відкотити останню міграцію
npx payload migrate:down
```

### Конвенції іменування

- Slug: kebab-case, тільки латиниця та цифри (`yak-perejty-z-tymchasovogo-zahystu`)
- Колекції: PascalCase в коді, snake_case в БД
- Міграції: `YYYYMMDD_HHMMSS_description.ts`

---

## ✅ Прогрес

| Фаза | Статус | Прогрес |
|------|--------|---------|
| 1.1 Categories | ✅ Готово | 7/7 |
| 1.2 Tags | ✅ Готово | 4/4 |
| 1.3 Authors | ✅ Готово | 4/4 |
| 1.4 Posts | ✅ Готово | 8/8 |
| 2.1 API | ✅ Готово | 2/2 |
| 2.2 Blog List | ✅ Готово | 4/4 |
| 2.3 Blog Post | ✅ Готово | 6/6 |
| 2.4 Categories | ✅ Готово | 4/4 |
| 2.5 Tags | ✅ Готово | 4/4 |
| 2.6 Authors | ✅ Готово | 4/4 |
| 3.1 Meta | ✅ Готово | 2/3 |
| 3.2 JSON-LD | ✅ Готово | 4/4 |
| 3.3 Tech SEO | ✅ Готово | 4/5 |
| 4.1 Search | ✅ Готово | 3/3 |
| 4.2 Filters | ✅ Готово | 3/3 |
| 4.3 Scheduled | ⏳ Очікує | 0/3 |
| 4.4 Migration | ⏳ Очікує | 0/3 |

---

*Останнє оновлення: 2026-02-26*
