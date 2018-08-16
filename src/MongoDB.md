# MongoDB


## 简介

`MongoDB`是为快速开发互联网Web应用而设计的数据库系统。它的数据模型是面向**文档**的，一种类似于`JSON`的结构。


## 安装和配置

以`windows`平台上安装`MongoDB 3.6`版本为例:

1. 先在 [官网](https://www.mongodb.com/download-center?jmp=nav#community) 下载`MongoDB`安装包。

2. 下载完毕后将`MongoDB`安装到一个自己容易找到的目录中，如 `C:\Program Files\MongoDB`，然后配置好`MongoDB`的**环境变量**。

3. 在C盘根目录创建一个文件夹名为`data`，在`data`中再新建一个文件夹为`db`，这是`MongoDB`数据文件的默认存储位置。

    - 如果要自定义数据库文件的存储位置，通过命令`mongod --dbpath (路径)`来实现。

4. 在CMD窗口中输入`mongod`，启动数据库服务器。（如果是32位windows，第一次启动时需要输入:`mongod --storageEngine=mmapv1`）

    - MongoDB数据库服务器的默认端口号为`27017`。
    
    - 自定义端口号通过命令`mongod --port (端口号)`来实现。

5. 不要关闭该窗口，然后再打开一个CMD，输入`mongo`，即可启动数据库客户端，连接数据库服务器，进行增删改查操作。


***
<br>


## 将MongoDB设置为系统服务


我们每次都需要开一个CMD窗口启动MongoDB服务器，同时再开一个窗口启动客户端进行操作，而不能关闭前一个窗口，这样其实比较麻烦。

可以将MongoDB设置为系统服务，自动在后台启动，不需要每次都手动启动。

1. 在C盘根目录创建`data`目录，并在`data`下创建`db`和`log`文件夹。

2. 创建配置文件。在目录`C:\Program Files\MongoDB\Server\3.6`下创建一个配置文件`mongod.cfg`。

    `mongod.cfg`:
  
    ```
    systemLog:
        destination: file
        path: c:\data\log\mongod.log
    storage:
        dbPath: c:\data\db
    ```

    一定要注意格式，不要用tab键而要用空格代替，最好直接复制过去。

3. 管理员身份开启CMD，执行以下命令来将MongoDB添加到系统服务中:

  ```
  sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe\" --service --config=\"C:\Program Files\MongoDB\Server\3.6\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
  ```

  注意对照自己的MongoDB版本和目录名适当修改路径。
  
4. 在任务管理器中找到系统服务界面，启动MongoDB服务。

5. 如果启动失败，说明上面的操作出错，需要通过命令`sc delete MongoDB`删除之前配置的服务，然后再次尝试（多半是`mongod.cfg`文件出错）。


***
<br>


## MongoDB的操作使用

MongoDB中的三个概念：

- 数据库(database): 一个仓库，在其中可以存放集合。

- 集合(collection): 概念相当于`MySQL`中的表，类似于一个数组，在集合中可以存放文档。

- 文档(document): 文档是数据库中的最小单位，我们存储和操作的内容都是文档。

注意：在`MongoDB`中，数据库和集合都不需要手动创建，当我们创建文档时，如果文档所在的集合或数据库不存在会自动创建数据库和集合。

我们可以使用一些图形化界面工具来帮助我们操作`MongoDB`，如：[NoSQL Manager for MongoDB](https://www.mongodbmanager.com/download)。

![mongodb_manager](C:\Users\10156\Desktop\捕捉图片\2018-06-07_160520.png)


### 基本指令

`show dbs/databases`: 查看当前所有的数据库

`use (数据库名)`: 进入到指定的数据库中

`db`: 显示当前所处的数据库

`show collections`: 显示当前数据库中所有的集合

***
<br>

### 数据库的CRUD(增删改查)操作

插入: `db.<collection>.insert(doc)`

- 向数据库的指定集合中插入一个或多个文档

- 例: 

    - `db.stu.insert({name:'Tom', age:18, gender:'male'})`
    
    - `db.stu.insert([{name:'Jerry', age:18, gender:'male'},{name:'Herry',age:20,gender:'female'}])`
    
- 如果插入时没有给文档指定`_id`属性，则数据库会自动为文档添加`_id`属性（ObjectId）

- 相关方法:

    - `db.<collection>.insertOne()` —— 插入一个文档对象
    
    - `db.<collection>.insertMany()` —— 插入多个文档对象

- 如何插入10000条数据？

    - 可以用for循环:
        
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

***
<br>

查询: `db.<collection>.find()`

- 查询集合中的所有文档，返回的是一个**数组**。

- 例: `db.stu.find()`

- 可以接收一个对象作为条件参数，表示查询符合条件的文档，`{}`表示查询所有。

- 例: `db.stu.find({age:20})`

- 支持通过内嵌文档的属性进行查询，通过`.`来匹配，注意属性名必须加引号！

- 例: `db.stu.find({'hobby.movies':'comedy'})`

- **并不是说属性值一定要等于该值，如果属性值是一个数组，只要数组中包含该值即可！**

- **相关方法**:

    - `db.<collection>.findOne()` —— 查询集合中符合条件的第一个文档，返回的是一个**文档对象**。

    - `db.<collection>.find({}).count()` —— 查询集合中符合条件的文档的数量，返回一个数值。

    - `db.<collection>.find({}).limit(10)` —— 设置返回查询的数据的上限。

    - `db.<collection>.find({}).skip(10).limit(10)` —— 返回第11条到第20条数据。

    - `db.<collection>.find({}).sort({num:1, age:-1})` —— 传递一个对象来指定排序规则，`1`表示升序，`-1`表示降序

    - MongoDB会自动调整`sort`、`skip`和`limit`的位置，谁写前谁写后并无大碍。

    - `distinct()`对数据进行去重: `db.stu.distinct('class',{age:{$gt:18}})` —— 查找年龄大于18的人的班级（去重）

- **投影**:

    - 在做查询时，可以在第二个参数设置查询结果的投影，`1`表示显示，`0`表示不显示。

    - `db.<collection>.find({}, {name:1})` —— 显示该集合文档的name字段和id字段(id默认显示)。

- 一些查询相关的运算符：

    - `$gt`、`$lt`、`gte`、`lte`
    
        - `db.stu.find({num:{$gt:20, $lt:30}})` —— 返回num值大于20小于30的文档

    - `$or`表示或，只要满足数组其中一个条件即可:
    
        - `db.stu.find({$or:[{num:{$lt:100}}, {num:{$gt:200}}]})`

***
<br>

修改: `db.<collection>.update({查询条件}，{新对象}，{options})`

- 默认情况下会使用新对象来**替换**旧的对象。

- 如果需要**修改**指定的属性而不是替换，需要使用**修改操作符**来完成修改

    - `$set` 可以用来增加或修改文档中的指定属性

    - 如: `db.stu.update({"_id":1}, {$set:{age:22,address:'China'}})`

    - `$unset` 可以用来删除文档中的**指定属性**
    
    - 如: `db.stu.update({"_id":1}, {$unset:{address:'这里是什么不重要，反正要删除'}})`

    - `update()`默认情况下**只改变一个**，如果需要同时修改多个，增加第三个配置参数`{multi:true}`，或者使用`updateMany()`。

- 如果属性是一个数组，需要往数组中加入新的元素，则可以使用操作符`$push`:

    - 如: `db.stu.update({username:'Tom'},{$push:{'hobby.movies':'Mr Bean'}})`

    - `$each`可以对数组进行解构:`{$push: {a: {$each: [1,2]}}}` —— 向数组a中加入1和2。

    - `$addToSet`操作符也可向数组中添加一个新元素，与`$push`的区别是，不允许添加重复的元素。

- 使用操作符`$pop`从数组中移除一个元素，`1`代表最后一个元素，`-1`代表第一个元素:
    
    - `{$pop: {a: 1}}`  —— 从数组a中移除最后一个元素
    
    - `{$pop: {a: -1}}` —— 从数组a中移除第一个元素

- 使用操作符`$pull`从数组中移除所有的指定元素:

    - `{$pull: {a: 5}}` —— 移除数组a中所有值为5的元素。
    
    - 使用操作符`$pullAll`来移除所有的多个指定元素:
    
    - `{$pullAll: {a: [5, 6]}}` —— 移除数组a中所有值为5或6的元素。

- 让属性值在原有基础上自增，使用操作符`$inc`:

    - `db.stu.updateMany({num:{$lt:1000}}, {$inc:{num:400}})` —— 让所有num小于1000的增加400

- 相关方法:

    - `db.<collection>.updateOne()` —— 修改一个符合条件的文档

    - `db.<collection>.updateMany()` —— 修改多个符合条件的文档

    - `db.<collection>.replaceOne()` —— 替换一个文档中的某些属性

***
<br>

删除: `db.<collection>.remove({},Boolean)`

- `remove()`必须传入参数，可以根据条件对象来删除文档，传递条件的方式和`find()`一样，默认情况下会同时删除多个，相当于`deleteMany()`。

- 如果传入第二个参数为`true`，则只会删除一个，相当于`deleteOne()`。

- 如果传入第一个参数对象为`{}`，则会清空所有的文档，相当于删除集合，但是性能比较差，不如用`db.<collection>.drop()`。

- 相关方法:

    - `db.<collection>.deleteOne()` —— 删除一个
    
    - `db.<collection>.deleteMany()` —— 删除多个

    - `db.<collection>.drop()` —— 删除集合

    - `db.dropDatabase()` —— 删除数据库

- 一般在实际生产中，数据不会真正地删除，而是做逻辑删除。给集合中的每个文档增加一个数据字段`isDel`，设置值为1，标记为删除。



***
<br>


## Node.JS中操作MongoDB

### mongoose简介

在`Node.JS`中使用`mongoose`模块来操作`MongoDB`数据库。

- 可以为文档创建一个模式结构(`Schema`)

- 可以对模型中的对象/文档进行验证

- 数据可以通过类型转换变成对象模型

- 可以使用中间件来与业务逻辑挂钩

- 比`Node`原生的`MongoDB`驱动更容易


`mongoose`为我们提供了几个新的对象：

- `Schema`(模式对象)

    - Schema对象定义约束了数据库中的文档结构。
    
- `Model`

    - Model对象作为集合中的所有文档的表示，相当于集合collection。

- `Document`

    - Document表示集合中的一个的具体文档。


### 引入模块并连接数据库

1. 安装: `npm install mongoose --save`

2. 在项目中引入: `var mongoose = require('mongoose');`

3. 连接`MongoDB`数据库

    - `mongoose.connect('mongodb://数据库的ip地址:端口号/数据库名');`
    
    - 如果端口号是默认(27017)，则可以省略不写。

4. 监听状态

    - `mongoose`对象中有一个属性叫`connection`，表示数据库连接，通过监视该对象状态来监听数据库的连接与断开。
    
    - 连接成功事件: `mongoose.connection.once('open',function(){});`

    - 连接断开事件: `mongoose.connection.once('close',function(){});`

5. 断开数据库连接（一般不需要调用）

    - `mongoose.disconnect()`

    - 一般情况下，只需要连接一次`MongoDB`，除非项目停止，服务器关闭，一般不会断开连接。


### 对数据库进行映射

数据库连接成功后，就可以对数据库中的集合进行映射并操作了。

```
//将mongoose.Schema赋值给一个变量
var Schema = mongoose.Schema;

//创建Schema(模式)对象
var stuSchema = new Schema({
    name:String,
    age:Number,
    // 和gender:String类似，只是多设置了默认值
    gender:{
        type:String,
        default:"female"
    },
    address:String
});

//通过Schema来创建Model
//Model代表数据库中的集合，通过Model来对数据库进行操作
//mongoose.model(modelName, schema); modelName是要映射的集合名
//注意：mongoose会自动将集合名变为复数，student——>students
var stuModel = mongoose.model("student", stuSchema);

//向数据库中插入一个文档: StuModel.create(doc, function(err){});
StuModel.create({
    name:"Tom",
    age:18,
    gender:"male",
    address:"China"
},function(err){
    if(!err){
        console.log("插入成功")
    }
});
```


### 对集合进行操作(`Model`)

当调用了`mongoose.model()`方法后，我们就可以使用`Model`来对数据库进行增删改查了，相当于在集合的层面来操作数据。


**插入**: `Model.create(doc(s), [callback])`

用来创建一个或多个文档并添加到数据库中。

参数：

- `doc(s)`可以是一个文档对象，也可以是一个文档对象的数组。

- `callback`是当操作完成以后调用的回调函数

例如:

```
stuModel.create([
    {
        name:'Alice',
        age:20,
        gender:"female",
        address:"USA"
    }
],function(err){
    if(!err){
        //这里会传入两个参数，第一个是错误信息，第二个是插入的文档对象数组
        console.log(arguments);
    }
})
```


***
<br>


**查询**: `Model.find(conditions,[projection],[options],[callback])`

用来查询所有符合条件的文档。

参数:

- `conditions` —— 查询的条件。

- `projection` —— 投影，需要获取到的字段。
    
    - 两种方式投影:
    
        - `{name:1, _id:0}`
        
        - `"name -_id"`

- `options` —— 查询选项(`skip`、`limit`)。

    - 如: `{skip:3, limit:2}`

- `callback` —— 回调函数，必须传入，查询结果通过回调函数返回。

相关方法:

- `Model.findById(id,[projection],[options],[callback])` —— 根据`id`属性查询文档。

- `Model.findOne([conditions],[projection],[options],[callback])` —— 查询符合条件的第一个文档，总会返回一个具体的文档对象。

- `Model.count(conditions, [callback])` —— 统计符合条件的文档的数量

例如:

```
stuModel.find({}, {name:1, _id:0}, function(err, docs){
    if(!err){
        console.log(docs);
    }
})

stuModel.findById("59c4c3cf4e5483191467d392", function(err, doc){
    if(!err){
        console.log(doc);
        //通过find()查询的结果，返回的对象就是Document
        //Document是Model的实例
        console.log(doc instanceof stuModel);//true
    }
})

stuModel.count({}, function(err, count){
    if(!err){
        console.log(count);
    }
});
```

nodejs常用的商品**列表排序分页查询**：

```javascript
let page = parseInt(req.param("page"));
let pageSize = parseInt(req.param("pageSize"));
let sort = parseInt(req.param("sort"));
let skip = (page-1)*pageSize;
let params = {};
let goodsModel = Goods.find(params);

//这里是链式操作
goodsModel.sort({'salePrice':sort}).skip(skip).limit(pageSize);
goodsModel.exec(function (err, docs) {
  if(err){
    res.json({
      status: 1,
      result: [],
      msg: err.message
    });
  } else {
    res.json({
      status: 0,
      result: docs,
      msg: ""
    })
  }
});
```



***
<br>


**修改**: `Model.update(conditions, doc, [options], [callback])`

用来修改一个或多个文档。

参数:

- `conditions` —— 查询条件

- `doc` —— 修改后的对象

- `options` —— 配置参数，如`{multi:true}`代表修改多个。

- `callback` —— 回调函数

相关方法:

- `Model.updateOne(conditions, doc, [options], [callback])`

- `Model.updateMany(conditions, doc, [options], [callback])`

- `Model.replaceOne(conditions, doc, [options], [callback])`

例如:

```
// 在MongoDB中，update如果不使用$set操作符，则默认是对整个文档进行替换
// 而mongoose为防止意外重写，会自动将 {oldEnough:true} 转换为 {$set:{oldEnough:true}} 再进行操作
// 应该养成好的习惯，加上$set。如果确实要整个替换，将overwrite option设置为true
stuModel.update({age:{$gt:18}}, {oldEnough:true}, function(err,raw){
    if(err) return handlerError(err);
    console.log('The raw response from mongo was ', raw);
});

//使用$pull来对嵌套数组中数据进行删除
//如下，删除用户id为10001的购物车列表数据中的 id为21的商品
UserModel.update({userId:"10001"}, {$pull:{'cartList':{'productId':"21"}}}, function(err,raw){
    if(err) return handlerError(err);
    console.log('The raw response from mongo was ', raw);
});

//还可以对指定的嵌套数据进行匹配和修改
User.update({"userId":"10001","cartList.productId":"21"},{
    "cartList.$.productNum":10,
    "cartList.$.checked":1
},function(){});
```



***
<br>


**删除**: `Model.remove(conditions, [callback])`

用来删除符合指定条件的文档。

相关方法:

- `Model.deleteOne(conditions, [callback])`

- `Model.deleteMany(conditions, [callback])`

例如:

```
stuModel.remove({name:'Tom'}, function(err){
    if(!err){
        console.log("success");
    }
})
```


***
<br>


### 对文档进行操作(`Document`)

上面我们从`Model`(集合)的层面来对数据库增删改查，操作数据。

而`Document`(具体的某条文档)是`Model`的实例，它也提供有一些属性与方法，让我们可以方便地操作数据。


- `save([options], [fn])` —— 直接对文档的属性进行修改后，需要用`save`来保存修改。

- `update(update, [options], [callback])` —— 修改一个document对象。

    ```
    //用findOne获取的是单个文档，即Document对象
    stuModel.findOne({}, function(err, doc){
        if(!err){
            //Document的update方法
            doc.update({$set:{age:28}}, function(err){
                if(!err){
                    console.log("修改成功");
                }
            });
            //当然也可以用Document属性直接操作，再save保存修改
            //doc.age = 28;
            //doc.save();
        }
    });
    ```

- `remove([callback])` —— 删除一个文档对象。

    ```
    doc.remove(function(err){
        if(!err){
            console.log("删除成功");
        }
    });
    ```

- `get(name)` —— 获取文档中的指定属性值。

    - 如: `doc.get("age")`，和直接读取属性值`doc.age`效果一样。
    
    - 注意需要`save`保存。

- `set(name, value)` —— 设置文档的指定属性值。

    - 如: `doc.set("name", "Tom")`，和直接设置属性值`doc.name = 'Tom'`效果一样。

    - 注意需要`save`保存。
    
- `id` —— `Document`的属性，可直接获取文档的`_id`值: `doc.id`。

- `toObject()` —— 将`Document`对象转换为普通的`Object`对象，方便做一些对象操作。

    ```
    //转换为普通的Object对象后，就没有了Document对象的属性和方法
    doc = doc.toObject();
    //操作Object属性
    delete doc.age;
    console.log(doc._id);
    ```


***
<br>


### `mongoose`的模块化

在项目中对`MongoDB`数据库操作前都需要连接，一次连接后，无需断开，一直保持着，进行操作即可。

连接数据库后，只需要定义好`Schema`并关联集合形成`Model`，即可通过`Model`来操控数据。

这些操作都属于项目一次性的准备工作。

为了提高复用性，降低耦合度，更好地分离业务逻辑，需要进行模块化:

- 我们可以将**连接**`MongoDB`数据库的代码单独设置成一个模块，放到`tools`目录下。

    如: `tools`中的`conn_mongo.js`:

    ```
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1/mongoose_test');
    mongoose.connection.once('open',function(){
        console.log('数据库连接成功');
    });
    ```

    后面对`MongoDB`进行操作前只需要`require`该模块即可直接连接。


- 再创建一些模块，专门用来定义某个集合的`Model`，统一放到`models`目录下。

    如: `models`中的`student.js`:

    ```
    //定义Student模型的模块
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var stuSchema = new Schema({
        name:String,
        age:Number,
        gender:{
            type:String,
            default:"male"
        },
        address:String
    });
    var stuModel = mongoose.model("student", stuSchema);
    module.exports = stuModel;
    ```

- 接下来就可以在`index.js`中直接引入模块并使用了。

    ```
    //连接数据库
    require('./tools/conn_mongo');
    
    //导入Model
    var Student = require('./models/student');
    
    //对集合进行数据操作
    Student.find({}, function(err, docs){
        if(!err){
            console.log(docs);
        }
    });
    ```





