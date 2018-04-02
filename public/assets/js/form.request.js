function showRequest(formData, jqForm, options) {
    alert('Uploading is starting.');
    console.log({ formData: formData, jqForm: jqForm, options: options })
    return true;
} // post-submit callback

function showResponse(responseText, statusText, xhr, $form) {
    alert('status: ' + statusText + '\n\nresponseText: \n' + responseText);
    if(statusText === "error"){
        demo.showNotification('top', 'right', 'An error occured '+JSON.stringify(responseText), 'primary');
    }
    console.log(responseText, $form)
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

(function(){
    eventRequest();
})();