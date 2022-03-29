const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));

// sass.compiler = require('node-sass');

const paths = {
  build: ['dist'],
  pages: ['src/views'],
  govukfrontend: ['../node_modules/govuk-frontend']
};

// Copies the fonts and images from the govuk-frontend package to the dist directory
gulp.task("govuk-frontend-copy", function () {
  return gulp
    .src(["./node_modules/govuk-frontend/govuk/assets/**/*"])
    .pipe(gulp.dest("./dist"));
});

// Compiles the sass down to css
gulp.task("sass", function () {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/stylesheets"));
});

gulp.task('copy-views', function () {
  return gulp.src(paths.pages + '/**/*').pipe(gulp.dest(paths.build + '/views'));
});

gulp.task('copy-govukfrontend', function () {
  return gulp.src(paths.govukfrontend + '/**/*').pipe(gulp.dest(paths.build + '/' + paths.govukfrontend));
});

gulp.task('copy-views-styles', gulp.series(gulp.parallel('copy-views', 'copy-govukfrontend', 'sass', 'govuk-frontend-copy')));
