
# Node.JS中操作MongoDB数据库

关于`MongoDB`数据库的操作请看[MongoDB常用语法及基本使用](./MongoDB常用语法及基本使用.md)。

<br/>

## 1. `mongoose`简介

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

<br/>

## 2. 引入`mongoose`并连接数据库

1. 安装: `npm install mongoose --save`

2. 在项目中引入: `var mongoose = require('mongoose');`

3. 连接`MongoDB`数据库

    - `mongoose.connect('mongodb://数据库的ip地址:端口号/数据库名');`
    
    - 如果端口号是默认(`27017`)，则可以省略不写。

4. 监听状态

    - `mongoose`对象有一个属性叫`connection`，表示数据库连接，通过监视该对象状态来监听数据库的连接与断开。
    
    - 连接成功事件: `mongoose.connection.once('open',function(){});`

    - 连接断开事件: `mongoose.connection.once('close',function(){});`

5. 断开数据库连接（一般不需要调用）

    - `mongoose.disconnect()`

    - 一般情况下，只需要连接一次`MongoDB`，除非项目停止，服务器关闭，否则不会断开连接。

<br/>

## 3. 对数据库进行映射

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
var StuModel = mongoose.model("student", stuSchema);

//向数据库中插入一个文档: StuModel.create(doc, function(err){});
StuModel.create({
    name:"Tom",
    age:18,
    gender:"male",
    address:"China"
},function(err){
    if(!err){
        console.log("插入成功");
    }
});
```



<br/>

## 4. 对集合进行操作(`Model`)

当调用了`mongoose.model()`方法后，我们就可以使用`Model`来对数据库进行增删改查，相当于在集合的层面来操作数据。     
  
  <br/>
  
### 4.1 插入: `Model.create(doc(s), [callback])`

用来创建一个或多个文档并添加到数据库中。

参数：

- `doc(s)`可以是一个文档对象，也可以是一个文档对象的数组。

- `callback`是当操作完成以后调用的回调函数。

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

<br/>

### 4.2 查询: `Model.find(conditions,[projection],[options],[callback])`

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

- `Model.count(conditions, [callback])` —— 统计符合条件的文档的数量。

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
NodeJS中常用的商品**列表排序分页查询**：

```javascript
let page = parseInt(req.param("page"));
let pageSize = parseInt(req.param("pageSize"));
let sort = parseInt(req.param("sort"));
let skip = (page-1)*pageSize;
let params = {};
//获取查询集
let goodsModel = Goods.find(params);

//这里对查询集进行一些链式操作
goodsModel.sort({'salePrice':sort}).skip(skip).limit(pageSize);

//获取执行结果
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

<br/>

### 4.3 修改: `Model.update(conditions, doc, [options], [callback])`

用来修改一个或多个文档。

参数:

- `conditions` —— 查询条件

- `doc` —— 修改后的对象

- `options` —— 配置参数，如`{multi:true}`代表修改多个

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

<br/>

### 4.4 删除: `Model.remove(conditions, [callback])`

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

<br/>

##  5. 对文档进行操作(`Document`)


上面我们从`Model`(集合)的层面来对数据库增删改查，操作数据。

而`Document`(具体的某条文档)是`Model`的实例，它也提供有一些属性与方法，让我们可以方便地操作数据。


- `save([options], [fn])` —— 直接对文档的属性进行修改后，需要用`save`来保存修改。

- `update(update, [options], [callback])` —— 修改一个`document`对象。

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

<br/>

## 6. `mongoose`的模块化

在项目中对`MongoDB`数据库操作前都需要连接，一次连接后，无需断开，一直保持着，进行操作即可。

连接数据库后，只需要定义好`Schema`并关联集合形成`Model`，即可通过`Model`来操控数据。

这些操作都属于项目一次性的准备工作。

为了提高复用性，降低耦合度，更好地分离业务逻辑，需要进行模块化:
<br>

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
<br/>

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
<br>
- 接下来就可以在`index.js`中直接引入模块并进行数据库的操作了：

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
