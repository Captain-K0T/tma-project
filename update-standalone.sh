#!/bin/bash

# Безопасный скрипт для обновления standalone веток TMA проекта
# Использование: ./update-standalone.sh [tma-number] или ./update-standalone.sh all

set -e  # Остановить выполнение при ошибке

echo "🚀 Начинаем безопасное обновление standalone веток..."

# Функция для обновления одной standalone ветки
update_standalone_branch() {
    local tma_num=$1
    local branch_name="tma-${tma_num}-standalone"
    
    echo "📝 Обновление ветки ${branch_name}..."
    
    # Переключаемся на нужную ветку
    git checkout ${branch_name}
    
    # Сбрасываем ветку к актуальному состоянию main (БЕЗОПАСНО!)
    git reset --hard main
    
    # Удаляем ненужные TMA папки, оставляя только нужную
    for i in 1 2 3 4 5; do
        if [ $i -ne $tma_num ]; then
            if [ -d "tma-${i}" ]; then
                git rm -rf "tma-${i}"
                echo "  ❌ Удалена папка tma-${i}"
            fi
        fi
    done
    
    # Перемещаем файлы нужного TMA в корень
    if [ -d "tma-${tma_num}" ]; then
        # Копируем файлы TMA в корень
        cp -r tma-${tma_num}/* .
        
        # Удаляем оригинальную папку TMA
        git rm -rf "tma-${tma_num}"
        
        # Добавляем новые файлы в корне
        git add .
        
        echo "  ✅ Файлы TMA-${tma_num} перемещены в корень"
    fi
    
    # Коммитим изменения
    git commit -m "Обновление standalone ветки TMA-${tma_num} с актуальными файлами из main

🤖 Generated with automated script

Co-Authored-By: Claude <noreply@anthropic.com>"
    
    # Пушим изменения
    git push origin ${branch_name} --force-with-lease
    
    echo "  🎉 Ветка ${branch_name} успешно обновлена!"
}

# Сначала убеждаемся что мы на main и пушим все изменения
echo "📋 Переключение на ветку main..."
git checkout main

echo "📤 Пуш изменений в main..."
git push origin main

# Определяем какие ветки обновлять
if [ "$1" = "all" ] || [ -z "$1" ]; then
    echo "🔄 Обновление всех standalone веток..."
    for tma_num in 1 2 3 4 5; do
        update_standalone_branch $tma_num
    done
elif [[ "$1" =~ ^[1-5]$ ]]; then
    echo "🔄 Обновление ветки TMA-$1..."
    update_standalone_branch $1
else
    echo "❌ Ошибка: Неверный параметр. Используйте: ./update-standalone.sh [1-5] или ./update-standalone.sh all"
    exit 1
fi

# Возвращаемся на main
echo "🏠 Возврат на ветку main..."
git checkout main

echo "✨ Все операции завершены успешно!"
echo "🎯 Standalone ветки обновлены и синхронизированы с main"