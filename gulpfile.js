const { gulp, src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

/* paths */
const path = {
    src: './src/', //source folder
    build: './build/' //build folder
}

function public() {
    return src(path.src + 'public/**/*')
        .pipe(dest(path.build));
}

function styles() {
    return src(path.src + 'styles/main.css')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('/'))
        .pipe(cleanCSS())
        .pipe(dest(path.build + 'styles'))
}

function htmls() {
    return src(path.src + '*.html')
        .pipe(plumber())
        .pipe(dest(path.build + ''))
}

function scripts() {
    return src(path.src + 'js/**/*.js')
        .pipe(plumber())
        .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest(path.build + 'js/'))
}

function serve() {
    browserSync.init({
        server: {
            baseDir: path.build
        }
    });
    browserSync.watch(path.build + '**/*.*', browserSync.reload);
}

function watcher() {
    watch(path.src + 'styles/**/*', styles);
    watch(path.src + 'public/**/*', public);
    watch(path.src + '**/*.html', htmls);
    watch(path.src + 'js/**/*.js', scripts);
}

function clean() {
    return del('build/');
}

exports.public = public;
exports.styles = styles;
exports.htmls = htmls;
exports.scripts = scripts;
exports.watcher = watcher;
exports.serve = serve;
exports.clean = clean

exports.dev = series(
    clean,
    parallel(public, styles, htmls, scripts),
    parallel(watcher, serve)
);

exports.default = series(
    clean,
    parallel(public, styles, htmls, scripts),
    parallel(watcher, serve)
);

exports.build = series(
    clean,
    parallel(public, styles, htmls, scripts)
);