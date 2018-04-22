//INIT SOCKET
const socket = io.connect();


//NEW CONNECTION
const newConnection = () => {
    //emit to server
    socket.emit('new-connection', {
        user : "Agiri",
    });

    //emit to client
    socket.on('new-connection', (msg) => {
        console.log(msg)
    });
}

(function (){
newConnection();
   
})();
