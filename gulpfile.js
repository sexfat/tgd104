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



