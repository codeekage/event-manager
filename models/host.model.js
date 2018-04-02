const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HostSchema = new Schema({
    organization : {
        type : String, 
        required : [true, "Organization name must be provided"],
        unique : [true, "Organization already exist"]
    },
    host_email : {
        type : String,
        required : [true, "host email address is required"]
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    comm_logo: {
        type: String,
        default : "/assets/img/default.png"
    },
    phone_number : {
        type : String,
    }, 
    comm_tags : {
        type: String
    },
    handles : {
        type : String
    }
});

const HostModel = mongoose.model("host", HostSchema);
module.exports = HostModel;