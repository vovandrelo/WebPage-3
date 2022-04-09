/* <================================================================================================================> */
/* <============================================== НЕОБХОДИМЫЕ МОДУЛИ ==============================================> */
/* <================================================================================================================> */

// 1. Модуль Gulp - предоставляет функционал для работы с  Gulp
import gulp from "gulp";

// 2. Модуль Browser-Sync - предоставляет функционал для работы с локальным сервером
import browserSync from "browser-sync";

// 3. Пользовательский модуль Path - предоставляет информацию о путях к необходимым файлам/папкам
import { path } from "./gulp/config/path.js";



/* <================================================================================================================> */
/* <============================================== НЕОБХОДИМЫЕ ЗАДАЧИ ==============================================> */
/* <================================================================================================================> */

// 1. Задача, которая удаляет все данные из папки с результатом:
import { resetDist } from "./gulp/tasks/resetDist.js";

// 2. Задачи, которые объединяют PUG-файла и формируют необходимые html-файлы:
import { includeBlocksPug } from "./gulp/tasks/pugProcessing/includeBlocksPug.js";
import { pugConversion } from "./gulp/tasks/pugProcessing/pugConversion.js";

// 3. Задачи, которые объединяют SASS-файлы и формируют необходимые css-файлы:
import { includeBlocksSass } from "./gulp/tasks/sassProcessing/includeBlocksSass.js";
import { sassConversion } from "./gulp/tasks/sassProcessing/sassConversion.js";

// 4. Задача, которая копирует все js-файлы из папки с исходниками в папку с результатом:
import { jsProcessing } from "./gulp/tasks/jsProcessing.js";

// 5. Задача, которая копирует все изображения из папки с исходниками в папку с результатом:
import { copyImages } from "./gulp/tasks/copyImages.js";

// 6. Задача, которая копирует все файлы из папки с исходниками в папку с результатом:
import { copyFiles } from "./gulp/tasks/copyFiles.js";

// 7. Задачи, которые подключают необходимые шрифты:
import { otfToTtf } from "./gulp/tasks/fontsProcessing/otfToTtf.js";
import { ttfToWoff } from "./gulp/tasks/fontsProcessing/ttfToWoff.js";
import { includeFonts } from "./gulp/tasks/fontsProcessing/includeFonts.js";

// 8. Задача, которая запускает локальный сервер:
import { server } from "./gulp/tasks/server.js";

// 9. Задача, которая формирует директории для отсутствующих блоков:
import { createBlocks } from "./gulp/tasks/createBlocks.js";

/* <================================================================================================================> */
/* <================================================= ЗАПУСК ЗАДАЧ =================================================> */
/* <================================================================================================================> */

// Работа с PUG-файлами:
const pug = gulp.series(includeBlocksPug, pugConversion);

// Работа с SASS-файлами:
const sass = gulp.series(includeBlocksSass, sassConversion);

// Работа с шрифтами:
const fonts = gulp.series(otfToTtf, ttfToWoff, includeFonts);

// Настройка наблюдателя:
const watcher = () => {
    // Наблюдение за pug-файлами:
    gulp.watch(path.watch.pug, { ignoreInitial: false }, pug).on('change', browserSync.reload);
    // Наблюдение за sass-файлами:
    gulp.watch(path.watch.sass, { ignoreInitial: false }, sass).on('change', browserSync.reload);
    // Наблюдение за js-файлами:
    gulp.watch(path.watch.js, { ignoreInitial: false }, jsProcessing).on('change', browserSync.reload);
    // Наблюдение за изображениями:  
    gulp.watch(path.watch.images, { ignoreInitial: false }, copyImages).on('change', browserSync.reload);
    // Наблюдение за иными файлами:
    gulp.watch(path.watch.files, { ignoreInitial: false }, copyFiles).on('change', browserSync.reload);
};

// Настройка сценария работы Gulp:
const dev = gulp.series(resetDist, fonts, gulp.parallel(watcher, server));

// Делаем основной сценарий общедоступной задачей:
export { createBlocks };
export default dev;