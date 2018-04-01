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

})()