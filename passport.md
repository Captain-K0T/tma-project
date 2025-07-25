# Паспорт продукта: Серия TMA-заглушек «TMA-1»

## 1. Архитектура и компоненты

### Веб-приложение (Статическая страница):
-   **Фреймворк:** Отсутствует. Используется нативный (чистый) HTML, CSS и JavaScript для максимальной скорости загрузки и простоты развертывания.
-   **Язык:** JavaScript (ES6+).
-   **Стилизация:** Нативный CSS. Стили для каждого TMA находятся в собственном файле `style.css`.
-   **Контент:** Все данные (заголовки, тексты, пути к изображениям) хранятся непосредственно в файле `index.html` для каждого отдельного приложения.
-   **Аналитика:** Яндекс.Метрика. Код счетчика устанавливается напрямую в `index.html`. Отправка цели (клик по кнопке) инициируется через JavaScript-функцию в файле `script.js`.

### Ключевые элементы страницы:
Проект не использует компонентный подход (как в React/Vue). Вместо этого страницы состоят из стандартных HTML-элементов:
-   Основной контейнер с фоновым изображением.
-   Заголовок `<h1>`.
-   Текстовый блок `<p>`.
-   Кнопка `<button>`.

### Структура проекта:
-   `tma-1/`: Папка для первого веб-приложения.
    -   `images/`: Папка для хранения фонового изображения.
    -   `index.html`: Основной файл со структурой и контентом страницы.
    -   `style.css`: Файл со стилями.
    -   `script.js`: Файл с логикой для аналитики.
-   *Структура дублируется для последующих приложений (`tma-2/`, `tma-3/` и т.д.).*

---

## 2. Архитектура и среда развертывания (Production)

-   **Тип сборки:** Проект не требует процесса сборки (как `npm run build`). Файлы являются полностью статическими и готовы к развертыванию "как есть".
-   **Сервер:** Любой веб-сервер для статических файлов (например, Nginx, Apache, хостинг-панель или GitHub Pages). **Node.js на сервере не требуется и не используется.**

---

## 3. Процесс разработки и обновления (Workflow)

1.  **Локальная разработка:** Код пишется и тестируется на локальном компьютере.
    * **Запуск сервера:** В терминале, находясь в папке конкретного TMA (например, `tma-project/tma-1/`), нужно выполнить команду `npx http-server .`
    * **Адрес:** `http://localhost:8080` (или другой порт, указанный в терминале).
2.  **Контроль версий (Git):**
    * Все изменения кода фиксируются в системе контроля версий Git на GitHub.
    * В файле `.gitignore` исключена папка `node_modules/` (если она будет создана локальными утилитами).
3.  **Обновление на сервере:**
    * С помощью FTP/SFTP-клиента содержимое папок с приложениями (`tma-1/`, `tma-2/` и т.д.) загружается на сервер.

---

## 4. Основные Use Cases (Сценарии использования)

### 4.1. Пользователь взаимодействует с TMA
-   **Краткое описание:**
    1.  Пользователь открывает ссылку на TMA внутри Telegram.
    2.  Загружается страница с фоновой картинкой, заголовком и текстом.
    3.  Пользователь нажимает на кнопку.
    4.  Клик по кнопке регистрируется как достижение цели в Яндекс.Метрике.