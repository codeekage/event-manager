const mongoose = require("mongoose");
const Schema = mongo.Schema;

const EventSchema = new Schema({
    evt_id : {
        type : String,
    },
    evt_name : {
        type : String,
        required : [true, "event name "]
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
    expct_att : {
        type : Number,
        default : "undefined"
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
    delete_status : {
        type : Number,
        default : 0
    }
});

const EventModel = mongoose.model(EventSchema, "events");
module.exports = EventModel;

