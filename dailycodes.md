# 每天一道面试题

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

```
var a={n:1}; //创建对象{n:1}，赋值给a
var b=a; //b引用a的对象，实际上此时内存只有一个对象。变量a，b同时指向这个对象
a.x=a={n:2}; //此时将这个对象的键值x赋值，赋值内容是运算表达式a={n:2}的运算结果{n:2}
			//a={n:2}这个运算表达式又创建了一个对象{n:2}，同时让a指向这个对象
			//此时内存中有两个对象 a指向于新的对象{n:2}，b指向于原对象{n:1,x:{n:2}}
console.log(a); // {n:2}
console.log(b); // {n:1, x:{n:2}}
console.log(a.x); // undefined
console.log(b.x); // {n:2}
```
**另一种解释:**

由于 . 运算符优先级高于= , 所以先给{n:1}对象创建了x属性，对象变成{n:1,x:undefined}(当前a和b都是指向此内存对象)， 
然后连等从右往左执行，先把a指向改成{n:2}，然后把最初的内存对象的x属性指向改成{n:2}(因为.运算符已执行，所以此时a.x是指{n:1,x:undefined}的x属性)，内存对象变成{n:1,x:{n:2}}
此时只有b还是指向这个内存对象  所以:
a.x  -->undefined
b -->{n:1,x:{n:2}}
