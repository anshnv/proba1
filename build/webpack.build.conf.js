//npm i webpack-merge --save-dev
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production',
  plugins: []
})
//Задает тип конфигурации: удобно, когда нужно асинхронно загружать переменные конфигурации (нутренний плагин)  
module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
