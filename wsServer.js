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
    broadcast(conn.nickname + ' comes in.');

    conn.on("text", function (str) {
        console.log("Received "+str);
        broadcast(conn.nickname + ':' + str)
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        broadcast(conn.nickname + ' left')
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