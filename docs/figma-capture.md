# Figma Capture — як це працює

## Загальна схема

Figma MCP використовує capture-скрипт (`capture.js`), що інʼєктується на сторінку та серіалізує DOM у дані для Figma. Процес завжди складається з двох кроків: генерація `captureId` → відкриття сторінки з хешем → відправка даних → отримання результату.

```
Claude (MCP) → generate captureId → browser opens page + script → page POSTs to Figma API → Claude polls result → Figma file updated
```

---

## captureId

- Генерується через Figma MCP: `generate_figma_design(outputMode, fileKey)`
- **Одноразовий** — один ID = один capture однієї сторінки
- Вбудований в URL-хеш і в endpoint для відправки даних
- Після успішного capture повторне використання неможливе

---

## Обовʼязкові умови для capture

1. **`capture.js` повинен бути на сторінці** — без нього URL-хеш нічого не робить
2. **Сторінка повинна бути на `http://` або `https://`** — `file://` не працює
3. **Dev-сервер повинен бути запущений** (`npm run dev`, порт 3000 за замовчуванням для Next.js)

---

## Формат URL для capture

```
http://localhost:3000#figmacapture=<captureId>&figmaendpoint=<encoded-endpoint>&figmadelay=<ms>
```

| Параметр | Значення | Опис |
|---|---|---|
| `figmacapture` | UUID | ID, отриманий від MCP |
| `figmaendpoint` | URL-encoded рядок | Endpoint для відправки даних (генерується автоматично) |
| `figmadelay` | мс (напр. `2000`) | Затримка перед capture — потрібна для анімацій/lazy-render |
| `figmaselector` | CSS-селектор або `*` | Опціонально — capture конкретного елемента |

---

## figmaselector — режим вибору елемента

Якщо додати `&figmaselector=*` до URL, на сторінці зʼявляється **інтерактивна панель** для ручного вибору DOM-елемента.

```
http://localhost:3000#figmacapture=<id>&figmaendpoint=<endpoint>&figmadelay=1000&figmaselector=*
```

- Клікаєш на потрібний компонент → capture відбувається лише для нього
- Альтернатива: передати конкретний CSS-селектор замість `*` → панель не зʼявляється, елемент вибирається автоматично

**Важливо:** Панель вибору доступна лише на localhost. На зовнішніх сайтах Option 1 (через URL-хеш) не працює — потрібен Playwright MCP.

---

## Типовий workflow (виконується Claude)

```
1. Перевірити/запустити dev-сервер (lsof -i :3000)
2. Тимчасово додати до layout.tsx:
   <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
3. За потреби — тимчасово примусово відобразити компонент (прибрати localStorage-перевірку)
4. generate_figma_design(outputMode='existingFile', fileKey='...') → отримати captureId + URL
5. Відкрити URL з &figmaselector=* (або без нього для автоматичного capture)
6. Зачекати (figmadelay + час обробки)
7. generate_figma_design(captureId='...') → отримати посилання на Figma-файл
8. Rollback тимчасових змін у layout.tsx та компоненті
```

---

## Приклади промптів

### Capture всієї сторінки

```
Зроби capture поточної сторінки localhost:3000 і додай до Figma-файлу
https://www.figma.com/design/<fileKey>/...
```

### Capture конкретного компонента з панеллю вибору

```
Виконай figma capture з figmaselector=* для вибору компонента на сторінці localhost:3000.
Додай результат до файлу https://www.figma.com/design/<fileKey>/...
```

### Capture компонента в конкретному стані

```
Виконай figma capture банера CookieConsent у стані з відкритим модальним вікном налаштувань.
Компонент знаходиться в src/components/CookieConsent.tsx.
Додай до файлу https://www.figma.com/design/<fileKey>/...
```

---

## Посилання

- Figma файл проекту: `https://www.figma.com/design/JOwK5JLuTx62ozYmRq9qme/`
- Компонент: `src/components/CookieConsent.tsx`
- Layout (де тимчасово додається скрипт): `src/app/(site)/layout.tsx`
