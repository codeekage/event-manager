
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