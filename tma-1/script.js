document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
    }

    const metrikaId = 103293805;

    // Функция для отправки цели в Метрику
    function sendGoal(goalId) {
        if (window.ym) {
            window.ym(metrikaId, 'reachGoal', goalId);
            console.log(`Цель ${goalId} отправлена в Метрику.`);
        } else {
            console.error('Счётчик Яндекс.Метрики не найден.');
        }
    }

    // Словарь: ID кнопки -> ID цели в Метрике
    const goalMap = {
        'start-onboarding': 'CLICK_START_ONBOARDING',
        'onboarding-1-next': 'CLICK_ONBOARDING_1_NEXT',
        'onboarding-2-next': 'CLICK_ONBOARDING_2_NEXT',
        'onboarding-3-to-paywall': 'CLICK_ONBOARDING_3_TO_PAYWALL',
        'paywall-submit': 'CLICK_PAYWALL_SUBMIT'
    };

    // Проходим по всем целям и назначаем обработчики
    for (const buttonId in goalMap) {
        const button = document.getElementById(buttonId);
        if (button) {
            const goalId = goalMap[buttonId];
            button.addEventListener('click', function() {
                sendGoal(goalId);
            });
        }
    }
});