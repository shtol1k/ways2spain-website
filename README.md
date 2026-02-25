# Ways2Spain

Сайт для допомоги з релокацією в Іспанію. Побудований на Next.js 16 + Payload CMS 3.

## 🏗️ Архітектура

```
┌─────────────────────────────────────────────────────┐
│              Next.js + Payload CMS                 │
│              (Single Server)                        │
│                      :3000                          │
│                                                     │
│  ┌────────────┐  ┌────────────┐  ┌─────────────┐  │
│  │   Pages    │  │     API    │  │   Payload   │  │
│  │  (App Dir) │  │  (Routes)  │  │    Admin    │  │
│  └────────────┘  └────────────┘  └─────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Supabase   │
                    │ (Database)  │
                    └─────────────┘
```

## 🚀 Технологічний стек

### Frontend
- **Next.js 16** з App Router
- **React 19** з Server Components
- **TypeScript** 5.8+
- **TailwindCSS** 4.1+
- **shadcn/ui** компоненти

### Backend/CMS
- **Payload CMS 3.74**
- **Next.js Route Handlers**
- **PostgreSQL** (Supabase в production)

### Storage
- **Cloudflare R2** для медіа-файлів

## 📁 Структура проекту

```
ways2spain-landing/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (payload)/        # Payload admin та API
│   │   ├── (site)/           # Публічні сторінки сайту
│   │   └── api/              # API route handlers
│   ├── collections/          # Payload collections
│   ├── components/           # React компоненти
│   │   └── ui/              # shadcn/ui компоненти
│   ├── lib/                 # Утиліти
│   └── migrations/          # Database migrations
├── public/                   # Статичні assets
├── documentation/           # Документація проекту
├── scripts/                 # Helper scripts
├── payload.config.ts        # Payload конфігурація
├── next.config.mjs          # Next.js конфігурація
└── package.json
```

## 🛠️ Встановлення

### Передумови

- Node.js 20+
- PostgreSQL для локальної розробки
- npm або bun

### Локальна розробка

```bash
# 1. Клонування репозиторію
git clone <repo-url>
cd ways2spain-landing

# 2. Встановлення залежностей
npm install

# 3. Налаштування змінних оточення
# Створіть файл .env.local з необхідними змінними (див. нижче)

# 4. Ініціалізація бази даних
npm run db:init

# 5. Запуск dev server
npm run dev
```

Сайт буде доступний за адресою http://localhost:3000
Admin панель: http://localhost:3000/admin

## 🔐 Змінні оточення

Створіть файл `.env.local` в корені проекту:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ways2spain

# Payload
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Cloudflare R2 (опціонально)
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=ways2spain-media
R2_PUBLIC_URL=https://your-r2-domain.r2.dev

# Contact form (опціонально)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
NOTION_API_KEY=your-notion-token
NOTION_DATABASE_ID=your-database-id
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

## 📜 Доступні скрипти

```bash
# Development
npm run dev              # Запуск Next.js dev server

# Build
npm run build            # Production build
npm start                # Запуск production server

# Database
npm run migrate          # Запуск міграцій
npm run migrate:refresh  # Перестворення міграцій
npm run db:init          # Ініціалізація бази даних
npm run db:test          # Перевірка з'єднання з БД

# Payload
npm run payload          # Payload CLI
```

## 📚 Документація

- [ARCHITECTURE.md](documentation/ARCHITECTURE.md) - Детальний опис архітектури
- [DEVELOPMENT.md](documentation/DEVELOPMENT.md) - Local development setup
- [DEPLOYMENT.md](documentation/DEPLOYMENT.md) - Deployment guide
- [MIGRATION.md](documentation/MIGRATION.md) - Історія міграції

## 🚀 Deployment

Проект налаштований для розгортання на Vercel.

1. Підключіть репозиторій до Vercel
2. Налаштуйте змінні оточення в Vercel Dashboard
3. Деплой автоматичний при кожному push в main

Дивіться [DEPLOYMENT.md](documentation/DEPLOYMENT.md) для детальної інструкції.

## 🧪 Розробка

### Payload Collections

- **Users** - Користувачі з ролями (admin, manager)
- **Testimonials** - Відгуки клієнтів
- **Media** - Медіа-файли

### Сторінки

- `/` - Головна сторінка
- `/about` - Про нас
- `/services` - Послуги
- `/services/[id]` - Детальна сторінка послуги
- `/blog` - Блог
- `/contact` - Контактна форма
- `/visa` - Віза
- `/calculator` - Калькулятор вартості
- `/consultation` - Консультація

### API Routes

- `/api/contact` - Contact form handler
- `/api/[...slug]` - Payload REST API
- `/graphql` - Payload GraphQL API

## 🤝 Contributing

1. Fork проекту
2. Створіть feature branch (`git checkout -b feature/amazing-feature`)
3. Commit ваші зміни (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Відкрийте Pull Request

## 📄 Ліцензія

© 2025 Ways2Spain. All rights reserved.
