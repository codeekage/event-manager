
function createContactElement(username, userid) {
    $('#contact-list').prepend(`<ul class="nav nav-stacked" id="all-contacts">
    <li class="contact-wrapper">
        <a href="#">
            <span class="contact-img" style='background-image: url(/assets/img/favicon.png);'></span>
            <span class="contact-name" id="user-${userid}">${username}</span>
            <br>
           <!--  <br>
            <p class="recent-message">I am a midfield fraud dsdssdddddddfffffffffffffff</p>
            <span class="date-sent">9/12/16</span> --!>
        </a>
    </li>
</ul>`)
}

function get(url, callback) {
    $.ajax({
        url: url,
        method: 'GET',
        success: (data, status) => {
            return callback(data, status)
        },
        error: (data, status) => {
            return callback(data, status)
        },
    })
}

const fetchAttendee = () => {
    let link = location.href.split('/')[4],
        evtLink = link.split('.')[0],
        name = link.split('.')[1];
    get(`/api/attendee/${evtLink}`, (data, status) => {
        console.log(data)
        data.forEach(element => {
            get(`/api/users/${element.user_id}`, (data, status) => {
                createContactElement(data.username, data.user_id)
                if(data.user_id === name){
                    $(`#user-${name}`).html("ME!");
                }
            });
        });
    })

}

(function () {
    let loop = 1;
    fetchAttendee();
    /*   setInterval(() => {
          $('#contact-list').html('');
          fetchAttendee();
          console.log('looped' + loop);
          loop++;
      }, 10000)  */
})();
