# Проект по поиску женихов ))

Лендинг страница для с формой заявки и опросником.

## Особенности

- Современный дизайн с темной цветовой схемой и розово-фиолетовыми акцентами
- Адаптивная верстка для мобильных устройств
- Пошаговый процесс заполнения заявки
- Валидация и форматирование телефонного номера
- Отправка данных на email клиента

## Технологии

- Next.js
- React
- Чистый CSS (без фреймворков)
- Nodemailer для отправки email

## Структура проекта

- `/app` - основные страницы и стили
- `/components` - React компоненты (опросник, форма контактов, страница благодарности)
- `/public` - статические файлы (изображения, иконки)
- `/app/api` - API-маршруты для обработки формы

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшна
npm run build

# Запуск в продакшн режиме
npm start
```

## Переменные окружения

Создайте файл `.env.local` в корне проекта со следующими переменными:

```
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password
ADMIN_EMAIL=admin@example.com
```

## Деплой

Проект настроен для деплоя на Vercel:

1. Подключите GitHub репозиторий к Vercel
2. Добавьте указанные выше переменные окружения в настройки проекта
3. Деплой произойдет автоматически

## Контакты

Для вопросов и предложений: cherepnyayar@gmail.com