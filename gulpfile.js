var path = {
    src: {
        html: 'app/html/*.html',
        css: 'app/css/**/*.scss',
        imgjpeg: 'app/img/*.jpg',
        imgpng: 'app/img/*.png',
        imgSVG: 'app/img/*.svg',
    },
    build: {
        html: 'build/',
        img: 'build/img/',
        css: 'build/css/',
        svgSprite: 'build/img/sprite.svg',
    },
    watch: {
        css: 'app/css/**/*.scss',
        html: 'app/html/**/*.html',
        imgSVG: 'app/img/*.svg',
        img: 'app/img/*',
    }
};

var gulp = require('gulp');
var rigger = require('gulp-rigger'),
    svgSprite = require('gulp-svg-sprite'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('html', (done) => {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
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

gulp.task('sass', function () {
    return gulp.src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: path.build.html
        }
    });
})


gulp.task('watch', (done) => {
    gulp.watch(path.watch.html, gulp.series('html')).on('change', browserSync.reload);
    gulp.watch(path.watch.css, gulp.series('sass'));

    gulp.watch(path.watch.imgSVG, gulp.series('image:svg')).on('change', browserSync.reload);
    gulp.watch(path.watch.img, gulp.series('image:img')).on('change', browserSync.reload);
    return;
})



gulp.task('default', gulp.series('html', 'image:img', 'sass','image:svg', gulp.parallel('watch', 'server')));