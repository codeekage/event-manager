/* (function () {
    let agenda;
    let ul = document.getElementById("agenda-list");
    let li = ul.getElementsByTagName("li");
    let breakAgenda = "";

    for (let i = 0; i < li.length; i++) {
        agenda = `<li class="list-group-item d-flex justify-content-between align-items-center">
                ${li[i].innerText} 
                <span>
                  <button class="btn btn-light btn-sm">
                     <i class="icon text-info fas fa-pencil-alt fa-fw"></i>
                    </button>
                <button class="btn btn-light btn-sm">
                     <i class="icon text-danger fas fa-trash-alt fa-fw"></i> 
                </button>
                </span>`;

        breakAgenda += agenda.split(",").join(`
        <span>
            <button class="btn btn-light btn-sm" id="edit-agenda">
                <i class="icon text-info fas fa-pencil-alt fa-fw"></i>
            </button>
            <button class="btn btn-light btn-sm" id="edit-agenda">
                <i class="icon text-danger fas fa-trash-alt fa-fw"></i>
            </button>
        </span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
        `);
    }

    $("#agenda-list").html(breakAgenda)


    $('#exampleModal').on('hidden.bs.modal', function (e) {
        $("#modal-field").html(`<div class="form-group">
                <label for="recipient-name" class="col-form-label">Agenda</label>
                <input type="text" class="form-control" id="agenda-field-0">
            </div>`);
    })
})(); */
function get(url, callback) {
    $.ajax({
        url: url,
        method: 'GET',
        success: (data, status) => {
            return callback(data, status)
        },
        error: (data, status) => {
            return callback(data, status)
        },
    })
}

function createTableRows(index, username, fullname, email, phone){
    $('#t-body').append(`<tr>
                        <th scope="row">${index}</th>
                        <td>${username}</td>
                        <td>${fullname}</td>
                        <td>${email}</td>
                        <td>${phone}</td>
                    </tr>`)
}


function viewTable() {
    $('#view').on('click', function() {
        $('#manage-tab').fadeOut(function(){
            $('#manage-tab').addClass('d-none');
            $('#manage-table').fadeIn(function() {
                $('#manage-table').removeClass('d-none')
                $('#view').addClass('d-none');
                $('#hide').removeClass('d-none')
                fetchAttendee();
            })

        })
    })

    $('#hide').on('click', function() {
        $('#manage-table').fadeOut(function () {
            $('#manage-table').addClass('d-none');
            $('#manage-tab').fadeIn(function () {
                $('#manage-tab').removeClass('d-none')
                $('#view').removeClass('d-none')
                $('#hide').addClass('d-none');
                fetchAttendee();
            })

        })
    })
}

const fetchAttendee = () => {
    let link = location.href.split('/')[4],
        evtLink = link.split('.')[0],
        name = link.split('.')[1];

    get(`/api/attendee/${evtLink}`, (data, status) => {
        console.log(data)
        data.forEach((element, index) => {
            get(`/api/users/${element.user_id}`, (data, status) => {
                createTableRows(index, data.username, data.fullname, data.email, data.phone)
                console.log(data)
            });
            $('#t-body').html('')
        });
    })

}

(function(){
    viewTable();
})();