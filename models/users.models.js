const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type : String,
        required : [true, "username must be provided"]
    },
    fullname : {
        type : String,
        required : [true, "username must be provided"]
    },
    phone : {
        type : String,
        required : [true, "phone_number is required"]
    },
    email : {
        type : String,
        required : [true, "email address is required"]
    }, 
    handels : {
        type : String,
    }
});

const UserModel = mongoose.model(UserSchema, "users");
module.exports = UserModel;