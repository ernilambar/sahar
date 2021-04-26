require("dotenv").config();

const themePath = "./";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	context: __dirname,
	entry: {
		frontend: `${themePath}src/frontend.js`,
		admin: `${themePath}src/admin.js`,
	},
	output: {
		path: path.resolve(__dirname, `${themePath}/dist`),
		filename: "[name]-bundle.js",
		publicPath: themePath,
	},
	externals: {
		jquery: "jQuery",
	},
	mode: "development",
	devtool: "source-map",
	module: {
		rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			},
		},
		{
		  test: /\.(css|scss)$/,
		  use: [
			  MiniCssExtractPlugin.loader,
			  "css-loader",
			  {
			  	loader: "postcss-loader",
			  	options: {
			  		postcssOptions: {
			  			plugins: [
				  			require('autoprefixer')
			  			]
			  		}
			  	}
			  },
			  "sass-loader"
		  ],
		},
		{
		  test: /\.(png|svg|jpg|jpeg|gif)$/,
		  type: 'asset/resource',
		  generator: {
		  	filename: 'images/[name][ext]'
		  }
		},
		{
		  test: /\.(woff|woff2|eot|ttf|otf)$/,
		  type: 'asset/resource',
		  generator: {
		  	filename: 'fonts/[name][ext]'
		  }
		}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({ filename: "[name]-style.css" }),
		new BrowserSyncPlugin({
		  files: ["**/*.php"],
		  injectChanges: true,
		  proxy: process.env.DEV_SERVER_URL,
		}),
	],
	optimization: {
	  minimizer: [new TerserPlugin()],
	}
}
