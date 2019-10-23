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

module.exports = function() {
    $.gulp.task('scss:dev', () => {
        return $.gulp
            .src(`${$.path.src}styles/index.scss`)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(scss({ style: 'compressed' }).on('error', $.hasError))
            .pipe(postcss([_cssnano]))
            .pipe(rename({ basename: 'index' }))
            .pipe(sourcemaps.write('.'))
            .pipe($.gulp.dest($.path.dist))
            .pipe(
                $.browser.reload({
                    stream: true,
                })
            );
    });

    $.gulp.task('scss:build', () => {
        return $.gulp
            .src(`${$.path.src}styles/index.scss`)
            .pipe(scss())
            .pipe(postcss([_cssnano]))
            .pipe(csscomb())
            .pipe(rename({ basename: 'index' }))
            .pipe($.gulp.dest($.path.dist))
            .pipe(
                $.browser.reload({
                    stream: true,
                })
            );
    });
};
