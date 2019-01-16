const path = require('path');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public'); //return ../node-chat-app/server/../public

// console.log(publicPath); //return ../node-chat-app/public

const express = require('express');
var app = express();

app.use(express.static(publicPath)); //use the file inside public (static refer to sth wont change when every user using)


app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});