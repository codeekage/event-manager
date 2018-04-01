const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    community_name : {
        type : String, 
        required : [true, "community name must be provided"]
    },
    email : {
        type : String,
        required : [true, "email address is required"]
    },
    phone_number : {
        type : String,
        required : [true, "phone number is required"]
    }, 
    tags : {
        type: [String]
    },
    social : {
        type : String
    }
});

const AdminModel = mongoose.model(AdminSchema, "admin");
module.exports = AdminModel;