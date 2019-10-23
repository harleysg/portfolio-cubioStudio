module.exports = function() {
    $.gulp.task('watch:develop', function() {
        $.gulp.watch([`${$.path.src}views/**/*.pug`], $.gulp.series('pug'));
        // $.gulp.watch([`${$.path.src}styles/**/*.scss`], $.gulp.series('scss:build'));
        // $.gulp.watch([`${$.path.src}core/**/*.js`], $.gulp.series('js:build'));
    });

    $.gulp.task('watch', function() {
        $.gulp.watch([`${$.path.src}views/**/*.pug`], $.gulp.series('pug'));
        // $.gulp.watch(`${$.path.src}core/**/*.{js,css}`, $.gulp.series('libsJS'));
        // $.gulp.watch([`${$.path.src}core/**/*.js`], $.gulp.series('js:dev'));
    });
};
