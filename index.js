var express = require('express');
var socket = require('socket.io');
var app  = express();


var server = app.listen(4000, (err)=> {
    if(err) throw err;
    console.log('Listening');
});

app.use(express.static('public'));


// Socket setUp
var io = socket(server);

io.on('connection', (socket)=>{
    console.log('made socket connection',socket.id);
    console.log(io.sockets);
    
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    });

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    });


});