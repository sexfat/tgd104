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


// 1 sass編譯
const sass = require('gulp-sass')(require('sass'));

function styleSass() {
    return src('./src/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(dest('./dist/css'));
}

exports.style = styleSass;

// 2 拆 html 
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



//監看
function watchfiles() {
    watch(['./src/sass/*.scss', './src/sass/**/*.scss'], styleSass);
    watch(['./src/*.html', './src/**/*.html' , '!dist/*.html'], series(includeHTML))
}

exports.w = watchfiles


// 執行先後順序
function missionA(cb) {
    console.log('missionA');
    cb();
}


function missionB(cb) {
    console.log('missionB');
    cb();
}


//先執行完A 在執行B
exports.a = series(missionA , missionB)


// A跟B 同時執行
exports.p = parallel(missionA , missionB)


//  3 壓縮圖片大小

const imagemin = require('gulp-imagemin');

function min_images(){
    return src('src/images/*.*')
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 70, progressive: true}) // 壓縮品質      quality越低 -> 壓縮越大 -> 品質越差 
    ]))
    .pipe(dest('dist/images'))
}

exports.img = min_images 


// 4 搬圖片
function mvimg(){
    return src(['src/images/*.*' , 'src/images/**/*.*']).pipe(dest('dist/images'))
}




// 5 js es6 -> es5 
const babel = require('gulp-babel');

function babel5() {
    return src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('dist/js'));
}



exports.js = babel5


//6 清除舊檔案
const clean = require('gulp-clean');

function clear() {
  return src('dist' ,{ read: false ,allowEmpty: true })//不去讀檔案結構，增加刪除效率  / allowEmpty : 允許刪除空的檔案
  .pipe(clean({force: true})); //強制刪除檔案 
}
exports.c = clear




// 7 瀏覽器同步
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

// exports.default = browser;

// 開發用
exports.default = series( parallel(includeHTML , styleSass , babel5 ,mvimg) , browser)


//上線用
exports.package = series(clear , parallel(includeHTML , styleSass , babel5 ,min_images))





