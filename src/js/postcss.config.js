module.exports={
	plugins: [
	require('autoprefixer'),
	//для упорядочения медиа-запросов
	require('css-mqpacker'),
	//для минимизации выходного файла
	require('cssnano')({
		preset: [
		'default', {
			discardComments:{
				removeAll: true,
			}
		}
		]
	})
	
	]
}