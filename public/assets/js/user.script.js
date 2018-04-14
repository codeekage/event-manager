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
                if (!localStorage.getItem("userID")) {
                    $('#attendModal').modal('show')
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
                demo.showNotification('top', 'right', 'Success!', 'success');
                $('#attendModal').modal('hide', function(){
                    location.href = "/login";
                })
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
            document.querySelector(".toggle-password").classList.add("text-danger")
            break;
        case "text":
            document.querySelector(id).setAttribute("type", "password");
            document.querySelector(".toggle-password").innerText = "show password";
            document.querySelector(".toggle-password").classList.remove("text-danger")
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

    document.querySelector('.toggle-password').addEventListener('click', (e) => {
        togglePassword(".password");
        togglePassword(".password2");
    })

}


(function () {
   
    attendRequest();
   
})();