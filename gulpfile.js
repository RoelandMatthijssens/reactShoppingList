var gulp = require('gulp');
var source = require('vinyl-source-stream');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

//Lint Task
gulp.task('lint', function(){
    return gulp.src('./assets/javascript/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function(){
    console.log("Recompiling scss");
    return gulp.src('assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest("assets/css"));
});

gulp.task('css', ['sass'], function(){
    console.log("Recompiling css");
    return gulp.src('assets/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('assets/css/dist'));
});

gulp.task('javascript', function(){
    console.log("Recompiling javascript");
    return gulp.src('assets/javascript/src/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/javascript/dist'));
});

gulp.task('react', function(){
    console.log("Recompiling react app");
    var bundler = browserify({
        entries: ['./assets/javascript/react/reactApp.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    bundler
        .bundle()
        .pipe(source('reactApp.js'))
        .pipe(gulp.dest('assets/javascript/dist/'));
});

gulp.task('watch', function(){
    gulp.watch('assets/javascript/src/*.js', ['javascript']);
    gulp.watch('assets/scss/*.scss', ['css']);
    gulp.watch('assets/javascript/react/*.js', ['react']);
});

gulp.task('default', ['lint', 'css', 'javascript', 'react', 'watch']);