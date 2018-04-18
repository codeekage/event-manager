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



let power = 0;
if (power === 0) {
    $("#go-live").on('click', () => {
        $("#live").text("LIVE");
        $("#go-live").addClass("off");
        $("#go-live").addClass("on");
        setInterval(() => {
            $(".on").css({ "background": "#2e82d5db" });
        }, 1000);
        setInterval(() => {
            $(".on").css({ "background": "#dc3545" });
        }, 2000);
        power = 1;
    });
    //return;
} else {
    $("#go-live").on('click', () => {
        $("#go-live").removeClass("on");
        console.log("off")
        power = 0;
        console.log(`changed after off ${power}`)
    });
    console.log(`changed ${power}`)
}
console.log(power)






function putRequest(url, object, successCallBack, errorCallback){
    $.ajax({
        url : url,
        method : "PUT",
        dataType : "JSON",
        contentType : "application/json",
        data: JSON.stringify(object),
        success : (data, status) => {
            return successCallBack(data, status)
        },
        error : (data, status) => {
            return errorCallback(data, status)
        }
    })
}   