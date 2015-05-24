var gulper = require('../build/gulper');

/*
 |----------------------------------------------------------------
 | Have a Drink
 |----------------------------------------------------------------
 |
 | Gulper provides a clean, fluent API for defining some basic
 | Gulp tasks for your application. Gulper supports
 | several common CSS, JavaScript and even testing tools!
 |
 */

//Webpack
gulper(function(mix){
	mix.webpack({
		entry: './gulper.js',

		output: {
			filename: 'gulper.min.js',
			path: './build/',
			publicPath: './'
		}
	}, true);
});