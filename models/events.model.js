const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


const EventSchema = new Schema({
    host_id : {
        type : String,
        required : [true, "Host is required"]
    },
    evt_id : {
        type : String,
    },
    evt_name : {
        type : String,
        required : [true, "event name "]
    },
    evt_link : {
        type : String,
        default: randomString(36, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
     },
    evt_passkey : {
        type : String,
        required : [true, "Passkey required"]
    },
    evt_date : {
        type : Date,
        default : Date.now()
    },
    evt_type: {
        type : String
    },
    evt_agenda : {
        type : [String]
    },
    noti_msg : {
        type : String,
        default : "Happy Guest e-Vitation"
    },
    evt_status : {
        type : String,
        defualt : "Pending"
    },
    co_host:{
        type : String 
    },
    evt_occ : {
        type : String,
        required : [true, "event re-occuring?"]
    },
    delete_status : {
        type : Number,
        default : 0
    }
});

const EventModel = mongoose.model('events', EventSchema);
module.exports = EventModel;

