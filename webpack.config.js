const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");



module.exports = {
	
	entry: {
		main: path.resolve(__dirname, "./src/main.js"),
		page2: path.resolve(__dirname, "./src/page2.js"),
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].[hash].js",
	},

	devServer: {
		open: true,
		historyApiFallback: true,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			// {
			// 	test: /\.woff2?$/i,
			// 	type:'asset/resource',
			// 	generator: {
			// 		filename: 'fonts/[hash].[ext]'
			// 	}
			// },
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.pdf$/],
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[hash].[ext]",
							outputPath: "assets",
						},
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "build/styles.css",
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/index.html",
			chunks: ["main"],
		}),
		new HtmlWebpackPlugin({
			filename: "page2.html",
			template: "./src/page2.html",
			chunks: ["page2"],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "./src/assets"),
					to: path.resolve(__dirname, "dist/assets"),
				},
			],
		}),
	],
};
