module.exports = function() {
    $.gulp.task('serve', function() {
        $.browser.init({
            server: `${$.path.dist}`,
        });
    });
};
