setFullName = () => {
    let full_name = document.getElementById("name-full");
    let abv_name = document.getElementById("name-abv");
    abv_name.innerText = full_name.innerText.charAt(0);

    if (full_name.innerText.indexOf(" ")) {
        let sub_string = full_name.innerText.split(/\s+/)[1].toString()
        abv_name.innerText = full_name.innerText.charAt(0) + sub_string.charAt(0);
        console.log(abv_name.innerText.charAt(0))
    } else {
        abv_name.innerText = full_name.innerText.charAt(0);
    }
    console.log(full_name.innerText.charAt(0))
}

eVitation = () => {
    let eventName = document.getElementById("event-name");
    let coHost = document.getElementById("co-host");
    let eventDate = document.getElementById("event-date");
    let eventVenue = document.getElementById("event-venue");
    let eventType = document.getElementById("event-type");


    eventName.addEventListener("keyup", function(){
        document.getElementById("evt-name").innerText = eventName.value
    })


    coHost.addEventListener("keyup", function(){
        document.getElementById("evt-cohost").innerText = coHost.value
    })

    eventDate.addEventListener("keyup", function(){
        document.getElementById("evt-date").innerText = eventDate.value
    })

    eventVenue.addEventListener("keyup", function(){
        document.getElementById("evt-venue").innerText = eventVenue.value
    })

    eventType.addEventListener("keyup", function(){
        document.getElementById("evt-type").innerText = eventType.value
    })
}

(function () {
    let active = location.href;
    let href = active.split("/")[3];
    let ul, li, activeHref, activeLi;

    ul = document.getElementById("active-class");
    li = ul.getElementsByTagName('li');

    if (active) {
        for (let i = 0; i < li.length; i++) {
            activeHref = li[i].getAttribute('id');
            activeLi = li[i].getElementsByTagName('a')[0].getAttribute('href')

            // console.log(activeHref)
            if (activeHref === href) {
                document.getElementById(activeHref).className = "active";
            } else if (activeHref === href + "#") {
                document.getElementById(activeHref).className = "active";
            } else if (href === "") {
                document.getElementById("/").className = "active"
            }
        }
    }

    setFullName();
    eVitation();

})()