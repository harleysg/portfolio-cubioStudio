module.exports = function() {
    $.gulp.task('clean', function() {
        return $.del(
            `${$.path.pathConfig.folderPublic}${$.path.pathConfig.folderOva}/dist`
        );
    });
};
