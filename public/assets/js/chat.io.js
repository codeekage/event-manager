//INIT SOCKET
const socket = io.connect();
let chatBody = document.querySelector('#msg-body');


function post(url, object, successCallBack, errorCallback) {
    $.ajax({
        url: url,
        method: "POST",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(object),
        success: (data, status) => {
            return successCallBack(data, status)
        },
        error: (data, status) => {
            return errorCallback(data, status)
        }
    });
}

function get(url, successCallBack, errorCallback) {
    $.ajax({
        url: url,
        method: "GET",
        success: (data, status) => {
            return successCallBack(data, status)
        },
        error: (data, status) => {
            return errorCallback(data, status)
        }
    });
}

function createMessageElement(message, username, userID){
   /*  $('#msg-body').prepend(`<div id="chat-div-${userID}" class="chat-receiver-div">
        <p id="chat-p-${userID}"  class="chat-receiver">${message}</p>
        </div>`
    ) */
    $('#msg-body').prepend(`<div id="chat-div-${userID}" class="chat-receiver-div">
                     <p id="chat-p-${userID}" class="chat-receiver">
                        <span id="chat-user-${userID}">${username} : </span>
                        <br>
                         ${message}
                    <span id="chat-img-${userID}" class="chat-img" style='background-image: url(/assets/img/user3-128x128.jpg);'></span>
                    </p>
                </div>`
    )
}

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
    let link = location.href.split('/')[4],
        userID = link.split('.')[1],
        evt_link = link.split('.')[0];
    if (message != "") {
        let trimedMessage = message.trim()
        post('/chat/message', {
            message : trimedMessage,
            user_id : userID,
            evt_link : evt_link
        }, (data, status) => {
            console.log(evt_link, userID, trimedMessage)
            message = " ";
            socket.emit('chat sender', {
                socket: socket.id,
                message: trimedMessage
            });
            socket.emit('chat reciever', {
                user : localStorage.getItem('username'),
                message : trimedMessage
            });
            $("#send-msg").val("")
        },(data, status) => {
            console.log(data)
        })
      
    }
}

const testMessage = () => {
    document.querySelector('#send-btn').addEventListener('click', () => {
        sendMessage();
    });

    document.querySelector("#send-msg").addEventListener('keypress', (e) => {
        if (e.keyCode == 13) {
            setInterval(() => {
                $("#sent-chats").scrollTop($("#sent-chats")[0].scrollHeight);            
            }, 1000);
            sendMessage();
        }
    })

    socket.on('chat sender', (msg) => {
        $(`#msg-body`).fadeIn("slow", function () {
        $('#msg-body').append(`<div class="chat-sender-div">
        <p class="chat-sender">${msg.message}</p>
        </div>`);
        })
        console.log(msg)
    });

    socket.on('chat reciever', (data) => {
        $(`#msg-body`).fadeIn("slow", function () {
            $('#msg-body').append(`<div class="chat-receiver-div">
                         <p class="chat-receiver">
                            <span>${data.user} : </span>
                            <br>
                              ${data.message}
                        <span class="chat-img" style='background-image: url(/assets/img/favicon.png);'></span>
                        </p>
                    </div>`);
        })
        console.log(data)
    });
}

function fetchMessage(){
    let hrefLink = location.href.split('/')[4],
        link = hrefLink.split('.')[0],
        userId = hrefLink.split('.')[1]; 
    get(`/chat/message/${link}`, (data, status) => {
        
        console.log(data)
        data.forEach(element => {
            get(`/api/users/${element.user_id}`, (data, status) => {
                createMessageElement(element.message, data.username, element.user_id)
                if(element.user_id === userId){
                    $(`#chat-user-${element.user_id}`).remove();
                    $(`#chat-img-${element.user_id}`).remove()
                    $(`#chat-p-${element.user_id}`).addClass('chat-sender')
                    $(`#chat-div-${element.user_id}`).addClass('chat-sender-div')
                    $(`#chat-div-${element.user_id}`).removeClass('chat-receiver-div')
                    $(`#chat-p-${element.user_id}`).removeClass('chat-receiver')
                }
            });
        });
    })
}

(function () {
    newConnection();
    testMessage();
    fetchMessage();
    socket.emit('disconnect', {
        user: localStorage.getItem('username')
    })

    $('#send-msg').focus();
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
