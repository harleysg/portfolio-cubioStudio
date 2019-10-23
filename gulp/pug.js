const cached = require('gulp-cached');
const changed = require('gulp-changed');
const filter = require('gulp-filter');
const gulpif = require('gulp-if');
const pug = require('gulp-pug');
const pugInheritance = require('gulp-pug-inheritance');
const plumber = require('gulp-plumber');

module.exports = function() {
    $.gulp.task('pug', () => {
        return $.gulp
            .src(`${$.path.src}*.pug`, {
                since: $.gulp.lastRun('pug'),
            })
            .pipe(changed('dist', { extension: '.html' }))
            .pipe(gulpif(global.isWatching, cached('pug')))
            .pipe(
                pugInheritance({
                    basedir: `${$.path.src}`,
                    skip: 'node_modules',
                })
            )
            .pipe(
                filter(function(file) {
                    return !/\/_/.test(file.path) && !/^_/.test(file.relative);
                })
            )
            .pipe(
                pug({
                    pretty: true,
                }).on('error', $.hasError)
            )
            .pipe(plumber.stop())
            .pipe($.gulp.dest($.path.dist))
            .on('end', $.browser.reload);
    });
};
