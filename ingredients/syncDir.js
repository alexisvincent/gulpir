var elixir = require('laravel-elixir');
var gulp = require('gulp');

elixir.extend("syncDir", function (src_dir, dest_dir) {

	function endsWith(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}

	var src = (endsWith(src_dir, '/') ? src_dir : src_dir+"/") + '**/*';

	gulp.task('syncDir', function () {
		return gulp.src(src).pipe(gulp.dest(dest_dir));
	});

	this.registerWatcher("syncDir", src);

	return this.queueTask("syncDir");
});