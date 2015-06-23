var gulp = require('gulp'),
    connect = require('gulp-connect'),
    stylus = require('gulp-stylus'),
    please = require('gulp-pleeease'),
    imagemin = require('gulp-imagemin');

gulp.task('http-server', function() {
    connect.server({
        port: 3000,
        root: 'public',
        livereload: true
    });
});

gulp.task('html', function(){
    gulp.src("./src/**/[^_]*.html")
        .on("error", log)
        .pipe(gulp.dest('./public'))
        .pipe(connect.reload());
});

gulp.task('css', function(){
    gulp.src("./src/css/**/[^_]*.styl")
        .pipe(stylus({
            "browsers": "last 10 versions"
        }))
        .on("error", log)
        .pipe(please({
            minifier: false
        }))
        .on("error", log)
        .pipe(gulp.dest('./public/css'))
        .pipe(connect.reload());
});

gulp.task('js', function(){
    gulp.src("./src/js/**/[^_]*.js")
        .on("error", log)
        .pipe(gulp.dest('./public/js'))
        .pipe(connect.reload());
});

gulp.task('images', function(){
    return gulp.src('./src/images/**/*.*')
        .pipe(imagemin())
        .on("error", log)
        .pipe(gulp.dest('./public/images'));
});


gulp.task('watch', function(){
    gulp.watch(['src/**/*.html'], ['html']);
    gulp.watch(['src/css/**/*.styl'], ['css']);
    gulp.watch(['src/js/**/*.js'], ['js']);
    gulp.watch(['src/images/*'], ['images']);

});

gulp.task('default', ['http-server','watch']);

function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));
    this.end();
}