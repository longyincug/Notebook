# 元素透明
可以设置背景色，`rgba(0, 0, 0, 0.5)` 第四个参数是透明度, 但是不支持IE8

IE8可以用`filter: alpha(opacity=50)`来替代

`opacity: 0.5` 和 `rgba()`的区别:

opacity属性作用于元素,以及元素内的所有内容的透明度, 
而rgba()只作用于元素的颜色或其背景色。

<br>

# 浮动
1. 浮动在父元素盒子里面,是不会超过内边距的边框的范围
2. 如果子盒子有一个浮动了,其余的子盒子都应该浮动
3. 默认的隐式转换: **行内块元素**


## 清除浮动

如果清除了浮动，父元素自动检测孩子的高度，以最高的为准

## 清除浮动的方法(`clear: both;`)

额外标签法
- 最后一个元素的后面额外添加一个元素，并设置清除浮动
- 是W3C推荐的做法
- 添加了许多无意义的标签，结构化较差

父级添加overflow属性方法
- 给**父元素**设置`overflow: hidden;`

使用after伪元素清除浮动
```
.clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
```

使用before和after双伪元素清除浮动
	
```
.clearfix:before, .clearfix:after {
    content: "";
    display: table;
}

.clearfix:after {
	clear: both;
}

.clearfix {
	*zoom: 1;
}
```

<br>

# 定位模式转换

- 跟浮动一样，元素添加了绝对定位和固定定位以后，元素模式会发生转换，都转换为**行内块模式**

- 行内块的宽度和高度跟内容有关系

- 因此行内元素如果添加了绝对定位或者固定定位或者浮动后，可以不用转换模式，直接给高度、宽度即可


## 开启了绝对定位的盒子居中

```
left: 50%;
top: 50%;
margin-top: -50px; //盒子高度100px
margin-left: -50px; //盒子宽度100px
```
或者使用`transform: translate(-50%, -50%)` 来让自身偏移到中央位置。


<br>

# z-index层级

在CSS中，要想调整重叠定位元素的堆叠顺序，可以对定位元素应用z-index层叠等级属性，其取值可为**正整数**、**负整数**和**0**，没有单位。

**注意**
1. z-index的默认属性是0，取值越大，定位元素在层叠元素中越居上
2. 如果取值相同，则根据书写顺序，后来居上
3. 后面数字一定不能加单位
4. 只有相对定位，绝对定位，固定定位有此属性，其余标准流，浮动，静态属性都无此属性，亦不可指定此属性
5. 如果z-index为1，则比（没有设置z-index的）定位元素层级都高；z-index为-1，则一定比（没有设置z-index的）定位元素层级低

## 多个盒子重叠设置hover

```
div {
    width: 250px;
    height: 400px;
    border: 1px solid #ccc;
    float: left;
    margin-left: -1px;
}
```

这样几个盒子的边框会被彼此压住，如果要设置hover时边框高亮，可能不能达到效果。

可以这样设置：
```
div:hover {
    border: 1px solid #f40;
    position: relative; //相对定位比标准流高一级，浮在上面，就不会被盖住边框
}
```
同理，如果div是relative，就在hover中加上z-index
```
div:hover {
    border: 1px solid #f40;
    z-index: 1; //保证层级较高
}
```

<br>

# 元素的显示与隐藏

## display显示

用来设置或检索对象是否及如何显示

`display: none` 隐藏对象, 与它相反的是`display:block` 除了转换为块级元素之外，同时还有显示元素的意思

特点：隐藏之后，**不再保留位置**

## visibility可见性

设置或检索是否显示对象

**visible**: 对象可视

**hidden**： 对象隐藏

特点：隐藏之后，**继续保留原有位置**

## overflow溢出

检索或设置当对象的内容超过其指定高度及宽度时如何管理内容

**visible**：不剪切也不添加滚动条，默认属性

**auto**：超出自动显示滚动条，不超出不显示滚动条

**scroll**：总是显示滚动条

**hidden**：隐藏溢出内容


## 仿视频播放暂停界面透明蒙版

html结构：
```
<a href="#">
	<img src="images/tudou.jpg" />
	<div class="mask"></div>
</a>
```

CSS样式：
```
a {
    display: block;
    width: 448px;
    height: 252px;
    margin: 100px;
    position: relative;
}
.mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4) url(images/arr.png) no-repeat center;
    position: absolute;
    top: 0;
    left: 0;
    display: none; //正常情况下，灰色蒙版是隐藏的
}
// 注意！什么时候出来蒙版？鼠标放到a上，a里面的mask显示出来

a:hover .mask {
    display: block; //显示出来
}
```

<br>

# 鼠标样式 cursor

设置或检索在对象上移动的鼠标指针采用何种系统预定义的光标形状
```
cursor: default | pointer | move | text
```

<br>

# 轮廓线outline

`outline`是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用

```
outline: outline-color || outline-style || outline-width
```
但是我们都不关心可以设置多少，我们平时都是去掉的
```
input {
    outline: none; //清除轮廓线
    border: 1px solid #ccc; //不同浏览器默认边框不同，统一指定
}
```

<br>

# 防止拖拽文本域resize

`resize: none;` 可以防止火狐、谷歌等浏览器随意的拖动文本域`textarea`。

<br>

# vertical-align

设置或检索内容的垂直对齐方式, 该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。

```
vertical-align: baseline | top | middle | bottom
```

`vertical-align` 不影响块级元素中的内容对齐，它只针对于行内元素或者行内块元素，特别是行内块元素，通常用来控制图片/表单与文字的对齐

所以我们知道，可以通过`vertical-align`控制图片和文字的垂直关系，默认的图片会和文字基线对齐

## 去除图片底侧空白缝隙

有个很重要的特性要记住：图片或者表单等行内块元素，他的底线会和父级盒子的基线对齐，这样会造成一个问题，就是图片底侧会有一个空白缝隙。

解决的方法就是：
1. 给img设置 ` vertical-align: middle | top` 等，让图片不要和基线对齐
    ```
    img {
        vertical-align: top;
        border: 0;
    }
    ```

2. 给img添加 `display: block;` 转换为块级元素，就不会存在问题了
    ```
    img {
        display: block;
        border: 0;
    }
    ```

## 实现一张图片的垂直居中

```
body,html{
    height: 100%;
}
body:after{
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
img{
    vertical-align: middle;
}
```

该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。假设有两个行内块元素a和b，
当a加了一个`vertical-align:middle`样式之后，b的底部（基线）就会对齐a的中间位置。
如果a和b都加了一个`vertical-align:middle`样式，那么就互相对齐了对方的中间位置，也就是它们在垂直方向上的中线对齐了。


<br>

# 溢出的文字隐藏

## white-space

white-space设置或检索对象内文本显示方式，通常我们使用于强制一行显示内容

- normal：默认处理

- nowrap：强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行

可以处理中文

## text-overflow 文字溢出

text-overflow: clip | ellipsis

设置或检索是否使用一个省略标记（···）表示对象内文本的溢出

- clip：不显示省略标记（···），而是简单的裁切

- ellipsis：当对象内文本溢出时显示省略标记（···）

注意若要强制一行内显示，溢出用省略号代替，需要再次和`overflow`属性搭配使用，三个属性缺一不可
```
li {
	list-style: none;
	width: 200px;
    height: 30px;
    border: 1px solid pink;
    white-space: nowrap; //1.强制一行内显示文本
    overflow: hidden; //2.超出的部分隐藏
    text-overflow: ellipsis; //3.溢出的部分用省略号代替
    line-height: 30px;
}
```

<br>

# 自定义字体及字体图标

`@font-face`: 允许网页开发者为其网页指定在线字体，通过这种作者自备字体的方式，可以消除对用户电脑字体的依赖。

自定义字体，有两个属性必须要指定，`font-family`所指定的字体名字将会被用于`font-family`属性，`src`用来引用字体资源。

如：
```
<style>
    @font-face {
        font-family: "MyFont";
        src: url(fonts/demo.TTF);
        font-weight: normal;
        font-style: normal;
    }
</style>
```

当自定义完字体后，就可以在元素内使用该字体图标，并指定元素的`font-family`为事先定义的值。

由于不同浏览器支持的格式不同，字体资源文件的格式可能是`ttf/eot/svg/woff`等。

常见的字体图标网站：[icomoon](https://icomoon.io/app/#/select)、[阿里巴巴矢量图标库](http://www.iconfont.cn/)

<br>

# IE6下的fixed失效问题

在IE6下，`position: fixed`不会生效，元素依旧会随着滚动条而滚动，我们可以用`position: absolute`来模拟`fixed`的效果。

## overflow的滚动条归属问题

当只设置`html`或`body`其中一个`overflow`时，都会作用到`document`上，滚动条的归属也是如此；

如果同时设置两个的`overflow`，`html`的`overflow`会作用到`document`，而`body`的`overflow`会作用到自身。值都为`scroll`时，可以看到页面会出现两个滚动条，一个属于`body`，一个属于`document`。


## 绝对定位中的包含块

依据[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)文档中对`position: absolute`的解释，绝对定位元素相对于最近的非 `static` 祖先元素定位，当这样的祖先元素不存在时，则相对于`ICB`（inital container block, 初始包含块）进行定位。

什么是**包含块**？根据CSS2.1官方文档：

> 一个元素的盒子的位置和尺寸根据一个确定的矩形计算，这个确定的矩形叫做这个元素的包含块。
> 根元素所在的包含块叫做初始包含块。
> 对于连续媒体设备，初始包含块的大小等于视口`viewport`的大小，基点在画布的原点(视口左上角)；对于分页媒体，初始包含块是页面区域。

## 模拟fixed的效果

```html
html{
    height: 100%; //这是浏览器视口的高度
    overflow: hidden;
}
body{
    height: 100%; //这是浏览器视口的高度
    overflow: auto;
}
#fixed{
    position: absolute;
    left: 50px;
    top: 50px;
    width: 100px;
    height: 100px;
    background-color: green;
}

<body>
    <div id="fixed"><div>
    <div style='height: 1000px;'>这是一个可以滚动的div<div>
</body>
```

上方的代码，将`document`的滚动条禁用，并开启了`body`的滚动条。

此时`body`的高度等于视口的高度，而且`body`内会出现一个滚动条，在滚动的时候实际上是`height`为`1000px`的`div`中的内容滚动。

**而`id`为`fixed`的`div`由于没有开启定位的祖先元素，会始终依据初始包含块来偏移，又因为`html`的`overflow`为`hidden`，`document`没有滚动条，初始包含块的位置不会变化，也不受`body`的滚动条影响，所以依据其定位的`div`不会随滚动条而滚动，这样就实现了`fixed`的效果。**

尽管现在基本已经不需要考虑IE6的兼容性问题了，但这种解决思路还是值得学习，并且在移动端也时常会应用到。

***

<br>


# 深入理解BFC原理及其在布局中的应用

<br>

## 谈谈你对盒模型的理解？

当面试官问到这个问题，如果你只说出**W3C标准盒模型**和**IE盒模型**:

> 标准盒模型中，`width`和`height`等于内容区(`content`)的宽高；
> 而IE盒模型中，`width`和`height`等于`content`+`padding`+`border`的总宽高。

这个答案显然是不够的。

要是你能稍微扩展一点，说出**CSS3中对盒模型的类型设置属性**:

- `box-sizing: content-box;` —— 标准盒模型

- `box-sizing: border-box;` —— IE盒模型


同时联想到**js中对盒模型属性的一些操作**:

- 读取元素的内联样式属性及修改元素的样式属性 —— `元素.style.样式名` / `元素.style.样式名 = 样式值`

- 获取元素的当前样式对象 —— `元素.currentStyle` / `getComputedStyle(元素, null)`

- 读取元素的可见宽度和高度(content+padding) —— `元素.clientWidth` / `元素.clientHeight`

- 读取元素的整个宽度和高度(content+padding+border) —— `元素.offsetWidth` / `元素.offsetHeight`

这就应该是一个比较好的回答了。

当然，如果你还能充分延伸，再多说一些:

**盒模型 ——> block-level box的渲染 ——> BFC渲染规则**

那真是极好的。


<br>

## `Box`和`Formatting Context`

`Box`是CSS布局的对象和基本单位，一个页面就是由很多个`Box`组成的。

元素的类型和`display`属性，决定了这个`Box`的类型，不同类型的`Box`会参与不同的`Formatting Context`(一个决定如何渲染文档的容器)，因此不同类型的`Box`内部会有不同的渲染规则。

最常见的有两种盒子:

- `block-level box`:

    `display`属性为`block/list-item/table`的元素，会生成`block-level box`，并且参与`block formatting context`。

- `inline-level box`:

    `display`属性为`inline/inline-block/inline-table`的元素，会生成`inline-level box`，并且参与`inline formatting context`。


什么是`Formatting Context`:

> CSS2.1规范中的一个概念，它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。
> 最常见的`Formatting Context`有`Block Formatting Context`(简称BFC)和`Inline Formatting Context`(简称IFC)。
> 由于IFC在各浏览器有不同的实现和规则，我们一般只考虑BFC。


<br>

## BFC渲染规则

BFC直译为块级格式化上下文，它是一个独立的渲染区域，只有`block-level box`参与，它规定了内部的盒子如何布局，并且与这个区域的外部毫不相干。

1. 内部的盒子会在垂直方向一个接一个的放置。

2. BFC的区域不会与浮动的盒子重叠。

3. 内部的Box垂直方向的距离由`margin`决定，属于**同一个**BFC的两个**相邻**的Box，**垂直**方向上`margin`会发生重叠。

4. 计算BFC的高度时，浮动元素也参与计算。


### BFC渲染规则在布局中的应用

1. 第一条规则自不用多说，块级盒子独占一行，垂直方向一个接一个放置。

2. 利用第二条规则，可以很轻松地实现两列布局，只需要让右栏生成BFC:[左栏定宽右栏自适应](https://github.com/longyincug/Notebook/tree/master/demos/左栏定宽右栏自适应2.html)。

3. 由于垂直方向`margin`重叠，上下两个兄弟box的`margin`会取较大值，推荐的解决方案是在其中一个box的外层加一个`div`并让其开启BFC，这样两个box就不相干了:[兄弟盒子margin重叠](https://github.com/longyincug/Notebook/tree/master/demos/兄弟盒子margin重叠.html)。

    还有一个垂直方向`margin`重叠的情况，是父子box的`margin`传递，当同一个BFC中的父子盒子相邻时，给子盒子设置的上外边距，会传递，变成父盒子的外边距:[父子盒子margin传递](https://github.com/longyincug/Notebook/tree/master/demos/父子盒子margin传递.html)

<br>

## BFC什么时候出现(哪些元素会生成BFC)

- 根元素

- `float`属性不为`none`

- `position`属性为`absolute`或`fixed`

- `overflow`属性不为`visible`

- `display`为`inline-block/table-cell/table-caption/flex/inline-flex`
























