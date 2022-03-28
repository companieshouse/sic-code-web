const gulp = require("gulp");
const sass = require("gulp-sass");

sass.compiler = require('node-sass');

const paths = {
  build: ['dist'],
  pages: ['src/views'],
  govukfrontend: ['../node_modules/govuk-frontend']
};

gulp.task('copy-views', function () {
  return gulp.src(paths.pages + '/**/*').pipe(gulp.dest(paths.build + '/views'));
});

gulp.task('copy-govukfrontend', function () {
  return gulp.src(paths.govukfrontend + '/**/*').pipe(gulp.dest(paths.build + '/' + paths.govukfrontend));
});

gulp.task('copy-views-styles', gulp.series(gulp.parallel('copy-views', 'copy-govukfrontend')));
