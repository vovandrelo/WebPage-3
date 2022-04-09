"use strict";

// Функция реализует слайдер:
export const slider = () => {
    document.addEventListener('DOMContentLoaded', () => {
        // Получаем необходимые элементы:
        const slides = document.querySelector(".slider__slides");               // Слайды
        const btnNext = document.querySelector(".slider__btn-next");            // Кнопка "Далле"
        const btnPrev = document.querySelector(".slider__btn-prev");            // Кнопка "Назад"
        const numSlides = document.querySelectorAll(".slider__slide").length;   // Кол-во слайдов
        const slide = document.querySelector(".slider__slide");                 // Слайд

        // Вычисление ширины слайда:
        let widthSlide = window.getComputedStyle(slide).width;
        widthSlide = +widthSlide.slice(0, widthSlide.indexOf('px'));

        // Текущее поожение слайдов
        let curSlide = 0;
        let curOffset = 0;

        // "Далее"
        btnNext.addEventListener("click", event => {
            // Вычисляем новое положение
            curSlide++;
            curOffset = curOffset - widthSlide;

            // Если вышли за границы, переходим на первый слайд:
            if (curSlide === numSlides) {
                curSlide = 0;
                curOffset = 0;
            }

            // Передвигаем слайды:
            slides.style.transform = `translate(${curOffset}px, 0)`;
        });

        // "Назад"
        btnPrev.addEventListener("click", event => {
            // Вычисляем новое положение
            curSlide--;
            curOffset = curOffset + widthSlide;

            // Если вышли за границы, переходим на последний слайд:
            if (curSlide === -1) {
                curSlide = 2;
                curOffset = -(numSlides * widthSlide - widthSlide);
            }

            // Передвигаем слайды:
            slides.style.transform = `translate(${curOffset}px, 0)`;
        });
    });
};