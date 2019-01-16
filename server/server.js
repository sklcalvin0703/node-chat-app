const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public'); //return ../node-chat-app/server/../public

// console.log(publicPath); //return ../node-chat-app/public
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); //use the file inside public (static refer to sth wont change when every user using)
io.on('connection', (socket)=>{
    console.log('new user connected');
    socket.on('disconnect', ()=>{
        console.log('User was disconneted');
    })
});//register a event listener


server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});