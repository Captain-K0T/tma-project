#!/bin/bash

set -e

echo "🚀 Начинаем обновление standalone веток..."

update_standalone_branch() {
    local tma_num=$1
    local branch_name="tma-${tma_num}-standalone"
    
    echo "📝 Обновление ветки ${branch_name}..."
    
    git checkout ${branch_name}
    git reset --hard main
    
    for i in 1 2 3 4 5; do
        if [ $i -ne $tma_num ]; then
            if [ -d "tma-${i}" ]; then
                git rm -rf "tma-${i}"
            fi
        fi
    done
    
    if [ -d "tma-${tma_num}" ]; then
        cp -r tma-${tma_num}/* .
        git rm -rf "tma-${tma_num}"
        git add .
    fi
    
    git commit -m "Обновление standalone ветки TMA-${tma_num}

🤖 Generated with automated script"
    
    git push origin ${branch_name} --force-with-lease
    echo "  ✅ Ветка ${branch_name} обновлена!"
}

git checkout main
git push origin main

if [ "$1" = "all" ] || [ -z "$1" ]; then
    for tma_num in 1 2 3 4 5; do
        update_standalone_branch $tma_num
    done
elif [[ "$1" =~ ^[1-5]$ ]]; then
    update_standalone_branch $1
fi

git checkout main
echo "✨ Готово!"