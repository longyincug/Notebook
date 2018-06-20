# 每天一道面试题

## 目录

1. [每天一道面试题: 1](#1)
2. [每天一道面试题: 2](#2)
3. [每天一道面试题: 3](#3)
4. [每天一道面试题: 4](#4)
5. [每天一道面试题: 5](#5)
6. [每天一道面试题: 6](#6)
7. [每天一道面试题: 7](#7)
8. [每天一道面试题: 8](#8)
9. [每天一道面试题: 9](#9)
10. [每天一道面试题: 10](#10)
11. [每天一道面试题: 11](#11)
12. [每天一道面试题: 12](#12)
13. [每天一道面试题: 13](#13)
14. [每天一道面试题: 14](#14)
15. [每天一道面试题: 15](#15)
16. [每天一道面试题: 16](#16)
17. [每天一道面试题: 17](#17)
18. [每天一道面试题: 18](#18)
19. [每天一道面试题: 19](#19)
20. [每天一道面试题: 20](#20)
21. [每天一道面试题: 21](#21)
22. [每天一道面试题: 22](#22)
23. [每天一道面试题: 23](#23)
24. [每天一道面试题: 24](#24)
25. [每天一道面试题: 25](#25)
26. [每天一道面试题: 26](#26)
27. [每天一道面试题: 27](#27)
28. [每天一道面试题: 28](#28)
29. [每天一道面试题: 29](#29)
30. [每天一道面试题: 30](#30)
31. [每天一道面试题: 31](#31)
32. [每天一道面试题: 32](#32)
33. [每天一道面试题: 33](#33)
34. [每天一道面试题: 34](#34)
35. [每天一道面试题: 35](#35)
36. [每天一道面试题: 36](#36)
37. [每天一道面试题: 37](#37)
38. [每天一道面试题: 38](#38)
39. [每天一道面试题: 39](#39)
40. [每天一道面试题: 40](#40)
41. [每天一道面试题: 41](#41)



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
<br>
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

或者这样:

```
function sum(x, y) {
	if(y !== undefined){
		return x + y;
	} else {
		return function(y) {return x + y; };
	}
}

```


***
<br>
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
<br>
### 下面代码输出什么？

```
var a = {n:1}; 
var b = a; 
a.x = a = {n:2}; 
console.log(a);
console.log(b);
console.log(a.x); 
console.log(b.x);
```


**答案:**

**尽量不要使用JS的连续赋值操作, 除非真的了解它的内部机制及可能会产生的后果。**

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

1. 在执行前, 会先将a和a.x中的a的引用地址都取出来, 此时他们都指向{n:1}

2. 在内存中创建一个新对象{n:2}

3. 执行a={n:2}, 将a的引用从指向{n:1}改为指向新的{n:2}

4. 执行a.x=a, 此时a已经指向了新对象, 而a.x因为在执行前保留了原引用, 所以a.x的a依然指向原先的{n:1}对象, 所以给原对象新增一个属性x, 内容为{n:2}也就是现在a

5. 语句执行结束, 原对象由{n:1}变成{n:1,x:{n:2}}, 而原对象因为无人再引用他, 所以被GC回收, 当前a指向新对象{n:2}

6. 所以就有了上面的运行结果, 再执行a.x, 自然就是undefined了

***
<br>
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
<br>
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

***
<br/>

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
<br>
<a name="5">

## 每天一道面试题: 5

### 下面两个函数的返回值是一样的吗？为什么？

```
function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}
```


**答案:**

在编程语言中, 基本都是使用分号（;）将语句分隔开, 这可以增加代码的可读性和整洁性。而在JS中, 如若语句各占独立一行, 通常可以省略语句间的分号（;）, JS 解析器会根据能否正常编译来决定是否自动填充分号：

```
var test = 1 + 
2
console.log(test);  //3
```

在上述情况下，为了正确解析代码，就不会自动填充分号了，但是对于 return 、break、continue 等语句，如果后面紧跟换行，解析器一定会自动在后面填充分号(;)，所以上面的第二个函数就变成了这样：

```
function foo2()
{
  return;
  {
      bar: "hello"
  };
}
```

尽管后面的语句不符合规范，但是因为没有执行到，所以第二个函数是返回 undefined

***
<br>
### 解释一下下面代码的输出:

```
console.log(0.1 + 0.2);   //0.30000000000000004
console.log(0.1 + 0.2 == 0.3);  //false
```


**答案:**

JavaScript 中的 number 类型就是浮点型，JavaScript 中的浮点数采用IEEE-754 格式的规定，这是一种二进制表示法，可以精确地表示分数，比如1/2，1/8，1/1024，每个浮点数占64位。但是，二进制浮点数表示法并不能精确的表示类似0.1这样 的简单的数字，会有舍入误差。

由于采用二进制，JavaScript 也不能有限表示 1/10、1/5 等这样的分数。在二进制中，1/5(0.2)被表示为 `0.00110011001100110011……` 注意 `0011` 是无限重复的，这是舍入误差造成的，所以对于 0.1 + 0.2 这样的运算，操作数会先被转成二进制，然后再计算：

```
0.1 => 0.0001 1001 1001 1001…（无限循环）
0.2 => 0.0011 0011 0011 0011…（无限循环）
```

双精度浮点数的小数部分最多支持 52 位，所以两者相加之后得到这么一串 `0.0100110011001100110011001100110011001100...`, 因浮点数小数位的限制而截断的二进制数字，这时候，再把它转换为十进制，就成了 `0.30000000000000004`


**对于保证浮点数计算的正确性，有两种常见方式:**

- **一是先升幂再降幂:**

```
function add(num1, num2){
  let r1, r2, m;
  r1 = (''+num1).split('.')[1].length;
  r2 = (''+num2).split('.')[1].length;

  m = Math.pow(10,Math.max(r1,r2));
  return (num1 * m + num2 * m) / m;
}
console.log(add(0.1,0.2));   //0.3
console.log(add(0.15,0.2256)); //0.3756
```

- **二是使用内置的 toPrecision() 和 toFixed() 方法**
	- 注意，方法的返回值是字符串

```
function add(x, y) {
    return x.toPrecision() + y.toPrecision()
}
console.log(add(0.1,0.2));  //"0.10.2"
```

***
<br>
### 实现函数 isInteger(x) 来判断 x 是否是整数

**答案:**

可以将 x 转换成10进制，判断和本身是不是相等即可：

```
function isInteger(x) { 
    return parseInt(x, 10) === x; 
}
```
ES6 对数值进行了扩展，提供了静态方法 `isInteger()` 来判断参数是否是整数：

```
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false
```

JavaScript能够准确表示的整数范围在 -2^53 到 2^53 之间（不含两个端点），超过这个范围，无法精确表示这个值。ES6 引入了Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限，并提供了 Number.isSafeInteger() 来判断整数是否是安全型整数。

***
<br>
<a name="6">

## 每天一道面试题: 6

### 写一个少于 80 字符的函数，判断一个字符串是不是回文字符串

**答案:**

一种解决方案:

```
function isPalindrome(str) {
    var str = str.replace(/\W/g, '').toLowerCase();
    return (str == str.split('').reverse().join(''));
}
```

另一种解决方案:

```
function isPalindrome(str) {
	var str = str.replace(/[^A-Za-z]/g, '').toLowerCase();
	return str == str.split("").reduceRight(function(sum, w) {return sum + w;});
}
```

***
<br>
### 在下面的代码中，数字 1-4 会以什么顺序输出？为什么会这样输出？

```
(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();
```

**答案:**

`1 4 3 2`

<a name="6a">

需要理解**JavaScript的运行机制**:

JavaScript语言的一大特点就是单线程。

#### 任务队列

所有任务可以分成两种，一种是**同步任务**（synchronous），另一种是**异步任务**（asynchronous）。
同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有主线程通知"任务队列"，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）

1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件, 哪些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

4. 主线程不断重复上面的第三步。

#### 事件及回调函数

- "任务队列"中的事件，除了IO设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要**指定过回调函数**，这些事件发生时就会进入"任务队列"，等待主线程读取。

- 所谓"回调函数"（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程**开始执行异步任务，就是执行对应的回调函数**。

- "任务队列"是一个**先进先出**的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。但是，由于存在后文提到的"定时器"功能，主线程**首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程**。

#### 定时器

setInterval()、 setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在定时器指定的时间执行。


#### 总结
一段js代码（里面可能包含一些setTimeout、鼠标点击、ajax等事件），从上到下开始执行，遇到setTimeout、鼠标点击等事件，异步执行它们，此时并不会影响代码主体继续往下执行(当线程中没有执行任何同步代码的前提下才会执行异步代码)，一旦异步事件执行完，回调函数返回，将它们按次序加到任务队列中，当执行栈清空后，主线程开始按照次序读取任务队列中的回调函数，同时检查其是否满足规定的执行时间（如定时器），满足了就开始执行。要注意，如果主体代码没有执行完的话，是永远也不会触发任务队列中的callback的。



参考资料:
- [JavaScript 运行机制详解：再谈Event Loop - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [从setTimeout谈JavaScript运行机制 - 韩子迟 - 博客园](http://www.cnblogs.com/zichi/p/4604053.html)
- [Javascript定时器学习笔记 - 木的树 - 博客园](http://www.cnblogs.com/dojo-lzz/p/4606448.html)


***
<br>
<a name="7">

## 每天一道面试题: 7

### 根据下面的代码片段回答后面的问题

```
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```

1、点击 Button 4 ，会在控制台输出什么？

2、给出一种符合预期的实现方式

**答案:**

1、点击5个按钮中的任意一个，都是输出5

2、参考 **IIFE**

#### IIFE

为什么要用立即执行函数表达式（Immediately-Invoked Function Expression）？

IIFE 有两个比较经典的使用场景，一是类似于在循环中定时输出数据项，二是类似于 JQuery/Node 的插件和模块开发。

```
for(var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);  
    }, 1000);
}
```

上面的输出并不是你以为的0 1 2 3 4，这时IIFE就有用了: 

```
for(var i=0; i<5; i++){
	(function(i){
		setTimeout(function(){
			console.log(i);
		}, 1000);
	})(i);
}
```

而在 JQuery/Node 的插件和模块开发中，为避免变量污染，也是一个大大的 IIFE：

```
(function($) { 
        //代码
 } )(jQuery);
```

**另一种解法，使用bind:**

```
for(var i = 0; i < 5; i++) {
  setTimeout(console.log.bind(console, i), i * 1000);
}
```

bind是和apply、call一样，是Function的扩展方法，所以应用场景是`func.bind()`，而传的参数形式和call一样，第一个参数是this指向，之后的参数是func的实参，`fun.bind(thisArg[, arg1[, arg2[, ...]]])`

ps:`bind(obj, *args)`方法返回的是一个柯里化的函数，所以可以接受后面的参数作为func的实参。

关于bind详情看:[bind的用法](#9a)

**还有一种解法, 不用闭包:**
```
var num = 0;
var timer = setTimeout(function func(){
	
	console.log(num++);
	if(num < 5){
		setTimeout(func, 1000);
	}
}, 1000);

```


<a name="7a">


***
<br>
### 下面的代码会输出什么？为什么？

```
var arr1 = "john".split(''); j o h n
var arr2 = arr1.reverse(); n h o j
var arr3 = "jones".split(''); j o n e s
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
```

**答案:**

```
array 1: length=5 last=j,o,n,e,s
array 2: length=5 last=j,o,n,e,s
```

MDN 上对于 reverse() 的描述是这样的：

> Description

> The reverse method transposes the elements of the calling array object in place, mutating the array, and returning a reference to the array.

`reverse()` 会改变数组本身，并返回原数组的引用

`slice()` 方法用于提取目标数组的一部分，返回一个新数组，原数组不变

而数组与字符串""做加法运算输出，会调用toString()方法，将数组中除中括号外的字符全部打印出来


***
<br>

### 如果 list 很大，下面的这段递归代码会造成堆栈溢出，如何在不改变递归模式的前提下修缮这段代码？

```
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};
```

**答案:**

```
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
};
```

解决方式原理请参考: [每天一道面试题: 6](#6a)

利用 setTimeout 的异步性质，完美地去除了这个调用栈。

简单举个例子:
```
var list = [0, 1];
 
var nextListItem = function() {
    var item = list.pop();
 
    if (item) {
      nextListItem();
    }
 
    console.log(item);
};
 
nextListItem();
```
上面的代码会依次输出0和1，因为程序中形成了一个调用栈，1被压到了栈底，最后出栈

把程序改成这样:
```
var list = [0, 1];
 
var nextListItem = function() {
    var item = list.pop();
 
    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
 
    console.log(item);
};
 
nextListItem();
```
这回就是1和0了，因为`setTimeout`的回调只有当主体的js执行完后才会去执行，所以先输出1，自然也就没有栈这一说法了

事实上，并不是所有递归都能这样改写，如果下一次递归调用依赖于前一次递归调用返回的值，就不能这么改了



***
<br>
<a name="8">

## 每天一道面试题: 8

### 解释下列代码的输出
```
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
```

**答案:**

逻辑与和逻辑或运算符会返回一个值，并且二者都是短路运算符：

- 逻辑与返回第一个是 false 的操作数 或者 最后一个是 true的操作数
	- 如果某个操作数为 false，则该操作数之后的操作数都不会被计算
```
console.log(1 && 2 && 0);  //0
console.log(1 && 0 && 1);  //0
console.log(1 && 2 && 3);  //3
```

- 逻辑或返回第一个是 true 的操作数 或者 最后一个是 false的操作数
	- 如果某个操作数为 true，则该操作数之后的操作数都不会被计算
```
console.log(1 || 2 || 0); //1
console.log(0 || 2 || 1); //2
console.log(0 || 0 || false); //false
```

- 如果逻辑与和逻辑或作混合运算，则逻辑与的优先级高：
```
console.log(1 && 2 || 0); //2
console.log(0 || 2 && 1); //1
console.log(0 && 2 || 1); //1
```

<a name="8a">

**在 JavaScript，常见的 false 值:**

`0, '0', +0, -0, false, '', null, undefined, NaN`

要注意**空数组([])**和**空对象({})**:
```
console.log([] == false) //true ([]调用indexOf方法, 返回"", 是false)
console.log({} == false) //false({}返回"[object Object]"字符串)
console.log(Boolean([])) //true(都是对象，所以转化为Boolean，都是true)
console.log(Boolean({})) //true
```

所以在 if 中，[] 和 {} 都表现为 true

注意: `[] == ![] //true` 前者是按相等运算的转换规则，后者是按Boolean的转换规则



***
<br>
### 解释下面代码的输出
```
var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);
```

**答案:**

> The reason for this is as follows: When setting an object property, JavaScript will implicitly stringify the parameter value. In this case, since b and c are both objects, they will both be converted to "[object Object]". As a result, a[b] anda[c] are both equivalent to a["[object Object]"] and can be used interchangeably. Therefore, setting or referencing a[c] is precisely the same as setting or referencing a[b].

答案是456

Javascript中对象的key值，一定会是一个string值，如果不是，则会隐式地进行转换，当执行到`a[b]=123`时，b并不是一个string值，将b执行toString()方法转换(得到"[object Object]"), a[c]也是相同道理，所以代码可以看做这样执行：

```
var a={},
    b={key:'b'},
    c={key:'c'};

a["[object Object]"]=123;
a["[object Object]"]=456;

console.log(a["[object Object]"]);
```

***
<br>
### 解释下面代码的输出

`console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));`

**答案:**

其实就是一个立即执行函数+递归，求个阶乘而已（10!），给立即执行函数加了个名字f，方便在递归里调用，其实完全可以用`arguments.callee`代替: 
```
var ans = (function(n){
    return ((n>1) ? n * arguments.callee(n-1): n)
})(10);

console.log(ans);
```



***
<br>
<a name="9">

## 每天一道面试题: 9

<a name="9a">

### 解释下面代码的输出，并修复存在的问题

```
var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
```

**答案:**

将 `getSecretIdentity` 赋给 `stoleSecretIdentity`，等价于定义了 `stoleSecretIdentity` 函数：

```
var stoleSecretIdentity =  function (){
    return this._name;
}
```

`stoleSecretIdentity` 的上下文是全局环境，所以第一个输出 `undefined`

若要输出 `John Doe`，则要通过 `call 、apply 和 bind` 等方式改变 stoleSecretIdentity 的`this` 指向(hero)

```
var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);
```

第二个是调用对象的方法，输出 John Doe

#### bind方法

bind和call以及apply一样，都是可以改变上下文的this指向的。
不同的是，call和apply一样，直接引用在方法上，而bind绑定this后返回一个方法，但内部核心还是apply

bind的核心是返回一个**未执行的方法**, 如果直接使用apply或者call，方法及参数已经确定并执行

bind是function的一个函数扩展方法，但是不兼容ie6~8，兼容代码如下:

```
Function.prototype.bind = Funtion.prototype.bind || function(context) {
	var that = this;
	return function(){
		return that.apply(context, arguments);
	}
	
	// 但是该兼容方法并没有实现bind返回的函数柯里化！因此不建议在bind中传入除了obj以外的参数。
};
```


***
<br>
### 给你一个 DOM 元素，创建一个能访问该元素所有子元素的函数，并且要将每个子元素传递给指定的回调函数

函数接受两个参数：

- DOM

- 指定的回调函数


**答案:**


原文利用 深度优先搜索(Depth-First-Search) 给了一个实现：

```
function Traverse(p_element,p_callback) {
   p_callback(p_element);
   var list = p_element.children;
   for (var i = 0; i < list.length; i++) {
       Traverse(list[i],p_callback);  // recursive call
   }
}
```



***
<br>
<a name="10">

## 每天一道面试题: 10

### 找出数字数组中最大的元素（使用Math.max函数）


**答案:**

```

var a = [1, 2, 3, 6, 5, 4];
var ans = Math.max.apply(null, a);

```

很巧妙的利用了apply，如果不是数组，是很多数字求最大值，我们可以这样:
`Math.max(1, 2, 3, 4, 5, 6);`

还有一种实现, 利用eval+toString:
`var ans = eval( 'Math.max(' + a.toString() + ')');`

学习了 ES6 后，我们有了更简单的方法：
```
let a = [1, 2, 3, 6, 5, 4];
let maxn = Math.max(...a);
console.log(maxn); // 6
```


***
<br>
### 转化一个数字数组为function数组（每个function都弹出相应的数字）


**答案:**

这道题跟[第7天](#7)的第一题类似，用闭包保存变量到内存即可。
```
var a = [1, 2, 3, 4, 5, 6];

for(var i=0; i<a.length; i++){
	var num = a[i];
	(function(num) {
    	var f = function() {
      		console.log(num);
    	};
    	
    	a[i] = f;
    
	})(num);
}

for(var i=0; i<a.length; i++){
	a[i]();
}

```


***
<br>
### 给object数组进行排序（排序条件是每个元素对象的属性个数）


**答案:**

```
Object.prototype.getLength = function(){
	var count = 0;
	for(var key in this){
		if(this.hasOwnProperty(key)){
			count += 1;
		}
	}
};

arr.sort(function(a, b){return a.getLength() - b.getLength(); });
```

这题不难，数组排序，当然是sort，排序条件是对象的属性个数，可以写个函数计算，注意可能要用hasOwnProperty判断下


`obj.hasOwnProperty(prop)`

- 用来判断某个对象是否含有指定的属性

- 所有继承了 `Object` 的对象都会继承到 `hasOwnProperty` 方法

- 这个方法可以用来检测一个对象是否含有特定的自身属性；

- 和 `in` 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

`sort(compareFunction)`如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

- 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
- 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变；
- 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。


当 compareFunction 较为复杂，且元素较多的时候，某些 `compareFunction` 可能会导致很高的负载，可以使用 `map` 辅助排序

**一个使用映射改善排序的例子**

```
// 需要被排序的数组
var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

// 对需要排序的数字和位置的临时存储
var mapped = list.map(function(el, i) {
  return { index: i, value: el.toLowerCase() };
})

// 按照多个值排序数组
mapped.sort(function(a, b) {
  return +(a.value > b.value) || +(a.value === b.value) - 1;
});

// 根据索引得到排序的结果
var result = mapped.map(function(el){
  return list[el.index];
});
```


***
<br>

<a name="11">


## 每天一道面试题: 11


### 利用JavaScript打印出Fibonacci数列（不使用全局变量）


**答案:**


利用递归实现:

```
(function(a, b){
	
	console.log(b);
	var c = a + b;
	if(c < 100) return;
	arguments.callee(b, c);

})(0, 1);

```

利用迭代实现:

```

function func(n) {
	
	var a = [0, 1];
	
	for(var i=2; i<n+1; i++){
		var newEle = a[i-1] + a[i-2];
		a.push(newEle);
	}
	
	for(var j=1; j<n+1; j++){
		console.log(a[j]);
	}
	
}

func(5);

```

学习了ES6，还可以用generator实现。


***
<br>

### 实现如下语法的功能：var a = (5).plus(3).minus(6); //2


**答案:**

直接在Number对象上加上扩展方法即可

```

Number.prototype.plus = function(a){
	return this + a;
};

Number.prototype.minus = function(a){
	return this - a;
};

var a = (5).plus(3).minus(6);


```


***
<br>

### 实现如下语法的功能：var a = add(2)(3)(4); //9



**答案:**

```

function add(a){
	
	var temp = function(b){
		return add(a+b);
	}
	
	temp.valueOf = temp.toString = function(){return a;};
	
	return temp
}

var ans = add(2)(3)(4);
console.log(ans);

```

先了解一下`valueOf`和`toString`方法:

1. 当直接打印一个对象时，实际调用的是对象的`toString`或者`valueOf`方法

2. js里除了null外每个对象都有`valueOf`和`toString`方法，一般情况下对象会先调用`toString`方法，然后再调用`valueOf`

3. 如果只重写了`toString`，对象转换时会无视`valueOf`的存在来进行转换

4. 但是，如果只重写了`valueOf`方法，在要转换为字符串的时候也会优先考虑`toString`方法, 在不能调用`toString`的情况下，只能让`valueOf`上阵了

5. 而在有操作符的情况下，`valueOf`的优先级比`toString`的高

参考资料: [valueOf和toString](http://www.cnblogs.com/zichi/p/4106711.html)


所以在这一题中，为了保证后面没有参数时，返回`temp`能直接打印出数值，就把`toString`和`valueOf`方法都重写了。



***
<br>

<a name="12">

## 每天一道面试题: 12 


### 下面代码输出什么(考察this)

```
var length = 10;
function fn() {
  console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1); 
```


**答案:**

第一个输出10，在内部直接执行fn()函数，实际上是window调用的，所以this是window，length是10

第二个输出2，取对象属于除了点操作符还可以用中括号，所以第二次执行时相当于arguments调用方法，this指向arguments，而这里传了两个参数，故输出arguments长度为2



***
<br>
### 下面代码输出什么？(var和函数的提前声明)

```
function fn(a) {
  console.log(a); 
  var a = 2;
  function a() {}
  console.log(a); 
}

fn(1); 
```

**答案:**

```

function a() {}
2

```

我们知道`var`和`function`是会提前声明的，而且`function`是优先于`var`声明的（如果同时存在的话），所以提前声明后输出的a是个`function`，然后代码往下执行a进行重新赋值了，故第二次输出是2

**函数声明优于变量声明**

```
if('a' in window) {
  var a = 10;
}

alert(a);
```

上面这题，输出10，因为即使{}里面的变量，声明也会提前，所以在if判断之前，全局作用域已经有了`a`，返回true，然后赋值


***
<br>
### 下面代码输出什么？(局部变量和全局变量)

```
var f = true;
if (f === true) {
  var a = 10;
}

function fn() {
  var b = 20;
  c = 30;
}

fn();
console.log(a);
console.log(b);
console.log(c);

```


**答案:**

```
10
报错
30
```

只有`function(){}`内新声明的才能是局部变量，`while{...}`、`if{...}`、`for(..)` 之内的都是全局变量, 函数体内没有用 `var` 声明的也是全局变量

而函数体内声明的局部变量，外部访问不到。


***
<br>
### 下面代码的输出是什么？

```
var a = 10;
a.pro = 10;
console.log(a.pro + a);

var s = 'hello';
s.pro = 'world';
console.log(s.pro + s);
```


**答案:**

```
NaN
undefinedhello
```

注意：给基本数据类型添加属性，不会报错，但是引用的话，会返回`undefined`！

`10 + undefined`，`undefined`会转为`NaN`


***
<br>

<a name="13">


## 每天一道面试题: 13

### 判断一个字符串中出现次数最多的字符，并统计次数


**答案:**

- **hash table方式:**

```
var s = 'aaabbbcccaaabbbaaa';
var obj = {};
var maxn = -1;
var letter;
for(var i = 0; i < s.length; i++) {
  if(obj[s[i]]) {
    obj[s[i]]++;
    if(obj[s[i]] > maxn) {
      maxn = obj[s[i]];
      letter = s[i];
    }
  } else {
    obj[s[i]] = 1;
    if(obj[s[i]] > maxn) {
      maxn = obj[s[i]];
      letter = s[i];
    }
  }
}

alert(letter + ': ' + maxn);

```


- **正则方式:**

```
var s = 'aaabbbcccaaabbbaaabbbbbbbbbb';
var a = s.split('');
a.sort();
s = a.join('');
var pattern = /(\w)\1*/g;
var ans = s.match(pattern);
ans.sort(function(a, b) {
  return a.length < b.length;
});;
console.log(ans[0][0] + ': ' + ans[0].length);

```


***
<br>
### 实现一段脚本，使得点击对应链接alert出相应的编号

```

<!-- 实现一段脚本，使得点击对应链接alert出相应的编号 -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<body>
  <a href='#'> 第一个链接 </a> </br>
  <a href='#'> 第二个链接 </a> </br>
  <a href='#'> 第三个链接 </a> </br>
  <a href='#'> 第四个链接 </a> </br>
</body>

```


**答案:**

- **dom污染法**

```

<script type="text/javascript">
    var lis = document.links;
    for(var i = 0, length = lis.length; i < length; i++) {
      lis[i].index = i;
      lis[i].onclick = function() {
        alert(this.index);
      };
    }
</script>

```

- **闭包**

```

<script type="text/javascript">
    var lis = document.links;
	for(var i=0; i<lis.length; i++) {
		(function(i) {
		
			lis[i].onclick = function() {
				alert(i + 1);
			};
		
		})(i);
	}
</script>

```


***
<br>

<a name="14">


## 每天一道面试题: 14


### 下面的代码应该输出什么？（再谈声明提前、类型转换）

```
f = function () { return true; };
g = function () { return false; };
(function () {
    if (g() && [] == ![]) {
        f = function f() { return false; };
        g = function() { return true; }
    }
})();
alert(f());
```


**答案:**

函数的声明会提前，但是函数表达式是不会提前的，在if条件中的f和g均为函数表达式，所以不会被提前，使用全局的变量进行判断。

由于相等运算符优先级高于逻辑与，先算`[] == ![]`返回true，而`g()`返回false，所以最终`alert(f());`结果返回true

如果不明白，再回顾一下之前学过的:

- [相等运算类型转换](./JSnotes.md/#31)

- [常见的false值](#8a)


如果把代码变动一下呢？

```

f = function () { return true; };
g = function () { return false; };
(function () {
	if (g() && [] == ![]) {
		f = function f() { return false; };
		function g() { return true; }  
	}
})();
alert(f());

```

- 此题中if中的g函数的声明会被提前，但是定义不会被提前，所以if中使用的将不会是全局的函数g，而是局部变量，g进行了声明，但是没有定义,故会报错 `g is not a function` 

- 如果将g函数变为 `var g = function(){};` 这样也会报同样的错误，后者相当于是函数表达式，提升的是var定义的变量而不是函数的声明

举个例子:

```
console.log(f)
f();
if(false){
	function f(){
	console.log("ok")
	}
}
```

输出`undefined`后，报错`f is not a function`, 说明在if语句块中的函数的声明被提前但是函数的定义没被提前


**学习一下声明规范:**

- ES5中有规定不要将函数定义在语句块中，也就是函数可以在全局作用域和函数作用域中被声明和定义，但不要在if等语句块中定义和声明
- 在全局和函数作用域中定义的函数的声明和定义都将会被提前到当前作用域的顶部
- 在if和for中声明的函数在非严格模式下不会报错，但是不同的浏览器可能表现不同
- 在谷歌中，在if 等语句块中声明的函数的声明会被提前但是函数的定义将不会被提前
- 所以在**块语句**里面最好是使用函数表达式，而不是函数的声明


***
<br>
<a name="14a">

### 请给出这段代码的运行结果

```

var bb = 1;
function aa(bb) {
    bb = 2;
    alert(bb);
};
aa(bb);
alert(bb);

```


**答案:**

在aa函数中，bb是以**值传递**的方式传入的，而在函数中，会重新定义一个bb变量，并将其值覆为2，并不影响函数体外的bb变量，所以外部值仍然为1。

注意这一题中的特殊情况，不要误以为函数内没有用var声明的都是隐式全局变量。

**如果函数接受的参数名和全局变量名相同的话，在函数内部不用写var，使用该变量会被认为是形参的调用，而不会覆盖全局变量！**

**可以把函数的参数想象成局部变量！**


当然如果是下面这种情况，就是我们熟知的输出了，输出`2 2`:

```
var bb = 1;
function aa(cc) {
    bb = 2;
    alert(bb);
};
aa(bb);
alert(bb);

```


***
<br>

<a name="15">

## 每天一道面试题: 15

### 解释一下下面的代码

```

function JSClass() {
  this.m_Text = 'division element';
  this.m_Element = document.createElement('div');
  this.m_Element.innerHTML = this.m_Text;
  this.m_Element.addEventListener('click', this.func);

}

JSClass.prototype.Render = function() {
  document.body.appendChild(this.m_Element);
}

JSClass.prototype.func = function() {
  alert(this.m_Text);
};

var jc = new JSClass();
jc.Render();
jc.func();

// 当点击添加的div，会输出什么？

```


**答案:**

```
division element
undefined
```

`jc.func()`输出`division element`很好理解，而当点击添加的div时，仔细可以看出，事件绑定的方法中，this已经指向了`this.m_Element`

因为是`this.m_Element`调用的`addEventListener`函数，所以内部的this全指向它了

可以试着加上一行代码`this.m_Element.m_Text = 'hello world'`，就会alert出`hello world`了


***
<br>
### 请编写一个JavaScript函数 parseQueryString，它的用途是把URL参数解析为一个对象，如： var url = “http://witmax.cn/index.php?key0=0&key1=1&key2=2″


**答案:**

```
function parseQueryString(str){
	var argObj = {};
	var arr = str.split("?");
	if(arr.length === 1) return argObj;
	var queryArr = arr[1].split("&");
	for(var i = 0; i < queryArr.length; i++){
		var obj = queryArr[i].split("=");
		argObj[obj[0]] = obj[1];
	}
	
	return argObj;

}


```

***
<br>
<a name="16">

## 每天一道面试题: 16

> 今天开始进行JavaScript细节上的查漏补缺


### `javascript` 的`typeof`返回哪些数据类型？

**答案:**

object number function boolean undefined string

***
<br>
### 传统事件绑定和符合W3C标准的事件绑定有什么区别？

**答案:**

- 传统事件绑定: `div1.onclick=function(){}; `
	- 如果给同一个元素绑定了两次或者多次相同类型的事件，那么后面的绑定会覆盖前面的绑定
	- 不支持DOM事件流(事件捕获阶段-->目标元素阶段-->事件冒泡阶段)

- 符合W3C标准的事件绑定
	- `addEventListener`
		-  如果说给同一个元素绑定了两次或者多次相同类型的事件，所有的绑定将会依次触发 
		- 支持 `DOM` 事件流
		- 进行事件绑定传参不需要 `on` 前缀 
	
	- IE9之前: `attachEvent/detachEvent`
		- 进行事件类型传参需要带上`on`前缀
		- 这种方式只支持事件冒泡，不支持事件捕获

***
<br>
### IE和DOM事件流的区别？

**答案:**

1. 执行顺序不一样
2. 参数不一样
3. 事件加不加on
4. this指向问题

IE9 以前：attachEvent(“onclick”)、detachEvent(“onclick”) 

IE9 开始跟 DOM 事件流是一样的，都是 addEventListener

***
<br>
### IE和标准下有哪些兼容的写法？

**答案:**

```
ev=ev||window.event 

document.documentElement.clientWidth || document.body.clientWidth

target = ev.srcElement||ev.target
```

***
<br>
### b继承a的方法

**答案:**

```
function b(){}

b.prototype = new a;
```

***
<br>
### js指针、闭包、作用域

**答案:**

this: 指向调用上下文

闭包: 内层作用域可以访问外层作用域的变量。

- 闭包就是可以读取其他函数内部变量的函数
- 闭包的缺点：滥用闭包会造成内存泄漏，因为闭包中引用到的包裹函数中定义的变量都永远不会被释放，所以我们应在必要的时候，及时释放这个闭包函数

作用域: 定义一个函数就开辟了一个局部作用域，整个js执行环境就是一个全局作用域

***
<br>
### 事件委托是什么？如何阻止事件冒泡和默认事件？

**答案:**

事件委托: 利用事件冒泡的原理，子元素所触发的事件，让其父元素代替执行

阻止事件冒泡: 
- `e.stopPropagation()` // 标准浏览器
- `event.cancelBubble = true` // IE9之前
	
阻止默认事件:
- 比如为了不让a点击之后跳转，我们就要给它的点击事件进行阻止。还有一些浏览器的默认事件
- `return false`
- 对于使用addEventListener绑定的事件，需要使用`e.preventDefault();`阻止默认事件
	


***
<br>

<a name="17">

## 每天一道面试题: 17


### 添加、删除、替换、插入 到某个节点的方法


**答案:**

```
obj.appendChild()
obj.insertBefore() // 原生的js不提供insertAfter()
obj.replaceChild() // 替换
obj.removeChild() // 删除

```

***
<br>
### js的本地对象，内置对象和宿主对象

**答案:**

1. 本地对象为 `Array` `Object` `RegExp` 等可以new实例化的对象
2. 内置对象为 `Global` `Math` 等不可以实例化的, 内置对象也属于本地对象
3. 宿主对象为浏览器自带的 `document`，`window` 等

***
<br>
### document load 和 document ready 的区别

**答案:**

`document.onload` 是在结构和样式加载完才执行js

`window.onload` 不仅仅要在结构和样式加载完，还要执行完所有的样式、图片这些资源文件，全部加载完才会触发`window.onload`事件

`document.ready` 原生js中没有这个方法，jquery中有`$(document).ready(function(){})`，DOM结构绘制完毕就执行，不必等到加载完毕


***
<br>
### javascript的同源策略

**答案:**

一段脚本只能读取来自于同一来源的窗口和文档的属性，这里的统一来源指的是**主机名**、**协议**和**端口号**的组合

同源策略带来的麻烦: 同域名下的请求无法实现，如果说想要请求其他来源的js文件，或者json数据，可以通过jsonp来解决。


***
<br>
### 编写一个数组去重的方法

**答案:**

```

function clrRepeat(arr){

	var n = {}, r = [], len = array.length, val, type; 
	
	for (var i = 0; i < array.length; i++) { 
		val = array[i]; 
		type = typeof val; 
		if (!n[val]) { 
			n[val] = [type]; 
			r.push(val); 
		} else if (n[val].indexOf(type) < 0) { 
			n[val].push(type); 
			r.push(val); 
		} 
	} 
	return r; 
}

// 注意indexOf()为ES5的新方法，IE8及以下不支持！

```


***
<br>

### 怎么判断某变量是否为数组数据类型？

**答案:**

1. 方法一，`obj instanceof Array`，但在某些IE版本中不正确

2. 方法二，在ES5中定义了新方法: `Array.isArray()`, 保证其兼容性

3. 最佳方案:
```
if(typeof Array.isArray === "undefined"){
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === "[object Array]"
	}

}

```

***
<br>

<a name="18">


## 每天一道面试题: 18


### 希望获取到页面中所有的checkbox怎么做？（不使用第三方模块）

**答案:**

```
var domList = document.getElementsByTagName('input')
var checkBoxList = [];//返回的所有的 checkbox
var len = domList.length; //缓存到局部变量
while (len--) { //使用 while 的效率会比 for 循环更高
	if (domList[len].type == `checkbox`) {
		checkBoxList.push(domList[len]);
	}
}

```

***
<br>

### 当一个 DOM 节点被点击时候，我们希望能够执行一个函数, 应该怎么做

**答案:**

直接在 DOM 里绑定事件：`<div onclick="test()"></div>`

在 JS 里通过 onclick 绑定：`xxx.onclick = test`

通过事件添加进行绑定：`addEventListener(xxx, 'click', test)`


***
<br>

### undefined什么情况下发生?

**答案:**

undefined会在以下三种情况下产生:

1. 一个变量定义了却没有赋值
2. 想要获取一个对象上不存在的属性或方法
3. 一个数组中没有被赋值的元素

注意区分undefined和not defined(语法错误)是不一样的

***
<br>

### 已知有字符串 foo="get-element-by-id",写一个 function 将其转化成驼峰表示法 "getElementById"


**答案:**

```
function combo(msg){
	var arr = msg.split("-"); //[get,element,by,id]
	for(var i = 1; i < arr.length; i++){
		arr[i] = arr[i].charAt(0).toUpperCase()+arr[i].substr(1,arr[i].length-1); //Element
	}
	msg = arr.join(""); //msg = 'getElementById'
	return msg;
}
```


也可以直接用正则:

```
var foo = "get-element-by-id";

var newFoo = s.replace(/-([a-z])/g, function(m, p1){return p1.toUpperCase();});

```

***
<br>

### 输出今天的日期，以YYYY-MM-DD的方式

**答案:**

```
var d = new Date();

// 获取年，getFullYear()返回4位的数字
var year = d.getFullYear();

// 月份有些特殊，0是1月，11是12月
var month = d.getMonth();
// 变成两位
month = month < 10? "0" + month : month;

// 获取日
var day = d.getDate();
day = day < 10? "0" + day : day;

alert(year + '-' + month + '-' + day);

```

***
<br>

### 将字符串 `<tr><td>{$id}</td><td>{$name}</td></tr>`中的{$id}替换成 10，{$name}替换成 Tony （使用正则表达式）


**答案:**

`'<tr><td>{$id}</td><td>{$id}_{$name}</td></tr>'.replace(/{\$id}/g, '10').replace(/{\$name}/g, 'Tony');`


***
<br>

<a name="19">


## 每天一道面试题: 19


### 为了保证页面输出安全，我们经常需要对一些特殊的字符进行转义，请写 一个函数 escapeHtml，将<, >, &, "进行转义


**答案:**

```
function escapeHtml(str) {
	return str.replace(/[<>"&]/g, function(match){
	
		switch (match) {
		
		case "<":
			return "&lt;";
		
		case ">":
			return "&gt;";
		
		case "&":
			return "&amp;";
		
		case "\"":
			return "&quot;";
		
		}
	
	});
}

```


***
<br>
### 用js实现随机选取10~100之间的10个数字，存入一个数组，并排序

**答案:**

```
function getRand(start, end) {
	var rand = end - start;
	return Math.floor(Math.random() * rand + start);
}

var arr = [];
var i = 10;
while(i-- > 0){
	arr.push(getRand(10, 100));
}

arr.sort();
```


***
<br>

### 怎么添加、删除、复制、创建、查找节点

**答案:**

1. 创建新节点:
	- `createDocumentFragment()`
	- `createElement()`
	- `createTextNode()`

2. 添加、删除、替换、插入、复制：
	- `appendChild()`
	- `removeChild()`
	- `replaceChild()`
	- `insertBefore()`
	- `cloneNode()`

3. 查找:
	- `getElementsByTagName()`
	- `getElementsByName()`
	- `getElementById()`


***
<br>

### 正则表达式构造函数 var reg=new RegExp(“xxx”)与正则表达字面量 var reg=//有什么不同？匹配邮箱的正则表达式？


**答案:**

当使用RegExp()构造函数的时候，不仅需要转义引号，并且还需要双反斜杠，而使用正则表达字面量的效率更高

邮箱的正则匹配: `/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]{2,5}){1,2}$/`


***
<br>
### 写一个 function，清除字符串前后的空格。（兼容所有浏览器）

**答案:**

使用自带接口`trim()`，考虑兼容性:
```
if(!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s*|\s*$/, "");
	// \s匹配空白字符: 回车、换行、制表符tab、空格
	};

}
```


***
<br>

### Javascript 中 callee 和 caller 的作用？

如果一对兔子每月生一对兔子；一对新生兔，从第二个月起就开始生兔子；
假定每对兔子都是一雌一雄，试问一对兔子，第 n 个月能繁殖成多少对兔子？（使用 callee完成）

**答案:**

- arguments.callee：获得当前函数的引用
- caller 是返回一个对函数的引用，该函数调用了当前函数；
- callee 是返回正在被执行的 function 函数，也就是所指定的 function 对象的正文。


```
var result = [];

function fn(n) {
	if(n == 1 || n == 2) {
		result[1] = result[2] = 1;
		return 1;
	} else {
	
		result[n] =  arguments.callee(n-1) + arguments.callee(n-2);
		return result[n];
	}
	
}
// 其实就是一个fibonacci数列问题，用数组的形式，不仅可以打印出第n个数，还保存了前面所有的结果
console.log(fn(7)); //13
console.log(result); //,1,1,2,3,5,8,13

```


***
<br>

<a name="20">


## 每天一道面试题: 20

### JavaScript语句如何实现检索当前页面中的表单元素中的所有文本框，并将它们全部清空？


**答案:**

```
for(var i=0; i < document.forms.length; i++) {
	for(var j=0; j < document.forms[i].elements.length; j++) {
		if(document.forms[i].elements[j].type == "text") {
			document.forms[i].elements[j].value = "";
		}
	
	}
}
```


***
<br>

### 写出下面程序运行的结果

```
for(i=0, j=0; i<10, j<6; i++, j++) {

	k = i + j;

}
```

**答案:**

`10 // i=5, j=5`


***
<br>

### 阅读以下代码，分析出结果:

```
var arr = new Array(1,3,5);
arr[4] = 'z';
arr2 = arr.reverse();
arr3 = arr.concat(arr2);
alert(arr3);
```

**答案:**

`z,,5,3,1,z,,5,3,1`


关于Array类型、Array的转换方法请看: [Array类型](./JavaScript高级程序设计.md/#5b) 

之前也做过这种题: [关于reverse方法](#7a)


***
<br>

### 写出简单描述html标签(不带属性的开始标签和结束标签)的正则表达式，并将以下字符串中的html标签去除

`var str = "<div>这里是div<p>里面的段落</p></div>";`


**答案:**

```
var reg = /<\/?\w+\/?>/gi;
var res = str.replace(reg, "");
```

为了加深对于正则的理解，试着将题目扩展。如何取出一对标签中的内容？如何将一对标签除去？

```
var str = "<div>这里是div<p>里面的段落</p></div>";

var pattern = /(\<(\w+\>))(.*?)(\<\/\2)/gi;
var res = pattern.test(str);

console.log(res); 

// 正则表达式构造函数中用于存储捕获分组的属性: $1、$2、$3...
console.log(RegExp.$1); // <div>
console.log(RegExp.$2); // div>
console.log(RegExp.$3); // 这里是div<p>里面的段落</p>
console.log(RegExp.$4); // </div>

//这样就提取出了一对标签中的内容
var s = str.replace(pattern, RegExp.$3); // 这里是div<p>里面的段落</p>

// 由于$1、$2、$3...这些属性只会存储最近一次匹配结果里的分组
pattern.test(s); // 再匹配一次，获取div中的p
console.log(s.replace(pattern, RegExp.$3)); // 这里是div里面的段落


// 当然也可以这样，反复调用，就可以把嵌套标签中的内容全部提取出来
var s = str.replace(pattern, function(m,p1,p2,p3,p4){return p3});
console.log(s); // 这里是div<p>里面的段落</p>
console.log(s.replace(pattern, function(m,p1,p2,p3,p4){return p3})); // 这里是div里面的段落

```

关于正则表达式，请看JS高级程序设计中的详细解读: [正则表达式](./JavaScript高级程序设计.md/#5d)



***
<br>

<a name="21">


## 每天一道面试题: 21


### 简述创建函数的几种方式

**答案:**

1. 函数声明
`function sum1(num1,num2){ return num1+num2; } `

2. 函数表达式
`var sum2 = function(num1,num2){ return num1+num2; } `

3. 匿名函数
`function(){}:只能自己执行自己`

4. 函数对象方式
`var sum3 = new Function("num1","num2","return num1 + num2");`


***
<br>


### JavaScript创建对象的几种方式

**答案:**

1. Object构造函数创建对象 : 不再赘述

2. 对象字面量 : 不再赘述

3. 工厂模式 : 用函数来封装以特定接口创建对象的细节

	```
	function createPerson(name, age, job) {
		var o = new Object();
		o.name = name;
		o.age = age;
		o.job = job;
		o.sayName = function() {
			alert(this.name);
		};
		return o;
	}
	
	var person = createPerson("Tom", 25, "Software Engineer");
	```
	
	
	> 缺点: 都是Object实例，无法区分所创建对象的类型。


4. 构造函数模式 : 自定义构造函数，创建特定类型的对象，同一个构造函数创建出来的对象属于一类
	
	```
	function Person(name, age, job) {
		this.name = name;
		this.age = age;
		this.job = job;
		this.sayName = function() {
			alert(this.name);
		};
	}

	var person = new Person("Tom", 25, "Software Engineer");
	```


	> 缺点: 对于一些可以共享且相同的函数方法，却要多次创建在实例化对象中，占用内存，且复用性差。


5. 原型模式 : 让所有的对象实例共享原型对象所包含的属性和方法，不必在构造函数中定义然后多次在实例对象中创建了，只需要添加给原型即可

	```
	function Person() {
	}
	
	Person.prototype.name = "Tom";
	Person.prototype.age = 25;
	Person.prototype.job = "Software Engineer";
	Person.prototype.sayName = function() {
		alert(this.name);
	};
	
	// 当然也可以通过用对象字面量来重写整个原型对象，比上面的更简洁，但不要忘了constructor变化
	// Person.prototype = {};
	
	var person1 = new Person();
	
	// 可以指定实例属性，屏蔽来自原型的属性值
	person1.name = "Jerry";
	
	```


	> 缺点: 省略了传递给构造函数初始化参数这一环节，导致所有的实例默认都具有相同的属性值。更大的问题是对于原型上的引用类型属性，所有的实例之间会共享修改，丧失了独特性。


6. 混合构造函数原型模式 : 最常见的创建自定义类型方式，构造函数中定义实例属性，原型对象中添加共享属性和方法

	```
	function Person(name, age, job) {
		this.name = name;
		this.age = age;
		this.job = job;
		this.friends = ["Shelby", "Court"];
	}
	
	Person.prototye = {
		constructor : Person,
		sayName : function() {
			alert(this.name);
		}
	}
	
	var person1 = new Person("Tom", 25, "Software Engineer");
	var person2 = new Person("Jerry", 24, "Software Engineer");

	person1.friends.push("Van");
	alert(person1.friends); //"Shelby,Count,Van"
	alert(person2.friends); //"Shelby,Count"
	
	alert(person1.sayName === person2.sayName); //true
	```


	> 优点: 支持向构造函数传递参数，每个实例都有自己的一份实例属性的副本，每个实例共享对方法的引用，最大限度节省内存。



7. 动态原型模式 : 将构造函数和原型对象等定义统一到一个函数中，封装性更强，并且通过检测必要情况来决定是否初始化原型，效率更高
	```
	function Person(name, age, job){

		//属性
		this.name = name;
		this.age = age;
		this.job = job; 
	
		//方法
		if (typeof this.sayName != "function"){
	
			Person.prototype.sayName = function(){
				alert(this.name);
			};
		}
	} 
	
	var friend = new Person("Nicholas", 29, "Software Engineer");
	friend.sayName(); 
	```


	> 评价: 原型方法的添加只执行一次，对原型所做的修改也能立即在实例中反映，可以说相当完美，但是需要注意不能使用对象字面量重写原型，否则会切断现有实例与新原型的联系。



8. 寄生构造函数模式 : 当有特殊需求比如说创建一个具有额外方法的数组，由于不能直接修改Array，就可以使用这个模式
	
	```
	function SpecialArray(){

		//创建数组
		var values = new Array();
	
		//添加值
		values.push.apply(values, arguments);
	
		//添加方法
		values.toPipedString = function(){
			return this.join("|");
		};
	
		//返回数组
		return values;
	}
	
	var colors = new SpecialArray("red", "blue", "green");
	alert(colors.toPipedString()); //"red|blue|green" 
	```


	- 除了使用了new操作符，并且把使用的包装函数叫做构造函数外，其余和工厂模式一模一样。

	- 注意: 返回的对象与构造函数和原型没有关系，与在构造函数外部创建的对象没有什么不同，因此不能使用instanceof操作符来确定对象类型。

	- 建议在可以使用其他模式的情况下，不要使用这种模式。



9. 稳妥构造函数模式 : 用来创建没有公共属性，不引用this的安全稳妥对象

	```
	function Person(name, age, job){

		//创建要返回的对象
		var o = new Object(); 
	
		//可以在这里定义私有变量和函数
	
		//添加方法
		o.sayName = function(){
			alert(name);
		};
	
		//返回对象
		return o;
	} 

	var friend = Person("Nicholas", 29, "Software Engineer");
	friend.sayName(); //"Nicholas" 
	```

	- 除了使用sayName方法外，没有其他办法访问name的值。
	
	- 与寄生构造函数模式类似，使用稳妥构造函数模式创建的对象与构造函数之间没有什么关系，因此instanceof操作符也没有意义。




详细解读请见笔记: [JavaScript高级程序设计: 创建对象](./JavaScript高级程序设计.md/#6b)




***
<br>

### JavaScript如何实现继承？


**答案:**


1. 原型链继承

	> 将构造函数的原型设置为另一个构造函数的实例对象，这样就可以继承另一个原型对象的所有属性和方法，可以继续往上，最终形成原型链。
	>
	> 第一个问题是，当实现继承后，另一个原型的实例属性，变成了现在这个原型的原型属性，然后该原型的引用类型属性会被所有的实例共享，这样继承原型引用类型属性的实例之间不再具有自己的独特性了。
	> 
	> 第二个问题是，在创建子类型的实例时，没有办法在不影响所有对象实例的情况下给超类型的构造函数中传递参数。


2. 借用构造函数继承

	> 为了解决原型中包含引用类型值的问题，开始使用借用构造函数，也叫伪造对象或经典继承


	```
	function SuperType() {
		this.colors = ["red", "blue", "green"];
	}
	
	function SubType() {
		//继承SuperType
		SuperType.call(this);
	}
	
	var instance1 = new SubType();
	instance1.colors.push("black");
	alert(instance1.colors); //"red,blue,green,black"
	var instance2 = new SubType();
	alert(instance2.colors); //"red,blue,green" 
	```


	- 将SuperType函数在SubType构造函数中调用，在每个实例中执行，这样每个实例中都会有一份SuperType中的属性方法的副本，也就实现了继承SuperType。
	
	- 这种模式的优势就是可以在子类型构造函数中向超类型构造函数传递参数。
	
	> 存在的问题就是，所有的类型都只能使用构造函数模式（因为超类型的原型中定义的方法对于子类型不可见），因此方法都在构造函数中定义，函数复用就无从谈起了。



3. 组合继承


	> 也叫伪经典继承，将原型链和借用构造函数的技术组合到一块。使用原型链实现对原型属性和方法的继承，而通过构造函数来实现对实例属性的继承。


	```
	function SuperType(name) {
		this.name = name;
		this.colors = ["red", "blue", "green"];
	}
	
	SuperType.prototype.sayName = function() {
		alert(this.name);
	}
	
	function SubType(name, age) {
		// 继承属性
		SuperType.call(this, name);
		this.age = age;
	}

	// 继承方法
	SubType.prototype = new SuperType();
	SubType.prototype.constructor = SubType;
	SubType.prototype.sayAge = function() {
		alert(this.age);
	};
	
	var instance1 = new SubType("Nicholas", 29);
	instance1.colors.push("black");
	alert(instance1.colors); //"red,blue,green,black"
	instance1.sayName(); //"Nicholas";
	instance1.sayAge(); //29
	var instance2 = new SubType("Greg", 27);
	alert(instance2.colors); //"red,blue,green"
	instance2.sayName(); //"Greg";
	instance2.sayAge(); //27 
	```


	- 将SubType的原型指定为SuperType的一个实例，大致步骤和原型链继承类似，只是多了在SubType中借调SuperType的过程。

	- 实例属性定义在构造函数中，而方法则定义在构造函数的新原型中，同时将新原型的constructor指向构造函数。

	- 可以通过`instanceof`和`isPrototypeOf()`来识别基于组合继承创建的对象。

	- 避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为JS中最常用的继承模式。


	> 实际上是借用了构造函数，以覆盖的方式，解决了在原型链继承中原型的引用类型属性共享在所有实例中的问题。
	> 
	> 因为在子类型中借调构造函数(SuperType.call(this))时，会在自己的所有实例中执行一遍SuperType中的代码，由于每个实例this都是不同的，因此SuperType中定义的属性会在每个实例中有一份副本，也就避免了原型链继承中，原型属性共享的问题（覆盖了原型属性）。



4. 原型式继承


	> 不自定义类型的情况下，临时创建一个构造函数，借助已有的对象作为临时构造函数的原型，然后在此基础实例化对象，并返回。


	```
	function object(o){
	 function F(){}
	 F.prototype = o;
	 return new F();
	} 
	```

	- 本质上是object()对传入其中的对象执行了一次浅复制

	```
	var person = {
	 name: "Nicholas",
	 friends: ["Shelby", "Court", "Van"]
	};
	
	var anotherPerson = object(person);
	anotherPerson.name = "Greg";
	anotherPerson.friends.push("Rob");

	var yetAnotherPerson = object(person);
	yetAnotherPerson.name = "Linda";
	yetAnotherPerson.friends.push("Barbie");

	alert(person.friends); //"Shelby,Court,Van,Rob,Barbie" 
	```


	- 原型的引用类型属性会在各实例之间共享。
	
	- 当只想单纯地让一个对象与另一个对象保持类似的情况下，原型式继承是完全可以胜任的。



5. 寄生式继承

	> 其实就是在原型式继承得到对象的基础上，在内部再以某种方式来增强对象，然后返回。
	
	
	```
	function createAnother(original) {
		var clone = object(original);
		clone.sayHi = function() {
			alert("hi");
		};
		return clone;
	}
	```

	- 思路与寄生构造函数和工厂模式类似。
	
	- 新的对象中不仅具有original的所有属性和方法，而且还有自己的sayHi()方法。
	
	- 寄生式继承在主要考虑对象而不是自定义类型和构造函数的情况下非常有用。
	
	- 由于寄生式继承为对象添加函数不能做到函数复用，因此效率降低。



6. 寄生组合式继承


	> 组合继承是JS中最常用的继承模式，但其实它也有不足，组合继承无论什么情况下都会调用两次超类型的构造函数，并且创建的每个实例中都要屏蔽超类型对象的所有实例属性。
	> 
	> 寄生组合式继承就解决了上述问题，被认为是最理想的继承范式


	```
	function object(o) {
		function F(){}
		F.prototype = o;
		return new F();
	}
	
	function inheritPrototype(superType, subType) {
		var prototype = object(superType.prototype);
		prototype.constructor = subType;
		subType.prototype = prototype;
	}
	
	function SuperType(name) {
		this.name = name;
		this.colors = ["red", "blue", "green"];
	}
	
	SuperType.prototype.sayName = function() {
		alert(this.name);
	};
	
	function SubType(name, age) {
		SuperType.call(this, name);
		this.age = age;
	}
	
	inheritPrototype(SuperType, SubType);	// 这一句，替代了组合继承中的SubType.prototype = new SuperType()
	
	SubType.prototype.sayAge = function() {
		alert(this.age);
	};
	```

	既然在组合模式中我们通过借调构造函数来为每个实例定义实例属性，从而覆盖原型属性，影响了效率，那么是否可以把原型改变一下呢，不让它作为SuperType的实例，这样就不会有一些无用的原型属性了。
	

	> 不必为了指定子类型的原型而调用超类型的构造函数，我们需要的只不过是超类型原型的一个副本。


	1. 在inheritPrototype函数中用到了原型式继承中的object()方法，将超类型的原型指定为一个临时的空构造函数的原型，并返回构造函数的实例。
	2. 此时由于构造函数内部为空（不像SuperType里面有实例属性），所以返回的实例也不会自带实例属性，这很重要！因为后面用它作为SubType的原型时，就不会产生无用的原型属性了，也就不用借调构造函数进行所谓的“重写”了。
	3. 此时返回的实例对象的constructor指向那个空构造函数。
	4. 然后为这个对象重新指定constructor为SubType，并将其赋值给SubType的原型。这样，就达到了将超类型构造函数的实例作为子类型原型的目的，同时没有一些从SuperType继承过来的无用原型属性。




详细解读请见笔记: [JavaScript高级程序设计: 继承](./JavaScript高级程序设计.md/#6c)



***
<br>

### js延迟加载的方式有哪些？


**答案:**

1. defer和async
2. 动态创建DOM方式（创建 script，插入到 DOM 中，加载完毕后 callBack）
3. 按需ajax异步载入js



***
<br>


<a name="22">


## 每天一道面试题: 22


### 哪些操作会造成内存泄漏？


**答案:**

JS中的垃圾收集器跟踪每个变量，对不再有用的变量打上标记，以备将来收回其占用的内存。

内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。


哪些操作会造成内存泄漏？

1. 意外的全局变量引起的内存泄漏

	```
	function leak() {
		leak = "xxx"; //leak成为一个全局变量，不会被回收
	}
	```

2. 闭包引起的内存泄漏

	```
	function bindEvent() {
		var obj = document.createElement("xxx");
		obj.onclick = function() {
		}
	}
	```
	
	- 函数内定义函数，并且内部函数的引用外暴了，形成了闭包
	
	- 闭包可以维持函数内局部变量，使其得不到释放。
	
	- 解决方法:
		- 将事件处理函数定义在外部，解除闭包
		- 或者在定义事件处理函数的外部函数中，删除对DOM的引用



3. 没有清理的DOM元素引用

	```
	var elements={  
	    button: document.getElementById("button"),  
	    image: document.getElementById("image"),  
	    text: document.getElementById("text")  
	}; 
	
	function doStuff(){  
	    image.src="http://some.url/image";  
	    button.click():  
	    console.log(text.innerHTML)  
	}
	
	function removeButton(){  
	    document.body.removeChild(document.getElementById('button'))  
	}  
	```

	- 对于button的引用，一个在DOM树中，另外一个在字典中。如果在将来的某些点你决定要清除这个元素，需要让两个引用都不可用。


4. 被遗忘的定时器或者回调

	```
	var someResouce=getData();  
	setInterval(function(){  
	    var node=document.getElementById('Node');  
	    if(node){  
	        node.innerHTML=JSON.stringify(someResouce)  
	    }  
	},1000)  
	```
	
	- 如果node元素被移除，该定时器仍会存在，同时因为回调函数包含对someResource的引用，外面的someResource也不会被释放。


5. 子元素引起的内存泄漏

6. IE7/8循环引用


怎样避免内存泄露？

1. 减少不必要的全局变量，或者生命周期较长的对象，及时对无用的数据进行垃圾回收；

2. 注意程序逻辑，避免“死循环”之类的 ；

3. 避免创建过多的对象  原则：不用了的东西要及时归还。



***
<br>


### 下面代码的输出是什么？

```
function changeObjectProperty(o) {
	o.siteUrl = "http://www.csser.com/";
	o = new Object();
	o.siteUrl = "http://www.popcg.com/";
}

var CSSer = new Object();
changeObjectProperty(CSSer);
console.log(CSSer.siteUrl);


```


**答案:**

如果 CSSer 参数是按引用传递的，那么结果应该是"http://www.popcg.com/"，但实际结果却仍是"http://www.csser.com/"。


事实是这样的：在函数内部修改了引用类型值的参数，该参数值的原始引用保持不变。我们可以把参数想象成局部变量，当参数被重写时，这个变量引用的就是一个局部变量，局部变量的生存期仅限于函数执行的过程中，函数执行完毕，局部变量即被销毁以释放内存。



回忆一下之前做过的: [关于函数参数值传递](#14a)

回忆一下JS高级程序设计: [基本类型和引用类型](./JavaScript高级程序设计.md/#4a)



***
<br>

### 下面代码输出结果是什么？

```
function  foo() {
	foo.a = function(){alert(1)};
	this.a = function(){alert(2)};
	a = function(){alert(3)};
	var a = function(){alert(4)};
}

foo.prototype.a = function(){alert(5)};
foo.a = function(){alert(6)};
foo.a();
var obj = new foo();
obj.a();
foo.a();

```

**答案:**

```
function  foo() {
	foo.a = function(){alert(1)};
	this.a = function(){alert(2)};
	a = function(){alert(3)}; // 由于变量a声明提前，这句会被覆盖
	var a = function(){alert(4)}; // 最终这才是变量a的值
}

foo.prototype.a = function(){alert(5)}; // 构造函数中的实例属性，会屏蔽原型中的属性
foo.a = function(){alert(6)}; // 构造函数中的静态属性，覆盖
foo.a(); // 6
var obj = new foo(); // 别忘了，每次实例化对象，会执行构造函数内部代码，所以在这里，静态属性a又被覆盖了，foo.a()变回了1
obj.a(); // 2
foo.a(); // 1

```


***
<br>


<a name="23">


## 每天一道面试题: 23


### 你如何优化自己的代码？


**答案:**

- 代码重用

- 避免全局变量（命名空间，封闭空间，模块化 mvc..）

- 拆分函数避免函数过于臃肿：单一职责原则

- 适当的注释，尤其是一些复杂的业务逻辑或者是计算逻辑，都应该写出这个业务逻辑的具体过程

- 内存管理，尤其是闭包中的变量释放


***
<br>

### readonly和disable的区别？

**答案:**

readonly只针对input(text/password)和textarea有效，而disabled对于所有的表单元素都有效，当表单元素在使用了disabled后，当我们将表单submit的时候，这个元素的值不会被传递出去，而readonly会将该值传递出去。


***
<br>

### HTTP 协议中，GET 和 POST 有什么区别？分别适用什么场景 ？


**答案:**

- get传送的数据长度有限制，post没有。

- get通过url传递，在浏览器地址栏可见，post是在报文中传递。

适用场景:

- post一般用于表单提交。

- get一般用于简单的数据查询，严格要求不是那么高的场景。


***
<br>

### HTTP状态消息200/302/304/403/404/500分别代表什么？


**答案:**

- 200：请求已成功，请求所希望的响应头或数据体将随此响应返回。

- 302：请求的资源临时从不同的 URI 响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在 Cache-Control 或 Expires 中进行了指定的情况下，这个响应才是可缓存的。

- 304：如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。304 响应禁止包含消息体，因此始终以消息头后的第一个空行结尾。

- 403：服务器已经理解请求，但是拒绝执行它。

- 404：请求失败，请求所希望得到的资源未被在服务器上发现。

- 500：服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器端的源代码出现错误时出现。


***
<br>



<a name="24">


## 每天一道面试题: 24


### 如何判断一个JS变量是数组类型？


**答案:**

- ES5中: `Array.isArray()`

- `[] instanceof Array`

- `Object.prototype.toString.call([]);` // "[object Array]"



***
<br>

### 如何获取对象 a 拥有的所有属性（可枚举的、不可枚举的，不包括继承来的属性）


**答案:**

`Object.keys`——IE9+ (获取所有可枚举实例属性)

或者使用 for…in 并过滤出继承的可枚举属性

```
for(o in obj){
	if(obj.hasOwnproperty(o)){
	//把 o 这个属性放入到一个数组中
	}
}
```

要获取所有可枚举或不可枚举实例属性: `Object.getOwnPropertyNames()`



***
<br>

### 只允许使用 + - * / 和 Math.* ，求一个函数 y = f(x, a, b);当 x > 100时返回 a 的值，否则返回 b 的值，不能使用 if else 等条件语句，也不能使用|,?:,数组。


**答案:**

```
function f(x, a, b) {
	var temp = Math.ceil(Math.max(Math.min(x-100, 1), 0));

	return temp * a + (1 - temp) * b;

}
```


***
<br>

<a name="25">



## 每天一道面试题: 25


### 关于IE的window对象表述正确的有:

A. window.opener属性本身就是指向window对象

B. window.reload()方法可以用来刷新当前页面

C. window.location="a.html"和window.location.href="a.html"的作用都是把当前页面替换成a.html页面

D. 定义了全局变量g，可以用window.g的方式来存取该变量


**答案:**


A选项，错误。window.opener返回打开当前窗口的那个窗口的引用，如果当前窗口是由另一个窗口打开的，window.opener保留了那个窗口的引用，如果当前窗口不是由其他窗口打开的，则该属性返回null。
B选项，错误。应该是location.reload()或者window.location.reload()。
C选项和D选项，正确。



***
<br>

### 下面描述错误的是:

A. http状态码302表示暂时性转移

B. DOMContentLoaded事件早于onload事件

C. IE678不支持事件捕获

D. localStorage存储的数据在电脑重启后丢失


**答案:**

A正确，B正确。当onload事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了；当DOMContentLoaded事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。
C正确，IE8及以下不支持事件捕获，支持事件冒泡。D错误，localStorage存储的数据没有时间限制。


***
<br>
### 列出 3 条以上 ff 和 IE 的脚本兼容问题


**答案:**


1、在IE下可通过 document.frames["id"];得到该 IFRAME 对象，而在火狐下则是通过 document.getElementById("content_panel_if").contentWindow;

2、childNodes和children

3、模拟点击事件

4、事件注册

5、取消事件冒泡

6、触发事件的源对象

7、鼠标滚轮事件

8、currentStyle和getComputedStyle


***
<br>

<a name="26">



## 每天一道面试题: 26


### 在JavaScript中什么是伪数组？如何将伪数组转化为标准数组？


**答案:**

伪数组（类数组）: 无法调用数组方法或期望length属性有什么特殊的行为，但仍可以用对真正数组遍历方法来遍历它们。

典型的是函数的arguments参数，还有调用getElementByTagName，document.childNodes之类，它们都返回NodeList对象，属于伪数组。


**如何将伪数组转化为标准数组？**
1. 声明一个空数组，通过遍历伪数组把它们重新添加到新的数组中。
2. 使用数组的slice方法，用call或apply指向伪数组，然后返回一个数组。
3. 使用原型继承，`nodes.__proto__ = Array.prototype`
4. 使用ES6中数组的新方法:`Array.from()`，`var arg = Array.from(arguments)`




***
<br>

### 请写一个正则表达式：要求最短 6 位数，最长 20 位，阿拉伯数和英文字母（不区分大小写）组成


**答案:**


`^(?=.*\d)(?=.*[A-z])[A-z\d]{6,20}$`



- `(?=pattern)` 正向先行断言

	- 代表字符串中的一个位置，紧接该位置之后的字符序列**能够**匹配pattern。
 
	- 例如对`a regular expression`这个字符串，要想匹配regular中的re，但不能匹配expression中的re，可以用`re(?=gular)`，该表达式限定了re右边的位置，这个位置之后是gular，但并不消耗gular这些字符，将表达式改为`re(?=gular).`，将会匹配reg，元字符.匹配了g，括号这一砣匹配了e和g之间的位置。


- `(?!pattern)` 负向先行断言

	- 代表字符串中的一个位置，紧接该位置之后的字符序列**不能**匹配pattern。 

	- 例如对`regex represents regular expression`这个字符串，要想匹配除regex和regular之外的re，可以用`re(?!g)`，该表达式限定了re右边的位置，这个位置后面不是字符g。负向和正向的区别，就在于该位置之后的字符能否匹配括号中的表达式。



***
<br>

### 下列 JavaScript 代码执行后，依次 alert 的结果是？

```
var obj = {proto: {a:1,b:2}};
function F(){};
F.prototype = obj.proto;
var f = new F();
obj.proto.c = 3;
obj.proto = {a:-1, b:-2};
alert(f.a);
alert(f.c);
delete F.prototype['a'];
alert(f.a);
alert(obj.proto.a);
```


**答案:**

```
var obj = {proto: {a:1,b:2}};
function F(){};
F.prototype = obj.proto; // 指向的是同一个对象{a:1, b:2}
var f = new F();
obj.proto.c = 3;
obj.proto = {a:-1, b:-2}; // 这一步重写了proto，把proto指向了一个新的地址，与F.prototype已经无关
alert(f.a); // 1
alert(f.c); // 3
delete F.prototype['a'];
alert(f.a); // undefined
alert(obj.proto.a); // -1
```


***
<br>

<a name="27">



## 每天一道面试题: 27


### 下面代码的输出结果是什么？

```
alert(a)
a();
var a=3;
function a(){
	alert(10);
}   
alert(a);
a=6;
a();
```


**答案:**

```
alert(a); // 因为变量声明提前优于函数声明，因此变量a被覆盖，打印整个函数a的代码
a(); // 10
var a=3; // 这里a被重新赋值为3
function a(){
	alert(10);
}   
alert(a); // 3
a=6;
a(); // a不是函数，因此报错，number is not a function
```


***
<br>

### 你做的页面在哪些浏览器测试过？这些浏览器的内核分别是什么？


**答案:**

IE: trident内核

Firefox: gecko内核

Safari: webkit内核

Opera: 以前是presto内核，Opera现已改用Google Chrome的Blink内核

Chrome: Blink内核，基于webkit


### doctype是什么？Quirks模式是什么，和Standards模式有什么区别？


**答案:**

`<!doctype>`声明位于文档中的最前面的位置，处于`<html>`标签之前，此标签可以告知浏览器文档使用哪种HTML或XHTML规范，即按何种规范解析页面。

如果不写DTD（文档声明），会默认采用Quirks模式解析页面。总体会有布局，样式解析和脚本执行三个方面的区别:

- 盒模型：在W3C标准中，如果设置一个元素的宽度和高度，指的是元素内容的宽度和高度，而在Quirks模式下，IE的宽度和高度还包含了padding和border。

- 设置行内元素的高宽：在Standards模式下，给`<span>`等行内元素设置width和height都不会生效，而在Quirks模式下，则会生效。

- 在Standards模式下可以使用`margin: 0 auto`来使元素水平居中，但在Quirks模式下，则会失效。



***
<br>

### div + css 的布局较table布局有什么特点？


**答案:**

改版的时候更方便，只需要改CSS文件。

页面加载速度更快，结构化清晰，页面显示简洁。

表现与结构分离。

易于搜索引擎检索，排名更容易靠前。


***
<br>

<a name="28">



## 每天一道面试题: 28

### img的alt和title有何异同？strong与em的异同？

**答案:**

alt: 为不能显示图像、窗体或applets的用户代理，alt属性用来指定替换文字，替换文字的语言由lang属性指定。

title: 为设置该属性的元素提供建议性的信息。

strong: 粗体强调标签，表示内容的重要性。

em: 斜体强调标签，表示内容的强调点。


***
<br>

### 为什么利用多个域名来存储网站资源会更有效？

**答案:**

- CDN缓存更方便
	- 通过动态域名解析，网友的请求被分配到离自己最快的服务器。

- 突破浏览器并发限制
	- 像地图之类的需要大量并发下载图片的站点，这个非常重要。

- 节约cookie带宽
	- 举例：twitter 的主站 http://twitter.com ，用户的每次访问，都会带上自己的cookie ，挺大的。假如twitter 的图片放在主站域名下，那么用户每次访问图片时，request header 里就会带有自己的cookie ，header 里的cookie 还不能压缩，而图片是不需要知道用户的cookie 的，所以这部分带宽就白白浪费了。

- 节约主域名的连接数，优化页面响应速度
	- 将图片等资源请求分配到其他域名上，避免了大图片之类的不一定重要的内容阻塞主域名上其他后续资源的连接。

- 防止不必要的安全问题


***
<br>

### 简述一下 src 与 href 的区别


**答案:**

src用于替换当前元素，href用于在当前文档和引用资源之间确定联系。

src是source的缩写，指向外部资源的位置，指向的内容将会被嵌入到文档中当前标签所在的位置。在请求src资源时，会将指向的资源下载并应用到文档内，例如js脚本、img图片等。
当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也是如此。

href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的联系。
`<link href="common.css" rel="stylesheet" />`如果在文档中添加这个，那么浏览器会识别文档为css文件，并行下载资源而不会停止对当前文档的处理。这也是为什么建议使用link方式来加载css而不是使用@import方式。


***
<br>

<a name="29">



## 每天一道面试题: 29


### 一个页面上有大量的图片（大型电商网站），加载很慢，你有哪些方法优化这些图片的加载，给用户更好的体验。


**答案:**


- 图片懒加载，在页面上的未可视区域可以添加一个滚动条事件，判断图片位置和浏览器顶端的距离与页面的距离，如果前者小于后者，优先加载。

- 如果为幻灯片、相册等，可以使用图片预加载技术，将当前展示图片的前一张和后一张优先下载。

- 如果图片为 css 图片，可以使用 CSSsprite，SVGsprite，Iconfont、Base64 等技术。

- 如果图片过大，可以使用特殊编码的图片，加载时会先加载一张压缩的特别厉害的缩略图，以提高用户体验。

- 如果图片展示区域小于图片的真实大小，则应在服务器端根据业务需要先行进行图片压缩，图片压缩后大小与展示一致。



***
<br>

### 你如何理解HTML结构的语义化？

**答案:**


HTML 告诉我们一块内容是什么（或其意义），而不是它长的什么样子，它的样子应该由CSS来决定。

HTML 标签语义化，简单来说，就是让标签有含义，给某块内容用上一个最恰当最合适的标签，
使页面有良好的结构，页面元素有含义，不论是谁都能够看懂这块内容是什么，并且有利于搜索引擎。

标签语义化的好处：
1. HTML结构清晰
2. 代码可读性较好
3. 无障碍阅读
4. 搜索引擎可以根据标签的语言确定上下文和权重问题
5. 移动设备能够更完美的展现网页（对css支持较弱的设备）
6. 便于团队维护和开发


***
<br>

### CSS中可以通过哪些属性定义，使得一个DOM元素不显示在浏览器可视范围内？

**答案:**

基本的：设置display为none，设置visibility为hidden。

技巧性：设置宽高为0; 设置透明度为0;
可以设置absolute，然后left为-9999px;
隐藏文字可以设置text-indent为-9999px。


***
<br>

### 什么是 Css Hack？ie6,7,8 的 hack 分别是什么？

**答案:**

针对不同的浏览器写不同的 CSS code 的过程，就是 CSS hack。

属性Hack选择器:
```
//选择器Hack ，如  在选择器前加* html ，则只有IE6可以识别。
* html body{
	background-color: #bfa;
}

//在样式前添加一个下划线，则该样式只有IE6及以下浏览器才能识别
_background-color: yellow;

//添加了*的样式只有IE7及以下的浏览器认识
*background-color: yellow;

//在样式最后添加一个\9只有IE8及以下的浏览器才能识别
background-color: yellow\9;
```

条件Hack:
```
// lt 小于， lte 小于等于
<!--[if lte IE 8]>
	<p>该标签会在IE8及以下的浏览器中显示</p>
<![endif]-->
```


***
<br>

<a name="30">



## 每天一道面试题: 30


### 行内元素的padding和margin可以设置吗？


**答案:**

内联元素的宽度、高度、外边距的top和bottom都不可改变，而内边距padding的top和bottom可以设置，但是不会影响页面的布局，不会挤压其他元素的位置，可能会遮盖其他元素。

可以设置padding和margin的left、right。

浏览器还有天生的inline-block元素，拥有内在尺寸，可以设置高宽，但不会自动换行。

如: `<input>`、`<img>`、`<button>`、`<textarea>`、`<label>`


***
<br>

### rgba()和opacity的透明效果有什么不同？

**答案:**

rgba()和opacity都能实现透明效果，但最大的不同是opacity作用于元素，以及元素内所有内容的透明度，
而rgba()只作用于元素的颜色或其背景色，设置rgba透明的元素的子元素不会继承透明效果。


***
<br>

### 如何垂直居中一个浮动元素？


**答案:**


方法一: 已知该元素的高宽

```
#div1{
	background-color:#6699FF;
	width:200px;
	height:200px;
	position: absolute; //父元素需要相对定位
	top: 50%;
	left: 50%;
	margin-top:-100px ; //二分之一的 height，width
	margin-left: -100px;
}
```

方法二: 未知该元素的高宽

```
#div1{
	width: 200px;
	height: 200px;
	background-color: #6699FF;
	margin:auto;
	position: absolute; //父元素需要相对定位
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
}
```


如何居中一个img？

```
#container {
	display:table-cell;
	text-align:center;
	vertical-align:middle;
}
```


***
<br>

### Sass、Less是什么？为什么要使用他们？

**答案:**

Sass 是一个成熟、稳定、强大的 CSS 扩展语言解析器

Less是一种动态样式语言，给CSS赋予了动态语言的特性，如变量、继承、运算、函数。

Less既可以在客户端上运行，也可以在服务器上运行（借助Node.js）。结构清晰，便于扩展。可以方便地屏蔽浏览器的私有语法差异，封装了对差异的重复处理，减少了无意义的机械劳动。完全兼容CSS代码，可以方便地应用到老项目中。



***
<br>

<a name="31">



## 每天一道面试题: 31


### 哪些CSS属性可以继承？


**答案:**

可继承: `font-size`、`font-family`、`color`、`ul`、`li`、`dl`、`dd`、`dt`

不可继承: `border`、`padding`、`margin`、`width`、`height`


***
<br>


### BFC是什么？


**答案:**


BFC(块级格式化上下文)，是指浏览器中创建了一个独立的渲染区域，该区域内所有元素的布局不会影响到区域外的元素的布局，这个渲染区域只对块级元素起作用。

一个创建了新的BFC的盒子是独立布局的，盒子内元素的布局不会影响盒子外面的元素。


根据W3C标准，在页面中元素都有一个隐含的属性叫做Block Formatting Context，简称BFC，该属性可以设置打开或者关闭，默认关闭。


**当开启元素的BFC以后，元素将会具有如下特性:**

1. 父元素的垂直外边距不会和子元素重叠（即设置给子元素的margin-top不会变成父元素的）
2. 开启BFC的元素不会被浮动元素所覆盖（利用这个原理可以设置文字环绕图片和左栏固定右栏自适应效果）
3. 开启BFC的元素可以包含浮动的子元素（可以解决高度塌陷）


**如何开启元素的BFC？**

1. 设置元素浮动
	- 使用这种方式开启，虽然可以撑开父元素，解决高度塌陷，但是会导致父元素的宽度丢失而且使用这种方式也会导致下边元素上移，带来新的问题。
2. 设置元素绝对定位
3. 设置元素为inline-block
	- 可以解决问题，但是会导致宽度丢失，不推荐使用这种方式。
4. 将元素的overflow设置为一个非visible的值
	- 将overflow设置为hidden是副作用最小的开启BFC的方式。


**但在IE6及以下的浏览器不支持BFC**

- IE6虽然没有BFC，但是有另一个隐含的属性叫`hasLayout`，该属性的作用和BFC类似，所以在IE6中可以通过开启该属性来解决。
- 开启方式很多，使用一种副作用最小的:直接将元素的zoom设置为1即可。
	- zoom表示放大，写几就放大为几倍 `zoom:1;`
	- 这个样式只在IE中支持，其他浏览器都不支持
- 如果为元素指定了宽度，则自动开启`hasLayout`。



***
<br>

### 谈谈iframe的优缺点


**答案:**


优点:
- 能够原封不动地把嵌入的网页展现出来。
- 如果有多个网页调用iframe，只需要修改iframe的内容，就可以实现每个多个页面的更改，方便快捷。
- 网页如果为了统一风格，头部脚部都需要保持一样，就可以对内容使用iframe嵌套，增加代码的可重用性。
- 如果遇到加载缓慢的第三方广告，可以用iframe来解决。


缺点:
- 会产生很多页面，不易管理。
- 多个框架中都出现滚动条，会挤占页面空间，影响用户体验。
- 很多移动设备无法完全显示框架，设备兼容性差。
- iframe框架页面会增加服务器的http请求，对于大型网站不可取。

现在基本都用ajax来代替iframe，iframe已经淡出了前端开发。



***
<br>

<a name="32">



## 每天一道面试题: 32


### html5有哪些新特性、移除了哪些元素？如何处理html5新标签的浏览器兼容问题？如何区分html和html5？


**答案:**

新特性:
- 拖拽释放API（drag、drop）
- 语义化更好的内容标签（header、footer、nav、aside、article、section）
- 音频、视频API（audio、video）
- 画布API（canvas）
- Web存储（localStorage、sessionStorage）
- 表单控件（calendar、date、time、email、url、search）
- 新的技术（应用缓存、web worker、服务器推送事件）

移除的元素:
- 纯表现的元素：`basefont`、`font`、`big`、`center`、`s`、`strike`、`tt`、`u`、
- 对可用性产生负面影响的元素：`frame`、`frameset`、`noframes`、

如何让IE低版本浏览器支持HTML5新标签？
- IE6~8支持通过`document.createElement`方法产生的标签，可以通过这一特性让这些浏览器支持HTML5新标签，还需要添加标签默认的样式。
- 最好的方式是直接使用成熟的框架，比如html5shim框架:
	```
	<!--[if lt IE 9]>
		<script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv-printshiv.min.js"></script>
	<![endif]-->
	```

如何区分HTML5？
- DOCTYPE声明、新增的结构元素、功能元素。


***
<br>

### 本地存储（Local Storage ）和 cookies（储存在用户本地终端上的数据）之间的区别是什么？

**答案:**

- Cookies:服务器和客户端都可以访问；大小只有 4KB 左右；有有效期，过期后将会删除，默认失效时间为浏览器关闭；

- 本地存储：只有本地浏览器端可访问数据，服务器不能访问本地存储直到故意通过 POST 或
者 GET 的通道发送到服务器；每个域 5MB；没有过期数据，它将保留直到用户从浏览器清除
或者使用 Javascript 代码移除。


#### `session`、`cookie`和`sessionStorage`、`localStorage`的区别:


1. cookie和session都是用来**跟踪浏览器用户身份的会话方式**，可以利用cookie和session等跟服务端进行数据交互。
	- 保持状态: cookie保存在浏览器端，session保存在服务器端。
	- 使用方式: 
		- cookie是服务器发给客户端的特殊信息，可以设置过期时间，以文本的形式保存在客户端，每次请求都会带上cookie。
		- 当服务器收到请求需要创建session对象时，会检查客户端请求中是否包含sessionid，如果有则返回相应session对象，如果没有则创建并把sessionid返回给客户端。sessionid通常储存在cookie中，如果用户禁用cookie，则要使用url重写，将sessionid拼接到访问地址后。
	- 存储内容:
		- cookie只能以文本的方式保存字符串类型。
		- session通过类似HashTable的数据结构来保存，能支持任何类型的对象。
	- 存储大小:
		- 单个cookie保存的数据不能超过4kb，session大小没有限制。
	- 安全性:
		- 针对cookie的攻击很多，cookie欺骗、cookie截获等。
		- sessionid是加密存储在cookie中的，并且随session过期而失效，安全性较高。
	- 应用场景:
		- cookie常用来保存用户登录时间、浏览历史等信息。
		- session用于保存每个用户的专用信息，如购物车等，可以将某些数据放入session中，供同一用户的不同页面使用。
	- 缺点:
		- cookie大小受限，容易被操作禁用，安全性低，每次访问都要传输cookie，浪费带宽。
		- session保存的东西越多，越会给服务器带来内存压力。依赖于cookie，如果禁用cookie则使用url重写，不安全。过度使用session变量会导致代码不好维护。


2. WebStorage目的是克服由cookie所带来的一些限制，当数据需要被严格控制在客户端时，不需要持续的将数据发回服务器。

	- 两个主要目标:
		- 提供一种在cookie之外存储会话数据的路径。
		- 提供一种可以存储大量跨会话存在的数据的机制。

	1、生命周期:
	- localStorage:localStorage的生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。
	- sessionStorage的生命周期是在仅在当前会话下有效。sessionStorage引入了一个“浏览器窗口”的概念，sessionStorage是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。但是sessionStorage在关闭了浏览器窗口后就会被销毁。同时独立的打开同一个窗口同一个页面，sessionStorage也是不一样的。

	2、存储大小：localStorage和sessionStorage的存储数据大小一般都是：5MB

	3、存储位置：localStorage和sessionStorage都保存在客户端，不与服务器进行交互通信。

	4、存储内容类型：localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的stringify和parse来处理

	5、获取方式：localStorage：window.localStorage;；sessionStorage：window.sessionStorage;。

	6、应用场景：localStoragese：常用于长期登录（+判断用户是否已登录），适合长期保存在本地的数据。sessionStorage：敏感账号一次性登录；


	WebStorage的优点：

	- （1）存储空间更大：cookie为4KB，而WebStorage是5MB；

	- （2）节省网络流量：WebStorage不会传送到服务器，存储在本地的数据可以直接获取，也不会像cookie一样每次请求都会传送到服务器，所以减少了客户端和服务器端的交互，节省了网络流量；

	- （3）对于那种只需要在用户浏览一组页面期间保存而关闭浏览器后就可以丢弃的数据，sessionStorage会非常方便；

	- （4）快速显示：有的数据存储在WebStorage上，再加上浏览器本身的缓存。获取数据时可以从本地获取会比从服务器端获取快得多，所以速度更快；

	- （5）安全性：WebStorage不会随着HTTP header发送到服务器端，所以安全性相对于cookie来说比较高一些，不会担心截获，但是仍然存在伪造问题；

	- （6）WebStorage提供了一些方法，数据操作比cookie方便；

		- `setItem (key, value)` ——  保存数据，以键值对的方式储存信息。
		
		- `getItem (key)` ——  获取数据，将键值传入，即可获取到对应的value值。
		
		- `removeItem (key)` ——  删除单个数据，根据键值移除对应的信息。
		
		- `clear ()` ——  删除所有的数据。
		
		- `key (index)` —— 获取某个索引的key。


参考资料: [浅谈session,cookie,sessionStorage,localStorage的区别及应用场景](https://www.cnblogs.com/cencenyue/p/7604651.html)


***
<br>


### 如何实现浏览器内多个标签页之间的通信?

**答案:**

调用 localStorge、cookies 等本地存储方式。


方法一:

localStorage在一个标签页里被添加、修改或删除时，都会触发一个storage事件，通过在另一个标签页里监听storage事件，即可得到localStorage存储的值，实现不同标签之间的通信。

```
$("#btn").click(function(){    
    var name=$("#name").val();    
    localStorage.setItem("name", name);   
});

// 另一标签页
window.addEventListener("storage", function(event){    
    console.log(event.key + "=" + event.newValue);    
});
```


方法二：

使用cookie+setInterval，将要传递的信息存储在cookie中，每隔一定时间读取cookie信息，即可随时获取要传递的信息。

```
$("#btn").click(function(){    
    var name=$("#name").val();    
    document.cookie="name="+name;    
});

//另一标签页
function getCookie(key){
	return JSON.parse("{\"" + document.cookie.replace(/;\s+/gim,"\",\"").replace(/=/gim, "\":\"") + "\"}")[key];
}
setInterval(function(){    
    console.log("name=" + getCookie("name"));    
}, 10000);
```



***
<br>


<a name="33">



## 每天一道面试题: 33


### 什么是响应式设计？

**答案:**

它是关于网页制作的过程中让不同的设备有不同的尺寸和不同的功能。
响应式设计是让网站在所有的设备上运行正常。


***
<br>

### Ajax 是什么? 如何创建一个 Ajax？


**答案:**

Ajax全称asynchronous javascript and xml，主要用来实现客户端与服务器端的异步通信效果，实现页面的局部刷新，早期的浏览器并不能原生支持ajax，可以使用隐藏帧(iframe)方式变相实现异步效果，后来的浏览器提供了对ajax的原生支持。

使用ajax原生方式发送请求主要通过XMLHttpRequest（标准浏览器）、ActiveXObject（IE浏览器）对象实现异步通信效果。

```
function createXHR(){
	if (typeof XMLHttpRequest != "undefined"){
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != "undefined"){
		if (typeof arguments.callee.activeXString != "string"){
			var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"], i, len;
			for (i=0,len=versions.length; i < len; i++){
				try {
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				} catch (ex){
					//跳过
				}
			}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	} else {
		throw new Error("No XHR object available.");
	}
}

// 创建XHR对象
var xhr = createXHR();

// 根据readyState变化指定回调函数
xhr.onreadystatechange = function(){};

// 初始化请求
xhr.open();

// 设置http头信息，可以模仿表单提交
xhr.setRequestHeader();

// 发送请求
xhr.send();
```


***
<br>

### 简述Ajax的过程


**答案:**

1. 创建XMLHttpRequest对象，也就是创建一个异步调用对象
2. 创建一个新的HTTP请求（初始化XHR对象），并指定该HTTP请求的方法、URL及验证信息
3. 设置响应HTTP请求状态变化的函数
4. 发送HTTP请求
5. 获取异步调用返回的数据
6. 使用JavaScript和DOM实现局部刷新


***
<br>




<a name="34">



## 每天一道面试题: 34


### 如何解决跨域问题？


**答案:**

跨域: 协议、域名、端口都相同才同域，否则都是跨域。

出于安全考虑，服务器不允许ajax跨域获取数据，但是可以跨域获取文件内容，所以基于这一点，可以动态创建script标签，使用标签的src属性访问js文件的形式获取js脚本，
并且这个js脚本中的内容是函数调用，该函数调用的参数是服务器返回的数据，为了获取这里的参数数据，需要事先在页面中定义回调函数，在回调函数中处理服务器返回的数据。
这是跨域问题的主流解决方案。


***
<br>

### 页面编码和被请求的资源编码如果不一致如何处理？


**答案:**

对于ajax请求传递的参数，如果是get请求方式，参数如果传递中文，在有些浏览器会乱码，不同的浏览器对参数编码的处理方式不同，所以对于get请求的参数需要使用`encodeURIComponent`函数对参数进行编码处理，
后台开发语言都有相应的解码api，所以对于post请求不需要进行编码。



***
<br>


### ajax的缺点


**答案:**

1. Ajax不支持浏览器back按钮
2. 安全问题: Ajax暴露了与服务器交互的细节
3. 对搜索引擎的支持较弱
4. 破坏了程序的异常机制


***
<br>



### 阐述一下异步加载的方式


**答案:**

异步加载的方案:

- 动态插入 script 标签
- 通过 ajax 去获取 js 代码，然后通过 eval 执行
- script 标签上添加 defer 或者 async 属性
- 创建并插入 iframe，让它异步执行 js



***
<br>


<a name="35">



## 每天一道面试题: 35



### 解释JSONP的原理，以及为什么不是真正的Ajax？


**答案:**


JSONP是一种用来跨域获取数据的解决方案，具体是通过动态创建script标签，然后通过标签的src属性获取js文件中的js脚本，
该脚本的内容是一个函数调用，参数就是服务器返回的数据，为了处理这些数据，需要事先在页面定义好回调函数，本质上使用的并不是ajax技术。


详细介绍请见笔记: [JavaScript高级程序设计:JSONP](https://github.com/longyincug/Notebook/blob/master/JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1.md#21d)



***
<br>

### 什么是Ajax和JSON，它们的优缺点是什么？

**答案:**

Ajax全称是asynchronous JavaScript and XML，即异步JavaScript 和 XML，用于在web页面中实现异步数据交互，实现页面局部刷新。

优点: 可以使得页面不重载全部内容的情况下加载局部内容，降低数据传输量，避免用户不断刷新或者跳转页面，提高用户体验。
缺点: 对搜索引擎不友好，要实现ajax下的前后退功能成本较大，可能造成请求数的增加，还有跨域限制。



JSON是一种轻量级的数据交换格式，ECMA的一个子集。

优点: 轻量级、易于人的阅读和编写，便于JS解析，支持复合数据类型，支持多语言，传输速度快。


***
<br>

### 什么是repaint和reflow？


**答案:**


浏览器的运行机制:

1. **构建DOM树(parse)**：渲染引擎解析HTML文档，将标签转换成DOM树中的DOM node（包括js生成的标签），生成内容树(content tree/DOM tree)。

2. **构建渲染树(construct)**：解析对应的css样式文件信息(包括js生成的样式和外部CSS文件)，而这些文件信息以及HTML中可见的指令(如`<b></b>`)，构建渲染树(rendering tree/frame tree)。

3. **布局渲染树(reflow/layout)**：从根节点递归调用，计算每个元素的大小、位置等，给出每个节点所应该在屏幕上出现的精确坐标。

4. **绘制渲染树(paint/repaint)**：遍历渲染树，使用UI后端层来绘制每个节点。


**重绘**(repaint或redraw): 

- 当盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来之后，浏览器便把这些元素都按照各自的特性绘制一遍，将内容呈现在页面上。

- **重绘**是指一个元素外观的改变所触发的浏览器行为，例如改变visibility、outline、背景色等，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。


**重排**(重构/回流/reflow):

- 当渲染树中的一部分或全部，因为元素的规模尺寸，布局，隐藏等改变而需要重新构建，这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候。

- 任何页面布局和几何属性的改变都会触发重排。

- 浏览器窗口尺寸改变也会触发重排。

- 读取某些元素属性也会触发重排！
	- offsetTop, offsetLeft, offsetWidth, offsetHeight
	- scrollTop/Left/Width/Height
	- clientTop/Left/Width/Height
	- getComputedStyle(), or currentStyle in IE



**重绘和重排的关系:**

在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，这个过程就是重绘。

重排必定引发重绘，而重绘不一定引发重排。



**优化:**

重绘和重排会导致浏览器卡慢，需要进行优化。

1. 浏览器自身优化: 浏览器会把一些引起回流、重绘的操作放入一个队列中，等到一定数量或者一定间隔就会进行批处理，这样就让多次回流重绘变成了一次。

2. 减少对渲染树的操作:

	- 对于DOM元素的样式，尽量合并修改，减少对style样式的请求，比如可以直接改变元素的className。

	- 尽量不要在布局信息改变时做查询，会导致渲染队列强制刷新。

	- 如果要批量添加DOM，可以先让元素脱离文档流，操作完后再带入文档流，这样只会触发一次回流，可以使用fragment元素。

	- 将需要多次重排的元素，比如动画效果的元素，设置为绝对定位，让其脱离文档流，不影响其他元素。



***
<br>


<a name="36">



## 每天一道面试题: 36

### CSS3有哪些新特性？


**答案:**

1. 实现了圆角(border-radius)、阴影(box-shadow)
2. 文字特效(text-shadow)、渐变(gradient)
3. 变形(transform)、过渡(transition)和动画(animation)
4. 增加了更多的CSS选择器，以及多背景、rgba
5. 媒体查询、多栏布局


***
<br>

### CSS实现：一个矩形内容，有投影，有圆角，hover状态慢慢变透明


**答案:**

```
div {width: 200px;height: 100px;border-radius: 10px;box-shadow: 10px 10px 5px #888888; background-color: green;transition: 0.7s; }  
div:hover {opacity: 0;}
   
```


***
<br>

### 用CSS写一个简单的幻灯片


**答案:**


方法一: 使用`display`和`checked`
```
<style>
    img {
      display: none;
      width: 100px;
      height: 100px;
    }
 
    input:checked + img {
      display: block;
    }
 
    input {
      position: absolute; // 当然也可以display:none
      left: -9999px;
    }
 
    label {
      cursor: pointer;
    }
</style>

<div>
	<input id="img1" name="img" type="radio" checked="checked">
	<img src="a.png">
	<input id="img2" name="img" type="radio">
	<img src="b.png">
</div>
<div id="nav">
	<label for="img1">第一张</label>
	<label for="img2">第二张</label>
</div>
```


方法二: 使用`z-index`和`target`
```
#cont {
	position: relative;
	height: 100px;
}
img {
	position: absolute;
	width: 100px;
	height: 100px;
	z-index: 1;
}
img:first-child,
img:target {
	z-index: 2;
}

<div id="cont">
	<img id="img1" src="a.jpg">
	<img id="img2" src="b.jpg">
</div>
<div>
	<a href="#img1">one</a>
	<a href="#img2">two</a>
</div>
```


方法三: 还可以利用CSS3的动画效果实现

```
.items {
	-webkit-animation: slider 15s linear infinite alternate;
	animation: slider 15s linear infinite alternate;
}

@-webkit-keyframes slider {
	0% {background-image: url(1.jpg);}
	25% {background-image: url(2.jpg);}
	50% {background-image: url(3.jpg);}
	75% {background-image: url(4.jpg);}
	100% {background-image: url(5.jpg);}
}

@keyframes slider {
	0% {background-image: url(1.jpg);}
	25% {background-image: url(2.jpg);}
	50% {background-image: url(3.jpg);}
	75% {background-image: url(4.jpg);}
	100% {background-image: url(5.jpg);}
}
```



***
<br>


<a name="37">


## 每天一道面试题: 37


### 一个页面从输入URL到页面加载显示完成，发生了什么？


**答案:**


以访问百度为例。

1. 先解析出baidu.com对应的ip地址
	1. 先知道默认网关的mac
		1. 使用arp获取默认网关的mac地址
	2. 组织数据 发送给默认网关（ip还是dns服务器的ip，但是mac地址是默认网关的mac地址）
	3. 默认网关拥有转发数据的能力，把数据转发给路由器
	4. 路由器根据自己的路由协议，来选择一个合适的较快的路径，转发数据给目的网关。
	5. 目的网关（dns服务器所在网关）把数据转发给dns服务器
	6. dns服务器查询解析出baidu.com对应的ip地址，并把它原路返回给请求这个域名的client
2. 得到了baidu.com对应的ip地址之后，会发送tcp的3次握手，进行连接
3. 使用http协议发送请求数据给web服务器
4. web服务器收到数据之后，通过查询自己的服务器得到相应的结果，原路返回给浏览器
5. 浏览器接收到数据后，通过浏览器自己的渲染功能来显示这个网页
6. 浏览器关闭tcp链接，即4次挥手




***
<br>

### HTTP 协议中 ， header信息里面，怎么控制页面失效时间（last-modified,cache-control,Expires 分别代表什么）


**答案:**

`Expires`、`Cache-Control`、`Last-Modified`、`ETag`都是在http response的返回header中用来控制浏览器客户端缓存行为的。


1. 当某一个web资源被访问后，会被浏览器缓存，在以后对相同资源再次访问的时候浏览器会检查缓存是否过期。

	- `Expires`在HTTP/1.0中已经定义，`Cache-Control:max-age=xxx`在HTTP/1.1中才有定义，为了向下兼容，仅使用max-age不够。
	
		- `Expires`指定的值为日期，在指定的日期到达之前再次访问则认为缓存有效。
		- `max-age`指定的值为多少秒，距第一次访问多少秒后再次访问则认为缓存有效。
		- 这些时候是不会发生网络请求的。
	
	- `Last-Modified` 的值为一个日期，是资源最近一次修改的时间。

	- `ETag` 的值为服务器对请求的资源的内容按照hash算法计算的一个值，当内容发生改变的时候，这个值会相应的改变。


2. `Expires`和`Cache-Control`控制浏览器是否做缓存，如果缓存，缓存的有效期为多久。

	- `Expires`值为-1和0不缓存。
	
	- `Cache-Control`的值为`no-cache`时不缓存。
	
	- `Last-Modified`和`ETag`是**在缓存过期后到服务器做验证的时候的比较值**。`Last-Modified`只能精确到秒级别，如果要到毫秒级别，就要用`ETag`。


3. 当缓存过期后，浏览器会向服务器发送请求。

	这时候request header会带上`If-Modified-Since`和`If-None-Match`参数。
	
	- `If-Modified-Since`的值为缓存中最初收到的`Last-Modified`的值。
	- `If-None-Match`的值为缓存中最初收到的`ETag`的值。
	
	如果最初的返回中没有`Last-Modified`和`ETag`的值则不会带上这个请求参数。

	服务器收到后会“验证”，如果相同则返回一个`304 Not Modified`响应，不会将内容再传一次，节省了带宽。

	场景：
	- 访问的时间在`Expires`日期之后或者`max-age`指定的时间之后
	- 用户按F5刷新


还有一种情况是用户按`CTRL+F5`, 这时候浏览器会在请求头中带上
`Pragma`参数，值为`no-cache`,同时在request header中去掉`If-Modified-Since`和`If-None-Match`。
服务器收到请求后会将内容重新传给浏览器，不管内容是否变化，就像是浏览器第一次请求一样。
响应码是`200 ok`。



***
<br>




<a name="38">



## 每天一道面试题: 38


### 实现一个函数clone，可以对JS中的5种主要的数据类型(包括Number、String、Object、Array、Boolean)进行值复制


**答案:**

```
Object.prototype.clone = function(){
	var o = this.constructor === Array ? []:{};
	for(var i in this){
		o[i] = typeof this[i] === "object" ? this[i].clone() : this[i];
	}
	return o;
};
```


**实现对象深拷贝的函数:**

```
function deepCopy(p, o){
	var o = o || {};
	for(var i in p){
		if(p.hasOwnProperty(i)){
			if(typeof p[i] == "object"){
				o[i] = Array.isArray(p[i]) ? [] : {};
				deepCopy(p[i], o[i]);
			} else {
				o[i] = p[i];
			}
		}
	}
	return o;
}
```


***
<br>

### 小贤是一条可爱的小狗(Dog)，它的叫声很好听(wow)，每次看到主人的时候就会乖乖叫一声(yelp)。从这段描述可以得到以下对象：

```
function Dog() {
	this.wow = function() {
		alert('Wow');
	}
	this.yelp = function() {
		this.wow();
	}
}
```
小芒和小贤一样，原来也是一条可爱的小狗，可是突然有一天疯了(MadDog)，一看到人就会
每隔半秒叫一声(wow)地不停叫唤(yelp)。请根据描述，按示例的形式用代码来实现。（继承，
原型，setInterval）


**答案:**

```
function MadDog(){
	this.yelp = function(){
		var self = this;
		setInterval(function(){
			self.wow();
		}, 500);
	};
}

MadDog.prototype = new Dog();

// for test
var dog = new Dog();
dog.yelp();
var madDog = new MadDog();
madDog.yelp();
```


***
<br>


<a name="39">



## 每天一道面试题: 39


### 如何用原生js实现jq的ready方法？


**答案:**

```
function ready(fn){
	if(document.addEventListener) {
		document.addEventListener("DOMContentLoaded", function(){
			document.removeEventListener("DOMContentLoaded", arguments.callee, false); // 注销事件，避免反复触发
			fn(); // 执行函数
		}, false);
	} else if(document.attachEvent) {
		document.attachEvent('onreadystatechange', function(){
			if(document.readyState == "complete") {
				document.detachEvent('onreadystatechange', arguments.callee);
				fn(); // 函数执行
			}
		});
	}
}
```


***
<br>

### 说出以下函数的作用是？空白区域应该填写什么？

```
//define
(function(window){
	function fn(str){
		this.str=str;
	}
	fn.prototype.format = function(){
		var arg = ____;
		return this.str.replace(____,function(a,b){
			return arg[b]||"";
		});
	}
	window.fn = fn;
	})(window);

//use
(function(){
	var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>');
	console.log(t.format('http://www.alibaba.com','Alibaba','Welcome'));
})();
```


**答案:**

该函数的作用是使用format函数，用函数的参数替换掉{0}这样的内容，返回一个格式化后的结果。

第一个空是arguments，第二个空是`/\{(\d+)\}/ig`


***
<br>


<a name="40">



## 每天一道面试题: 40


### AMD和CMD规范区别？


**答案:**


理解这两种规范的差异，主要通过`requirejs`与`seajs`两个模块加载器的对比，理解模块的定义与引用方式的差异及这两种规范的设计原则。

AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。

CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。

类似的还有 CommonJS Modules/2.0 规范，是 BravoJS 在推广过程中对模块定义的规范化产出。还有不少⋯⋯

这些规范的目的都是为了 JavaScript 的模块化开发，特别是在浏览器端的。目前这些规范的实现都能达成**浏览器端模块化开发**的目的。


区别：
1. 对于依赖的模块，AMD 是**提前执行**，CMD 是**延迟执行**。
	不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.

2. CMD 推崇**依赖就近**，AMD 推崇**依赖前置**。

	看代码：
	
	```
	// CMD
	define(function(require, exports, module) {  
		var a = require('./a')   
		a.doSomething()   
		// 此处略去 100 行   
		var b = require('./b') // 依赖可以就近书写
		b.doSomething()   
		// ... 
	})
	
	// AMD 默认推荐的是
	
	define(['./a', './b'], function(a, b) {  
		// 依赖必须一开始就写好    
		a.doSomething()    
		// 此处略去 100 行
		b.doSomething()
	    ...
	})
	```

	但AMD也支持CMD的写法，还支持将require作为依赖项传递。


模块化带来的好处:
1. 通过exports暴露接口，这意味着不需要命名空间了，也不需要全局变量，这是一种彻底的命名冲突解决方案。
2. 通过require引入依赖，这可以让依赖内置，开发者只需关心当前模块的依赖，其他事情在框架内部都会自动处理好。


关于模块化，详细请看: [前端模块化和AMD、CMD](https://blog.csdn.net/jackwen110200/article/details/52105493)



***
<br>

<a name="41">


## 每天一道面试题: 41


### 用CSS分别实现以下需求的布局


1. 高度自适应。

2. 三列布局，中间宽度自适应，两边定宽；中间栏要在浏览器中优先展示渲染。

3. 左栏定宽右栏自适应。

4. 宽度自适应，且宽高比一定的矩形。

5. 分栏自动与盒子中最高栏等高。


**答案:**

1. 高度自适应一个需要注意的问题就是: 如果是body下的元素，一定记得给`body`和`html`同时设置`height`为100%，以解决浏览器的兼容问题。

2. 这是一个典型的圣杯布局，当然双飞翼布局也类似这个效果。[圣杯布局](./demos/圣杯布局.html)，[双飞翼布局](./demos/双飞翼布局.html)

3. 给左栏设置浮动或绝对定位脱离文档流，定宽，右栏依旧独占整行，左栏会覆盖在右栏上，所以还需给右栏设置一个`margin-left`为左栏的宽度。

4. 这个需要利用一个小技巧，让高度和宽度连上关系:`padding`属性值的百分比是以宽度为基准的，所以可以设置高度为0，让矩形以`padding-bottom`填充。

5. 这个需要小技巧:设置需要自适应高度的盒子`margin-bottom`为`-3000px`(一个页面不会超过的高度)，同时设置`padding-bottom`为`3000px`。


示例代码仅供参考: [demos](https://github.com/longyincug/Notebook/tree/master/demos)









