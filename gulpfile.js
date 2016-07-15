var gulp=require('gulp'),
//	sass=require('gulp-sass'),
	browserSync=require('browser-sync'),
//	useref=require('gulp-useref'),
//	gulpif=require('gulp-if'),
//	minifyCSS = require('gulp-minify-css'),
//	uglify=require('gulp-uglify'),
//	imagemin=require('gulp-imagemin'),
//	imageminMozjpeg=require('imagemin-mozjpeg'),
//	cache=require('gulp-cache'),
//	del = require('del'),
	connect = require('gulp-connect-php'),
	runSequence = require('run-sequence');

/*开发线路*/
gulp.task('default',function(callback){
	runSequence(['browserSync','watch'],
		callback)
})
gulp.task('browserSync',function(){
	browserSync({

		proxy: "localhost:8001"			//处理php文件，gulp-connect-php默认监听8000，直接设置port：8000会发生占用，启用8001；
	})
});
gulp.task('watch',['browserSync','connectPhp'],function(){
	 gulp.watch('source/**/*.scss',['sass']);
	 gulp.watch(['login/*.html','login/*.js'],browserSync.reload);
	 gulp.watch(['head/*.js','head/*.css'],browserSync.reload);
	 gulp.watch(['sideBar/*.js','sideBar/*.css'],browserSync.reload);
	 gulp.watch(['poster/*.js','poster/*.css'],browserSync.reload);
	 gulp.watch(['details/*.js','details/*.css'],browserSync.reload);
	 gulp.watch(['ad/*.js','ad/*.css'],browserSync.reload);
	 gulp.watch(['comment/*.js','comment/*.css'],browserSync.reload);
	 gulp.watch(['common/*.js','common/*.css'],browserSync.reload);
	 gulp.watch(['explore/*.js','explore/*.css'],browserSync.reload);
	 gulp.watch(['like/*.js','like/*.css'],browserSync.reload);
	 gulp.watch(['pagination/*.js','pagination/*.css'],browserSync.reload);
	 gulp.watch(['backButton/*.js','backButton/*.css'],browserSync.reload);

	 gulp.watch(['html/likePage/*.js','html/likePage/*.css','html/likePage/*.html'],browserSync.reload);
	 
});

gulp.task('connectPhp',function(){
	connect.server({
		bin:'F:/xampp/php/php.exe',
		ini: 'F:/xampp/php/php.ini',
		port:8001
  	});
  	gulp.watch('./*.php').on('change', function () {
    browserSync.reload();
  });
})