# Database structure

|------------|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| event_id   | event_name  | event_date  | event_time  |  expct_att  | evt_occur   |  evt_venue  | noti_msg   | evt_type   |

Event --> Event ID, Event Name, Event Date, Event Time, Expected Attendees, Event Occurance(once, recurring), Event Venue, Notification Message, Event Type, Event Agenda, Add Admins, Event Status(LIVE, ENDED).

Users --> User ID, User Name, Full Name, Emails, Phone, WhatsApp Phone, Handles[t:; G:; Fb:;];


Attendance --> Retrieve Users(User ID), Retrieve Event(Event ID). 


Admin --> Community Name, Community Tags, Host Email, Community Email, Community Phone, Community Logo, Community Handles[tw:; git:; fb:; ig:;].

| Event      | Users       | Attendance  | Host      |
|------------|:-----------:|:-----------:|:---------:|
| event_id   | user_id     |id           | comm_name |
| event_name | user_name   | user_id     | comm_tags |
| event_date | full_name   | event_id    | host_email|
| event_time | email       |             | comm_email|
| expct_att  | phone       |             | comm_phone|
| evt_occ    | wapp_phone  |             | comm_logo |
| evt_venue  | handles     |             | comm_handl|
| noti_msg   |             |             |           |
| evt_type   |             |             |           |
| evt_agenda |             |             |           |
|  add_host  |             |             |           |
| evt_status |             |             |           |

# Software Structure

Admin Creates Event ----> System Publish Event on Event Tab/Twitter -----> Attendees Enter User Name ----> System Retrieves Attendees User Details -----> System Details in Event Card. 


# Futher Features

User Asks Questions from System ------> System Publishes Questions -----> Questions get Answered by Host and Co-Host. 