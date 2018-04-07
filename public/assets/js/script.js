
function eventActions(){
    document.querySelector("#hide-preview-btn").addEventListener("click", function () {
        $("#preview-card").fadeToggle()
        $("#event-card").fadeIn(function () {
            $("#event-card").addClass("justify-content-center");
            $("#show-preview-btn").css({ "display": "block" });
        })
    });

    document.querySelector("#show-preview-btn").addEventListener("click", function () {
        $("#preview-card").fadeToggle()
        $("#event-card").fadeIn(function () {
            $("#event-card").removeClass("justify-content-center");
            $("#show-preview-btn").css({ "display": "none" });
        })
    });

    document.querySelector("#event-name").addEventListener("keyup", function () {
        document.querySelector("#preview-event-name").innerText = document.querySelector("#event-name").value;
    });

    document.querySelector("#noti-msg").addEventListener("keyup", function () {
        document.querySelector("#preview-event-noti").innerText = document.querySelector("#noti-msg").value;
    });
}

(function() {
    let currentRoute = location.href.split("/")[3];
    switch (currentRoute) {
        case "create":
            eventActions();
            break;
    
        default:
            break;
    }
})();


