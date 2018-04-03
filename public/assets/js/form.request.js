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

function routes(route) {
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

    $(".remove-event").on("click", function () {
        console.log($(this).data("id").toString())
        let toDelete =  $(this).data("id").toString();
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    removeEvent(toDelete);
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    });

    $(".share-link").on("click", function (e) {
        e.preventDefault();
        let copiedLink = `${location.origin}${$(this).attr("href")}`
        swal("A wild Pikachu appeared! What do you want to do?", {
            content: {
                element: "input",
                attributes: {
                    placeholder: "Type your password",
                    type: "text",
                    value: copiedLink,
                    id: "copy-text",
                },
            },
            buttons: {
                confirm: {
                    text: "Copy",
                    value: true,
                    visible: true,
                    className: "tool-tip",
                    closeModal: true
                },
                cancel: {
                    text: "Close",
                    value : false,
                    visible: true,
                    className: "",
                    closeModal: true,
                },

            },
        })
            .then((value) => {
                if(value !== false){
                    let copyText = document.getElementById("copy-text")
                    copyFunction(copyText)
                }
            });
    })
}


function copyFunction(copyText) {
    copyText.select();
    document.execCommand("Copy");
    swal(`Copied Link: ${copyText.value}`, {
        buttons: false,
        timer: 2000,
    });
}


function removeEvent(toDelete) {
    $.ajax({
        url: `/api/events/${toDelete}`,
        method: "PUT",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify({
            delete_status: 1
        }),
        success: function (data, status) {
            swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
            }).then((willRefresh) => {
                location.reload();
            });

        },
        error: function (data, status) {
            swal("Failed! Your imaginary file hasn't been deleted!" + data, {
                icon: "error",
            });
            console.log(data)
        }
    })
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


(function () {
    eventRequest();
    hostRequest();
})();