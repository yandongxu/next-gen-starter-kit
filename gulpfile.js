const gulp = require('gulp');
const connect = require('gulp-connect');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const rollup = require('gulp-rollup');
const babel = require('rollup-plugin-babel');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');

// css
gulp.task('css:compress', ['css'], () => {
    return gulp.src('public/assets/styles/main.css')
        .pipe(csso())
        .pipe(gulp.dest('dist/assets/styles'));
});

gulp.task('css', () => {
    return gulp.src('public/assets/postcss/main.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer, precss]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/styles'))
        .pipe(connect.reload());
});

// js
gulp.task('js:compress', ['js'], () => {
    return gulp.src('public/assets/scripts/bundle.js')
        .pipe(uglify())
        // hashing filename for production
        // .pipe(rev())
        .pipe(gulp.dest('dist/assets/scripts'));
});

gulp.task('js', () => {
    return gulp.src('src/main.js', { read: false })
        .pipe(rollup({
            plugins: [babel({
                presets: ['es2015-rollup']
            })],
            sourceMap: true
        }))
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/scripts'))
        .pipe(connect.reload());
});

// images
gulp.task('images:compress', () => {
    return gulp.src('public/assets/images/**.*')
        .pipe(gulp.dest('dist/assets/images'));
});

// html
gulp.task('html:compress', () => {
    return gulp.src('public/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('html', () => {
    return gulp
        .src('public/**/*.html')
        .pipe(connect.reload());
});

// watch
gulp.task('html:watch', () => {
    return gulp
        .watch('public/**/*.html', ['html']);
});

gulp.task('css:watch', () => {
    return gulp
        .watch('public/assets/postcss/**/*.css', ['css']);
});

gulp.task('js:watch', () => {
    return gulp
        .watch('src/**/*.js', ['js']);
});

// serve
gulp.task('serve', () => {
    connect.server({
        port: 9000,
        root: 'public',
        livereload: true
    });
});

// clean
gulp.task('clean', () => {
    return gulp.src(['dist', 'public/assets/scripts', 'public/assets/styles'])
        .pipe(clean({ force: true }));
});

// compress
gulp.task('compress', ['clean', 'css:compress', 'js:compress', 'html:compress', 'images:compress']);

// watching
gulp.task('watch', ['clean', 'css', 'js', 'css:watch', 'js:watch', 'html:watch']);

// start
gulp.task('default', ['serve', 'watch']);
