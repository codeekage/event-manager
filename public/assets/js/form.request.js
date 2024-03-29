function putRequest(url, object, successCallBack, errorCallback) {
    $.ajax({
        url: url,
        method: "PUT",
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

/* function invite(){
  
} */

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

    /*   $("#invite").on("click", function (e) {
          e.preventDefault();
          invite();
      }); */
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
                $(`#${toDelete}`).fadeOut("slow", function () {
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
        document.getElementById("submit-edit").removeAttribute("disabled")
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
                //evt_date: document.getElementById("evt_date").value,
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
                    document.getElementById("submit-edit").setAttribute("disabled", true)
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
    });
    editEventDate();
}

function editEventDate() {
    document.querySelector("#edit-evt-date").addEventListener('click', (e) => {
        document.getElementById("evt_date").removeAttribute("disabled")
        $("#evt_date").focus();
        $("#edit-evt-date").fadeOut(() => {
            document.querySelector("#edit-evt-date").classList.add('d-none');
            document.querySelector("#check-evt-date").classList.remove('d-none');
        });
    });

    document.querySelector("#check-evt-date").addEventListener('click', (e) => {
        let links = location.href.split("/")[4]
        $.ajax({
            url: `/api/events/${links}`,
            method: "PUT",
            contentType: "application/json",
            dataType: "JSON",
            data: JSON.stringify({
                evt_date: document.getElementById("evt_date").value,
            }),
            success: (data, status) => {
                swal("Saved!", {
                    icon: "success",
                }).then((willRefresh) => {
                    document.getElementById("evt_date").setAttribute("disabled", true)
                });
                $("#check-evt-date").fadeOut(() => {
                    $("#edit-evt-date").fadeIn(() => {
                        document.querySelector("#edit-evt-date").classList.remove('d-none');
                        document.querySelector("#check-evt-date").classList.add('d-none');
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
    });


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
        $(`#agenda-field-${index}`).focus();
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

            $('#agendaModal').modal('hide');

            agenda.forEach(element => {
                addAgenda(element);
            })

            agenda = [];
            arr = [];
            index = 1;
        }
    });

    $('#agendaModal').on('hidden.bs.modal', function (e) {
        // do something...
        $("#modal-field").html(`<div class="form-group">
            <label for="recipient-name" class="col-form-label">Agenda</label>
            <input type="text" class="form-control" id="agenda-field-0">
        </div>`);
    });

    $('#agendaModal').on('shown.bs.modal', function (e) {
        $("#agenda-field-0").focus();
    });
    editAgenda();
    deleteAgenda();
    checkOffAgenda();

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
            <li class="list-group-item d-flex justify-content-between align-items-center" id="agenda-item-${data.agenda._id}">
              <div class="${data.agenda.state}" id="toedit-${data.agenda._id}" style="width:86%; padding:5px;" >    
              ${agenda}
              </div>
            <span>
              <button class="btn btn-light btn-sm done-agenda"  id="done-${data.agenda._id}" data-id="${data.agenda._id}">
                    <i class="icon text-success fas fa-minus fa-fw"></i>
                </button>
              <button class="btn d-none btn-light btn-sm"  id="accept-${data.agenda._id}" data-id="${data.agenda._id}">
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

            deleteAgenda();
            editAgenda();
            checkOffAgenda();

            console.log(data)

        },
        error: function () {
            alert("failed!")
        }
    })
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
        $(`#speakers-field-${index}`).focus()
        console.log(index)
        arr.push(index);
        index++;
    })


    $("#add-speakers").on("click", function () {
        if (document.querySelector('#speakers-field-0').value !== "") {
            speaker.push({
                speaker_name: document.querySelector('#speakers-field-0').value,
                speaker_bio: document.querySelector('#speakers-bio-0').innerText
            }
            );

            for (let i = 0; i < arr.length; i++) {
                if (document.querySelector(`#speakers-field-${arr[i]}`).value !== "") {
                    speaker.push(
                        {
                            speaker_name: document.querySelector(`#speakers-field-${arr[i]}`).value,
                            speaker_bio: document.querySelector(`#speakers-bio-${arr[i]}`).innerText
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

    $('#speakerModal').on('shown.bs.modal', function (e) {
        $("#speakers-field-0").focus();
    });
    $('#speakerModal').on('hidden.bs.modal', function (e) {
        $("#speakers-modal-field").html(`<div class="form-group">
                <label for="recipient-name" class="col-form-label">Speaker's Name</label>
                <input type="text" class="form-control" id="speakers-field-0">
            </div>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Speaker's Bio</label>
                <div class="bio" contenteditable="true" id="speakers-bio-0"></div>
            </div>`);
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

function goLive() {
    let link = location.href.split("/")[4];
    setInterval(() => {
        $("#off-live").css({ "background": "#2e82d5db" });
    }, 1000);

    setInterval(() => {
        $("#off-live").css({ "background": "#dc3545" });
    }, 2000);
    $("#on-live").on('click', () => {
        putRequest(`/api/events/${link}`, {
            evt_status: true
        }, (data, status) => {

            $("#on-live").addClass("d-none");
            $("#off-live").removeClass("d-none");

            setInterval(() => {
                $("#off-live").css({ "background": "#2e82d5db" });
            }, 1000);

            setInterval(() => {
                $("#off-live").css({ "background": "#dc3545" });
            }, 2000);

            console.log(data);
        }, (data, status) => {

            console.log(data)
        })

    });

    $("#off-live").on('click', () => {
        putRequest(`/api/events/${link}`, {
            evt_status: false
        }, (data, status) => {
            $("#off-live").addClass("d-none");
            $("#on-live").removeClass("d-none");
            console.log(data)
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

    });

    
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
                <div  class="mb-0 d-flex justify-content-between align-items-center" >
                <div id="speaker-toedit-${data.speaker._id}">${data.speaker.evt_speaker}</div>
               
                    <span>
                        <button class="btn d-none btn-light btn-sm" id="speaker-accept-${data.speaker._id}" data-id="${data.speaker._id}">
                            <i class="icon text-info fas fa-check fa-fw"></i>
                        </button>
                        <button class="btn btn-light btn-sm edit-speaker" {{button_state}} id="edit-agenda" data-id="${data.speaker._id}">
                            <i class="icon text-info fas fa-pencil-alt fa-fw"></i>
                        </button>
                        <button class="btn btn-light btn-sm delete-speaker" id="delete-agenda" data-id="${data.speaker._id}">
                            <i class="icon text-danger fas fa-trash-alt fa-fw"></i>
                        </button>
                    </span>
                 </div> 
            </div>
            <div id="collapse${data.speaker._id}" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                <div class="card-body" id="speaker-bio-toedit-${data.speaker._id}">
                   ${data.speaker.speaker_bio}
                </div>
            </div>
        </div>`);

            editSpeaker();
            deleteSpeaker();
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
        case "create":
            eventRequest();
            break;
        case "manage":
            editEvent();
            goLive();
            eventRequest();
            agendaRequest();
            shareEvent();
            speakersRequest();
            break;
        default:
            eventRequest();
            shareEvent();
            break;
    }
})();