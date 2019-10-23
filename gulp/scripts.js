const uglify = require('gulp-uglify');
const gulpImports = require('gulp-imports');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const minify = require('gulp-babel-minify');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const scriptsPATH = {
    inputLibrary: `${$.path.pathConfig.folderApp}/core/library/**/*.{js,css,png,jpg,gif,svg}`,
    inputMainOva: `${$.path.pathConfig.folderPublic}${$.path.pathConfig.folderOva}/src/index.js`,
    inputMain: `${$.path.pathConfig.folderApp}/core/main.js`,
    outputMain: `./dist`,
    outputLibrary: `${$.path.pathConfig.folderPublic}${$.path.pathConfig.folderOva}/dist/assets/library`,
    outputMainOva: `${$.path.pathConfig.folderPublic}${$.path.pathConfig.folderOva}/dist`,
};

module.exports = function() {
    $.gulp.task('libsJS', () => {
        return $.gulp.src([scriptsPATH.inputLibrary]).pipe($.gulp.dest(scriptsPATH.outputLibrary));
    });

    $.gulp.task('jsOva:dev', () => {
        return $.gulp
            .src([scriptsPATH.inputMainOva])
            .pipe(sourcemaps.init())
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('unix', { verbose: true }))
            .pipe(babel())
            .on('error', $.path.interceptErrors)
            .pipe(minify())
            .pipe(sourcemaps.write('.'))
            .pipe($.gulp.dest(scriptsPATH.outputMainOva))
            .pipe(
                $.browser.reload({
                    stream: true,
                })
            );
    });
    $.gulp.task('jsOva:build', () => {
        return $.gulp
            .src([scriptsPATH.inputMainOva])
            .pipe(jshint.reporter('unix', { verbose: true }))
            .pipe(babel())
            .on('error', $.path.interceptErrors)
            .pipe(minify())
            .pipe($.gulp.dest(scriptsPATH.outputMainOva))
            .pipe(
                $.browser.reload({
                    stream: true,
                })
            );
    });

    $.gulp.task('jsMain:dev', () => {
        return $.gulp
            .src([scriptsPATH.inputMain])
            .pipe(sourcemaps.init())
            .pipe(gulpImports({ hideConsole: true }))
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('unix', { verbose: true }))
            .pipe(babel())
            .pipe(minify())
            .pipe(rename({ basename: 'core' }))
            .pipe(sourcemaps.write('.'))
            .pipe($.gulp.dest(scriptsPATH.outputMain))
            .pipe(
                $.browser.reload({
                    stream: true,
                })
            );
    });

    $.gulp.task('jsMain:build', () => {
        return $.gulp
            .src([scriptsPATH.inputMain])
            .pipe(gulpImports({ hideConsole: true }))
            .pipe(jshint.reporter('unix', { verbose: true }))
            .pipe(babel())
            .pipe(minify())
            .pipe(rename({ basename: 'core' }))
            .pipe($.gulp.dest(scriptsPATH.outputMainOva))
            .pipe(
                $.browser.reload({
                    stream: true,
                })
            );
    });
};
