document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand(); 
    }

    const metrikaId = 103293805;

    // --- ОБЩАЯ ЛОГИКА ДЛЯ ЦЕЛЕЙ ---
    function sendGoal(goalId) {
        if (window.ym) {
            window.ym(metrikaId, 'reachGoal', goalId);
            console.log(`Цель ${goalId} отправлена в Метрику.`);
        } else {
            console.error('Счётчик Яндекс.Метрики не найден.');
        }
    }

    const goalMap = {
        'start-onboarding': 'CLICK_START_ONBOARDING',
        'onboarding-1-next': 'CLICK_ONBOARDING_1_NEXT',
        'onboarding-2-next': 'CLICK_ONBOARDING_2_NEXT',
        'onboarding-3-to-paywall': 'CLICK_ONBOARDING_3_TO_PAYWALL',
        'paywall-submit': 'CLICK_PAYWALL_SUBMIT'
    };

    for (const buttonId in goalMap) {
        const button = document.getElementById(buttonId);
        if (button) {
            const goalId = goalMap[buttonId];
            button.addEventListener('click', function(event) {
                // Если у кнопки есть класс disabled, отменяем переход
                if (button.classList.contains('disabled')) {
                    event.preventDefault();
                    return;
                }
                sendGoal(goalId);
            });
        }
    }

    // --- ЛОГИКА СПЕЦИАЛЬНО ДЛЯ ЭКРАНА ПЕЙВОЛА ---
    const paywallContainer = document.querySelector('.tariffs');
    if (paywallContainer) {
        const tariffs = paywallContainer.querySelectorAll('.tariff');
        const submitButton = document.getElementById('paywall-submit');

        tariffs.forEach(tariff => {
            tariff.addEventListener('click', function() {
                // Сначала убираем подсветку со всех тарифов
                tariffs.forEach(t => t.classList.remove('selected'));
                
                // Добавляем подсветку только кликнутому тарифу
                this.classList.add('selected');

                // Активируем кнопку
                if (submitButton) {
                    submitButton.classList.remove('disabled');
                }
            });
        });
    }
});