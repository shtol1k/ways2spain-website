# Icon Management System

## Workflow

Цей проект використовує централізовану систему управління іконками.

### Для розробника / AI Агента:

1. **Додавання нових SVG іконок**:
   - Покладіть нові SVG файли в папку `src/assets/icons/input/`.
   - Назвіть файли відповідно до бажаного розміру, якщо вони різні: `icon-name-md.svg` або `icon-name-lg.svg`.
   - Якщо іконка універсальна, просто `icon-name.svg`.

2. **Завдання для AI**:
   - "Проскануй папку `src/assets/icons/input/` і зареєструй нові іконки".
   - AI повинен:
     - Створити React компоненти в `src/components/ui/icons/custom/`.
     - Оновити `src/components/ui/icons/registry.tsx`.

3. **Використання в коді**:

   ```tsx
   import { Icon } from '@/components/ui/icons';

   <Icon name="calendar" size="md" /> // 20px
   <Icon name="calendar" size="lg" /> // 24px
   ```

## Структура

- `index.tsx`: Головний компонент `<Icon />`.
- `registry.tsx`: Мапінг імен на компоненти.
- `types.ts`: Типи для іконок.
- `custom/`: Папка для згенерованих компонентів.

## Best Practices

- Всі іконки повинні мати `currentColor` для `stroke` або `fill`.
- Всі іконки повинні коректно масштабуватися всередині батьківського контейнера (width="100%" height="100%").
