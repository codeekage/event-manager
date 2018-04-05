(function(){
    let agenda;
    let ul = document.getElementById("agenda-list");
    let li = ul.getElementsByTagName("li");
    let breakAgenda = "";

    for(let i = 0; i < li.length; i++){
        agenda = `<li class="list-group-item d-flex justify-content-between align-items-center">${li[i].innerText}  <span class="badge badge-primary badge-pill">14</span>`;
        breakAgenda += agenda.split(",").join(`<span class="badge badge-primary badge-pill">14</span></li><li class="list-group-item d-flex justify-content-between align-items-center">`);
    }
    $("#agenda-list").html(breakAgenda)
})();