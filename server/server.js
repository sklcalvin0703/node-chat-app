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
    // socket.emit('newEmail', {
    //     from: 'mike@example.com',
    //     text: 'hey',
    //     createdAt: 123
    // });
    socket.emit('newMessage',{
        from: 'admin',
        text: 'welcome',
        createdAt: new Date().getTime()
    })
    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'new user joined',
        createdAt: new Date().getTime()
    })
    // socket.on('createEmail', (newEmail)=>{
    //     console.log('createdEmail', newEmail);
    // });
    socket.on('createMessage', (message)=>{ //listener
        console.log('createMessage', message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

        //send to other ppl but except yourself
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })
    
    // socket.emit('newMessage', { //socket.emit emit an event to a single connection
    //     from: 'john',
    //     text: 'this is from server',
    //     createdAt: 123
    // });

    socket.on('disconnect', ()=>{
        console.log('User was disconneted');
    })
});//register a event listener



server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});