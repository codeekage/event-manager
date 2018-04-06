(function () {
    let active = location.href;
    let href = active.split("/")[3];
    let ul, li, activeHref;

    ul = document.getElementById("active-class");
    li = ul.getElementsByTagName('li');

    if (active) {
        for (let i = 0; i < li.length; i++) {
            activeHref = li[i].getElementsByTagName('a')[0].getAttribute('href');
            console.log(activeHref)
            let test = "/" + href;
            if (activeHref === test) {

            }
        }
    }


    if (data.success == true) {
        $("#agenda-list").append(`
                     <li class="list-group-item d-flex justify-content-between align-items-center">
                                       ${data.agenda.evt_agenda}
                                
                               <span class="badge badge-primary badge-pill">14</span>
                            </li>`
        )
    }
    console.log(active, href);
})()