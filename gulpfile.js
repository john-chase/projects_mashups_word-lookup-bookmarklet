const {src, dest, series, parallel, watch} = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const gap = require('gulp-append-prepend');
const origin = './src';
const destination = './dist';
function html(done) {
    src(`${origin}/index.html`)
        .pipe(dest(destination));
    done();
}
function css(done) {
    src(`${origin}/css/bookmarklet.css`)
        .pipe(cleanCss())
        .pipe(rename("bookmarklet.min.css"))
        .pipe(dest(`${destination}/css`))
    done();
}
function js(done) {
    src(`${origin}/js/index.js`)
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))    
        .pipe(uglify())
        .pipe(gap.prependText('javascript:'))  
        .pipe(rename("main.js"))      
        .pipe(dest(`${destination}/js/`));
    done();
}
function images(done) {
    src(`${origin}/**/images/*.*`)
        .pipe(dest(`${destination}`));
    done();
}
async function clean(done) {
    await del(destination);
    done();
}
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.default = series(clean, parallel(html, js, css, images));