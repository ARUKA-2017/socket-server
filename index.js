var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
io.on('connection', function (socket) {
    console.log('a user connected');
});
// enables POST, PUT Body data to be retrieved as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/broadcast', (req, res) => {
    console.log(req.body);
    io.emit(req.body.uuid, req.body.messege);
    res.status(200).json({ status: req.body });

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
