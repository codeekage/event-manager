const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HostSchema = new Schema({
    community_name : {
        type : String, 
        required : [true, "community name must be provided"]
    },
    host_email : {
        type : String,
        required : [true, "host email address is required"]
    },
    comm_email: {
        type: String,
        required: [true, "community email address is required"]
    },
    comm_logo: {
        type: String,
    },

    phone_number : {
        type : String,
        required : [true, "phone number is required"]
    }, 
    comm_tags : {
        type: [String]
    },
    handles : {
        type : String
    }
});

const HostModel = mongoose.model(HostSchema, "admin");
module.exports = HostModel;