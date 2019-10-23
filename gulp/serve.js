module.exports = function() {
    $.gulp.task('serve', function() {
        $.browser.init({
            server: `${$.path.pathConfig.folderPublic}${$.path.pathConfig.folderOva}/dist`,
        });
    });
};
