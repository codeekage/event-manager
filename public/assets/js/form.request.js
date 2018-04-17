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
                setTimeout(() => {
                    routes(route);
                }, 1500);
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
        case "create":
            location.href = "/";
            break;
        default:
            break;
    }
}


function shareEvent() {
    $(".share-link").on("click", function (e) {
        e.preventDefault();
        let copiedLink = `${location.origin}${$(this).data("link")}`
        swal("Click Copy to Get Sharable Link", {
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
        method: "DELETE",
        contentType: "application/json",
        dataType: "JSON",
        success: function (data, status) {
            swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
            }).then((willRefresh) => {
                //
                $(`#${toDelete}`).fadeOut("slow", function(){
                    location.reload();
                })
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
              <button class="btn d-none btn-light btn-sm"  id="done-${data.agenda._id}" data-id="${data.agenda._id}">
                    <i class="icon text-info fas fa-check fa-fw"></i>
                </button>
                <button class="btn btn-light btn-sm edit-agenda" id="edit-agenda" data-id="${data.agenda._id}">
                    <i class="icon text-info fas fa-pencil-alt fa-fw"></i>
                </button>
                <button class="btn btn-light btn-sm delete-agenda" id="-agenda" data-id="${data.agenda._id}">
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
    editAgenda();
    deleteAgenda();
    checkOffAgenda();

}

function checkOffAgenda() {
    $(".done-agenda").on('click', function () {
        let toCheck = $(this).data("id");
        let links = location.href.split("/")[4];
        $.ajax({
            url: `/api/agenda/${links}?_id=${toCheck}`,
            method: "PUT",
            contentType: "application/json",
            dataType: "JSON",
            data: JSON.stringify({
                state: "done",
                "button_state": "disabled"
            }),
            success: function (data, status) {
                $(`#toedit-${toCheck}`).addClass('done');
                console.log(data)
            },
            error: function (data, status) {
                console.log(data)
            }
        })
    })
}
function editAgenda() {
    $(".edit-agenda").on('click', function () {
        let toEdit = $(this).data("id");

        document.querySelector(`#toedit-${toEdit}`).setAttribute("contenteditable", true);
        $(`#toedit-${toEdit}`).focus();
        $(`#done-${toEdit}`).slideUp(function () {
            $(`#accept-${toEdit}`).fadeIn(function () {
                $(`#accept-${toEdit}`).removeClass("d-none");
            });
        });
        $(`#accept-${toEdit}`).on("click", function () {
            let links = location.href.split("/")[4];
            $.ajax({
                url: `/api/agenda/${links}?_id=${toEdit}`,
                method: "PUT",
                contentType: "application/json",
                dataType: "JSON",
                data: JSON.stringify({
                    evt_agenda: document.querySelector(`#toedit-${toEdit}`).innerHTML
                }),
                success: function (data, status) {
                    document.querySelector(`#toedit-${toEdit}`).setAttribute("contenteditable", false);
                    $(`#accept-${toEdit}`).fadeOut(function () {
                        $(`#done-${toEdit}`).slideDown(function () {
                            $(`#accept-${toEdit}`).addClass("d-none");
                        });
                    });
                    console.log(data)
                },
                error: function (data, status) {
                    console.log(data)
                }
            })
        });

    })
}



function deleteAgenda() {

    $(".delete-agenda").on('click', function () {
        let links = location.href.split("/")[4];
        let toDelete = $(this).data("id");
        alert(toDelete)
        $.ajax({
            url: `/api/agenda/${links}?_id=${toDelete}`,
            method: "DELETE",
            contentType: "application/json",
            dataType: "JSON",
            success: function (data, status) {
                $(`#agenda-item-${toDelete}`).slideUp(function () {
                    $(`#agenda-item-${toDelete}`).remove();
                });
                console.log(data)
            },
            error: function (data, status) {
                console.log(data)
            }
        })
    })
}

function speakersRequest() {
    let index = 1;
    var arr = [];
    let speaker = [];
    document.querySelector("#add-speakers-field").addEventListener("click", function () {
        $("#speakers-modal-field").append(`
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Speaker's Name</label>
                <input type="text" class="form-control" id="speakers-field-${index}">
            </div>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Speaker's Bio</label>
                <div class="bio" contenteditable="true" id="speakers-bio-${index}"></div>
            </div>
        `)
        console.log(index)
        arr.push(index);
        index++;
    })


    $("#add-speakers").on("click", function () {
        if (document.querySelector('#speakers-field-0').value !== "") {
            speaker.push({
                speaker_name: document.querySelector('#speakers-field-0').value,
                speaker_bio: document.querySelector('#speakers-bio-0').innerHTML
            }
            );

            for (let i = 0; i < arr.length; i++) {
                if (document.querySelector(`#speakers-field-${arr[i]}`).value !== "") {
                    speaker.push(
                        {
                            speaker_name: document.querySelector(`#speakers-field-${arr[i]}`).value,
                            speaker_bio: document.querySelector(`#speakers-bio-${arr[i]}`).innerHTML
                        }
                    );

                } else {
                    alert("Make sure fields are not empty")
                }
            }

            $("#speakers-modal-field").html(`<div class="form-group">
                <label for="recipient-name" class="col-form-label">Speaker's Name</label>
                <input type="text" class="form-control" id="speakers-field-0">
            </div>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Speaker's Bio</label>
                <div class="bio" contenteditable="true" id="speakers-bio-0"></div>
            </div>`);

            $('#speakerModal').modal('hide');

            speaker.forEach(element => {
                addSpeaker(element);
            })

            console.log(speaker)

            speaker = [];
            arr = [];
            index = 1;
        } else {
            alert("soemthing is wrong")
        }
    });

    deleteSpeaker();
    editSpeaker();
}

function deleteSpeaker() {

    $(".delete-speaker").on('click', function () {
        let links = location.href.split("/")[4];
        let toDelete = $(this).data("id");
        $.ajax({
            url: `/api/speaker/${links}?_id=${toDelete}`,
            method: "DELETE",
            contentType: "application/json",
            dataType: "JSON",
            success: function (data, status) {
                $(`#speaker-item-${toDelete}`).slideUp(function () {
                    $(`#speaker-item-${toDelete}`).remove();
                });
                console.log(data)
            },
            error: function (data, status) {
                console.log(data)
            }
        })
    })
}

function editSpeaker() {
    $(".edit-speaker").on('click', function () {
        let toEdit = $(this).data("id");

        document.querySelector(`#speaker-toedit-${toEdit}`).setAttribute("contenteditable", true);
        document.querySelector(`#speaker-bio-toedit-${toEdit}`).setAttribute("contenteditable", true);
        $(`#speaker-toedit-${toEdit}`).focus();
        $(`#speaker-bio-toedit-${toEdit}`).css({ "border": "solid 1px green" });
        $(`#speaker-accept-${toEdit}`).removeClass("d-none");
        $(`#speaker-accept-${toEdit}`).on("click", function () {
            let links = location.href.split("/")[4];
            $.ajax({
                url: `/api/speaker/${links}?_id=${toEdit}`,
                method: "PUT",
                contentType: "application/json",
                dataType: "JSON",
                data: JSON.stringify({
                    evt_speaker: document.querySelector(`#speaker-toedit-${toEdit}`).innerHTML,
                    speaker_bio: document.querySelector(`#speaker-bio-toedit-${toEdit}`).innerHTML
                }),
                success: function (data, status) {
                    document.querySelector(`#speaker-toedit-${toEdit}`).setAttribute("contenteditable", false);
                    document.querySelector(`#speaker-bio-toedit-${toEdit}`).setAttribute("contenteditable", false);
                    $(`#speaker-accept-${toEdit}`).addClass("d-none");
                    $(`#speaker-bio-toedit-${toEdit}`).css({ "border": "none" });
                    console.log(data)
                },
                error: function (data, status) {
                    console.log(data)
                }
            })
        });

    })
}


function addSpeaker(speaker) {
    let links = location.href.split("/")[4];
    $.ajax({
        url: `/api/speaker/${links}`,
        method: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify({
            evt_link: links,
            evt_speaker: speaker.speaker_name,
            speaker_bio: speaker.speaker_bio
        }),
        success: function (data, status) {
            $("#accordion").prepend(`
            <div class="card mb-1" id="speaker-item-${data.speaker._id}">
            <div class="card-header bg-light collapsed" id="headingTwo" data-toggle="collapse" data-target="#collapse${data.speaker._id}" aria-expanded="false" aria-controls="collapseTwo">
            <p class="mb-0  d-flex justify-content-between align-items-center">
            ${data.speaker.evt_speaker}
                  
                    <span>
                        <button class="btn d-none btn-light btn-sm" id="accept-${data.speaker._id}" data-id="${data.speaker._id}">
                            <i class="icon text-info fas fa-check fa-fw"></i>
                        </button>
                        <button class="btn btn-light btn-sm edit-speaker" {{button_state}} id="edit-agenda" data-id="${data.speaker._id}">
                            <i class="icon text-info fas fa-pencil-alt fa-fw"></i>
                        </button>
                        <button class="btn btn-light btn-sm delete-speaker" id="delete-agenda" data-id="${data.speaker._id}">
                            <i class="icon text-danger fas fa-trash-alt fa-fw"></i>
                        </button>
                    </span>
                    </p>
            </div>
            <div id="collapse${data.speaker._id}" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                <div class="card-body">
                ${data.speaker.speaker_bio}
                </div>
            </div>
        </div>`);

            console.log(data)
        },
        error: function (data, status) {
            console.log(data)
        }
    })

}

(function () {

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
            agendaRequest();
            speakersRequest();
            break;
        default:
            eventRequest();
            shareEvent();
            break;
    }
})();