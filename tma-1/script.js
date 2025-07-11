document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем API Телеграма
    const tg = window.Telegram.WebApp;
    tg.ready(); // Сообщаем, что приложение готово

    // Находим нашу кнопку по её ID
    const mainButton = document.getElementById('main-button');

    // Функция, которая будет отправлять данные в Яндекс.Метрику
    // Пока что она пустая, мы наполним её позже.
    function sendClickToMetrica() {
        console.log('Отправляем событие в Метрику...');
        // Здесь будет код для Метрики
    }

    // Добавляем обработчик клика на кнопку
    mainButton.addEventListener('click', function() {
        // Вызываем функцию для аналитики
        sendClickToMetrica();

        // Показываем простое уведомление для проверки
        alert('Кнопка работает!');
    });
});