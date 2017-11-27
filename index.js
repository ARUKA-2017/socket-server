var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var Tail = require('always-tail');
var fs = require('fs');
var filename = "../processing-engine/nlu.log";


io.on('connection', function (socket) {
    console.log('a user connected');
});

if (!fs.existsSync(filename)) fs.writeFileSync(filename, "");

var tail = new Tail(filename, '\n');

tail.on('line', function (data) {
    console.log("got line:", data);
    io.emit("VALUE", data);
});

tail.on('error', function (data) {
    console.log("error:", data);
});

tail.watch();

// ############# OVERALL ################### //
var overallname = "../overall.log";


if (!fs.existsSync(overallname)) fs.writeFileSync(overallname, "");

var overallTail = new Tail(overallname, '\n');

overallTail.on('line', function (data) {
    console.log("emitting", data);
    io.emit("OVERALL", data);
});

overallTail.on('error', function (data) {
    console.log("error:", data);
});

overallTail.watch();
// ############# OVERALL END ################### //


http.listen(3000, function () {
    console.log('listening on *:3000');
});
