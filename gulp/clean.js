module.exports = function() {
    $.gulp.task('clean', function() {
        return $.del([`${$.path.dist}*.{html,css,map}`, `${$.path.dist}script.js`]);
    });
};
