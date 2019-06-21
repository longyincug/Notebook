# JavaScript模块化规范详解


## 目录

1. [为什么要模块化](#1)

2. [模块化的好处](#2)

3. [页面引入加载script存在的问题](#3)

4. [模块化规范](#4)

	- [CommonJS](#4a)

		- [Node.js中实现](#4aa)

		- [浏览器端实现](#4ab)

	- [AMD](#4b)

	- [CMD](#4c)

	- [ES6模块化](#4d)


***



<span id="1">



## 1. 为什么要模块化？


1. Web sites are turning into Web Apps.

2. Code complexity(复杂度) grows as the site gets bigger.

3. Highly decoupled(解耦) JS files/modules is wanted.

4. Deployment(部署) wants optimized(优化) code in few HTTP calls.


<span id="2">


## 2. 模块化的好处

1. 避免命名冲突（减少命名空间污染）

2. 更好的分离，按需加载

3. 更高复用性

4. 高可维护性



<span id="3">


## 3. 页面引入加载script存在的问题:

- 请求过多

- 依赖模糊

- 难以维护



<span id="4">


## 4. 模块化规范


<span id="4a">


### 4.1 CommonJS

每个文件都可当做一个模块

- 在服务器端: 模块的加载是**运行时同步加载**的。

- 在浏览器端: 模块需要提前编译打包处理。

基本语法:

- 暴露模块:
	- `module.exports = value`
	- `exports.xxx = value`
- 引入模块:
	- `require(xxx)`
	- 第三方模块: xxx为模块名
	- 自定义模块: xxx为模块文件路径

实现:

- 服务器端实现: Node.js
- 浏览器端实现: Browserify，也称为CommonJS的浏览器端的打包工具。


***


<span id="4aa">


#### 4.1.1 Node.js模块化过程

1. 安装Node.js

2. 创建项目结构

	```
	|-modules
	  |-module1.js
	  |-module2.js
	  |-module3.js
	|-app.js
	|-package.json
	  {
	  	"name": "commonJS-node",
	  	"version": "1.0.0"
	  }
	```

3. 下载第三方模块
	- `npm install uniq --save`

4. 模块化编码
	- module1.js

		```js
		module.exports = {
			foo() {
				console.log('module1 foo()');
			}
		};
		```
	
	- module2.js
	
		```js
		module.exports = function() {
			console.log('module2()');
		};
		```

	- module3.js
	
		```js
		exports.foo = function() {
			console.log('module3 foo()');
		};
		
		exports.bar = function() {
			console.log('module3 bar()');
		};
		```

	- app.js
	
		```js
		/*
		 * 1. 定义暴露模块:
		 *	module.exports = value;
		 *  exports.xxx = value;
		 * 2. 引入模块:
		 *  var module = require(模块名或模块路径);
		 */
		
		// 引用模块
		let fs = require('fs'); // fs是nodejs中内置的文件系统模块
		let uniq = require('uniq'); // 下载的第三方模块，功能是数组排序去重
		let module1 = require('./modules/module1'); // 自定义的module
		let module2 = require('./modules/module2');
		let module3 = require('./modules/module3');
		
		// 使用模块
		module1.foo();
		module2();
		
		console.log(uniq([1, 3, 2, 4, 2]));
		
		fs.readFile('app.js', function(error, data){
			console.log(data.toString());
		})
		```

5. 通过node运行app.js: `node app.js`


***


<span id="4ab">


#### 4.1.2 Browserify模块化过程


由于浏览器端不具备node那样的环境，不能识别`require`等方法，所以浏览器端的模块化需要借助`Browserify`工具来完成打包，以便浏览器识别。

1. 创建项目结构

	```
	|-js
	  |-dist // 打包生成文件的目录
	  |-src // 源码所在的目录
	    |-module1.js
	    |-module2.js
	    |-module3.js
	    |-app.js // 应用主源文件
	|-index.html
	|-package.json
	  {
	  	"name": "browserify-test",
	  	"version": "1.0.0"
	  }
	```

2. 下载browserify

	- 全局: `npm install browserify -g` // 全局环境安装
	- 局部: `npm install browserify --save-dev` // 只是帮助我们编译打包文件，在开发环境(-dev)下安装即可，将来生产环境并不需要

	安装完后，package.json中会变成:
	```js
	  {
	  	"name": "browserify-test",
	  	"version": "1.0.0"
	  	"devDependencies": {"browserify": 版本号}, // 开发环境下的依赖包
	  	"dependencies": {"uniq": 版本号} // 全局依赖包
	  }
	```

3. 定义模块代码

	和Node.js中一样的定义。
	

4. 打包处理js源文件:

	- `browserify js/src/app.js -o js/dist/build.js`

	- 上面的命令执行完毕后，生成了打包后的文件，就可以在html页面中引入了: 
		
		`<script type="text/javascript" src="js/dist/build.js"></script>`


***



<span id="4b">
<br>


### 4.2 AMD

Asynchronous Module Definition(异步模块定义)

专门用于浏览器端，模块的加载是异步的。

**语法:**

1. 定义暴露模块

	- 定义没有依赖的模块
	
		```js
		define(function(){
			return 模块
		})
		```

	- 定义有依赖的模块
	
		```js
		define(['module1','module2'], function(m1, m2){
			return 模块
		})
		```

2. 引入使用模块

	```js
	require(['module1','module2'], function(m1, m2){ //显式声明依赖注入
		使用m1/m2
	})
	```


实现: `Require.js`


在没有使用AMD规范(require.js)的时候，我们通过多个script标签来按照依赖顺序依次引入js文件，
这样不但增加了HTTP请求数，更增加了维护的难度，容易出错。


**通过模块加载器`require.js`来加载js模块:**


1. 下载Require.JS，官网: http://www.requirejs.cn/

2. 创建项目结构

	```
	|-js
	  |-libs
	    |-require.js
	  |-modules
	    |-module1.js
	    |-module2.js
	  |-main.js
	|-index.html
	```

3. 定义模块代码

	- module1.js
		
		```js
		define(function(){
			let msg = 'hello';
			function getMsg(){
				return msg.toUpperCase();
			}
			return {getMsg};
		});
		```

	- module2.js
	
		```js
		define(['module1', 'jquery'], function(m1, $){
			let name = "module2";
			function showMsg(){
				$('body').css('background', "red");
				alert(m1.getMsg() + ',' + name);
			}
			return {showMsg};
		});
		```

4. 编写应用主入口: main.js

	```js
	(function () {
		// 配置
		require.config({
			//基本路径
			baseUrl: "js/",
			//模块标识名与模块路径映射
			paths: {
				"module1": "./modules/module1", // 内部会给路径自动加上.js扩展名
				"module2": "./modules/module2",
			}
		});
		
		// 引入使用模块
		require(['module2'], function(module2){
			module2.showMsg();
		})
	})()
	```

5. 页面使用模块

	`<script data-main="js/main.js" src="js/libs/require.js"></script>`

	require.js 在加载的时候会检查 `data-main` 属性:
	可以在data-main指向的脚本中设置模板加载 选项，然后加载第一个应用模块。
	
	注意：你在main.js中所设置的脚本是异步加载的。所以**如果你在页面中配置了其它JS加载，则不能保证它们所依赖的JS已经加载成功**。

	例如:

	```html
	<script data-main="scripts/main" src="scripts/require.js"></script>
	<script src="scripts/other.js"></script>
	```
	
	```js
	// contents of main.js:
	require.config({
	    paths: {
	        foo: 'libs/foo-1.1.3'
	    }
	});
	```
	
	```js
	// contents of other.js:

	// This code might be called before the require.config() in main.js
	// has executed. When that happens, require.js will attempt to
	// load 'scripts/foo.js' instead of 'scripts/libs/foo-1.1.3.js'
	require( ['foo'], function( foo ) {
	
	});
	```

	<br>

6. **使用第三方基于require.js的框架（jquery）**

	jQuery支持AMD规范，在源码的最后几行，`define("jquery", [], function(){return jQuery;});` 这说明jQuery暴露了一个模块接口，并且标识名为jquery。
	
	注意在引入的时候，写`jquery`而不是`jQuery`。
	
	将jQuery库文件导入到项目的libs目录中，然后在main.js中配置jquery路径:
	
	```js
	path: {
		'jquery': './libs/jquery-1.10.1'
	}
	```

	接下来就可以使用在module中了。
	
	```js
	define(['module1', 'jquery'], function (module1, $) {
	    var name = 'Tom';
	    function showMsg() {
	        $('body').css({background : 'red'})
	        alert(name + ' ' + module1.getMsg())
	    }
	    return {showMsg}
	})
	```
	<br>
7. **使用第三方不基于require.js的框架（Angular）**

	将`angular.js/angular-ui-router.js/angular-message`等导入项目目录，然后在`paths`中添加`angular`路径。
	
	为了配置不兼容AMD的模块，需要在`require.config`中多添加:
	
	```js
	shim: {
		'angular': {
			exports: 'angular'
		},
		`angular-message`: {
			exports: 'angular-message',
			deps: ['angular']
		}
	}
	```
	如：
	```js
	require.config({
	    //选择基础目录
	    baseUrl: 'src/',
	    //别名
	    paths: {
	        "angular": "lib/angular",
	        "angular-ui-router": "lib/angular-ui-router"
	    },
	    //需要声明paths中元素暴露的接口和依赖（angular内置没有支持AMD）
	    shim: {
	        'angular': {exports: 'angular'},
	        'angular-ui-router': {deps: ['angular']}
	    }
	});
	
	//核心入口
	require(['angular', 'app-routes'], function(angular){
	    angular.element(document).ready(function(){
	        //angular.bootstrap是一个方法，表示将模块绑定给某个元素
	        //这里相当于自动给html标签添加了一个ng-app属性，值为app
	        //类似Vue中$mount挂载的概念
	        angular.bootstrap(document, ['app']);
	        //angular.element(document).find("html").addClass("ng-app");
	    });
	});
	```

***



<span id="4c">



### 4.3 CMD


专门应用于浏览器端，模块的加载是异步的。

实现: `sea.js`，github: https://github.com/seajs/seajs

模块使用时才会加载执行。


**语法:**

1. 定义暴露模块

	- 定义没有依赖的模块
	
		```js
		define(function(require, exports, module){
			exports.xxx = value;
			module.exports = value;
		})
		```
	
	- 定义有依赖的模块
	
		```js
		define(function(require, exports, module){
			//引入依赖模块（同步）
			var module2 = require('./module2');
			//引入依赖模块（异步），注意异步的function会在主线程执行完毕再执行，因此输出顺序可能变化
			require.async('./module3', function(m3){
			})
			//暴露模块
			exports.xxx = value;
		})
		```

2. 引入使用模块

	```js
	define(function(require){
		var m1 = require('./module1');
		var m4 = require('./module4');
		m1.show();
		m4.show();
	})
	```


CMD规范，定义模块类似AMD，暴露模块类似Commonjs。


**使用方法:**

1. 下载sea.js并引入到libs。

2. 创建项目结构

	```
	|-js
	  |-libs
	    |-sea.js
	  |-modules
	    |-module1.js
	    |-module2.js
	    |-module3.js
	    |-module4.js
	    |-main.js
	|-index.html
	```

3. 定义sea.js的模块代码

	- module1.js
	
		```js
		define(function(require, exports, module) {
			var data = "hello";
			function show(){
				console.log('module1 show()' + data);
			}
			// 向外暴露
			exports.show = show;
		})
		```

	- 主入口模块: main.js
	
		```js
		define(function(require){
			var m1 = require('./module1');
			m1.show();
		})
		```

4. 在index页面引入

	```html
	<script type="text/javascript" src="js/libs/sea.js"></script>
	<script type="text/javascript">
		seajs.use('./js/modules/main.js')
	</script>
	```


***



<span id="4d">



### 4.4 ES6模块化规范


ES6中内置了js模块化的实现，静态加载模块（编译时加载）。

**语法:**

1. 定义暴露模块: `export`

	- 暴露一个对象(默认暴露):

		`export default 对象`

		可以暴露任意数据类型，暴露什么就接收到什么。

	- 暴露多个对象(常规暴露):
	
		```js
		// 分别暴露
		export var xxx = value1;
		export let yyy = value2;
		
		// 统一暴露
		var xxx = value1;
		let yyy = value2;
		export {xxx, yyy}
		```

		统一暴露或者分别暴露，在引入的时候必须用对象解构赋值的形式。


2. 引入使用模块: `import`

	- 默认暴露的模块:
		
		```js
		import xxx from '模块路径/模块名'
		```

	- 其他模块
	
		```js
		import {xxx, yyy} from '模块路径/模块名'
		
		import * as module1 from '模块路径/模块名'
		```

**区别:**

ES6模块是静态加载(编译时加载)：`import {} from 'xxx'`

`CommonJS`则是运行时加载：`const {} = require('xxx')`


**问题:**

一些浏览器还不能直接识别ES6模块化的的语法。

需要使用`Babel`来将ES6转换为ES5，但由于内部还使用了`CommonJS`，所以浏览器仍然不能直接执行。

接着再次使用`Browserify`来将文件打包处理，最终引入页面，浏览器可以直接运行。


**js转换及打包方法:**

1. 定义package.json文件

	```js
	{
		"name": "es6_babel_browserify-test",
		"version": "1.0.0"
	}
	```

2. 安装babel-cli, babel-preset-es2015和browserify

	- `npm install babel-cli browserify -g`
	- `npm install babel-preset-es2015 --save-dev`

3. 定义`.babelrc`配置文件（babel在执行之前会先读取该文件）

	```js
	{
		"presets": ["es2015"] // 该命令决定了babel要去执行的任务，"es2015"表示ES6语法转换
	}
	```

4. 编写模块

	- js/src/module1.js

		`something...`

	- js/src/app.js
	
		```js
		import {fun1, fun2} from './module1';
		import $ from 'jquery';
		
		$('body').css('background', 'red');
		fun1();
		fun2();
		```

5. 编译打包

	- 使用Babel编译为ES5语法(包含CommonJS): 

		`babel js/src -d js/build` (可以自动生成新目录build)

	- 使用Browserify打包js: 

		`browserify js/build/app.js -o js/dist/bundle.js`(不能自动生成dist目录)


6. 页面中引入

	`<script type="text/javascript" src="js/build/bundle.js"></script>`

7. 引入第三方模块（jQuery）

	1. 下载jQuery模块: 

		`npm install jquery@1 --save` (模块后加@代表下载相应版本号下的最新版本)

	2. 在app.js中引入使用:

		`import $ from 'jquery'`


**注意:**

当改变了模块中的代码后，需要重新转换(Babel)、编译打包(Browserify)，再引入页面。
