var path = {
    src: {
        html: 'app/html/*.html',
        imgSVG: 'app/img/*.svg',
    },
    build: {
        html: 'build/html/'
    },
    watch: {
        html: 'app/html/**/*.html',
        imgSVG: 'app/img/*.svg',
    }
};

var gulp = require('gulp');
var rigger = require('gulp-rigger'),
    watch = require('gulp-watch');


gulp.task('html:build', (done) => {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
    done();
})
gulp.task('image:svg', (done) => {
 
    done();
})


gulp.task('watch', (done) => {
   gulp.watch(path.watch.html, gulp.series('html:build'));
   gulp.watch(path.watch.imgSVG, gulp.series('image:svg'));
   return ;
})



gulp.task('default', gulp.series('html:build', 'watch'));