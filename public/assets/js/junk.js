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



    console.log(active, href);
})()