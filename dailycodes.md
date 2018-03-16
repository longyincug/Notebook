# 每天一道面试题
## 目录
1. [每天一道面试题: 1](#1)
2. [每天一道面试题: 2](#2)
3. [每天一道面试题: 3](#3)
4. [每天一道面试题: 4](#4)


<a name="1">

## 每天一道面试题：1

### 下面代码输出什么？
```
var foo = 1;
(function(){
	console.log(foo);
	var foo = 2;
	console.log(foo);
})();
```

需要清楚变量声明提前、函数作用域的知识
```
undefined
2
```

***

### 写一个按照下面方式调用都能正常工作的 sum 方法:
```
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5
```
针对这个题，可以判断参数个数来实现：
```
function sum() {
  var fir = arguments[0];
  if(arguments.length === 2) {
    return arguments[0] + arguments[1]
  } else {
    return function(sec) {
       return fir + sec;
    }
  }
 
}
```

***

<a name="2">

## 每天一道面试题：2

### 下面的代码会输出什么？

```
console.log(1 + "2" + "2");
console.log(1 + +"2" + "2");
console.log(1 + -"1" + "2");
console.log(+"1" + "1" + "2");
console.log("A" - "B" + "2");
console.log("A" - "B" + 2);
```

注意不同类型数据在不同运算下的类型转换

```
console.log(1 + "2" + "2"); // 122
console.log(1 + +"2" + "2"); // 32
console.log(1 + -"1" + "2"); // 02
console.log(+"1" + "1" + "2"); // 112
console.log("A" - "B" + "2"); // NaN2
console.log("A" - "B" + 2); // NaN
```

***

### 下面代码输出什么？

```
var a={n:1}; 
var b=a; 
a.x=a={n:2}; 
console.log(a);
console.log(b);
console.log(a.x); 
console.log(b.x);
```

**尽量不要使用JS的连续赋值操作，除非真的了解它的内部机制及可能会产生的后果。**

```
var a={n:1}; 
var b=a; 
a.x=a={n:2};
console.log(a); // {n:2}
console.log(b); // {n:1, x:{n:2}}
console.log(a.x); // undefined
console.log(b.x); // {n:2}
```
**一种解释:**

1. 由于 . 运算符优先级高于= , 所以先给{n:1}对象创建了x属性，对象变成{n:1,x:undefined}(当前a和b都是指向此内存对象)
2. 然后连等从右往左执行，先把a指向改成{n:2}，然后把最初的内存对象的x属性指向改成{n:2}(因为.运算符已执行，所以此时a.x是指{n:1,x:undefined}的x属性)，内存对象变成{n:1,x:{n:2}}
此时只有b还是指向这个内存对象  所以:
	- a.x  -->undefined
	- b -->{n:1,x:{n:2}}

**另一种解释:**

js内部为了保证赋值语句的正确，会在一条赋值语句执行前，先把所有要赋值的引用地址取出一个副本，再依次赋值。

所以这段代码  `a.x=a={n:2}; `的逻辑是：

1. 在执行前，会先将a和a.x中的a的引用地址都取出来，此值他们都指向{n:1}

2. 在内存中创建一个新对象{n:2}

3. 执行a={n:2}，将a的引用从指向{n:1}改为指向新的{n:2}

4. 执行a.x=a，此时a已经指向了新对象，而a.x因为在执行前保留了原引用，所以a.x的a依然指向原先的{n:1}对象，所以给原对象新增一个属性x，内容为{n:2}也就是现在a

5. 语句执行结束，原对象由{n:1}变成{n:1,x:{n:2}}，而原对象因为无人再引用他，所以被GC回收，当前a指向新对象{n:2}

6. 所以就有了上面的运行结果，再执行a.x，自然就是undefined了

***

<a name="3">

## 每天一道面试题：3

### 下面代码的输出是什么？
 
```
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log(this.foo);
        console.log(self.foo);
        (function() {
            console.log(this.foo);
            console.log(self.foo);
        }());
    }
};
myObject.func();
```

**方法/函数是由谁(对象) 调用 的，方法/函数内部的 this 就指向谁(该对象)；**

```
bar bar undefined bar
```

1. func是由myObject调用的，this指向 myObject

2. self指向myObject，相当于 myObject的this的副本

3. **这个立即执行匿名函数表达式（IIFE）是由window调用的，this指向 window**

4. IIFE的作用域处于myObject.func的作用域中，本作用域找不到self变量，沿着作用域链向上查找self变量，找到了指向 myObject对象的 self


**IIFE的优点:**

1. 创建块级（私有）作用域，避免了向全局作用域中添加变量和函数，因此也避免了多人开发中全局变量和函数的命名冲突
2. IIFE中定义的任何变量和函数，都会在执行结束时被销毁。这种做法可以减少闭包占用的内存问题，因为没有指向匿名函数的引用。只要函数执行完毕，就可以立即销毁其作用域链了

```
var add = (function(){
    var counter = 0;
    return function(){
        return ++counter; 
    }
})();
console.log(add())//1
console.log(add())//2
```
如上, 使用IIFE把计数器变量保存为私有变量更安全，同时也可以减少对全局空间的污染

***

### 使用 typeof obj === "object" 判断 obj 是不是一个对象有什么潜在的弊端？如何避免这种弊端？

```
var obj = {};
var arr = [];
console.log(typeof obj === 'object');  //true
console.log(typeof arr === 'object');  //true
console.log(typeof null === 'object');  //true
```


从上面的输出结果可知，`typeof obj === "object"` 并不能准确判断 obj 就是一个 Object。

可以通过 `Object.prototype.toString.call(obj) === "[object Object]"`来避免这种弊端：

当我们直接在页面中打印一个对象时，事实上是输出对象的toString()方法的返回值
如果我们希望在输出对象时不输出`[object Object]`，可以为对象添加一个toString()方法,也可以改写原型的toString()方法

```
var obj = {};
var arr = [];
console.log(Object.prototype.toString.call(obj));//[object Object]
console.log(Object.prototype.toString.call(arr));//[object Array]
console.log(Object.prototype.toString.call(null));//[object Null]
```

