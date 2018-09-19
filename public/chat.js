// Make connection
// For front end not backend
var socket = io.connect("http://localhost:4000/") 
// http://localhost:4000/

// Query Dom

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');
// emit event 

btn.addEventListener('click',()=>{
    socket.emit('chat',{
        message:message.value,
        handle :handle.value
    })
});


message.addEventListener('keypress',()=>{
    socket.emit('typing', handle.value);
});

// Listen for events

socket.on('chat',(data)=>{
    feedback.innerHTML='';
    output.innerHTML += '<p><strong>'+data.handle+': </strong>'+
                        data.message+'</p>';
});

socket.on('typing', (data)=>{
    feedback.innerHTML = '<p><em>'+data+' is tying...</em></p>';
    // wipeOut();
});

