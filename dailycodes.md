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

<a name="61">

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

ps:bind(obj, *args)方法返回的是一个柯里化的函数，所以可以接受后面的参数作为func的实参

关于bind详情看:[bind的用法](#91)

**还有一种解法, 不用闭包:**
```
var num;
var timer = setTimeout(function func(){
	
	console.log(num++);
	if(num<10){
		setTimeout(func, 1000);
	}
}, 1000);

```


***

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

而数组与字符串""做加法运算输出，会将数组中除中括号外的字符全部打印出来

***

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

解决方式原理请参考: [每天一道面试题: 6](#61)

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

**在 JavaScript，常见的 false 值:**
`0, '0', +0, -0, false, '', null, undefined, null, NaN`

要注意**空数组([])**和**空对象({})**:
```
console.log([] == false) //true
console.log({} == false) //false
console.log(Boolean([])) //true
console.log(Boolean({})) //true
```
所以在 if 中，[] 和 {} 都表现为 true

***

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

<a name="9">

## 每天一道面试题: 9

<a name="91">

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



