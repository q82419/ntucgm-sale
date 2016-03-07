var gulp = require('gulp');
var webpack = require("webpack");
var exec = require('child_process').exec;
var connect = require('gulp-connect');
var ts = require('gulp-typescript')
var tsProject = ts.createProject('tsconfig.json');

gulp.task('webpack', function(done) {
  webpack(require('./webpack.config.js'), function(err, stats){
     done(); 
  });
});

gulp.task('complie', function(done){
   var stream = tsProject.src()
    .pipe(ts(tsProject))
    .pipe(gulp.dest('./built'));
    
    stream.on('end',function(){
        done();
    })
});

gulp.task('test', function(done){
    exec('npm test',function(error, stdout, stderr){
       done();
    });
});

gulp.task('connectDev', function () {
  connect.server({
    port: 8888,
    livereload: true
  });
});

gulp.task('reloadIndex', function(done){
    var stream = gulp.src('public/app.html')
    .pipe(connect.reload());
    
     stream.on('end',function(){
        done();
    })
});

gulp.task('reloadReport', function(){
    gulp.src('report.html')
    .pipe(connect.reload());
});



gulp.task('auto', function(){
   gulp.watch('report.html',['reloadReport']);
   gulp.watch('built/app.js',['reloadIndex','test']);
   gulp.watch('ts/react/*.tsx',['webpack']);
   gulp.watch('css/*.css',['webpack']);
   gulp.watch('ts/redux/*.ts',['complie','webpack']);
   gulp.watch('test/*.js',['test']);
});


gulp.task('default',['connectDev','complie','webpack','test','auto']);

  
    