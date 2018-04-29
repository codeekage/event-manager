const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventAttendee = new Schema({
    user_id: {
        type: String,
        required: [true, "Spaker Required"]
    },
    evt_link: {
        type: String,
        required: [true, "Unique identification required"]
    },
    join_date: {
        type: Date,
        default: Date.now()
    }
})

const AttendeeModel = mongoose.model('attendee', EventAttendee);
module.exports = AttendeeModel;