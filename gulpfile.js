const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

// 檔案搬家
function mv(){
   return src('index.html').pipe(dest('dist/'));
}

exports.file = mv;


//sass編譯
const sass = require('gulp-sass')(require('sass'));

function styleSass() {
    return src('./src/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(dest('./dist/css'));
}

exports.style = styleSass;

// 拆 html 
const fileinclude = require('gulp-file-include');

function includeHTML() {
    return src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./dist'));
}
exports.html = includeHTML;


function watchfiles() {
    watch(['./src/sass/*.scss', './src/sass/**/*.scss'], styleSass);
    watch(['./src/*.html', './src/**/*.html' , '!dist/*.html'], series(includeHTML))
}

exports.w = watchfiles



//gulp 套件引入
const browserSync = require('browser-sync');
const reload = browserSync.reload;


function browser(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        },
        port: 3000
    });
    watch(['./src/sass/*.scss', './src/sass/**/*.scss'], styleSass).on("change" , reload);
    watch(['./src/*.html', './src/**/*.html' , '!dist/*.html'], series(includeHTML)).on("change" , reload);
    done();
}


exports.default = browser;


