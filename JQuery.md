# jQuery



**JavaScript库**：把一些浏览器兼容性的代码或者是常用的函数封装在一个js文件中，这个文件就是一个JavaScript库，common.js 可以看成是一个js库

**jQuery**：就是JavaScript库中的一种，免费开源，能够解决大多数 JavaScript 在IE及各大浏览器上的兼容性问题

优点：体积小，功能强大，链式编程，隐式迭代，插件丰富



## jQuery中的顶级对象

- 浏览器中的顶级对象：window，浏览器和页面中所有的东西都是window的

- 页面中的顶级对象：document，页面中某些东西是document的

- jQuery中的顶级对象：jQuery，可以用`$`符号来代替，jQuery中的所有东西都是jQuery或者`$`符号下的

- 用法: `$.属性`，或者`$.方法`

- 大多数情况下，jQuery中都是方法，属性很少

- jQuery把DOM中的事件都封装成了一个方法，去掉了`on`，然后直接变成了方法
```
// DOM中实现
document.getElementById("id").onclick = function(){};

// jQuery中实现
$("#id").click(function(){});
```



## jQuery对象和DOM对象互转

通过jQuery获取的对象和通过DOM获取的对象是**不相同**的

DOM对象转成jQuery对象:
```
var btnObj1 = document.getElementById("btn");
$(btnObj1).click(function(){});
```

jQuery对象转成DOM对象:
```
var btnObj2 = $("#btn");
btnObj2[0].onclick = function(){};
```

**为什么要互转？**

因为DOM操作很麻烦，往往为了兼容问题，一个功能写很多代码，转成jQuery对象后操作简单，不需考虑兼容问题。

jQuery操作中，又有一些兼容没有封装在jQuery中，可以转DOM对象，通过原生的js代码实现功能。




## jQuery简单操作属性样式

```
$("#btn").click(function(){
    // 判断body标签是否应用了cls类的样式
    if($("body").hasClass("cls")){
        // 此处应用了cls类样式，就移除这个样式
        $("body").removeClass("cls");
    }else{
        // 此处没有应用类样式cls，那么添加类样式
        $("body").addClass("cls");
    }
});
```

```
$("#btn").click(function(){
    //判断这个按钮的值来修改body的样式
    //此处的this是当前的按钮DOM对象，需要转换为jQuery对象
    if($(this).val() == "关灯"){
        $("body").css("backgroundColor", "black");
        $(this).val("开灯");
    }else{
        $("body").css("backgroundColor", "");
        $(this).val("关灯");
    }
});
```

**标签属性操作**

DOM操作中设置和获取value属性的值--> `对象.value`

jQuery中: 
`jQuery对象.val();` 表示获取该元素的value属性值
`jQuery对象.val("值")` 表示设置该元素的value属性值
`jQuery对象.css("css的属性名字", "属性的值");` 设置元素的样式属性值




## 页面加载的事件

在DOM对象中，一个页面只能写一个`window.onload = function(){};`，多写的话，后面的会覆盖前面的。

而jQuery中可以依次触发多个页面加载事件。

- 第一种页面加载的事件(等待页面所有元素加载完毕后触发)
```
$(window).load(function(){
    console.log("hello");
});

$(window).load(function(){
    console.log("world");
});
```

- 第二种页面加载的事件(比load更快，页面中的基本元素加载后就触发)
```
$(document).ready(function(){
    console.log("hello");
});

$(document).ready(function(){
    console.log("world");
});
```

- 第三种页面加载的事件(也是页面中基本元素加载后就触发，和第二种类似，但更简便，用的较多)
```
$(function(){
    console.log("hello");
});

$(function(){
    console.log("world");
});
```




## 通过选择器操作元素属性

DOM中获取元素的方式：
- 根据id获取元素
	- `document.getElementById("id属性的值");`
- 根据标签名字获取元素
	- `document.getElementsByTagName("标签名字");`
- 根据name属性获取元素
	- `document.getElementsByName("name属性的值");`
- 根据类样式名称获取属性
	- `document.getElementsByClassName("类样式的名字");`
- 根据选择器获取元素
	- `document.querySelector("选择器");`
	- `document.querySelectorAll("选择器");`

jQuery中获取元素的方式：
`$("选择器");`

### id选择器操作属性
```
$(function(){
    $("#btn").click(function(){
        this.value = "123"; // 通过dom操作实现
        $(this).val("123"); // 通过jQuery操作实现
    });
});
```

### 标签选择器操作属性
```
$(function(){
    $("#btn").click(function(){
        //根据标签选择器获取p标签
        $("p").text("我们都是p");
    });
});
```
`text()`方法相当于DOM中的`innerText`属性
- `对象.text()` 获取该元素的文本内容
- `对象.text("值")` 设置该元素的文本内容

**隐式迭代**
本身代码没有循环操作，jQuery内部帮助我们完成循环操作


### 类样式选择器操作属性

```
$(function(){
    $("#btn").click(function(){
    	//获取所有应用cls类样式的元素，改变背景颜色
        $(".cls").css("backgroundColor", "yellow");
        $(".cls").css("border", "1px solid red");
    });
});
```

### 交集选择器
```
$(function(){
    $("#btn").click(function(){
    	//先找p标签，从p标签中找应用了cls样式的元素
    	$("p.cls").css("border", "1px solid red");
    });
});
```

### 并集选择器
```
$(function(){
    $("#btn").click(function(){
    	//同时选中多个元素
        $("#dv,p,.cls").css("backgroundColor", "yellow");
    });
});
```

### 层次选择器

```
$(function(){
    $("#btn").click(function(){
    	//获取div元素中所有的span标签（直接的子元素，孙子元素）
        $("div span").css("backgroundColor", "red");
        //获取div这个父级元素中所有直接的子元素
        $("div>span").css("backgroundColor", "red");
        //获取的是div后面的所有兄弟元素(span)
        $("div~span").css("backgroundColor", "red");
        //获取的是div后面直接的兄弟元素(span)
        $("div+span").css("backgroundColor", "red");
    });
});
```

### 子元素的伪类
```
$(function(){
    $("#btn").click(function(){
        //odd 奇数
        $("#uu>li:even").css("backgroundColor", "red");
        //even 偶数
        $("#uu>li:odd").css("backgroundColor", "yellow");
    });
});
```
可以用`$("#uu>li:eq('索引值')")`来获取指定位置的子元素



## jQuery事件

```
$(function(){
    // 获取ul中所有的li，然后设置鼠标进入和鼠标离开事件
    $(".wrap>ul>li").mouseenter(function(){
        $(this).children("ul").stop().show(200);
    });
    
    //鼠标离开
	$(".wrap>ul>li").mouseleave(function(){
        $(this).children("ul").stop().hide(200);
	});
});
```

- `mouseenter`和`mouseleave`用来替代DOM事件中的`mouseover`和`mouseout`

- `show()`相当于DOM中的`display: block;`，`hide()`相当于DOM中的`display: none;`

- `show()`和`hide()`可以传入参数，单位为毫秒，代表动画效果展现的速度

- `stop()`方法类似于清除计时器`clearInterval()`


```
$(function(){
    $("#left>li").mouseenter(function(){
        // 获取当前li的索引值
        var index = $(this).index();
        
        //隐藏所有的li
        $("#center>li").hide();
        
        //显示当前对应的li
        $(#center>li:eq(" + index + ")").show();
    });
});
```
- `index()`方法用来获取当前对象的索引值
- `li:eq()`子元素伪类选择器，接受index参数作为索引，获取指定元素






