document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем API Телеграма
    const tg = window.Telegram.WebApp;
    tg.ready(); // Сообщаем, что приложение готово

    // Находим нашу кнопку по её ID
    const mainButton = document.getElementById('main-button');
    // ID вашего счётчика в Яндекс.Метрике
    const metrikaId = 103293805; 
    // Уникальный идентификатор цели для этого TMA
    const goalId = 'CLICK_TMA_1';

    // Функция, которая отправляет данные в Яндекс.Метрику
    function sendClickToMetrica() {
        // Проверяем, что функция ym доступна, прежде чем её вызывать
        if (window.ym) {
            window.ym(metrikaId, 'reachGoal', goalId);
            console.log(`Цель ${goalId} отправлена в Метрику.`);
        } else {
            console.log('Счётчик Яндекс.Метрики ещё не загрузился.');
        }
    }

    // Добавляем обработчик клика на кнопку
    mainButton.addEventListener('click', function() {
        // Вызываем функцию для аналитики
        sendClickToMetrica();
        
        // Для наглядности можно показать пользователю, что действие принято
        mainButton.innerText = 'Спасибо!';
        mainButton.disabled = true;
    });
});