var path = require('path');
var webpack = require('webpack')
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: ['webpack/hot/only-dev-server',
			'webpack-dev-server/client?http://0.0.0.0:8080',
			'./src/index.js'],
	output: { path:__dirname + '/public', filename: 'bundle.js'},
	module: {
		loaders: [
			{	test: /\.jsx?$/, 
				loader: 'react-hot', 
				include: path.join(__dirname, 'src') 
			},
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: '/node_modules',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{ 
				test: /\.css$/, 
				loader: "style-loader!css-loader!postcss-loader" 
      		},
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      		{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
		]
	},
	postcss: function () {
        return [precss, autoprefixer];
    },
	devServer: {
		contentBase: './public',
		hot: true
	}
}