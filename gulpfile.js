'use strict';

const notify = require('gulp-notify');

global.$ = {
    gulp: require('gulp'),
    browser: require('browser-sync').create(),
    del: require('del'),
    path: require('./settings'),
    task: require('./gulp'),
    hasError: function(error) {
        var args = Array.prototype.slice.call(arguments);
        notify
            .onError({
                title: 'Compile Error',
                message: '<%= error.message %>',
            })
            .apply(this, args);

        this.emit('end');
    },
};

$.task.forEach(function(taskPath) {
    require(taskPath)();
});

$.gulp.task('dev', $.gulp.series('clean', $.gulp.parallel('pug', 'scss:dev', 'js:dev')));

$.gulp.task(
    'build',
    $.gulp.series(
        'clean',
        $.gulp.parallel(
            'pug',
            'scss:build',
            'js:build'
            // 'git',
        )
    )
);

$.gulp.task('develop', $.gulp.series('build', $.gulp.parallel('watch:develop', 'serve')));

$.gulp.task('default', $.gulp.series('dev', $.gulp.parallel('watch', 'serve')));
