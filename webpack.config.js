// entry -> output
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

// Set env var to itself (prod) if set by heroku, else dev
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Use dotenv to set process.env.NODE_ENV variables
if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({path: '.env.test'});
} else if (process.env.NODE_ENV === 'development') {
	require('dotenv').config({path: '.env.development'});
}

// Webpack Configuration Types -> Exporting a Function
// Function gets called with arguments
module.exports = (env) => {
	const isProduction = env === 'production';
	const miniCssExtract = new MiniCssExtractPlugin({
		filename: 'styles.css'
	})

	return {
		entry: './src/app.js',
		output: {
			path: path.join(__dirname, 'public', 'dist'),
			filename: 'bundle.js'
		},
		module: {
			rules: [{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			}, {
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}]
		},
		plugins: [
			miniCssExtract,
			new webpack.DefinePlugin({ // Must stringify right hand side per https://webpack.js.org/plugins/define-plugin/
				'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
				'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
				'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
				'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
				'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
				'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
				'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
				'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
			})
		],
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: { // doesn't write to local fsys, uses cache
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true, // serves up index.html for all unspecified routes
			publicPath: '/dist/',
		},
	};
};
