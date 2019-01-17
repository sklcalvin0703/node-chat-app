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
        
    });
socket.on('disconnect', function() {
        console.log('disconneted from server');
            });

// socket.on('newEmail', function(email){
//     console.log('New Email', email);
// });

socket.on('newMessage', function(message){
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message){
    var li = jQuery('<li></li');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e){
    e.preventDefault();

    socket.emit('createMessage', {
        from:'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        alert('Unable to fetch location.');
    }, {timeout: 10000});
});