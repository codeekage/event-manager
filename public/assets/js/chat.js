searchContacts = () => {
    document.getElementById("search-contact").addEventListener("keyup", filterContacts);

    function filterContacts() {
        // Declare variables
        var search_contact, filter, ul, li, a, i;
        search_contact = document.getElementById("search-contact");
        filter = search_contact.value.toLowerCase();
        ul = document.getElementById("all-contacts");
        li = ul.getElementsByTagName('li');
        // a = li.getElementsByTagName('a');

        // Loop through all list items, and hide those who don't match the search query
        if (filter != " ") {
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                if (a.innerHTML.toLowerCase().indexOf(filter) > -1) {
                    li[i].style.display = "block";
                } else {
                    li[i].style.display = "none";
                }
            }
        }
    }

    $('[data-toggle="tooltip"]').tooltip();
}

(function (){
    searchContacts();
});