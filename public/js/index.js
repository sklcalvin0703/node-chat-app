var socket = io(); //create connection to save the socket to the variable
socket.on('connect', function() {
        console.log('connected to the server');

        // socket.emit('createEmail',{
        //     to: 'asda',
        //     text: 'test'
        // });
        // socket.emit('createMessage', {
        //         from: 'Calvin',
        //         text: 'yoyoyo'
        // });

        socket.on('newMessage', function(message){
            console.log('newMessage', message);
            var li = jQuery('<li></li>');
            li.text(`${message.from}: ${message.text}`);

            jQuery('#messages').append(li);
        });
        
    });

socket.on('disconnect', function() {
        console.log('disconneted from server');
            });

// socket.on('newEmail', function(email){
//     console.log('New Email', email);
// });


jQuery('#message-form').on('submit', function (e){
    e.preventDefault();

    socket.emit('createMessage', {
        from:'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
});