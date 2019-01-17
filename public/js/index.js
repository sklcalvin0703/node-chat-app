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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    // console.log('newMessage', message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery('#messages').append(li);
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li');
    // var a = jQuery('<a target="_blank">My current location</a>');

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
    var template = jQuery('#locationmessage-template').html();
    var html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e){
    e.preventDefault();

    var messageTextbox = jQuery('[name=message');
    socket.emit('createMessage', {
        from:'User',
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    
    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    }, {timeout: 10000});
});