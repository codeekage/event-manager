# Database structure 

Event___
	|__Event ID, Event Name, Event Date, Event Time, Expected Attendees, Event Occurance(once, recurring), Event Venue, Notification Message, Event Type, Event Agenda, Add Admins, Event Status(LIVE, ENDED). 


Users___
	|__User ID, User Name, Full Name, Emails, Phone, WhatsApp Phone, Handles[t:; G:; Fb:;];


Attendance___
	    |__Retrieve Users(User ID), Retrieve Event(Event ID). 


Admin___
	|___Community Name, Community Tags, Host Email, Community Email, Community Phone, Community Logo, Community Handles[tw:; git:; fb:; ig:;].


# Software Structure

Admin Creates Event ----> System Publish Event on Event Tab/Twitter -----> Attendees Enter User Name ----> System Retrieves Attendees User Details -----> System Details in Event Card. 


# Futher Features

User Asks Questions from System ------> System Publishes Questions -----> Questions get Answered by Host and Co-Host. 