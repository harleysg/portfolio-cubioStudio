const csscomb = require('gulp-csscomb');
const cssnano = require('cssnano');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const _cssnano = cssnano({
    autoprefixer: {
        add: true,
        grid: false,
        /* Agrega los prefijos de compatibilidad en navegadores  */
        browsers: ['> 1%', 'last 2 versions', 'Firefox >= 20'],
    },
    rawCache: false,
    calc: false,
    colormin: false,
    convertValues: false,
    discardComments: true /* Elimina comentarios que no tengan el signo ! con la siguiente sintaxis '/*! ...... '  */,
    discardDuplicates: true /* Elimina los valores duplicados  */,
    discardEmpty: true /* Elimina las declaraciones vacias  */,
    discardOverridden: false,
    discardUnused: false,
    mergeIdents: false,
    mergeIdents: {
        add: false,
    },
    mergeLonghand: false,
    mergeRules: false /* Unifica las propiedades y valores de los selectores cercanos  */,
    minifyFontValues: true /* Organiza y redefine los valores en declaradas tipo font....  */,
    minifyParams: false,
    minifyGradients: false,
    minifySelectors: false,
    normalizeCharset: true /* Organiza o define un charset utf-8  */,
    normalizeDisplayValues: true /* Normaliza los valores de la propiedad display a 1 solo, si se escriben 2 erroneamente  */,
    normalizePositions: true /* Normaliza las declaraciones de posición en el background, background-position, -webkit-perspective-origin and perspective-origin properties.  */,
    normalizeRepeatStyle: true /* reduce los valores en el background-repeat  */,
    normalizeString: false,
    normalizeTimingFunctions: false,
    normalizeUnicode: false,
    normalizeUrl: false,
    normalizeWhitespace: false,
    orderedValues: true /* -----  */,
    reduceIdents: false,
    reduceInitial: false,
    reduceTransforms: false,
    svgo: true /* -----  */,
    uniqueSelectors: true /* -----  */,
    zindex: false,
    // preset: ['default', {} ]
});
const stylesPATH = {
    inputOva: `${$.path.pathConfig.folderPublic}${$.path.pathConfig.folderOva}/src/index.scss`,
    outputOva: `${$.path.pathConfig.folderPublic}${$.path.pathConfig.folderOva}/dist`,
    inputMain: `${$.path.pathConfig.folderApp}/styles/index.scss`,
    outputMain: `./dist`,
};

module.exports = function() {
    $.gulp.task('stylesOva:dev', () => {
        return $.gulp
            .src(stylesPATH.inputOva)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(scss({ style: 'compressed' }).on('error', $.path.interceptErrors))
            .pipe(postcss([_cssnano]))
            .pipe(sourcemaps.write('.'))
            .pipe($.gulp.dest(stylesPATH.outputOva))
            .pipe(
                $.browser.reload({
                    stream: true,
                })
            );
    });

    $.gulp.task('stylesOva:build', () => {
        return $.gulp
            .src(stylesPATH.inputOva)
            .pipe(scss())
            .pipe(postcss([_cssnano]))
            .pipe(csscomb())
            .pipe($.gulp.dest(stylesPATH.outputOva))
            .pipe(
                $.browser.reload({
                    stream: true,
                })
            );
    });

    $.gulp.task('stylesMain:dev', () => {
        return $.gulp
            .src(stylesPATH.inputMain)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(scss({ style: 'compressed' }).on('error', $.path.interceptErrors))
            .pipe(postcss([_cssnano]))
            .pipe(rename({ basename: 'core' }))
            .pipe(sourcemaps.write('.'))
            .pipe($.gulp.dest(stylesPATH.outputMain))
            .pipe(
                $.browser.reload({
                    stream: true,
                })
            );
    });

    $.gulp.task('stylesMain:build', () => {
        return $.gulp
            .src(stylesPATH.inputMain)
            .pipe(scss())
            .pipe(postcss([_cssnano]))
            .pipe(csscomb())
            .pipe(rename({ basename: 'core' }))
            .pipe($.gulp.dest(stylesPATH.outputOva))
            .pipe(
                $.browser.reload({
                    stream: true,
                })
            );
    });
};
