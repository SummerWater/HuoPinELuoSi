/**
 * Created by Meckey on 2017/9/5.
 */
var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;

var clientCount = 0;

app.listen(PORT);

io.on('connection', function (socket) {
    // 新用户进入 广播
    clientCount++;
    socket.nickname = 'user' + clientCount;
    io.emit('enter', socket.nickname + ' comes in.');

    // 接收到消息
    socket.on('message', function (str) {
        io.emit('message', socket.nickname + '说: ' + str);
    });

    // 用户退出
    socket.on('disconnect', function () {
        io.emit('leave', socket.nickname + ' left');
    });
});

console.log('Websocket server listening on port ' + PORT);
