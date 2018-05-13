const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let user_id = randomString(10, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

const UserSchema = new Schema({
    /* user_id : {
        type : String,
        required : [true, "User ID is required"],
        unique : [true, "User ID already exist"],
        default : Math.floor(Math.random() * 111111111111) + 999999999999
    }, */
    username : {
        type : String,
        required : [true, "username must be provided"],
        unique : [true, "username already exist"]
    },
    fullname : {
        type : String,
        required : [true, "username must be provided"]
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    phone : {
        type : String,
        required : [true, "phone_number is required"]
    },
    email : {
        type : String,
        required : [true, "email address is required"],
        unique: [true, "email address already exist"]
    }, 
    handels : {
        type : String,
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;


function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}