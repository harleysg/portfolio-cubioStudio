module.exports = function() {
    $.gulp.task('multimedia', () => {
        return $.gulp
            .src(
                `${$.path.pathConfig.folderPublic}${$.path.pathConfig.folderOva}/src/assets/**/*.{mp4,mp3,vtt,srt,docx,docm,doctx,dotm,xlsx,xlsm,xltm,xlsb,xlam,pptx,pptm,ppsx,pdf}`
            )
            .pipe(
                $.gulp.dest(
                    `${$.path.pathConfig.folderPublic}${$.path.pathConfig.folderOva}/dist/assets`
                )
            );
    });
    $.gulp.task('iframes', () => {
        return $.gulp
            .src(
                `${$.path.pathConfig.folderPublic}${$.path.pathConfig.folderOva}/src/assets/iframes/**/*.{webm,mp4,mp3,vtt,srt,js,html,css,png,jpg,jpeg,gif,svg}`
            )
            .pipe(
                $.gulp.dest(
                    `${$.path.pathConfig.folderPublic}${$.path.pathConfig.folderOva}/dist/assets/iframes`
                )
            );
    });
};
