# MongoDB常用语法及基本使用

`MongoDB`中的三个概念：

- **数据库**(database): 一个仓库，在其中可以存放集合。

- **集合**(collection): 概念相当于`MySQL`中的表，类似于一个数组，在集合中可以存放文档。

- **文档**(document): 文档是数据库中的最小单位，我们存储和操作的内容都是文档。

**注意**：在`MongoDB`中，数据库和集合都不需要手动创建，当我们创建文档时，如果文档所在的集合或数据库不存在会自动创建数据库和集合。

我们可以使用一些图形化界面工具来帮助我们操作`MongoDB`，如：[NoSQL Manager for MongoDB](https://www.mongodbmanager.com/download)。

![mongodb_manager](https://img-blog.csdn.net/20180609223049806?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xvbmd5aW4wNTI4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


## 1. 基本指令

- `show dbs/databases`: 查看当前所有的数据库

- `use (数据库名)`: 进入到指定的数据库中

- `db`: 显示当前所处的数据库

- `show collections`: 显示当前数据库中所有的集合

<br>

## 2. MongoDB的CRUD(增删改查)操作

<br>
### 2.1 插入: `db.<collection>.insert(doc)`

向数据库的指定集合中插入一个或多个文档

例如: 

- `db.stu.insert({name:'Tom', age:18, gender:'male'})`
    
- `db.stu.insert([{name:'Jerry', age:18, gender:'male'},{name:'Herry',age:20,gender:'female'}])`
    
如果插入时没有给文档指定`_id`属性，则数据库会自动为文档添加`_id`属性（ObjectId）

相关方法:

- `db.<collection>.insertOne()` —— 插入一个文档对象

- `db.<collection>.insertMany()` —— 插入多个文档对象

如何插入10000条数据？

- 可以用`for`循环:
        
	```
        for(var i=0; i<10000; i++){
            db.numbers.insert({num:i});
        }
	```
- 但是要注意效率与性能问题：尽量减少对数据库的操作！

	```
	 var arr = [];
	 for(var i=0; i<10000; i++){
	     arr.push({num:i});
	 }
	 db.numbers.insert(arr);
	```

<br/>

### 2.2 查询: `db.<collection>.find()`

查询集合中的所有文档，返回的是一个**数组**。

例: `db.stu.find()`

可以接收一个对象作为条件参数，表示查询符合条件的文档，`{}`表示查询所有。

例: `db.stu.find({age:20})`

支持通过内嵌文档的属性进行查询，通过`.`来匹配，注意属性名必须加引号！

例: `db.stu.find({'hobby.movies':'comedy'})`

**并不是说属性值一定要等于该值，如果属性值是一个数组，只要数组中包含该值即可！**

相关方法:

- `db.<collection>.findOne()` —— 查询集合中符合条件的第一个文档，返回的是一个**文档对象**。

- `db.<collection>.find({}).count()` —— 查询集合中符合条件的文档的数量，返回一个数值。

- `db.<collection>.find({}).limit(10)` —— 设置返回查询的数据的上限。

- `db.<collection>.find({}).skip(10).limit(10)` —— 返回第11条到第20条数据。

- `db.<collection>.find({}).sort({num:1, age:-1})` —— 传递一个对象来指定排序规则，`1`表示升序，`-1`表示降序

- `MongoDB`会自动调整`sort`、`skip`和`limit`的位置，谁写前谁写后并无大碍。

- `distinct()`对数据进行去重: `db.stu.distinct('class',{age:{$gt:18}})` —— 查找年龄大于18的人的班级（去重）

**投影**:

- 在做查询时，可以在第二个参数设置查询结果的投影，`1`表示显示，`0`表示不显示。

- `db.<collection>.find({}, {name:1})` —— 显示该集合文档的name字段和id字段(id默认显示)。

一些查询相关的运算符：

- `$gt`、`$lt`、`gte`、`lte`
    
	`db.stu.find({num:{$gt:20, $lt:30}})` —— 返回num值大于20小于30的文档。

- `$or`表示或，只要满足数组其中一个条件即可:
    
	`db.stu.find({$or:[{num:{$lt:100}}, {num:{$gt:200}}]})` —— 返回num值小于100或者大于200的文档。

<br/>

### 2.3 修改: `db.<collection>.update({查询条件},{新对象},{options})`

默认情况下会使用新对象来**替换**旧的对象。

如果需要**修改**指定的属性而不是替换，需要使用**修改操作符**来完成修改

- `$set` 可以用来增加或修改文档中的指定属性

	如: `db.stu.update({"_id":1}, {$set:{age:22,address:'China'}})`

- `$unset` 可以用来删除文档中的**指定属性**
    
	如: `db.stu.update({"_id":1}, {$unset:{address:'这里是什么不重要，反正要删除'}})`

`update()`默认情况下**只改变一个**，如果需要同时修改多个，增加第三个配置参数`{multi:true}`，或者使用`updateMany()`。

如果属性是一个数组，需要往数组中加入新的元素，则可以使用操作符`$push`:

- 如: `db.stu.update({username:'Tom'},{$push:{'hobby.movies':'Mr Bean'}})`

- `$each`可以对数组进行解构:`{$push: {a: {$each: [1,2]}}}` —— 向数组a中加入1和2。

- `$addToSet`操作符也可向数组中添加一个新元素，与`$push`的区别是，不允许添加重复的元素。

使用操作符`$pop`从数组中移除一个元素，`1`代表最后一个元素，`-1`代表第一个元素:
    
- `{$pop: {a: 1}}`  —— 从数组a中移除最后一个元素
    
- `{$pop: {a: -1}}` —— 从数组a中移除第一个元素

使用操作符`$pull`从数组中移除所有的指定元素:

- `{$pull: {a: 5}}` —— 移除数组a中所有值为5的元素。
    
- 使用操作符`$pullAll`来移除所有的多个指定元素:
    
- `{$pullAll: {a: [5, 6]}}` —— 移除数组a中所有值为5或6的元素。

让属性值在原有基础上自增，使用操作符`$inc`:

- `db.stu.updateMany({num:{$lt:1000}}, {$inc:{num:400}})` —— 让所有num小于1000的文档num值增加400

相关方法:

- `db.<collection>.updateOne()` —— 修改一个符合条件的文档

- `db.<collection>.updateMany()` —— 修改多个符合条件的文档

- `db.<collection>.replaceOne()` —— 替换一个文档中的某些属性

<br/>

### 2.4 删除: `db.<collection>.remove({},Boolean)`

`remove()`必须传入参数，可以根据条件对象来删除文档，传递条件的方式和`find()`一样，默认情况下会同时删除多个，相当于`deleteMany()`。

- 如果传入第二个参数为`true`，则只会删除一个，相当于`deleteOne()`。

- 如果传入第一个参数对象为`{}`，则会清空所有的文档，相当于删除集合，但是性能比较差，不如用`db.<collection>.drop()`。

相关方法:

- `db.<collection>.deleteOne()` —— 删除一个
    
- `db.<collection>.deleteMany()` —— 删除多个

- `db.<collection>.drop()` —— 删除集合

- `db.dropDatabase()` —— 删除数据库

一般在实际生产中，数据不会真正地删除，而是做逻辑删除。比如给集合中的每个文档增加一个数据字段`isDel`，设置值为`1`，标记为删除。

