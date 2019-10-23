const git = require('gulp-git');
const folders = require('gulp-folders-4x');
const pathToFolder = `./${$.path.pathConfig.folderPublic}`;

module.exports = function() {
    $.gulp.task(
        'git',
        folders(pathToFolder, function(folder) {
            const pathOva = `${pathToFolder}/${folder}`;
            return $.gulp
                .src(`./${pathOva}`)
                .pipe(git.add({ cwd: `./${pathOva}` }))
                .pipe(
                    git.commit(`${$.path.pathConfig.message} ${folder}`, {
                        cwd: `./${pathOva}`,
                    })
                )
                .on('end', function() {
                    git.push('origin', `${$.path.pathConfig.branch}`, {
                        cwd: `./${pathOva}`,
                    });
                });
        })
    );
};
