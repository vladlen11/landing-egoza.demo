let project_folder = "build";
let src_folder = "src";

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin')

;

let  path = {
    build: {
        html: project_folder + '/',
        js: project_folder + '/js/',
        css: project_folder + '/css/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/'
    },
    src: {
        html: src_folder + '/*.html',
        js: src_folder + '/js/main.js',
        style: src_folder + '/style/main.scss',
        img: src_folder + '/img/**/*.+(jpg|png|svg|gif|ico|webp)',
        fonts: src_folder + '/fonts/**/*.*'
    },
    watch: {
        html: src_folder + '/**/*.html',
        js: src_folder + '/js/**/*.js',
        style: src_folder + '/style/**/*.scss',
        img: src_folder + '/img/**/*.+(jpg|png|svg|gif|ico|webp)',
        fonts: src_folder + '/fonts/**/*.*'
    },

    clean: './' + project_folder + '/'
};


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + project_folder
        },
        port: 8000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}
function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}
function css() {
    return src(path.src.style)
        .pipe(
            scss({
                outputStyle: 'expanded'
            })
        )
        .pipe(group_media())
        .pipe(
            autprefixer({
                overrideBrowserslist: ['last 5 version'],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        // .pipe(
        //     imagemin({
        //         progressive: true,
        //         svgoPlugins: [{ removeViewBox: false}],
        //         interlaced: true,
        //         optimizationLevel: 3
        //     })
        // )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function fonts(params) {
    src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html],html);
    gulp.watch([path.watch.style],css);
    gulp.watch([path.watch.js],js);
    gulp.watch([path.watch.img],images);
}

function clean(params) {
    return del(path.clean);

}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

module.exports.fonts = fonts;
module.exports.images = images;
module.exports.js = js;
module.exports.css = css;
module.exports.html = html;
module.exports.build = build;
module.exports.watch = watch;
module.exports.default = watch;