const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// body-parser只能解析application/x-www-form-urlencoded表单数据类型
// 不能解析multipart/form-data

// 如果需要解析这类数据，要使用模块multer
const multer = require('multer');
//记住需要先创建该对象
//可以传入参数，指定文件上传的目录
var objMulter = multer({dest:'./www/upload/'});

var server = express();

// server.use(bodyParser.urlencoded({extended:false}));
// server.use(objMulter.single('f1')); //只接受表单中name为f1的文件
server.use(objMulter.any()); //接收所有文件

server.post('/', function (req, res) {
    // console.log(req.body);
    console.log(req.files);//获取表单中的文件数据
    /*
    [ { fieldname: 'f1',
        originalname: 'demo.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: './www/upload/',
        filename: 'bec22ac9170e04f16c4fd474bce3a9e3',
        path: 'www\\upload\\bec22ac9170e04f16c4fd474bce3a9e3',
        size: 261427 } ]
      上传的文件存储在目录中名字为filename，默认没有扩展名，需要自己去重命名。
     */
    console.log(req.files[0].originalname);
    // 引入模块:path，用来帮助解析文件路径，便于重命名
    var obj = path.parse(req.files[0].originalname);
    /*
    例如c:\\www\\a.html，输出:
    { root:'c:\\',
      dir: 'c:\\www',
      base: 'a.html',
      ext: '.html',
      name: 'a' }
     */
    var newName = req.files[0].path + obj.ext;
    // 重命名
    fs.rename(req.files[0].path, newName, function (err) {
       if(err)
           res.send("上传失败");
       else
           res.send("成功");
    });

});

server.listen(7788);

