// entry -> output
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
			path: path.join(__dirname, 'public'),
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
			miniCssExtract
		],
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true
		},
	};
};
