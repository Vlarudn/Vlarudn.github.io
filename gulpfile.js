var gulp = require("gulp"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    uglifyJs = require("gulp-uglifyjs"),
    cssnano = require("gulp-cssnano"),
    browserSync = require("browser-sync"),
    rename = require("gulp-rename"),
    autoprefixer = require("gulp-autoprefixer"),
    cache = require("gulp-cache");

gulp.task("browserSync", function () {
  browserSync({
    server: {
      baseDir: "./"
    },
    notify: false
  })
});
gulp.task("sass", function () {
  return gulp.src("src/sass/**/*.scss")
      .pipe(sass())
      .pipe(autoprefixer("last 2 version", "ie 11", {cascade: true}))
      .pipe(cssnano())
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task("js", function () {
  return gulp.src("src/js/**/*.js")
      .pipe(concat("scripts.min.js"))
      .pipe(uglifyJs())
      .pipe(gulp.dest("dist/js"))
      .pipe(browserSync.reload({stream: true}))
});
gulp.task("img", function () {
  return gulp.src("src/img/**/*")
      .pipe(gulp.dest("dist/img/"))
      .pipe(browserSync.reload({stream: true}))
});
gulp.task("fonts", function () {
  return gulp.src("src/fonts/**/*")
      .pipe(gulp.dest("dist/fonts/"))
      .pipe(browserSync.reload({stream: true}))
});
// gulp.task('js-libs', function() {
//   return gulp.src(["src/libs/**/**/*.js"])
//       .pipe(uglifyJs())
//       .pipe(gulp.dest('dist/libs/'));
// });

gulp.task("libs", function () {
  return gulp.src("src/libs/**/**/*")
      .pipe(gulp.dest("dist/libs/"))
});

gulp.task("clean", function(){
  return del.sync("dist");
});

gulp.task("build", ["clean", "sass", "js", "img", "fonts", "libs", "browserSync"], function() {
  var buildCss = gulp.src("src/sass/**/*.scss")
  .pipe(gulp.dest("dist/css"));

  var buildJs = gulp.src("src/js/**/*.js")
      .pipe(gulp.dest("dist/js"));

  var buildFonts = gulp.src("src/fonts/**/*")
      .pipe(gulp.dest("dist/fonts"));

  var buildLibs = gulp.src("src/libs/**/**/*")
      .pipe(gulp.dest("dist/libs"));

  var buildPics = gulp.src("src/img/**/*")
      .pipe(gulp.dest("dist/img"));

});

gulp.task("watch", ["sass", "js", "img", "fonts", "libs", "browserSync"], function () {
  gulp.watch("src/sass/**/*.scss", ["sass"]);
  gulp.watch("src/js/**/*.js", ["js"]);
  gulp.watch("src/img/**/*", ["img"]);
  gulp.watch("src/libs/**/*", ["libs"]);
  // gulp.watch("src/libs/**/*", ["css-libs"]);
});

gulp.task("default", ["watch"]);

gulp.task("cc", function() {
  return cache.clearAll();
});