function showRequest(formData, jqForm, options) {
    demo.showNotification('top', 'right', 'Loading...', 'danger');
    console.log({ formData: formData, jqForm: jqForm, options: options })
    return true;
} // post-submit callback

function showResponse(responseText, statusText, xhr, $form) {
    ///alert('status: ' + statusText + '\n\nresponseText: \n' + responseText);
    if (statusText === "error") {
        demo.showNotification('top', 'right', 'An error occured ' + JSON.stringify(responseText), 'danger');
        console.log(responseText)
    } else {
        let msg = JSON.stringify(responseText);
        switch (responseText.success) {
            case false:
                demo.showNotification('top', 'right', 'An error occured! ' + msg, 'danger');
                //alert(`${msg} : Error`)
                break;
            case true:
                demo.showNotification('top', 'right', 'Success!', 'success');
                //alert(`${msg} : success`)
                if (!localStorage.getItem("username")) {
                    $('#registerModal').modal('show')
                }else{
                    demo.showNotification('top', 'left', 'Redirecting...', 'success');
                    setTimeout(() => {
                        location.href = "/chat";
                    }, 2000);
                }
                break;
            default:
                break;
        }
    }
    console.log(responseText, $form)
}

function signUpShowResponse(responseText, statusText, xhr, $form) {
    ///alert('status: ' + statusText + '\n\nresponseText: \n' + responseText);
    if (statusText === "error") {
        demo.showNotification('top', 'right', 'An error occured ' + JSON.stringify(responseText), 'danger');
        console.log(responseText)
    } else {
        let msg = JSON.stringify(responseText);
        switch (responseText.success) {
            case false:
                demo.showNotification('top', 'right', 'An error occured! ' + msg, 'danger');
                //alert(`${msg} : Error`)
                break;
            case true:
                let username = document.querySelector("#username").value;
                demo.showNotification('top', 'right', 'Success!', 'success');
                $('#registerModal').modal('hide');
                localStorage.setItem("username", username);
                setTimeout(() => {
                    location.href = "/chat"
                }, 2000);
                //alert(`${msg} : success`)
                break;
            default:
                break;
        }
    }
    console.log(responseText, $form)
}


function togglePassword(id) {
    let type = document.querySelector(id).getAttribute("type");
    switch (type) {
        case "password":
            document.querySelector(id).setAttribute("type", "text");
            document.querySelector(".toggle-password").innerText = "hide password";
            document.querySelector("#password").innerText = "hide password";
            document.querySelector("#password").classList.add("text-danger")
            break;
        case "text":
            document.querySelector(id).setAttribute("type", "password");
            document.querySelector(".toggle-password").innerText = "show password";
            document.querySelector("#password").innerText = "show password";
            document.querySelector("#password").innerText = "show password";
            document.querySelector("#password").classList.remove("text-danger")
            break;
        default:
            break;
    }
}


function attendRequest() {

    let link = location.href.split("/")[4];
    let attendOptions = {
        url: `/attend/${link}`,
        method: "POST",
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse, // post-submit callback
        error: showResponse,
    };
    // binding to the form's submit event
    $('#attend-event').submit(function () {
        $(this).ajaxSubmit(attendOptions);
        return false; // always return false to prevent standard browser submit and page navigation
    });

    let signUpOptions = {
        url: `/signup`,
        method: "POST",
        beforeSubmit: showRequest,
        success: signUpShowResponse,
        error: showResponse,
    }

    $('#signup-form').submit(function () {
        $(this).ajaxSubmit(signUpOptions);
        return false; // always return false to prevent standard browser submit and page navigation
    });

   /*  let joinOptions = {
        url: `/join`,
        method: "POST",
        beforeSubmit: showRequest,
        success: signUpShowResponse,
        error: showResponse,
    }

    $('#join-form').submit(function () {
        $(this).ajaxSubmit(joinOptions);
        return false; // always return false to prevent standard browser submit and page navigation
    }); */

    document.querySelector('.toggle-password').addEventListener('click', (e) => {
        togglePassword(".password");
        togglePassword(".password2");
        togglePassword(".password3");
    });

    document.querySelector('#password').addEventListener('click', (e) => {
        togglePassword(".password3");
    });

    document.querySelector('#login').addEventListener('click', function(){
        $('#registerModal').modal('hide');
        $('#loginModal').modal('show');
    })

    document.querySelector('#join').addEventListener('click', function(){
        $('#registerModal').modal('show');
        $('#loginModal').modal('hide');
    })

}


(function () {

    attendRequest();

})();