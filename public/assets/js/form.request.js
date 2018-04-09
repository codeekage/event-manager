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
            location.href = "/";
            break
        default:
            break;
    }
}


function shareEvent() {
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
                    disabled: ""
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
                    value: false,
                    visible: true,
                    className: "",
                    closeModal: true,
                },

            },
        })
            .then((value) => {
                if (value !== false) {
                    let copyText = document.getElementById("copy-text")
                    copyFunction(copyText)
                }
            });
    });
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
        let toDelete = $(this).data("id").toString();
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

function editEvent() {
    document.getElementById("edit-event").addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("evt_name").removeAttribute("disabled")
        document.getElementById("evt_venue").removeAttribute("disabled")
        document.getElementById("evt_date").removeAttribute("disabled")
        document.getElementById("evt_passkey").removeAttribute("disabled")
        document.getElementById("evt_type").removeAttribute("disabled")
        document.getElementById("evt_occ").removeAttribute("disabled")
        document.getElementById("noti_msg").setAttribute("contenteditable", true)
    });

    document.getElementById("submit-edit").addEventListener("click", function (e) {
        e.preventDefault();
        let links = location.href.split("/")[4]
        $.ajax({
            url: `/api/events/${links}`,
            method: "PUT",
            contentType: "application/json",
            dataType: "JSON",
            data: JSON.stringify({
                evt_name: document.getElementById("evt_name").value,
                evt_venue: document.getElementById("evt_venue").value,
                evt_date: document.getElementById("evt_date").value,
                evt_type: document.getElementById("evt_type").value,
                evt_occ: document.getElementById("evt_occ").value,
                noti_msg: document.getElementById("noti_msg").innerText,
                evt_passkey: document.getElementById("evt_passkey").value
            }),
            success: function (data, status) {
                swal("Saved!", {
                    icon: "success",
                }).then((willRefresh) => {
                    document.getElementById("evt_name").setAttribute("disabled", true)
                    document.getElementById("evt_venue").setAttribute("disabled", true)
                    document.getElementById("evt_date").setAttribute("disabled", true)
                    document.getElementById("evt_passkey").setAttribute("disabled", true)
                    document.getElementById("evt_occ").setAttribute("disabled", true)
                    document.getElementById("evt_type").setAttribute("disabled", true)
                    document.getElementById("noti_msg").setAttribute("contenteditable", false)
                });

            },
            error: function (data, status) {
                swal("Failed! Your imaginary file hasn't been deleted!" + data, {
                    icon: "error",
                });
                console.log(data)
            }
        })
    })



}

function togglePassword(id) {
    let type = document.querySelector(id).getAttribute("type");
    switch (type) {
        case "password":
            document.querySelector(id).setAttribute("type", "text");
            document.querySelector("#show-password").innerText = "hide password";
            break;
        case "text":
            document.querySelector(id).setAttribute("type", "password");
            document.querySelector("#show-password").innerText = "show password";
            break;
        default:
            break;
    }
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

    $("#show-password").on("click", function () {
        togglePassword("#password");
    })

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

function addAgenda(agenda) {
    let links = location.href.split("/")[4];
    $.ajax({
        url: `/api/agenda/${links}`,
        method: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify({
            evt_link: links,
            evt_agenda: agenda
        }),
        success: function (data, status) {
            $("#agenda-list").prepend(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
            ${agenda}
            <span>
                <button class="btn btn-light btn-sm" id="edit-agenda"  data-id="${data.agenda._id}">
                    <i class="icon text-info fas fa-pencil-alt fa-fw"></i>
                </button>
                <button class="btn btn-light btn-sm" id="edit-agenda" data-id="${data.agenda._id}">
                    <i class="icon text-danger fas fa-trash-alt fa-fw"></i>
                </button>
                </span>
            </li>`);

            console.log(data)

        },
        error: function () {
            alert("failed!")
        }
    })
}

function agendaRequest() {
    let index = 1;
    var arr = [];
    let agenda = [];
    document.querySelector("#add-field").addEventListener("click", function () {
        $("#modal-field").append(`
           <div class="form-group">
                <label for="recipient-name" class="col-form-label">Agenda</label>
                <input type="text" class="form-control" id="agenda-field-${index}">
            </div>
        `)
        console.log(index)
        arr.push(index);
        index++;
    })


    $("#add-agenda").on("click", function () {
        if (document.querySelector('#agenda-field-0').value !== "") {
            agenda.push(document.querySelector('#agenda-field-0').value);

            for (let i = 0; i < arr.length; i++) {
                if (document.querySelector(`#agenda-field-${arr[i]}`).value !== "") {
                    agenda.push(document.querySelector(`#agenda-field-${arr[i]}`).value);
                } else {
                    alert("Make sure fields are not empty")
                }
            }

            $("#modal-field").html(`<div class="form-group">
                <label for="recipient-name" class="col-form-label">Agenda</label>
                <input type="text" class="form-control" id="agenda-field-0">
            </div>`);

            $('#exampleModal').modal('hide');

            agenda.forEach(element => {
                addAgenda(element);
            })

            agenda = [];
            arr = [];
            index = 1;
        }
    });

 

}


function editAgenda(){
    $(".edit-agenda").on('click', function(){
        let toEdit = $(this).data("id");
        alert(toEdit);
        
        document.querySelector(`#toedit-${toEdit}`).setAttribute("contenteditable", true);
        $(`#toedit-${toEdit}`).focus();
        $(`#accept-${toEdit}`).removeClass("d-none");
        $(`#accept-${toEdit}`).on("click", function(){
            document.querySelector(`#toedit-${toEdit}`).setAttribute("contenteditable", false);
            $(`#accept-${toEdit}`).addClass("d-none");
        });
        
    })
}

(function () {
    shareEvent();
    let currentRoute = location.href.split("/")[3];
    switch (currentRoute) {
        case "registration":
            hostRequest();
            break;
        case "login":
            hostRequest();
            break;
        case "edit":
            editEvent();
            break;
        case "create":
            eventRequest();
            break;
        case "manage":
            eventRequest();
            editAgenda();
            agendaRequest();
            break;
        default:
            break;
    }
})();