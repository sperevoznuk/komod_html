var path = {
    src: {
        app: 'app/',
        html: 'app/html/*.html',
        // css: 'app/css/**/*.scss',
        css: 'app/css/main.css',
        img: 'app/img/',
        imgjpeg: 'app/img/*.jpg',
        imgpng: 'app/img/*.png',
        imgSVG: 'app/img/svg/*.svg',
        js: 'app/js/**/*.js',
    },
    build: {
        html: 'build/',
        img: 'build/img/',
        css: 'build/css/',
        svgSprite: 'build/img/sprite.svg',
        js: 'build/js/',
    },
    watch: {
        css: 'app/css/**/*.css',
        html: 'app/html/**/*.html',
        imgSVG: 'app/img/svg/*.svg',
        img: 'app/img/*',
        js: 'app/js/**/*.js',
    }
};

var gulp = require('gulp');
var rigger = require('gulp-rigger'),
    svgSprite = require('gulp-svg-sprite'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    importCss = require('gulp-import-css'),
    cleanCss = require('gulp-clean-css'),
    plumber = require('gulp-plumber');


gulp.task('html', (done) => {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(gulp.dest(path.src.app));
    done();
})

// image
gulp.task('image:svg', (done) => {
    gulp.src(path.src.imgSVG)
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            },
        }))
        .pipe(gulp.dest(path.src.img))
        .pipe(gulp.dest(path.build.img));

    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img));


    done();
})
gulp.task('image:img', (done) => {
    gulp.src(path.src.imgpng)
        .pipe(gulp.dest(path.build.img));
    gulp.src(path.src.imgjpeg)
        .pipe(gulp.dest(path.build.img));
    done();
})

// gulp.task('sass', function () {
//     return gulp.src(path.src.css)
//         .pipe(sourcemaps.init())
//         .pipe(sass().on('error', sass.logError))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(path.build.css))
//         .pipe(browserSync.stream());
// });


gulp.task('css', (done) => {

    gulp.src(path.src.css)
        .pipe(plumber())
        .pipe(importCss())
        .pipe(cleanCss({ level: { 2: { specialComments: 0 } }, format: 'keep-breaks' }))
        .pipe(gulp.dest(path.build.css));

    done();
})

gulp.task('js', (done) => {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js));

    done();
})

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: path.src.app
        }
    });
})


gulp.task('watch', (done) => {
    gulp.watch(path.watch.css, gulp.series('css'));
    gulp.watch(path.watch.js, gulp.series('js'));
    gulp.watch(path.watch.html, gulp.series('html')).on('change', browserSync.reload);
    gulp.watch(path.watch.imgSVG, gulp.series('image:svg')).on('change', browserSync.reload);
    gulp.watch(path.watch.img, gulp.series('image:img')).on('change', browserSync.reload);
    return;
})



gulp.task('default', gulp.series('html', 'css','js', 'image:img', 'image:svg', gulp.parallel('watch', 'server')));