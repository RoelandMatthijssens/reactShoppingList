let path = require ('path');
let ExtractTextPlugin = require ('extract-text-webpack-plugin');

let isProd = process.env.ENV === 'production';

module.exports = {
	mode: isProd ? 'production' : 'development',
	devtool: 'source-map',
	devServer: {
		contentBase: 'src/front/static',
		proxy: {
			'/api': {
				target: 'http://localhost:8000/',
				pathRewrite: { '^/api' : '' }
			}
		},
		port: 3000
	},
	entry: {
		bundle: [ 'normalize.css', './src/front/js/main.js', './src/front/css/main.css' ]
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve (__dirname, 'build/dist'),
		publicPath: isProd ? '/' : 'http://localhost:3000/'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			query: { presets: [ 'env', 'react', 'stage-3' ] }
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract ({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			loader: 'file-loader?name=css/[name].[ext]'
		}]
	},
	resolve: {
		alias: {
			['~']: path.resolve (__dirname, 'src/front/js')
		}
	},
	plugins: [
		new ExtractTextPlugin ('css/styles.css')
	]
};
