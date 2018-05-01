const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    user_id: {
        type: String,
        required: [true, "User ID"]
    },
    message: {
        type: String,
        required: [true, "User Message"]
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

const ChatModel = mongoose.model('chat', ChatSchema);
module.exports = ChatModel;