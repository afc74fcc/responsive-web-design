'use strict';

let gulp          = require('gulp'),
    imagemin      = require('gulp-imagemin'),
    sass          = require('gulp-sass'),
    cssnano       = require('gulp-cssnano'),
    sourcemaps    = require('gulp-sourcemaps'),
    autoprefixer  = require('gulp-autoprefixer'),
    browserSync   = require('browser-sync').create();

let sourceFolder = 'src/',
    targetFolder = 'static/';

// Compress Images
gulp.task('images', function(){
  gulp.src(sourceFolder + 'images/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest(targetFolder + 'images'));
});

// Styles workflow
gulp.task('styles', function () {
  gulp.src(sourceFolder + 'styles/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        remove: false,
        cascade: false
      }))
      .pipe(cssnano())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(targetFolder + 'styles'));
});

// Default task and watcher
gulp.task('default', ['styles', 'images'], function () {

  browserSync.init({
    server: "./",
    index: 'index.html',
    port: 8080
  });

  gulp.watch(sourceFolder + 'styles/**/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch(sourceFolder + 'images/*.*', ['images']);
  gulp.watch('index.html').on('change', browserSync.reload);
});

