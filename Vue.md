# Vue


## 目录

1. [Vue基本雏形及常用指令](#1)





***


<a name="1">


## Vue基本雏形及常用指令


Vue是一个mvvm框架，一套用于构建用户界面的渐进式框架，Vue的核心库只关注视图层，易于上手。

```
<div id="box">
    {{msg}}
</div>

var app = new Vue({
    el: '#box', //选择器
    data: {
        msg: 'hello Vue'
    },
    methods: {
    
    }
});
```

数据和DOM都是关联的、双向绑定的，所有东西都是响应式的，在控制台修改`app.msg`的值，可以看到上例会相应地更新。



### 常用指令


v-model 一般表单元素(input)   双向数据绑定

**循环:**

```
v-for="name in arr"
    {{$index}}

v-for="name in json"
    {{$index}}  {{$key}}

v-for="(k,v) in json"
```


**事件:**

```
v-on:click="函数"

v-on:click/mouseout/mouseover/dblclick/mousedown.....

new Vue({
    el:'#box',
    data:{ //数据
        arr:['apple','banana','orange','pear'],
        json:{a:'apple',b:'banana',c:'orange'}
    },
    methods:{
        show:function(){    //方法
            alert(1);
        }
    }
});
```


**显示隐藏:**

`v-show=“true/false”`






 
