//npm i webpack-merge --save-dev
const webpack =  require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  mode: 'development',
	//контролирует, если и как генерируются исходные карты: для разаботки модульных проектов
  devtool: 'cheap-module-eval-source-map',
	//может быть использован для быстрой разработки приложения
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8080,
    //показывает предупреждения и ошибки
		overlay: {
      warnings: true,
      errors: true
    }
  },
 //позволяет более детально управлять генерацией исходной карты: для корректного отображения import ‘./example.scss’ при использоании scss
	plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
})
//Задает тип конфигурации: удобно, когда нужно асинхронно загружать переменные конфигурации (нутренний плагин) 
module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
