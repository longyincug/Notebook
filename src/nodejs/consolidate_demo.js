const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
// 模板引擎整合
const consolidate = require('consolidate');


var server = express();
server.listen(7788);

//解析cookie
server.use(cookieParser('adasdasfadqw'));

//使用session
var arr=[];
for(var i=0; i<10000; i++){
    arr.push('keys_' + Math.random());
}
server.use(cookieSession({name: 'sess_id', keys:arr, maxAge: 20*3600*1000}));

//post数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(multer({dest:'./www/upload'}).any());

// 配置模板引擎
// 输出何种格式
server.set('view engine', 'html');
// 模板文件放在哪里
server.set('views', '/views');
// 使用哪种模板引擎
server.engine('html', consolidate.ejs);

//接收用户请求
server.get('/index', function (req, res) {
    res.render('1.ejs', {name:'Tom'});
});


// //用户请求
// server.use('/', function (req, res, next) {
//     console.log(req.query, req.body, req.files, req.cookies, req.session);
//     next();
// });


//static数据
server.use(expressStatic('./www'));