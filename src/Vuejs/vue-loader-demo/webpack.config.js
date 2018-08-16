const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	//设置为开发环境
	mode:'development',
	//文件入口
	entry:'./main.js',
	//模块化编译打包输出
	output:{
		path:__dirname,
		filename:'bundle.js'
	},
	module:{
		rules:[
		   {
			   test:/\.vue$/,
			   loader:'vue-loader'
		   },
		   {
			   test:/\.js$/,
			   loader:'babel-loader',
			   //用来排除掉一些不需要编译解析的js文件
			   exclude:file=>(/node_modules/.test(file) && !/\.vue\.js/.test(file))
		   },
		   {
			   test:/\.css$/,
			   use:['vue-style-loader','css-loader']
		   }
		
		]
	},
	
	plugins:[
	    //make sure to include the plugin for the magic
	    new VueLoaderPlugin()
	]
	
	
}

















