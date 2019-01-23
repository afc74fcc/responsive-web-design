'use strict';

let gulp          = require('gulp'),
    imagemin      = require('gulp-imagemin'),
    sass          = require('gulp-sass'),
    cssnano       = require('gulp-cssnano'),
    sourcemaps    = require('gulp-sourcemaps'),
    autoprefixer  = require('gulp-autoprefixer'),
    argv          = require('yargs').argv,
    browserSync   = require('browser-sync').create();

let project;
switch(argv.project){
  case 'tribute':
    project = 'tribute-page';
    break;
  case 'survey':
    project = 'survey-form';
    break;
  case 'product':
    project = 'product-landing-page';
    break;
  case 'technical':
    project = 'technical-documentation-page';
    break;
  case 'portfolio':
    project = 'personal-portfolio-page';
    break;
  default:
    console.log('Wrong project.');
    return;
}

let sourceFolder = project + '/src/',
    targetFolder = project + '/static/';

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
    server: project + "/",
    index: 'index.html',
    port: 8080
  });

  gulp.watch(sourceFolder + 'styles/**/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch(sourceFolder + 'images/*.*', ['images']);
  gulp.watch(project + 'index.html').on('change', browserSync.reload);
});

