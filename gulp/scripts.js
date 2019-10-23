const gulpImports = require('gulp-imports');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const minify = require('gulp-babel-minify');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');

module.exports = function() {
    $.gulp.task('js:dev', () => {
        return (
            $.gulp
                .src([`${$.path.src}js/index.js`])
                .pipe(sourcemaps.init())
                .pipe(gulpImports({ hideConsole: true }))
                .pipe(jshint('.jshintrc'))
                .pipe(jshint.reporter('unix', { verbose: true }))
                .pipe(babel())
                // .pipe(minify())
                .pipe(rename({ basename: 'script' }))
                .pipe(sourcemaps.write('.'))
                .pipe($.gulp.dest($.path.dist))
                .pipe(
                    $.browser.reload({
                        stream: true,
                    })
                )
        );
    });

    $.gulp.task('js:build', () => {
        return (
            $.gulp
                .src([`${$.path.src}js/index.js`])
                .pipe(gulpImports({ hideConsole: true }))
                .pipe(jshint.reporter('unix', { verbose: true }))
                .pipe(babel())
                // .pipe(minify())
                .pipe(rename({ basename: 'script' }))
                .pipe($.gulp.dest($.path.dist))
                .pipe(
                    $.browser.reload({
                        stream: true,
                    })
                )
        );
    });
};
