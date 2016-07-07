// Set up an express server
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 3000;
server.listen(port);

// set up a route to handle request to homepage
app.get('/', function(req, res){
  // server static html
  res.sendFile(__dirname + '/client.html');
});

app.get('/:room', function(req, res){
  res.sendFile(__dirname + '/client.html');
})

// Create a connection
io.on('connection', function(socket){
  // listens for messages from clients and then broadcasts them out
  socket.on("message", function(msg){
    // console.log("room", msg.room);
    // console.log("message", msg.message);
    console.log("msg", msg);
    socket.broadcast.emit(msg.room, msg);
  });
});