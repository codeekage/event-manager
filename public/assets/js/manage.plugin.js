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