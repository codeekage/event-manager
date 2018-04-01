function showRequest(formData, jqForm, options) {
    alert('Uploading is starting.');
    console.log({ formData: formData, jqForm: jqForm, options: options })
    return true;
} // post-submit callback

function showResponse(responseText, statusText, xhr, $form) {
    alert('status: ' + statusText + '\n\nresponseText: \n' + responseText);
    console.log($form)
}

function eventHandler() {
    var options = {
        url: `/api/event`,
        method: "POST",
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse // post-submit callback
    };
    // binding to the form's submit event
    $('#event-form').submit(function () {
        $(this).ajaxSubmit(options);
        return false; // always return false to prevent standard browser submit and page navigation
    });
}

function eventRequest() {
    document.querySelector("#btn-event").addEventListener("click", function(){
        $.ajax({
            url : '/api/events',
            method: "POST",
            contentType: "application/json",
            dataType: "JSON",
            data: JSON.stringify({
                username: "hgjkl",
                btc_qty: "hgjkl",
                status: "hgjkl",
                user_id:111
            }),
            success: function (data) {
                console.log("sucess: ", data)
                return false;
            },
            error: function (data, status) {
                console.log(data)
                return false;
            }
        })
    })  
}

(function(){
    eventHandler();
})();