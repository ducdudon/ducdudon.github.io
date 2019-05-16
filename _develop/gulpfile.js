/* ===================================================================   <
 *	gulp_settings by Yasu MatsuMoto
 * 	require gulp -g
 ===================================================================   */
var _src        = "_src/";            //- ソースフォルダ
var _dest       = "../";  //- 書出しフォルダ
var IS_MIN      = 0;                  //- JSとCSSを 1:圧縮する or 0:しない
var IS_HARDCASE = 0;                  //- 1:インデントTab or 0:インデントSpace
var IS_CLEAR    = 0;                  //- watch開始時に不要ファイルクリア 1:する or 0:しない
var COPY_FILES  = ['css','def','xml','wav','mp3','mp4','json','zip','inc','woff','pdf','map', 'php'].join('|');



//-  ここから下は弄らなくてOK



//- ===================================================================  importorts <
var gulp         = require('gulp');
var exec         = require('child_process').exec;
var watch        = require('gulp-watch');
var plumber      = require('gulp-plumber');
var gulpif       = require('gulp-if');
var cache        = require('gulp-cached');
var replace      = require('gulp-replace');
var fs           = require('fs');
var path         = require('path');
var gulpIgnore   = require('gulp-ignore');

//-  css
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

//-  image
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var spritesmith  = require('gulp.spritesmith');

//-  html
var htmlhint     = require("gulp-htmlhint");

//-  utils
var concat      = require('gulp-concat');
var browserSync = require('browser-sync');
var connectSSI  = require('connect-ssi');
var uglify      = require('gulp-uglify');
var del         = require('del');
var runSequence = require('run-sequence');
var rev         = require('gulp-rev-append-all');
var reload      = browserSync.reload;

gulp.task('bs-reload', function () {
  browserSync.reload();
});

//- ===================================================================  stylesheets <
gulp.task('sass', function(){
  return gulp.src([_src + '**/*.scss'])
  .pipe(plumber({
    errorHandler: function(err) {
      console.log(err.messageFormatted);
      this.emit('end');
    }
  }))
  .pipe(gulpIgnore.exclude('**/_*.scss'))
  .pipe(gulpIgnore.exclude('**/_*/*.scss'))
  .pipe(sass({
    outputStyle: IS_MIN ? 'compact' : 'expanded'
  }))
  .pipe(
    autoprefixer({
      'browsers' : ['last 6 versions','IE 8', 'ie 9', 'Firefox >= 2', 'ios 6', 'android 4']
    })
  )
  .pipe(gulpif(IS_HARDCASE, replace(/  /g, '\t')))
  .pipe(gulpif(!IS_HARDCASE, replace(/\t/g, '  ')))
  .pipe(gulpif(IS_MIN, replace(/\n\n/g, '\n')))
  .pipe(gulp.dest(_dest))
  .pipe(browserSync.stream());
});


//- ===================================================================  html <
gulp.task('pre_html', function(){
  return gulp.src([_src + '**/*.html', '!' + _src + '**/_*.html'])
  .pipe(plumber())
  .pipe(htmlhint({
    'title-require' : false
  }))
  .pipe(htmlhint.reporter())
  .pipe(gulpif(IS_HARDCASE, replace(/  /g, '\t')))
  .pipe(gulpif(!IS_HARDCASE, replace(/\t/g, '  ')))
  .pipe(gulp.dest(_dest));
});

gulp.task('rev_html', function(){
 return gulp.src([_dest + '**/*.html'])
 .pipe(rev({}))
 .pipe(replace(/\.html\?v=.*"/g, '.html"'))
 .pipe(gulp.dest(_dest));
});

gulp.task("html", function(){
  runSequence('pre_html', 'rev_html', function(callback) {
    browserSync.reload();
  });
})

//- ===================================================================  image <
gulp.task('image', function(){
  return gulp.src( [_src + '/**/*.+(jpg|jpeg|png|gif|svg)', '!' + _src + '/**/_*/**/*.+(jpg|jpeg|png|gif|svg)'])
    .pipe(cache('image'))
    .pipe(imagemin({
      progressive: true,
      use: [pngquant({
        quality : '60-80',
        speed : 1
      })]
    }))
    .pipe(gulp.dest(_dest))
    .pipe(browserSync.stream());
});

//- ===================================================================  sprite <
gulp.task('image_sprite', function () {
  var folders = getFolders(_src + 'common/images/_sprite/');
  folders.forEach(function(folder){
    var _source, _imgOutput, _scssOutput, _prefix, _mode;
    _scssOutput = _src + 'common/css/_sprite/';
    _imgOutput  = _src + 'common/images/sprite/';
    _prefix = folder;
    _source = _src + 'common/images/_sprite/' + folder + '/*.png';
    console.log(_source);

    delete cache.caches['image', 'sass'];
    var spriteData = gulp.src(_source)
    .pipe(spritesmith({
      imgName  : 'sprite_' + _prefix + '.png',
      cssName  : '_sprite_' + _prefix + '.scss',
      imgPath  : '/common/images/sprite/sprite_' + _prefix + '.png?rev=' + new Date().getTime(),
      cssFormat: 'scss',
      padding  : 20,
      cssVarMap: function (sprite) {
        sprite.name = _prefix + '_' + sprite.name;
      },
      cssOpts: {
        functions: false
      }
    }));
    spriteData.img.pipe(gulp.dest(_imgOutput));
    spriteData.css.pipe(gulp.dest(_scssOutput));
  });
});

var getFolders = function(dir_path) {
  return fs.readdirSync(dir_path).filter(function(file) {
    return fs.statSync(path.join(dir_path, file)).isDirectory();
  });
};

//- ===================================================================  js <
gulp.task('js', function(){
  return gulp.src([_src + '**/*.js', '!' + _src + '**/_*.js', '!' + _src + '**/libs.js'])
  .pipe(cache('js'))
  .pipe(plumber({
    errorHandler: function(err) {
      console.log(err.messageFormatted);
      this.emit('end');
    }
  }))
  .pipe(gulpif(IS_MIN, uglify()))
  .pipe(gulp.dest(_dest))
  .pipe(browserSync.stream());
});


//- ===================================================================  copyFiles <
gulp.task('copy_files', function() {
  return gulp.src([_src + '**/**/*.+(' + COPY_FILES + ')', '!' + _src + '**/_*', '!' + _src + '**/_*/*', _src + '**/libs.js'])
    .pipe(gulp.dest(_dest));
});


//- ===================================================================  clear <
gulp.task('clear', function() {
  //-  ワードプレスとphp、Cakeは消さない。
  return IS_CLEAR ? del([_dest + '**/*', '!' + _dest + '**/*.php', '!' + _dest + '**/wp', '!' + _dest + '**/wp/**', '!' + _dest + '**/app', '!' + _dest + '**/wp/**'], {force:true}) : true;
});

//- ===================================================================  browserSync <
gulp.task('browserSync', function() {
  return browserSync({
    server: {
      baseDir: _dest,
      middleware : [
        connectSSI({
          baseDir: _dest,
          ext:'.html'
        })
      ]
    },
    open : 'external',
    reloadOnRestart: true
  });
});

//- ===================================================================  watch <
gulp.task('watch', function() {
  console.log("WATCH_START >>");
  exec("lsof -n -i:3000 | grep LISTEN | awk '{print $2}' | xargs kill -9");
  cache.caches = {};
  return runSequence('clear', 'copy_files', 'browserSync', ['html', 'js', 'sass', 'image'], function() {
    gulp.watch(_src + '**/**/*.+(' + COPY_FILES + ')', ['copy_files']);
    watch([_src + '**/**/*.+(jpg|jpeg|png|gif|svg)', '!' + _src + '**/_*/*.+(jpg|jpeg|png|gif|svg)'], function() {
      gulp.start(["image"]);
    });
    watch(_src + '**/*.html', function() {
      gulp.start(['html']);
    });
    watch(_src + '**/*.js', function() {
      gulp.start(['js']);
    });
    watch(_src + '**/*.scss', function() {
      gulp.start(['sass']);
    });
   //  watch(_src + 'common/images/_sprite/**/*.png', function() {
   //   gulp.start(['image_sprite']);
   // });
  });
});

//- ===================================================================  watch <
gulp.task('default', ['watch']);