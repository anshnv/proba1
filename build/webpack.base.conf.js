// webpack v4
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
//const html = require('./file.pug');
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  //assets: './'
  //попробовать assets:''
  //assets:'.'
  assets:''
}

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    //page: PATHS.src
		page: `${PATHS.src}/index.js`
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    //publicPath: '/'
  },
	
	module: {
    rules: [
		{
      test: /\.js$/,
			exclude: '/node_modules/',
			use:{loader: 'babel-loader'}
		},
		{
      test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
      loader: 'file-loader',
      options: {
			//outputPath: `${PATHS.src}img`,
		
			name: '[name].[ext]'
      }
    },
		{
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }
				,
				{
          loader: 'postcss-loader',
          options: { sourceMap: true,
											config: { path:`${PATHS.src}/js/postcss.config.js`},
											plugins: ()=>[autoprefixer()]
										}
					}
				,
				{
          loader: 'sass-loader',
          options: { sourceMap: true,
						sassOptions: {
							includePaths: ['./node_modules']
						}
					}
        }
      ]
    },
		{
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }
				,
				{
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` }}
        }
      ]
	  
    },
	{
		test: /\.pug$/,
		use: [
			'html-loader?attrs=false',
			{loader:'pug-html-loader',
			options: {pretty: true}}
			]
	}
	
]
},
 plugins:[
	 new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
	  }),
		new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
	  filename: './index.html',
	  template:	`${PATHS.src}/index.pug`,
      filename: 'index.html'
    }),
		new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      //'window.jQuery': 'jquery',
			//'window.$': 'jquery'
    }),
 ]
}