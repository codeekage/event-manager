const mongoose = require("mongoose");
const Schema = mongo.Schema;

const EventsSchema = new Schema({
    event : {
        type : String,
        required : [true, "event title is required"]
    },
    attendee_id : {
        type : String
    }
})