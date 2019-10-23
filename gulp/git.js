const git = require('gulp-git');

module.exports = function() {
    $.gulp.task('git', () =>
        $.gulp
            .src($.path.dist)
            .pipe(git.add({ cwd: $.path.dist }))
            .pipe(
                git.commit(`${$.path.message}`, {
                    cwd: $.path.dist,
                })
            )
            .on('end', function() {
                git.push('origin', `${$.path.branch}`, {
                    cwd: $.path.dist,
                });
            })
    );
};
