const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/user');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public'); //return ../node-chat-app/server/../public

// console.log(publicPath); //return ../node-chat-app/public
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath)); //use the file inside public (static refer to sth wont change when every user using)
io.on('connection', (socket)=>{
    console.log('new user connected');
    // socket.emit('newEmail', {
    //     from: 'mike@example.com',
    //     text: 'hey',
    //     createdAt: 123
    // });

    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined`));
        
        callback();
    });


    
    // socket.on('createEmail', (newEmail)=>{
    //     console.log('createdEmail', newEmail);
    // });
    socket.on('createMessage', (message, callback)=>{ //listener
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
        }
        
        callback(); //event acknowledgemen

        //send to other ppl but except yourself
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on('createLocationMessage',(coords)=>{
        var user = users.getUser(socket.id);

        if(user){
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude,coords.longitude));
        }
    });
    
    // socket.emit('newMessage', { //socket.emit emit an event to a single connection
    //     from: 'john',
    //     text: 'this is from server',
    //     createdAt: 123
    // });

    socket.on('disconnect', ()=>{
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    })
});//register a event listener



server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});