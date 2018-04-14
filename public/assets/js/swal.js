/* 
function addAgenda(){
    $.ajax({
        url: `/api/agenda/${links}`,
        method: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify({
            evt_link: links,
            evt_agenda: agenda
        }),
        success : function(){
            alert("Done!");
        },
        error : function (){
            alert("failed!")
        }
    })
}


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
        console.log(data);
        if (data.success === true) {
            let agendas = `<li class="list-group-item d-flex justify-content-between align-items-center">
                                        ${data.agenda.evt_agenda} 
                                    <span>
                                        <button class="btn btn-light btn-sm">
                                             <i class="icon text-info fas fa-pencil-alt fa-fw"></i>
                                        </button>
                                        <button class="btn btn-light btn-sm">
                                            <i class="icon text-danger fas fa-trash-alt fa-fw"></i> 
                                        </button>
                                    </span>`;
            renderNewAgenda = agendas.split(",").join(`
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

            $("#agenda-list").prepend(renderNewAgenda);
        }

    },
    error: function (data, status) {
        console.log(data)
    }
});

console.log(agenda)
agenda = [];
arr = [];
index = 1;
        } else {
    alert("empty")
}
    }) */