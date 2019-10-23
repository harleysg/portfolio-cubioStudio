const folders = require('gulp-folders-4x');

let objLoop = [];
module.exports = function() {
    $.gulp.task(
        'files',
        folders(
            `${$.path.dist}`,
            (folder) => {
                let ind = 'jaj';
                const regex = /\.([a-z]+)/;
                const str = ` asdf asd .html asdf a`;
                let isHTML = regex.exec(folder);

                // if ((m = regex.exec(str)) !== null) {
                //     // The result can be accessed through the `m`-variable.
                isHTML.forEach((match, groupIndex) => {
                    console.log(`Found match, group ${groupIndex}: ${match}`);
                });
                // }
                // console.log('TCL: isHTML', isHTML);
                objLoop.push({
                    '@identifier': `RES-${ind}`,
                    '@type': 'webcontent',
                    '@adlcp:scormType': 'sco',
                    '@href': `./content/activities/${ind}.html`,
                    // file: {
                    //     '@href': './content/js/main.js'
                    // },
                    dependecy: {
                        '@identifierref': 'COMMON_FILES',
                    },
                });

                // console.log('TCL: folder', objLoop);
                return objLoop;
                // return $.gulp.src();
            },
            false
        )
    );
};
