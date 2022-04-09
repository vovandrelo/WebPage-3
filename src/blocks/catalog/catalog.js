"use strict";

// JS-реализацию блока catalog:
export const catalog = () => {
    document.addEventListener("DOMContentLoaded", () => {
        // Реализация отображения активной кнопки:
        const active = (numBtn) => {
            // Получаем со страницы все кнопки:
            const btns = document.querySelectorAll(".catalog__btn-filter");
            // Перебираем каждую кнопку и отключаем активность:
            btns.forEach(btn => {
                btn.classList.remove('catalog__btn-filter_active');
            });
            // Устанавливаем активность на необходимую кнопку:
            btns[numBtn-1].classList.add('catalog__btn-filter_active');
        };

        // Реализация отображения контента:
        const content = (typeContent) => {
            // Получаем со страницы все элементы с контентом:
            const items = document.querySelectorAll(".catalog__item");
            // Отключаем отображение всех элементов:
            items.forEach(item => {
                item.classList.add("disable");
            });
            // Отображаем только необходимые элементы:
            items.forEach(item => {
                if (item.dataset.typePuls === typeContent) {
                    item.classList.remove("disable");
                }
            });
        };

        // Реализация табов
        const tabs = () => {
            // Получаем со страницы панель с кнопками
            const btnPanel = document.querySelector(".catalog__filters");
            // Назначаем событие клика на панель:
            btnPanel.addEventListener("click", event => {
                // Если пользователь попал по кнопке, то:
                if (event.target.dataset.numBtn) {
                    // Устанавливаем активный таб:
                    active(event.target.dataset.numBtn);
                    // Отображаем контент, соответствующий табу:
                    content(event.target.dataset.typeBtn);
                }
            });
        };

        // Запускаем функции:
        content("fitness");
        active(1);
        tabs();
    });
};