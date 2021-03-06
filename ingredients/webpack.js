var webpack = require('webpack');
var elixir = require('laravel-elixir');
var util = require('gulp-util');
var _ = require('lodash');

var DEBUG = true;


var defaultConfig = {

	stats: {
		colors: true,
		reasons: DEBUG
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
	].concat(DEBUG ? [] : [
			 new webpack.optimize.DedupePlugin(),
			 new webpack.optimize.UglifyJsPlugin(),
			 new webpack.optimize.AggressiveMergingPlugin()
		 ]),

	resolve: {
		extensions: ['', '.js']
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					optional: ['runtime'],
					cacheDirectory: true
				}
			}
		]
	}
};

elixir.extend('webpack', function (config, watch) {
	var started = false;
	var webpackConfig = _.merge(config, defaultConfig);

	var bundler = webpack(webpackConfig);

	function bundle(err) {
		if (err) {
			throw new util.PluginError('webpack', err);
		}

		//$.util.log('[webpack]', stats.toString({colors: true}));

		if (!started) {
			started = true;
			return function () {
			};
		}
	}

	if (watch) {
		bundler.watch(200, bundle);
	} else {
		bundler.run(bundle);
	}
});