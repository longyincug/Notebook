# Angular.js


## 目录

1. [Angular简介](#1)
2. [作用域对象和控制器对象](#2)
3. [依赖注入的三种方式](#3)
4. [常用指令及过滤器](#4)
5. [关于$http的使用](#5)
6. [ng-options的使用](#6)
7. [表单验证](#7)
8. [$watch监视及相关原理](#8)
9. [Angular中的服务](#9)
10. [自定义指令](#10)
11. [前端路由](#11)
12. [Angular中使用RequireJS](#12)



<br>

<a name="1">


## 1. Angular简介

Google开源的前端JS结构化框架。

### 1.1 特性和优点

- 双向数据绑定
- 依赖注入
- 解耦应用逻辑，数据模型和视图
- 完善的页面指令
- 定制表单验证
- Ajax封装

<br>


### 1.2 与jQuery的比较

jQuery：

> JS函数库，封装简化dom操作。



Angular：

> JS结构化框架，主体不再是DOM，而是页面中的动态数据。

<br>

### 1.3 应用领域

构建**SPA**（单页面）应用或**Web App**应用。

**单页面应用**：

> 1. 所有的活动局限于一个页面
> 2. 当页面中部分数据发生变化，局部刷新
> 3. 利用ajax和路由技术


<br>


### 1.4 简单指令

**`ng-app`**：

> 告诉`angular`核心它管理当前标签所包含的整个区域，并且会自动创建`$rootScope`根作用域对象。

如:

```html
<body ng-app="myApp"></body>
```



**`ng-controller`**:

> 指定控制器对象作用的一块区域，不同控制器的作用域数据相互独立，关于Angular的数据，都在controller中操作。

如：

```html
<body ng-app="myApp">
	<div ng-controller="ctrl">
	</div>
</body>
```





**`ng-model`**：

> 将当前输入框的值与某个属性关联（属性名:属性值），并作为当前作用域对象(`$rootScope`)的属性。

如：

```html
<input type="text" ng-model="username">
```



**`ng-init`**：

> 用来初始化当前作用域变量。

如：

```html
<body ng-app="myApp" ng-init="username='Tom';age=18">
    <input type="text" ng-model="username">
</body>
```





**`{{}}表达式`**：

> 显示数据，从当前作用域对象的指定属性名上取。

如：

```html
<p>您输入的内容是：<span>{{username}}</span></p>
```

<br>

### 1.5 双向数据绑定

数据可以从`View`流向`Model`，也可以从`Model`流向`View`：

> 视图：我们的页面（`Angular`指令和表达式）；
>
> 模型：作用域对象（如`$rootScope`），它可以包含一些属性或方法。

当改变`View`中的数据，`Model`中的对应属性随之改变；当`Model`域对象的属性发生改变时，页面对应数据随之更新。



因此我们只需关注数据，且视图是局部刷新的，不是整个页面刷新，angular会自动识别哪里用到了这个更新的数据：**脏检查**。



**`ng-model`是双向数据绑定，`{{}}`是单向数据绑定(model→view)，`ng-init`是单向数据绑定(view→model)。**

<br>

### 1.6 Angular中的MVC和MVVM模式

**MVC模式**：

- M：Model，即模型，在Angular中是：
  - scope
  - 储存数据的容器
  - 提供操作数据的方法
- V：View，即视图，在Angular中是：
  - 页面，包括html/css/directive/expression
  - 显示Model的数据，并同步数据到Model
  - 与用户交互
- C：Controller，即控制器，在Angular中是：
  - Angular的Controller
  - 初始化Model数据
  - 为Model添加行为方法



**MVVM模式**：

- M：Model，即数据模型，在Angular中为scope中的各个封装的数据对象。
- V：View，即视图，在Angular中为页面、模板等。
- VM：ViewModel，即视图模型，在Angular中为scope对象，提供给视图显示的数据，并提供view中事件操作model的途径。
- 在Angular中VM层的controller，不再是架构的核心，在MVVM中只是起辅助作用，负责VM对象的初始化，组合一个或多个service来获取业务model，放在VM对象上。




<a name="2">

<br>
<br>

## 2. 作用域对象和控制器对象

作用域对象：

> 一个js实例对象，`ng-app`指令默认会创建一个根作用域对象(`$rootScope`)，它的属性和方法与页面中的指令或表达式是关联的。



控制器对象：

> 用来控制`AngularJS`应用数据的**实例**对象`controller`。



在老版本的`Angular`中创建根作用域，加上`ng-app`属性即生成根作用域对象，并且使用函数声明的方式来创建控制器，而现在的`Angular`已经废弃了以前的那种方式，使用更为规范的方法**`.module()`**生成模块对象来实现，子作用域则使用该对象的方法**`.controller()`**来创建。

```js
<body ng-app="myApp">
	<div ng-controller="myController1">{{name}}</div>
	<div ng-controller="myController2">{{name}}</div>
</body>

//创建模块对象，angular.module('模块名',[依赖的模块])
var myModule = angular.module('myApp', []);

//通过模块添加控制器1
myModule.controller('myController1', function($scope){
    $scope.name = "one";//变量在各自的控制器中是互不影响的
})

//通过模块添加控制器2
myModule.controller('myController2', function($scope){
    $scope.name = "two";//变量在各自的控制器中是互不影响的
})
```

链式调用：

```js
angular.module('myApp',[])
.controller('myController1',function(){})
.controller('mycontroller2',function(){})
```

<br>
<br>

<a name="3">



## 3. 依赖注入的三种方式

前面提到，在控制器函数中会传入一个名为`$scope`的域对象，参数的名字必须是该特定名称，否则`Angular`无法注入，这是推断型注入。



**依赖对象**：完成某个特定的功能需要某个对象才能实现，这个对象就是依赖对象。



在`Angular`中有三种依赖注入方式：

### 内联注入

```js
module.controller('ctrl', ['$scope',function(sco){
    function(sco){
        sco.name = "Tom";
    }
}])
```



### 推断型注入

参数名必须和依赖对象名一致，因为被注入的是作用域`scope`。

```js
var ctrl = function($scope){
    $scope.name = "Tom";
}
module.controller('ctrl', ctrl);
```

​

### 声明式注入

可以替换参数的名称。

```js
var ctrl = function(sco){
    sco.name = "Tom";
}
ctrl.$inject = ['$scope'];
module.controller('ctrl', ctrl);
```

<br>
<br>

<a name="4">



## 4. 常用指令及过滤器

### 常用指令

- `ng-click`：当点击时，调用作用域对象的方法，传入`$event`。
- `ng-controller`：指定控制器构造函数名，会自动创建一个新的子作用域。
- `ng-bind`：解决使用`{{}}`显示数据闪屏问题。
- `ng-repeat`：遍历数组显示数据，数组有几个元素就产生几个新的作用域。
- `ng-show`：布尔类型，如果为`true`才显示。
- `ng-hide`：如果为`true`就隐藏。
- `ng-disabled`：给表单设置该属性，可以控制其是否能够被点击输入等。
- `ng-options`：可以智能地从控制器中取值当做选项，后面会详细介绍。
- `ng-class`：动态引用定义的样式，如 `ng-class="{'aClass':true, 'bClass':false}"`，或者`ng-class="['active', 'box1', 'box2']"`。
- `ng-style`：动态引用通过js指定的样式对象，如`ng-style="{backgroundColor:'red',height:'200px',width:'200px'}"`。
- `ng-mouseenter`：鼠标移入监听，值为函数调用，可以传`$event`。
- `ng-mouseleave`：鼠标移除监听，值为函数调用，可以传`$evnet`。





### 过滤器

过滤器在**显示数据**时可以对数据进行格式化或过滤，不会真正改变被操作数据。

语法: `{{express | 过滤器名：补充说明}}`



常用过滤器：

- `currency` 货币格式化，如：`{{num | currency:'￥'}}`

- `number` 数值格式化，如：`{{num | number:2}}` 可以指定保留小数位数

- `date` 将日期对象格式化，如：`{{time | date:'yyyy-MM-dd HH:mm:ss EEEE'}}` 显示年月日时分秒和星期几，time可以是一个时间戳，也可以是一个日期对象。

- `json` 将js对象格式化为json

- `lowercase` 将字符串格式化为小写

- `uppercase` 将字符串格式化为大写

- `limitTo` 从一个数组或字符串中截取出一个新的数组或字符串

  - `limitTo:3`、`limitTo:-3` 表示从头部或尾部截取前3项。

- `orderBy` 根据指定作用域属性对数组进行排序

  - `{{[2,1,4,3] | orderBy}}` 升序
  - `{{[2,1,4,3 | orderBy:'-']}}` 降序
  - `{{[{id:2,price:3}, {id:1, price:4}] | orderBy:'id'}}` id升序
  - `{{[{id:2,price:3}, {id:1, price:4}] | orderBy:'-price'}}` price降序
  - `orderBy:['id','price']` 如果id相同，则按照price进行排序

- `filter` 从数组中匹配过滤返回一个新数组

  ```js
  $scope.childrenArray = [
      {name:'React',age:3},
      {name:'Vue',age:4},
      {name:'Anglar',age:4},
      {name:'Jerry',age:6},
      {name:'Tom',age:5}
  ];
  $scope.func = function(e){return e.age>4;}

  {{childrenArray | filter: 'a'}} 匹配属性值中含有a的
  {{childrenArray | filter: {name:'i'}} 匹配name属性中含有i的 
  {{childrenArray | filter: func}} 参数是函数，匹配返回age>4的
  ```


<br>
<br>

<a name="5">


## 5. 关于$http的使用

在`angular.js 1.6`版本之后，删除了`.success`和`.error`方法，而使用`then`，并且会出现跨域url不安全的问题，详情及解决请看[官方文档](https://docs.angularjs.org/api/ng/service/$http#jsonp)。

**一个借助jsonp接口数据模拟百度搜索框的例子(基于Angular1.7)：**

```js
angular.module('baidu',[]).controller('search',function($scope,$http,$sce){
    $scope.keyword = '';
    $scope.arr = [];
    $scope.$watch('keyword',function(){   
        $http.jsonp($sce.trustAsResourceUrl('http://suggestion.baidu.com/su'),{
        params:{wd:$scope.keyword},
    	jsonpCallbackParam:'cb'
        }).then(function(json){
            console.log(json);
            $scope.arr = json.data.s;
        },function(err){
            console.log('失败'+err);
        });
        
    });
});
```

**get请求：**

```
$http.get(url,[config]).then(function(res){}, function(err){});
```

如：

```js
$http.get('/getData', {
    params:{a: 12, b:5},
    responseType: 'json' //可以自动解析传输过来的字符串为对象、数字等
}).then(function(res){}, function(err){});
```

**post请求：**

```js
$http.post(url, data, [config]).then(function(res){}, function(err){});
```



### $http配置选项

`$http(config).then()`，根据官方文档，常用的有以下配置选项：

- `method` → http请求的方法，如`get`/`post`。
- `url` → 类型为`string/trustedObject`，如果是跨域url，需要使用`$sce.trustAsResourceUrl(url)`。
- `params` → 类型为`Object`，angular会自动将其序列化作为Get请求的参数。
- `data` → 类型为`string/Object`，会作为请求消息数据被post发送。
- `headers` → 类型为`Object`，可以设置请求头相关参数。
- `transformRequest` → 类型为函数，`function(data,headerGetter)`，用来将请求体和请求头进行转换包装并发送。
- `responseType` → 指定响应消息的解析类型。

目前我用到的也就上面这些，如果有更多的需求请查阅[官方文档](https://docs.angularjs.org/api/ng/service/$http#$http-arguments)（需要翻墙）。



### Angular文件上传

常用的表单提交编码方式有两种：`multipart/form-data` 和 `application/x-www-form-urlencoded`，如果是`html`页面中的`form`表单上传，可以使用`enctype`来指定提交方式，不指定时默认就是后者。



文件上传必须使用`multipart/form-data`编码方式的表单`post`提交，而如果需要Ajax异步上传文件，则要使用`FormData`对象，如下：

```js
$http({
	method: 'POST',
	url: '/myapp/api',
	headers: {
		'Content-Type': undefined //这里很重要，需要取消post默认的Content-Type，否则后台接收不到！
	},
	transformRequest: function(data) {
		var formData = new FormData();
		formData.append('id', data.id);
		formData.append('type', data.type);
		return formData;
	},
	data: {
		id: $scope.userId,
		type: $scope.infoType
	}
}).then((res)=>{}, (err)=>{});
```

<br>
<br>

<a name="6">


## 6. ng-options的使用

`ng-options`可以智能从控制器中取值当做`select`下拉框的`option`，注意使用该指令的下拉框必须**有`ng-model`属性与控制器双向绑定了数据**。



在一些场景下的遍历：

### 普通数组

```html
<body ng-app='myapp'>
    <div class="container" ng-controller='MainCtrl'>
        <select ng-model='hobby' ng-options='item for item in arr'></select>
        <h1>{{hobby}}</h1>
    </div>
    
    <script type="text/javascript">
        angular.module('myapp',[]).controller("MainCtrl",function($scope){
            $scope.hobby = "敲代码";
            $scope.arr = ["看电影","打游戏","看书"];
        });
    </script>
</body>
```



### 对象数组

格式为：`提交的值 as 显示的值 for 迭代变量 in 数组`

```html
$scope.arr = [
    {"phone":"010", "city":"北京"},
    {"phone":"029", "city":"西安"},
    {"phone":"0311", "city":"石家庄"}
];

<select ng-model="flag" ng-options="item.phone as item.city for item in arr"></select>
```



### 普通对象

格式为：`提交的值 as 显示的值 for (key,value) in 数组`

```html
$scope.arr = {
	"广东":"粤",
	"北京":"京",
	"上海":"沪"
};

<select ng-model="flag" ng-options="value as key for (key,value) in arr"></select>
```

<br>
<br>

<a name="7">



## 7. 表单验证

详细请参考：[Angular中的表单验证](https://www.cnblogs.com/rohelm/p/4033513.html)。



在`Angular`中，只要满足下面两个条件，表单就自动开始验证了：

- 需要验证的控件必须有`ng-model`属性双向数据绑定。
- `form`必须有`name`属性。

加入了验证指令后，如果没有通过验证，那么数据是不会传递到`Model`中的，只有当满足验证，才会实时双向绑定，否则数据值是`undefined`。



### 代表是否通过验证的属性(布尔类型)

- `formName.inputFieldName.$pristine` → 未修改过的表单，为true表示未修改。
- `formName.inputFieldName.$dirty` → 修改过的表单。
- `formName.inputFieldName.$valid` → 经过验证的表单，为true表示通过验证。
- `formName.inputFieldName.$invalid` → 未通过验证的表单。



一般可以在表单每一项后加一个验证图案，当修改且合法时显示（通用）：

```html
<span class="glyphicon glyphicon-ok form-control-feedback"
      ng-show="myForm.fieldName.$dirty && myForm.fieldName.$valid">
</span>
```



### 错误对象

`Angular`提供另一个属性为`$error`对象，它包含当前表单的所有验证内容，以及它们是否合法的信息。

```
formName.inputFieldName.$error
```



### 常用的验证

**必填项验证：**

```html
<form name="myform">
	姓名：
    <input type="text" required name="username" ng-model="name">
	<span ng-show="myform.username.$error.required">
        × 请填写姓名
    </span>
</form>
```

**最小长度：**

```html
<input type="text" ng-model="num" name='minNum' ng-minlength="5">
<span ng-show="myform.minNum.$error.minlength">
    × 长度不合法
</span>
```

**最大长度：**

```html
<input type="text" ng-model="num" name="maxNum" ng-maxlength="20">
<span ng-show="myform.maxNum.$error.maxlength">
    × 长度不合法
</span>
```

**模式匹配：**

```html
<input type="text" ng-model="name" name="name" ng-pattern="/^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*$/">
//?:在正则中代表不捕获括号中的内容，可提高速度
<span ng-show="myform.name.$error.pattern">
    × 姓名不合法
</span>
```

**电子邮件：**

```html
<input type="email" name="email" ng-model="email">
<span ng-show="myForm.email.$dirty && myForm.email.$valid">
    验证成功
</span>
```

**数字：**

```html
<input type="number" name="age" ng-model="age">
<span ng-show="myForm.age.$dirty && myForm.age.$valid">
    验证成功
</span>
```

**URL：**

```html
<input type="url" name="url" ng-model="url">
<span ng-show="myForm.url.$dirty && myForm.url.$valid">
    验证成功
</span>
```


<br>
<br>

<a name="8">



## 8. `$watch`监视及相关原理

可以指定监视scope中的变量，当其发生变化时执行某些动作。

```js
$scope.$watch('arr', function(){
    console.log("数据发生变化");
}, true); //第三个参数为true，代表深度监视，可以深入对象里的数据
```

每当我们在ui上绑定了东西，比如设置了`ng-model`，就会添加一个`$watch`到`$watch list`中，或者说在页面中使用了变量`{{}}`，也会创建一个`$watch`到`$watch list`中。



当我们的模板加载完成，compiler就会找到所有的指令，并创建对应的`$watch`。


<br>


### digest loop

这是一个轮询的机制，当浏览器发送一个事件，此时`$digest`就会被激活，去轮询之前创建的`$watch list`，看是否所有`$watch`都已经更新。

关于**脏值检测：**就是当其中有一个值改变，会重新轮询，直到所有的`$watch`都没有改变，这样做是为了确保所有的model都是“干净”的。如果连续轮询超过10次，就会抛出异常，来退出无限的轮询。

当`$digest loop`完成，DOM就会发生改变。


<br>


### Angular Context

我们以前接触js事件，知道浏览器有一个事件轮询的机制，它会检测等待用户的一些行为，比如点击等，然后事件的回调就会开始执行。

在Angular中扩展了这个事件轮询机制，创建了一个`Angular Context`，当用户通过浏览器触发事件，会进入`Angular Context`，然后内部会自动执行`$digest loop`去轮询所有的`$watch`是否发生改变，等到`digest loop`报告说没有新的改变了，浏览器会更新DOM，让`$scope`中变量的值显示出来。

这里**最重要**的一点是：

> 所有的事件会进入angular context 然后执行`$digest loop`，这意味着我们每点击一次鼠标，每键入一个字符，轮询loop都会检查页面上所有的`$watch`。


<br>


### `$apply`

如何进入`Angular Context`呢？

当一个事件发生时，如果调用`$apply`，就会进入`Angular Context`。

很多时候，Angular会帮我们调用`$apply`，比如我们在有`ng-model`的`input`标签中输入时，或者触发`ng-click`的事件，内部都会自动进入`Angular Context`。



注意！**在使用原生js或者jQuery做一些操作时，并不会自动更新绑定数据！**

因为它们没有调用`$apply`，所有的事件并没有进入`Angular Context`中，所以`$digest loop`不会执行，`$watch`没有生效，视图中的数据也不会自动更新，但实际上`$scope`中的数据确实是变化了的。

这就叫做**脱离了`Angular`的体系**，Angular不会帮你去`apply`，一些比如定时器，原生ajax，jquery等等操作，都会有这个问题。



**解决方案**有两种：

第一种，自然是手动去执行`$apply`了，这个很容易理解。

第二种，我们全部使用`Angular`提供给我们的东西，比如说`$http`、`$interval`，常用操作在`Angular`中都有对应的实现。

```js
angular.module('testApp',[]).controller('test',function($scope,$http,$interval){
    $scope.a = 0;
    var timer = $interval(function(){
        $scope.a++;
        if($scope.a == 100){
            $interval.cancel(timer);//取消定时器
        }
    }, 500);
});
```



关于数据绑定和数据监视的原理解读，详见：[谈谈Angular关于$watch，$apply 以及 $digest的工作原理](https://www.cnblogs.com/cunjieliu/p/4370441.html)。

<br>
<br>

<a name="9">


## 9. Angular中的服务

在Angular中，有四个很重要的概念，**控制器**、**服务**、**指令**、**路由**。

**服务**：

- 分为内置服务（比如`$http`）和自定义服务。
- 服务为应用提供基于某个业务的功能，是执行一个或多个相关任务的可重用代码。
- 服务都是单例对象，只有当第一次调用时才会被实例化，后面使用的都是这个实例。
- Angular提供的内置服务，都通过依赖注入进行自动注册，因此可以很轻松的包含到应用中。

<br>

**自定义服务：**



### Service

通过`service`函数可以定义一个服务，必须使用`类名.方法`来调用里面的方法。

```js
myapp.service("MathService",[function(){
	var a = 999;

	this.getA = function(){
		return a;
	}

	this.setA = function(number){
		a = number;
	}
}]);
```

和定义controller类似，也使用依赖注入。

如果控制器要使用这个服务，将其设置为依赖即可：

```js
myapp.controller("Ctrl1",["MathService","$scope",function(MathService,$scope){
    $scope.a = '';
	$scope.set = function(){
		MathService.setA($scope.a);
	}
}]);
myapp.controller("Ctrl2",["MathService","$scope",function(MathService,$scope){
	$scope.getA = function(){
		return MathService.getA();
	}
}]);
```

由于服务是单例的，所以两个控制器之间可以共享、传递数据。



**专职维护某组数据的服务：**

```js
//一个维护学生信息的服务，独立，对外不执行回调函数，只操作自己的数据
myApp.service("StudentService",["http", function($http){
    //两种读取数据的方式：缓存，服务器
    var students = [];
    
    this.getStudents = function(){
        return students;
    };
    this.getStudentsFromServer = function(){
        $http.get("/students").then(function(data){
            students = data.data.results;
        });
    };
    this.addStudent = function(stu){
        $http.post("/students",stu).then(function(data){
            if(data.data.status == 1){
                students.push(stu);
            }else{
                alert("插入失败");
            }
        });
    }
}]);
```

<br>

### factory

在Angular中使用`myApp.factory()`来定义一个工厂，也是一个服务。

工厂函数一定要`return`一个对象：

```js
myApp.factory("mathService",[function(){
    return {
        
    }
}]);
```

`factory`中`return`的对象，自动被服务名字这个函数接受，也是`对象.变量`调用这个属性、方法。



和`service()`函数相比，`factory`具有更高的封装性，严格要求只能用暴露的函数来操作值。

```js
myApp.factory("mathService",[function(){
	var a = 10;
			
	function add(){
		a++;
	}
	function minus(){
		a--;
	}

	function get(){
		return a;
	}

	function set(number){
		a = number;
	}
	return {
        add: add,
        minus: minus,
        get: get,
        set: set,
        a: a
	}
}]);
```

**service和factory的区别：**

- `service()`定义的是构造函数，服务名字一般首字母大写，里面用this来定义属性方法，但是注意是定义“类属性”、“类方法”，用的时候通过`类名.变量`调用。
- `factory()`定义的是一个工厂，返回一个对象，一个API清单，里面不能用this定义属性方法，必须用return返回。

共同点：

都是惰性、单例的。


<br>


### constant

这是最简单定义一个服务的方式，用来定义一些公共的常数。

```js
myApp.constant("constService",{
    "pi": 3.14,
    "phone": {
        "北京":"010",
        "广州":"020",
    },
    "area": function(r){
        return this.pi * r * r
    }
});
```

定义了一个唯一的对象，在使用的时候直接`服务名.属性`即可：`constService.pi`。

constant创建的服务不会修改它的内容，需要修改内容，最好用`value`来创建。

<br>

### value

`value`和`constant`都是主要用于存放一些数据或方法以供使用，区别是constant一般存放固定内容，value一般存放可能会被修改的内容。


<br>


### provider

`provider()`是service、factory的底层函数。第二个参数接收一个函数，函数返回一个对象，必须要有`$get`方法，该方法必须返回一个对象obj，这是真正被注入的服务。

```js
myapp.provider("mathProvider",function(){
	return {
		$get : function(){
			return {
				a : 886	
			}
		}
	}
});
```

使用时：

```js
myapp.controller("Ctrl1",["mathProvider",function(mathProvider){
	alert(mathProvider.a);  //886
}]);
```



`$get`函数外层的东西都是给`config()`函数使用的，不能直接被对象调用：

```js
myapp.provider("mathProvider",function(){
	var a = 886;
	return {
		setA : function(number){
			a = number;
		},
		$get : function(){
			return {
				a : a
			}
		}
	}
});
```

`setA`方法不能被`mathProvider.setA`调用，必须使用`config`来调用，表示对服务的配置（注意形参的名字要在后面添加`Provider`）：

```js
myApp.config(function(mathProviderProvider){
    mathProviderProvider.setA(2018);
});
```



所有的内置服务都可以使用`config`来配置：

```js
myApp.config(function($httpProvider){
    //在此配置$http服务
});
```



服务的用处就是做`model`层的事，将一些底层的业务写在服务中。

<br>
<br>

<a name="10">



## 10. 自定义指令

`directive`就是指令，允许我们自己创建一些HTML中能识别的语法糖，后来React、Vue中的组件，也是由Angular的指令演化而来。

```html
var myapp = angular.module("myapp",[]);

//定义指令的时候，不能用短横，而必须是驼峰风格，使用的时候驼峰自动变短横。
myapp.directive("myDirect",[function(){
    //返回一个指令定义对象！
    return {
        template : "<h1>你好</h1>"
    }
}]);

//html中两种使用指令的方法：
<div my-direct>默认内容</div>

<my-direct></my-direct>
```

<br>

### restrict属性

使用指令时，有两种形式：

A → 属性(Attribute)：

```html
<div my-direct>默认内容</div>
```

E → 元素(Element):

```html
<my-direct></my-direct>
```



默认情况下就是A、E两种形式的指令，还有使用类名(C)的：

```html
<div class="my-direct"></div>
```

如果想用C形式的话，需要指定`restrict`属性：

```js
angular.module("myApp",[]).directive("myDirect",[function(){
    return {
        restrict: "AEC",
        template: "<h1>你好</h1>"
    }
}]);
```

还可以使用`templateUrl`来引入外部的html模板，angular会自动用ajax读取这个模板，注意页面必须运行在服务器环境中。


<br>


### link属性

表示链接指令内部和外部的关系函数。

```js
var myapp = angular.module("myapp",[]);

myapp.directive("myDirect",[function(){
	//返回一个指令定义对象
	return {
		restrict : "E",
		templateUrl : "./template/myDirect.html",
		link : function($scope,ele,attr){
			$scope.a = 100;
		}
	}
}]);
```

`$scope`表示该指令（组件）内部的作用域；

`ele`表示添加指令的这个HTML元素，是`Angular DOM`对象，方法和jQuery类似；

`attr`表示属性对象。


<br>


### scope属性

控制器和指令的`$scope`是同一个对象。

可以修改指令创建对象的`scope`属性：

- **`false`** → 默认情况，两者共用一个`$scope`对象。

- **`true`** → 外部控制器的`$scope`指令能看见，但是指令私有了自己的`$scope`，类似于函数包裹函数。

- **对象** → 外部控制器的作用域和指令的作用域完全隔离，没有任何关系。

  ```js
  myApp.directive("myDirect",[function(){
      return {
          scope: {},
          restrict: "E",
          templateUrl: "./template/myDirect.html",
          link: function($scope, ele, attr){
              $scope.a = 100;
              $scope.add = function(){
                  $scope.a ++;
              }
          }
      }
  }]);
  ```

  scope如果是对象，属性值有三种符号：

  - `=`，表明该属性是JSON对象，并完成双向数据绑定。
  - `@`，表明该属性是一个字符串，单向数据绑定，组件内部的值变化不会影响外部。
  - `&`，表明该属性是一个函数。



`restrict`值为`E`的指令，我们也称为**组件**，它可以将复杂的逻辑封装在一个HTML标签中，并且可以用`scope`来控制传入和传出的值。

注意，**在`scope`中出现的变量，指的都是HTML中的属性**。

```js
//定义时：
angular.module("myApp",[]).directive("myDirect",[function(){
	return {
	    scope:{
            //这里的属性用来接收组件外部数据的
			"a": "@",
             "obj": '='
		},
        restrict: "E",
        templateUrl: "./template/myDirect.html",
        link: function($scope, ele, attr){
            //在这里初始化 组件独自作用域的 属性值
          	$scope.flag = 0;
            //如果在这里修改obj，会影响到所有使用该数据的组件
            //$scope.obj = {}
        }
	}
}]);


//使用在组件的标签上：
<div ng-controller="mainCtrl">
    <my-direct a="你好"></my-direct>
    <my-direct a="你好"></my-direct>
</div>

//外置模板:可以读取a值，因为a通过标签的属性进入了组件内部
<div>
	<h1>---------------------------------------------</h1>
	<h1>我是指令</h1>
	<h1>我的作用域a的值是:{{ a }}</h1>
	<h1>---------------------------------------------</h1>
</div>
```



`Angular`是三大框架中唯一一个用html当做模板的框架：

```
Angular → .html
React → jsx的语法糖
Vue → .vue
```


<br>
<br>

<a name="11">



## 11. 前端路由

### 简单使用

对于路由，需要下载使用`angular-ui-router`。当引入这个库后，把它作为模块的依赖注入，它会提供一个服务`$state`，然后可以用`config`来配置这个服务。



配置时，使用`$stateProvider`的`state`方法来设置路由清单，定义一个个“状态”。

```js
var myapp = angular.module("myapp",["ui.router"]);
myapp.config(function($stateProvider){
    $stateProvider.state({
        name: 'news',
        url: '/news',
        template: '<h2>新闻频道</h2>'
    }).state({
        name: 'music',
        url: '/music',
        template: '<h2>音乐频道</h2>'
    });
});
```

然后在页面中放置一个指令，`template`的内容都将通过它呈现：

```html
<ui-view></ui-view>
```

如果需要通过链接到路由上，实际上是连接到状态上，匹配上的a标签会自动加上active类名：

```html
<a ui-sref="news" ui-sref-active="active">新闻</a>
<a ui-sref="music" ui-sref-active="active">音乐</a>
```

可以设置默认路由：

```js
myapp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/news');
    //这样当没有点击链接，会显示默认设置的路由
});
```





### 引入控制器

```js
myapp.controller("ctrl",function($scope){
    $scope.a = "hello";
});

myapp.config(function($stateProvider){
    $stateProvider.state({
        name: 'news',
        url: '/news',
        controller: 'ctrl',//只要指定了控制器，即使ui-view不在controller中，也可获取数据
        template: "<h2>新闻频道---{{a}}</h2>"
    })
});
```

**angular**中的路由控制：

```
|--script
	|--config
		|--router.js
	|--controller
		|--mainCtrl.js
	|--directive
		|--header.js
		|--footer.js
|--view
	|--template
		|--header.html
		|--footer.html
	|--main.html
```

> 在`router.js`中使用`config`方法配置路由的`url`、`controller`、`templateUrl`，然后分别映射到对应目录下的文件，负责业务逻辑和视图展现。同时为了提高复用性和解耦，可以将一些公用的部分如header、footer提取出来放到view中的template中，并在directive中注册指令，即组件。



**Vue**中的路由控制：

```
|--router
	|--index.js
|--components
	|--Header.vue
	|--Footer.vue
|--views
	|--Main.vue
```

> 在router中的`index.js`中配置routes规则的`path`、`component`，`component`映射到views中的`Main.vue`，然后在其中引入组件`Header`和`Footer`。模板和各自业务逻辑代码部分其实是一起放在vue文件中，然后按模块划分的。





### 子路由

```js
//配置$state服务，其实就是配置路由表
myapp.config(function($stateProvider){
    $stateProvider.state({
        name: 'movie',
        url: '/movie',
        controller: "moviectrl",
        template: "<h2>电影频道</h2><ui-view></ui-view>"
    }).state({
        name: 'movie.detail',
        url: '/:id',
        controller:"moviectrl",
        template: "<h3>我是子状态</h3>"
    });
});
```

`name`是`movie.detail`，这样`detail`就是`movie`的子状态，相应的，url实际上会自动拼接为`/movie/:id`。

在使用链接跳转到子路由时，需要：

```html
<a ui-sref="movie.detail({id:1})">电影1</a>
```



也可以使用服务来跳转路由：

```js
$state.go('movie.detail', {id: 1}, {location: 'replace'});
```



controller如何获取这个id呢？依赖`$state`服务：

```js
myapp.controller("moviectrl",function($scope,$state){
    $scope.id = $state.params.id;
})
```



### 一个页面多个ui-view

```html
<a ui-sref="multiview" ui-sref-active="active">点击看到复合view</a>

<div ui-view="left"></div>
<div ui-view="right"></div>
```

```js
.state({
    name: 'multiview',
    url: '/mul',
    views: {
        "left": {
            template: "<h2>左侧边栏</h2>"
        },
        "right": {
            template: "<h2>右侧边栏</h2>"
        }
    }
});
```

当点击链接跳转到路由视图时，会看到由left和right组合而成的界面。



注意，以上路由映射的`template`都可以是`templateUrl`，指向某个路径下的html模板文件。



### 组件获取页面数据的例子

```html
//页面中：
<div app-position-info pos="position" is-login="isLogin"></div>


//app-position-info组件中：
<div>
	<p ng-bind="pos.benifit"></p>
	<img ng-show="isLogin" class="p-a" ng-src="{{imagePath}}">
</div>
```

这里的`position`和`isLogin`是父级页面传往组件中的数据，而`pos`和`is-login`是组件使用这些数据所用的变量名。

注意名字的规范，在组件中注册指令时`scope`内变量为`isLogin`，那么父级html页面中指令所在标签中接收数据的名字是`is-login`！


<br>
<br>

<a name="12">



## 12. Angular中使用RequireJS

目录结构：

```
|--src
    |--lib
    	|--angular.js
    	|--angular-ui-router.js
    	|--require.js
    |--app.js
    |--app.router.js
|--main.js
|--index.html
```



一个使用了`ui-router`的`angular`项目，如何使用`require.js`进行解耦，优化模块结构？



以上面这个简单的目录结构为例：

- **index.html**

  ```html
  <!DOCTYPE html>
  <html>
  	<head>
  		<meta charset="UTF-8">
  		<title>首页</title>
  	</head>
  	<body>
  	    <ui-view></ui-view>
  	    <script src="src/lib/require.js" type="text/javascript" data-main = "main.js"></script>
  	</body>
  </html>
  ```

  ​

- **main.js**

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



- **app-routes.js**

  ```js
  define(['app'],function(app){
      app.config(function($stateProvider, $urlRouterProvider){
          //设置默认路由跳转
          $urlRouterProvider.otherwise('/home');
          $stateProvider.state({
              name: 'home',
              url: '/home',
              template: '<h1>成功启动路由！</h1>',
          })
      });
      return app;
  });
  ```

  ​

- **app.js**

  ```js
  define(['angular', 'angular-ui-router'],function(angular){
      //引入了angular-ui-router后，自动就有了ui.router服务，直接使用即可
      //创建app模块
      var app = angular.module("app", ['ui.router']);
      return app;
  });
  ```














