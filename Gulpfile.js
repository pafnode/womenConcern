var gulp = require("gulp"),
    amdOptimize = require('amd-optimize'),
    minifyHTML = require('gulp-minify-html'),
	less = require('gulp-less'),
	sourcemap = require('gulp-sourcemaps'),
	filter = require("gulp-filter"),
	livereload = require("gulp-livereload"),
	httpserver = require("http-server"),
	debug = require('gulp-debug'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	order = require('gulp-order'),
    es = require("event-stream"),
	fs = require('fs'),
	path = require("path"),
	rimraf = require("gulp-rimraf");

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
            //console.log(dir)
            console.log(file)
        return fs.statSync(path.join(dir, '/', file)).isDirectory();
      });
}

gulp.task("clean", function(cb) {
    return es.merge(gulp.src(['build/css/*.css', 'build/*.css'], {read: false}),
        gulp.src(['build/js/*.js', 'build/*.js'], {read: false})
    )
    .pipe(rimraf());
});

gulp.task("build",["clean"],function(cb) {
      console.log(getFolders("src"))
});


//gulp.task("buildless", function(){
//    var folders = getFolders('src/module');
//    var tasks = folders.map(function(folder) {
//        return gulp.src([path.join('src/module/', folder, "less/index.less"), path.join('src/module/', folder, "less/*.less")])
//            // .pipe(debug({verbose:true}))
//            // .pipe(sourcemap.init())
//            // .pipe(sourcemap.write("build/js/maps"))
//            .pipe(less().on('error', function(err){console.log(err);}))
//            .pipe(concat(folder+".css"))
//            // .pipe(sourcemap.write("build/css/maps"))
//            .pipe(gulp.dest(path.join('src/module/', folder, "css")));
//    });
//
//    return merge(tasks);
//});
//
//gulp.task("buildcss", ["cleancss", "buildless"], function(){
//    var folders = getFolders('src/module');
//    var tasks = folders.map(function(folder) {
//        return gulp.src([path.join('src/module/', folder, "css/index.css"), path.join('src/module/', folder, "css/*.css")])
//            // .pipe(debug({verbose:true}))
//            // .pipe(sourcemap.init())
//            // .pipe(sourcemap.write("build/js/maps"))
//            .pipe(less().on('error', function(err){console.log(err);}))
//
//            .pipe(concat(folder+".css"))
//            // .pipe(sourcemap.write("build/css/maps"))
//            .pipe(gulp.dest("build/css"));
//    });
//    return merge(tasks);
//});
//
//gulp.task("buildjs", ["cleanjs"], function(){
//
//    return gulp.src("src/module/global/*.js")
//        .pipe(amdOptimize("main", {
//            paths: {
//                "zepto": "src/bower_libs/zepto/zepto",
//                "backbone": "src/bower_libs/backbone/backbone",
//                "handlebars": "src/bower_libs/handlebars/handlebars",
//                "underscore": "src/bower_libs/underscore/underscore",
//                "text": "src/bower_libs/text/text"
//            },
//            map : {
//                "backbone" : {
//                    "jquery" : "zepto"
//                }
//            }
//        }))
//        .pipe(concat("global-debug.js"))
//        .pipe(gulp.dest("build/js"));
//});
//
//gulp.task('minify', ["build"], function(){
//    return gulp.src("build/*.js")
//        .pipe(rename('global.min.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest("build/js"));
//});
//
//gulp.task("build", ["buildcss", "buildjs"]);

gulp.task('server', ["build"], function() {
  livereload.listen();
  var HTTPServer = httpserver.createServer();
  HTTPServer.listen(8888, "0.0.0.0");
  return gulp.watch(['src/**', 'test/**'], ["build"]).on('change', livereload.changed);
});

gulp.task('default', function(){

});