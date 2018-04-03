function showRequest(formData, jqForm, options) {
    alert('Loading..');
    console.log({ formData: formData, jqForm: jqForm, options: options })
    return true;
} // post-submit callback

function showResponse(responseText, statusText, xhr, $form) {
    alert('status: ' + statusText + '\n\nresponseText: \n' + responseText);
    if(statusText === "error"){
        demo.showNotification('top', 'right', 'An error occured '+JSON.stringify(responseText), 'danger');
    }else{
        switch (responseText.success) {
            case false:
                let msg = JSON.stringify(responseText);
                demo.showNotification('top', 'right', 'An error occured! ' + msg, 'danger');
                break;
            case true:
                demo.showNotification('top', 'right', 'Success!', 'primary');
                let route = location.href.split("/")[3];
                routes(route);
                break;
            default:
                break;
        }
    }
    console.log(responseText, $form)
}

function routes(route){
    switch (route) {
        case "registration":
            location.href = "/login";
            break;
        case "settings":
            location.href = "events";
        break
        default:
            break;
    }
}

function eventRequest() {
    var options = {
        url: `/api/events`,
        method: "POST",
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse, // post-submit callback
        error: showResponse,
    };
    // binding to the form's submit event
    $('#event-form').submit(function () {
        $(this).ajaxSubmit(options);
        return false; // always return false to prevent standard browser submit and page navigation
    });
}

function hostRequest() {
    let registrationOptions = {
        url: `host/registration`,
        method: "POST",
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse, // post-submit callback
        error: showResponse,
    };
    // binding to the form's submit event
    $('#host-registration').submit(function () {
        $(this).ajaxSubmit(registrationOptions);
        return false; // always return false to prevent standard browser submit and page navigation
    });

    /* et loginOptions = {
        url: `/login`,
        method: "POST",
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse, // post-submit callback
        error: showResponse,
    }

    // binding to the form's submit event
    $('#host-login').submit(function () {
        $(this).ajaxSubmit(loginOptions);
       return false; // always return false to prevent standard browser submit and page navigation
    });  */
}


(function(){
    eventRequest();
    hostRequest();
})();