var gulp = require('gulp');

// Theme Files

var jsFiles = 'wp-content/themes/TechNutty5-5/library/js/*.js',
    jsDest = 'gulp-build/themes/scripts';

var cssFiles = 'wp-content/themes/TechNutty5-5/library/css/*.css',
    cssDest = 'gulp-build/themes/styles',
    mincssFiles = 'gulp-build/themes/styles/*.css',
    mincssDest = 'gulp-build/themes/styles/min/';

var imgsFiles = 'wp-content/themes/TechNutty5-5/**/*.{png,jpg,gif}',
    imgsDest = 'gulp-build/themes/images',
    webpDest = 'gulp-build/themes/images/';

// Error Notification

var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var plumberErrorHandler = { errorHandler: notify.onError({

    title: 'Gulp Error Message',

    message: 'Error: <%= error.message %>'

  })

};

// combine and minify JS

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var uncss = require('gulp-uncss');

gulp.task('scripts-theme', function() {
    return gulp.src(jsFiles)
        .pipe(plumber(plumberErrorHandler))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

//combine + minify original css

gulp.task('styles-theme', function () {
	return gulp.src(cssFiles)
    .pipe(plumber(plumberErrorHandler))
		.pipe(concat('stylesheet.css'))
		.pipe(gulp.dest(cssDest))
    .pipe(rename('stylesheet.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(mincssDest));
});

// remove unused css

gulp.task('uncss', function() {

gulp.src(mincssFiles)
.pipe(uncss({ html: [
  'https://technutty.co.uk/',
  'https://technutty.co.uk/articles/all/news/gadgets/69758/dysons-pure-hotcool-link-fan-will-available-september-5th/',
  'https://technutty.co.uk/tip-us/',
  'https://technutty.co.uk/topics/articles/all/news/events/',
  'https://technutty.co.uk/?s=Apple',
  'https://technutty.co.uk/contact/',
  'https://technutty.co.uk/about/',
  'https://technutty.co.uk/cookies-information-page/',
  'https://technutty.co.uk/articles/all/news/gadgets/69137/dog-bone-locksmart-mini-bluetooth-padlock-review/',
  'https://technutty.co.uk/articles/all/news/films/62318/deadpool-film-review/',
  'https://technutty.co.uk/tags/dog-and-bone-locksmart-mini/',
  'https://technutty.co.uk/author/nicholas-griffin/',
  'https://technutty.co.uk/articles/all/news/phones/sony-phones/68463/sony-xperia-x-smartphone-review/'
]
}))
.pipe(rename({suffix: '.clean'}))
.pipe(gulp.dest(cssDest))
.pipe(rename('stylesheet.clean.min.css'))
.pipe(cleanCSS())
.pipe(gulp.dest(mincssDest));

});

// prefic clean css

var autoprefixer = require('gulp-autoprefixer');

gulp.task('autoprefixer', function () {
    return gulp.src('gulp-build/themes/styles/stylesheet.clean.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.prefix'}))
        .pipe(gulp.dest(cssDest));
  });

// shorthand

var shorthand = require('gulp-shorthand');

gulp.task('shorthand', function () {
    return gulp.src('gulp-build/themes/styles/stylesheet.clean.prefix.css')
        .pipe(rename('stylesheet.shorthand.css'))
        .pipe(shorthand())
        .pipe(gulp.dest(cssDest));
});

// minify clean prefix css

gulp.task('cleanMinify', function () {
  return gulp.src('gulp-build/themes/styles/stylesheet.clean.prefix.css')
  .pipe(rename('stylesheet.clean.prefix.min.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest(mincssDest));
  });

  // minify clean shorthand css

  gulp.task('shorthandMinify', function () {
    return gulp.src('gulp-build/themes/styles/stylesheet.shorthand.css')
    .pipe(rename('stylesheet.shorthand.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(mincssDest));
    });

// optimise clean css - doesn't work yet

var stripCssComments = require('gulp-strip-css-comments');
var shorthand = require('gulp-shorthand');

gulp.task('cssShort', function () {
    return gulp.src('gulp-build/themes/styles/stylesheet.clean.css')
        .pipe(stripCssComments())
        .pipe(shorthand())
        .pipe(gulp.dest(cssDest));
});



// Automate tasks

gulp.task('watch', function() {

  gulp.watch('jsFiles', ['scripts-theme']);

  gulp.watch('cssFiles', ['styles-theme']);

});

// Run tasks

gulp.task('default', ['scripts-theme', 'styles-theme', 'watch'], function(){});

// End Gulpfile
