# Node.js — учебное веб‑приложение

Крошечное учебное приложение на Node.js, демонстрирующее простой HTTP‑сервер, загрузку данных из JSON и рендеринг базовых страниц.

## Инструменты

- Node.js (ESM)
- `nodemon` — перезапуск при разработке
- `dotenv` — загрузка переменных окружения
- Встроенные модули: `http`, `fs`, `path`
- (планируемо) Express, MongoDB, React — в дальнейшем для расширения

## Установка и запуск

01. Установите зависимости:

```powershell
npm install
```

01. Запустите в режиме разработки (nodemon):

```powershell
npm run serve
```

Сервер по умолчанию слушает `http://localhost:8000` (см. `index.mjs`).

## Структура проекта (кратко)

## Отладка

- Запуск Node с инспектором (останавливает на старте):

```powershell
node --inspect-brk index.mjs
```

- Запуск через `nodemon` с инспектором (применимо для разработки):

```powershell
nodemon --exec "node --inspect index.mjs" --watch sourse --ext mjs,json
```

- После запуска откройте `chrome://inspect` в Chrome или подключитесь из VS Code (Debug: Attach to Node).

## Проверка ошибки (вызов `errorPage`)

1. Простейшая проверка через curl (любой неверный путь):

```bash
curl -i http://localhost:8000/nonexistent
```

1. Проверка для маршрута `/item/:id` (несуществующий id):

```bash
curl -i http://localhost:8000/item/does-not-exist
```

1. Проверка в PowerShell (аналог curl):

```powershell
Invoke-RestMethod -Uri http://localhost:8000/nonexistent -Method Get -ErrorAction SilentlyContinue
```

В ответе ожидается статус `404` и HTML‑страница с текстом ошибки (в `controllers.mjs` — `errorPage`).
