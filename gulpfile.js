'use strict';

const notify = require('gulp-notify');

global.$ = {
    path: require('./settings'),
    setting: {
        task: require('./gulp'),
        pathConfig: require('./settings'),
        interceptErrors: function(error) {
            var args = Array.prototype.slice.call(arguments);
            notify
                .onError({
                    title: 'Compile Error',
                    message: '<%= error.message %>',
                })
                .apply(this, args);

            this.emit('end');
        },
    },
    gulp: require('gulp'),
    browser: require('browser-sync').create(),
    del: require('del'),
};

$.path.task.forEach(function(taskPath) {
    require(taskPath)();
});

$.gulp.task(
    'dev',
    $.gulp.series(
        'clean',
        'varGulp:dev',
        $.gulp.parallel(
            'pug',
            'fonts',
            'multimedia',
            'stylesOva:dev',
            'stylesMain:dev',
            'jsOva:dev',
            'jsMain:dev',
            'img:dev',
            'libsJS',
            'iframes'
        )
    )
);

$.gulp.task(
    'build',
    $.gulp.series(
        'clean',
        'varGulp:build',
        $.gulp.parallel(
            'pug',
            'fonts',
            'multimedia',
            'stylesOva:build',
            'stylesMain:build',
            'jsOva:build',
            'jsMain:build',
            'img:dev',
            'libsJS',
            'iframes'
        ),
        'createManifest',
        'zipFolder'
    )
);

$.gulp.task(
    'compileOvas',
    $.gulp.series(
        'cleanDist',
        'varGulp:build',
        'compileMultiplePug',
        'compileMultipleSassOva',
        'compileMultipleSassMain',
        'compileMultipleJsMain',
        'compileMultipleJsOva',
        'copyMultimediaGeneral',
        'copyMultimediaOva',
        'copyLibrary',
        'createManifest',
        'zipOvas',
        'git'
    )
);

$.gulp.task('develop', $.gulp.series('build', $.gulp.parallel('watch:develop', 'serve')));

$.gulp.task('zip', $.gulp.series('zipFolder'));

$.gulp.task('default', $.gulp.series('dev', $.gulp.parallel('watch', 'serve')));
