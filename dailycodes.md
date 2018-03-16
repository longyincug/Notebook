# 每天一道面试题
## 目录
1. [每天一道面试题: 1](#1)
2. [每天一道面试题: 2](#2)
3. [每天一道面试题: 3](#3)
4. [每天一道面试题: 4](#4)
5. [每天一道面试题: 5](#5)


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

**答案:**

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
针对这个题, 可以判断参数个数来实现：

**答案:**

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

**答案:**

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

**尽量不要使用JS的连续赋值操作, 除非真的了解它的内部机制及可能会产生的后果。**

**答案:**

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

1. 由于 . 运算符优先级高于= , 所以先给{n:1}对象创建了x属性, 对象变成{n:1,x:undefined}(当前a和b都是指向此内存对象)
2. 然后连等从右往左执行, 先把a指向改成{n:2}, 然后把最初的内存对象的x属性指向改成{n:2}(因为.运算符已执行, 所以此时a.x是指{n:1,x:undefined}的x属性), 内存对象变成{n:1,x:{n:2}}
此时只有b还是指向这个内存对象  所以:
	- a.x  -->undefined
	- b -->{n:1,x:{n:2}}

**另一种解释:**

js内部为了保证赋值语句的正确, 会在一条赋值语句执行前, 先把所有要赋值的引用地址取出一个副本, 再依次赋值。

所以这段代码  `a.x=a={n:2}; `的逻辑是：

1. 在执行前, 会先将a和a.x中的a的引用地址都取出来, 此值他们都指向{n:1}

2. 在内存中创建一个新对象{n:2}

3. 执行a={n:2}, 将a的引用从指向{n:1}改为指向新的{n:2}

4. 执行a.x=a, 此时a已经指向了新对象, 而a.x因为在执行前保留了原引用, 所以a.x的a依然指向原先的{n:1}对象, 所以给原对象新增一个属性x, 内容为{n:2}也就是现在a

5. 语句执行结束, 原对象由{n:1}变成{n:1,x:{n:2}}, 而原对象因为无人再引用他, 所以被GC回收, 当前a指向新对象{n:2}

6. 所以就有了上面的运行结果, 再执行a.x, 自然就是undefined了

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

**方法/函数是由谁(对象) 调用 的, 方法/函数内部的 this 就指向谁(该对象)；**

**答案:**

```
bar bar undefined bar
```

1. func是由myObject调用的, this指向 myObject

2. self指向myObject, 相当于 myObject的this的副本

3. **这个立即执行匿名函数表达式（IIFE）是由window调用的, this指向 window**

4. IIFE的作用域处于myObject.func的作用域中, 本作用域找不到self变量, 沿着作用域链向上查找self变量, 找到了指向 myObject对象的 self


**IIFE的优点:**

1. 创建块级（私有）作用域, 避免了向全局作用域中添加变量和函数, 因此也避免了多人开发中全局变量和函数的命名冲突
2. IIFE中定义的任何变量和函数, 都会在执行结束时被销毁。这种做法可以减少闭包占用的内存问题, 因为没有指向匿名函数的引用。只要函数执行完毕, 就可以立即销毁其作用域链了

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
如上, 使用IIFE把计数器变量保存为私有变量更安全, 同时也可以减少对全局空间的污染

***

### 使用 typeof obj === "object" 判断 obj 是不是一个对象有什么潜在的弊端？如何避免这种弊端？

```
var obj = {};
var arr = [];
console.log(typeof obj === 'object');  //true
console.log(typeof arr === 'object');  //true
console.log(typeof null === 'object');  //true
```


从上面的输出结果可知, `typeof obj === "object"` 并不能准确判断 obj 就是一个 Object。

可以通过 `Object.prototype.toString.call(obj) === "[object Object]"`来避免这种弊端：

当我们直接在页面中打印一个对象时, 事实上是输出对象的toString()方法的返回值
如果我们希望在输出对象时不输出`[object Object]`, 可以为对象添加一个toString()方法,也可以改写原型的toString()方法

**答案:**

```
var obj = {};
var arr = [];
console.log(Object.prototype.toString.call(obj));//[object Object]
console.log(Object.prototype.toString.call(arr));//[object Array]
console.log(Object.prototype.toString.call(null));//[object Null]
```


<a name="4">

## 每天一道面试题：4

```
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}
```
 
### 请写出以下输出结果:

```
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

此题涉及的知识点众多, 包括变量定义提升、this指针指向、运算符优先级、原型、继承、全局变量污染、对象属性及原型属性优先级等等。

**答案:**

```
Foo.getName();//2
getName();//4
Foo().getName();//1
getName();//1
new Foo.getName();//2
new Foo().getName();//3
new new Foo().getName();//3
```

首先定义了一个叫Foo的函数, 之后为Foo创建了一个叫getName的**静态属性**存储了一个匿名函数, 之后为Foo的**原型对象**新创建了一个叫getName的匿名函数。之后又通过**函数变量表达式**创建了一个getName的函数, 最后再**声明**一个叫getName的函数。

1. 第一问, `Foo.getName` 是访问Foo函数上存储的静态属性, 所以输出2
2. 第二问, 直接调用getName函数, 既然是直接调用, 就是访问当前上文作用域内的叫getName的函数, 所以跟1 2 3都没关系, 而又由于函数声明提升, 5先被声明, 然后被4覆盖, 最后应该输出4
3. 第三问, `Foo().getName();` 先执行了Foo函数, 然后调用Foo函数的返回值对象的getName属性函数:
	1. Foo函数的第一句  `getName = function () { alert (1); };`  是一句函数赋值语句, 注意它没有var声明, 所以先向当前Foo函数作用域内寻找getName变量, 没有
	2. 再向当前函数作用域上层, 即外层作用域内寻找是否含有getName变量, 找到了, 也就是第二问中的alert(4)函数, 将此变量的值赋值为 `function(){alert(1)}`
	3. 此处实际上是将外层作用域内的getName函数修改了
		- 注意: 此处若依然没有找到会一直向上查找到window对象, 若window对象中也没有getName属性, 就在window对象中创建一个getName变量
	4. 接着, Foo函数的返回值是this, 而this的指向是由所在函数的调用方式决定。在此处, 是直接调用, 所以this指向window对象
	5. 此时Foo函数返回window对象, 相当于执行`window.getName()`, 而window中的getName已经被修改为`alert(1)`, 所以最终输出1

4. 第四问, 直接调用getName函数, 相当于`window.getName()`, 因为这个变量已经被Foo函数执行时修改了, 所以结果与第三问相同, 为1
5. 第五问,  `new Foo.getName();` ,此处考察的是js的运算符优先级问题
	- 根据优先级顺序表可知, 点(.)的优先级高于new操作, 所以相当于是`new (Foo.getName)();`
	- 所以实际上将getName函数作为构造函数来执行, 所以输出2
6. 第六问, ` new Foo().getName();`, 首先看运算符优先级 括号高于new, 实际执行为`(new Foo()).getName()`
	- 先执行Foo函数, 而Foo此时作为构造函数却有返回值, 这里需要说明下js中的构造函数返回值问题
	- **构造函数的返回值:** 传统语言中, 构造函数不应该有返回值, 实际执行的返回值就是此构造函数的实例化对象, 在js中构造函数可以有返回值也可以没有
		- 没有返回值则按照其他语言一样返回实例化对象
		- 若有返回值则检查其返回值是否为引用类型。如果是非引用类型, 如基本类型（string,number,boolean,null,undefined）则与无返回值相同, 实际返回其实例化对象
		- 若返回值是引用类型, 则实际返回值为这个引用类型
	- 原题中, 返回的是this, 而this在构造函数中本来就代表当前实例化对象, 所以最终Foo函数返回实例化对象
	- 之后调用实例化对象的getName函数, 因为在Foo构造函数中没有为实例化对象添加任何属性, 遂到当前对象的原型对象（prototype）中寻找getName, 找到了, 最终输出3

7. 第七问, `new new Foo().getName();` 同样是运算符优先级问题, 最终实际执行为 `new ((new Foo()).getName)();`
	- 先初始化Foo的实例化对象, 然后将其原型上的getName函数作为构造函数再次new
	- 最终结果是3

**运算符优先级**

![运算符优先级](images/PRI.png)


***

<a name="5">

