//INIT SOCKET
const socket = io.connect();
let chatBody = document.querySelector('#msg-body')



//NEW CONNECTION
const newConnection = () => {
    //emit to server
    let user = localStorage.getItem('username');
    socket.emit('new-connection', {
        user: user
    });
    //emit to client
    socket.on('new-connection', (data) => {

      /*   data.activeUser.forEach(element => {
            $('#contact-list').prepend(`<ul class="nav nav-stacked" id="all-contacts">
                <li class="contact-wrapper">
                    <a href="#">
                        <span class="contact-img" style='background-image: url(/assets/img/user3-128x128.jpg);'></span>
                        <span class="contact-name">${element}</span>
                         <br>
                        <!--  <br>
                        <p class="recent-message">I am a midfield fraud dsdssdddddddfffffffffffffff</p>
                        <span class="date-sent">9/12/16</span> --!>
                    </a>
                </li>
            </ul>`);
            console.log(element)
        });
 */
        console.log(data)
    });

}
const sendMessage = () => {
    let message = document.querySelector('#send-msg').value;
    if (message != "") {
        let trimedMessage = message.trim()

        message = " ";
        socket.emit('chat sender', {
            socket: socket.id,
            message: trimedMessage
        });
        socket.emit('chat reciever', trimedMessage);
        $("#send-msg").val("")
    }
}

const testMessage = () => {
    document.querySelector('#send-btn').addEventListener('click', () => {
        sendMessage();
    });

    document.querySelector("#send-msg").addEventListener('keypress', (e) => {
        if (e.keyCode == 13) {
            sendMessage();
        }
    })

    socket.on('chat sender', (msg) => {
        $('#msg-body').append(`<div class="chat-sender-div">
        <p class="chat-sender">${msg.message}</p>
        </div>`);
        console.log(msg)
    });

    socket.on('chat reciever', (msg) => {
        $('#msg-body').append(`<div class="chat-receiver-div">
                    <p class="chat-receiver">${msg}</p>
                </div>`);
        console.log(msg)
    });
}

(function () {
    newConnection();
    testMessage();
    socket.emit('disconnect', {
        user: localStorage.getItem('username')
    })
    socket.on('disconnect', (data) => {
        $('#contact-element').html('');
        /*  data.still.forEach(element => {
             $("#contact-list").prepend(`<li class="contact-wrapper">
         <a href="#">
         <span class="contact-img" style='background-image: url(/assets/img/user3-128x128.jpg);'></span>
         <span class="contact-name">${element}</span>
         <br>
         <!--<p class="recent-message"></p>
         <span class="date-sent">${Date.now()}</span>-->
         </a>
         </li>`)
             console.log(element)
         }); */
        console.log('disconnect ' + data.message)
    });
})(); 
