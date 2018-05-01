const express = require('express');

var server = express();

// 目录1: /user
var routerUser = express.Router();
server.use('/user', routerUser);

routerUser.get('1.html', function (req, res) {
    // http://xxx.com/user/1.html
    res.send('user1');
});

routerUser.get('2.html', function (req, res) {
    // http://xxx.com/user/2.html
    res.send('user2');
});


// 目录2: /article
var routerArticle = express.Router();
server.use('/article', routerArticle);

routerArticle.get('/1.html', function (req, res) {
    // http://xxx.com/article/1.html
    res.send('article1');
});


server.listen(7788);


