### 元素透明
可以设置背景色，`rgba(0, 0, 0, 0.5)` 第四个参数是透明度

### 浮动元素外边距
浮动的元素如li，相邻水平外边距是求和, 而不是取最大值

### 浮动
1. 浮动在父元素盒子里面,是不会超过内边距的边框的范围
2. 如果子盒子有一个浮动了,其余的子盒子都应该浮动
3. 默认的隐式转换: **行内块元素**

### 清除浮动
- 如果清除了浮动，父元素自动检测孩子的高度，以最高的为准

### 清除浮动的方法(`clear: both;`)
- 额外标签法
	- 最后一个元素的后面额外添加一个元素，并设置清除浮动
	- 是W3C推荐的做法
	- 添加了许多无意义的标签，结构化较差
- 父级添加overflow属性方法
	- 给**父元素**设置`overflow: hidden;`
- 使用after伪元素清除浮动
```
.clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
```

- 使用before和after双伪元素清除浮动
	
```
.clearfix:before, .clearfix:after {
    content: "";
    display: table; // 这句话可以触发BFC, BFC可以清除浮动
}

.clearfix:after {
	clear: both;
}

.clearfix {
	*zoom: 1;
}
```

### 定位模式转换
- 跟浮动一样，元素添加了绝对定位和固定定位以后，元素模式会发生转换，都转换为**行内块模式**
- 行内块的宽度和高度跟内容有关系
- 因此行内元素如果添加了绝对定位或者固定定位或者浮动后，可以不用转换模式，直接给高度、宽度即可


### 开启了绝对定位的盒子居中
```
left: 50%;
margin-left: -50px; //盒子宽度100px
```

### banner切换按钮
相同的写到一起，特别的单独写
```
.banner a {
    width: 24px;
    height: 36px;
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -18px;
}
.left {
    left: 0;
}
.right {
    right: 0;
}

```

### z-index层级
在CSS中，要想调整重叠定位元素的堆叠顺序，可以对定位元素应用z-index层叠等级属性，其取值可为正整数、负整数和0，没有单位

**注意**
1. z-index的默认属性是0，取值越大，定位元素在层叠元素中越居上
2. 如果取值相同，则根据书写顺序，后来居上
3. 后面数字一定不能加单位
4. 只有相对定位，绝对定位，固定定位有此属性，其余标准流，浮动，静态属性都无此属性，亦不可指定此属性

### 多个盒子重叠设置hover
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

### 元素的显示与隐藏

#### display显示
`display: none; //隐藏某个元素，display: block; 显示某个元素`
用来设置或检索对象是否及如何显示

`display: none` 隐藏对象, 与它相反的是`display:block` 除了转换为块级元素之外，同时还有显示元素的意思

特点：隐藏之后，**不再保留位置**

#### visibility可见性

设置或检索是否显示对象

**visible**: 对象可视

**hidden**： 对象隐藏

特点：隐藏之后，**继续保留原有位置**

#### overflow溢出
检索或设置当对象的内容超过其指定高度及宽度时如何管理内容

**visible**：不剪切也不添加滚动条

**auto**：超出自动显示滚动条，不超出不显示滚动条

**scroll**：总是显示滚动条

**hidden**：隐藏溢出内容


### 仿视频播放暂停界面透明蒙版

html结构
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
// 注意！什么时候出来蒙版？鼠标放到a上，a里面的mask显示出来，使用后代选择器
a:hover .mask {
    display: block; //显示出来
}
```

### 鼠标样式 cursor

设置或检索在对象上移动的鼠标指针采用何种系统预定义的光标形状
```
cursor: default | pointer | move | text
```

### 轮廓线outline
是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用
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

### 防止拖拽文本域resize
`resize: none;` 可以防止火狐、谷歌等浏览器随意的拖动文本域`textarea`


### vertical-align
设置或检索内容的垂直对齐方式
```
vertical-align: baseline | top | middle | bottom
```
vertical-align 不影响块级元素中的内容对齐，它只针对于行内元素或者行内块元素，特别是行内块元素，通常用来控制图片/表单与文字的对齐

所以我们知道，可以通过`vertical-align`控制图片和文字的垂直关系，默认的图片会和文字基线对齐

#### 去除图片底侧空白缝隙
有个很重要的特性要记住：图片或者表单等行内块元素，他的底线会和父级盒子的基线对齐，这样会造成一个问题，就是图片底侧会有一个空白缝隙

解决的方法就是：
1. 给img设置 ` vertical-align: middle | top` 等，让图片不要和基线对齐
```
//网易的解决方案：
img {
    vertical-align: top;
    border: 0;
}
```
2. 给img添加 `display: block;` 转换为块级元素，就不会存在问题了
```
//新浪的解决方案：
img {
    display: block;
    border: 0;
}
```

### 溢出的文字隐藏

#### white-space
white-space设置或检索对象内文本显示方式，通常我们使用于强制一行显示内容

- normal：默认处理
- owrap：强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行

可以处理中文

#### text-overflow 文字溢出
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






