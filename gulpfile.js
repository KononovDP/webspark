// VARIABLES & PATHS

let preprocessor = 'sass', // Preprocessor (sass, scss, less, styl)
    fileswatch   = 'html,htm,txt,json,md,woff2', // List of files extensions for watching & hard reload (comma separated)
    imageswatch  = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
    baseDir      = 'app', // Base directory path without «/» at the end
    online       = true; // If «false» - Browsersync will work offline without internet connection

let paths = {

  scripts: {
    src: [
      baseDir + '/js/app.js' // app.js. Always at the end
    ],
    dest: baseDir + '/js',
  },

  styles: {
    src:  [
      'node_modules/@fortawesome/fontawesome-free/css/all.css',
      baseDir + '/' + preprocessor + '/main.*'
    ],
    dest: baseDir + '/css',
  },

  images: {
    src:  baseDir + '/images/src/**/*',
    dest: baseDir + '/images/dest',
  },

  cssOutputName: 'app.min.css',
  jsOutputName:  'app.min.js',

}

// LOGIC

const { src, dest, parallel, series, watch } = require('gulp');
const sass         = require('gulp-sass');
const cleancss     = require('gulp-clean-css');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const rsync        = require('gulp-rsync');
const del          = require('del');
const sourcemaps   = require('gulp-sourcemaps');

function browsersync() {
  browserSync.init({
    server: { baseDir: baseDir + '/' },
    notify: false,
    online: online
  })
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(concat(paths.jsOutputName))
    .pipe(uglify())
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream())
}

function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(eval(preprocessor)())
    .pipe(concat(paths.cssOutputName))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream())
}

function images() {
  return src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(imagemin())
    .pipe(dest(paths.images.dest))
}

function cleanimg() {
  return del('' + paths.images.dest + '/**/*', { force: true })
}

function startwatch() {
  watch(baseDir  + '/**/' + preprocessor + '/**/*', styles);
  watch(baseDir  + '/**/*.{' + imageswatch + '}', images);
  watch(baseDir  + '/**/*.{' + fileswatch + '}').on('change', browserSync.reload);
  watch([baseDir + '/**/*.js', '!' + paths.scripts.dest + '/*.min.js'], scripts);
}

exports.browsersync = browsersync;
exports.assets      = series(cleanimg, styles, scripts, images);
exports.styles      = styles;
exports.scripts     = scripts;
exports.images      = images;
exports.cleanimg    = cleanimg;
exports.default     = parallel(images, styles, scripts, browsersync, startwatch);
