var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		'app': './src/app.js',
		'vendor': ['jquery', 'bootstrap']
	},
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist/',
		publicPath: __dirname + '/dist/'
	},
	module: {
		'rules': [{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader']
				})
			},
			{
				test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
				use: [{
					loader: 'file-loader',
					options: {
						modules: true,
						outputPath: "font/"
					}
				}]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/[name].css'),
		new webpack.ProvidePlugin({
			//设置全局jquery
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			'name': 'vendor',
			'filename': 'vendor.js',
			'minChunks': 2
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
};