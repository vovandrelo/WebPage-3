/* <================================================================================================================> */
/* <============================================== НЕОБХОДИМЫЕ МОДУЛИ ==============================================> */
/* <================================================================================================================> */

// 1. Модуль Gulp - предоставляет функционал для работы с  Gulp:
import gulp from "gulp";

// 2. Модули Fonter и Ttf2Woff2 - предоставляет функционал для преобразования шрифтов:
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

// 3. Пользовательский модуль Path - предоставляет информацию о путях к необходимым файлам/папкам:
import { path } from "../../config/path.js";

/* <================================================================================================================> */
/* <============================================== КОНВЕРТАЦИЯ ШРИФТОВ =============================================> */
/* <================================================================================================================> */


// Конвертация из ttf в woff и woff2:
export const ttfToWoff = () => {
    return gulp.src(`${path.srcFolder}/fonts/*.ttf`)        // Считываем из папки с исходниками шрифты в формате ttf
        .pipe(fonter({ formats: ['woff'] }))                // Преобразуем шрифты ttf в формат woff
        .pipe(gulp.dest(`${path.build.fonts}`))             // Записываем полученные шрифты в папку с результатом
        .pipe(gulp.src(`${path.srcFolder}/fonts/*.ttf`))    // Считываем из папки с исходниками шрифты в формате ttf
        .pipe(ttf2woff2())                                  // Преобразуем шрифты ttf в формат woff2
        .pipe(gulp.dest(`${path.build.fonts}`));            // Записываем полученные шрифты в папку с результатом
};