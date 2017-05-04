var gulp = require('gulp'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify');

//Gulp looks for a task named default to run
gulp.task('default', function() {
    //This creates a stream in javascript that looks at any file inside the javascript folder with the js extension
    gulp.src('./js/**.js')
        .pipe(babel({ presets:['es2015']})) //important to do this pipe before uglify
        .pipe (uglify())
        .pipe (rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('./dist')) //adding this line creates a writable stream
        .pipe (notify({
            message: "Build complete."
        }));
});

//A watch task
gulp.task('watch', function() {
    gulp.watch('./js/**.js', function() {
        gulp.run('default');
    });
});