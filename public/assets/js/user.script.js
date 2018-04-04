function showRequest(formData, jqForm, options) {
    alert('Loading..');
    console.log({ formData: formData, jqForm: jqForm, options: options })
    return true;
} // post-submit callback

function showResponse(responseText, statusText, xhr, $form) {
    alert('status: ' + statusText + '\n\nresponseText: \n' + responseText);
    if (statusText === "error") {
        demo.showNotification('top', 'right', 'An error occured ' + JSON.stringify(responseText), 'danger');
    } else {
        switch (responseText.success) {
            case false:
                let msg = JSON.stringify(responseText);
                //demo.showNotification('top', 'right', 'An error occured! ' + msg, 'danger');
                alert(`${responseText.message} : Error`)
                break;
            case true:
                //demo.showNotification('top', 'right', 'Success!', 'primary');
                alert(`${responseText.message} : success`)
                if(!localStorage.getItem("userID")){
                   
                }
                break;
            default:
                break;
        }
    }
    console.log(responseText, $form)
}

function attendRequest(){
    let link = location.href.split("/")[4];
    let options = {
        url: `/attend/${link}`,
        method: "POST",
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse, // post-submit callback
        error: showResponse,
    };
    // binding to the form's submit event
    $('#attend-event').submit(function () {
        $(this).ajaxSubmit(options);
        return false; // always return false to prevent standard browser submit and page navigation
    });
}

(function(){
    attendRequest();
})();