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



