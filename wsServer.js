/**
 * Created by Meckey on 2017/9/5.
 */
var ws = require("nodejs-websocket");

var PORT = 3000;

var clientCount = 0;

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection");

    clientCount++;
    conn.nickname = 'user' + clientCount;
    var msg = {};
    msg.type = "enter";
    msg.data = conn.nickname + ' comes in.';
    broadcast(JSON.stringify(msg));

    conn.on("text", function (str) {
        console.log("Received "+str);
        var msg = {};
        msg.type = "message";
        msg.data = conn.nickname + '说: ' + str;
        broadcast(JSON.stringify(msg));
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        var msg = {};
        msg.type = "leave";
        msg.data = conn.nickname + ' left';
        broadcast(JSON.stringify(msg));
    });
    conn.on("error", function (err) {
        console.log('handle err');
        console.log(err)
    })
}).listen(PORT);

console.log('Websocket server listening on port ' + PORT);

function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str)
    })
}