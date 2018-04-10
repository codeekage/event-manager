const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSpeaker = new Schema({
    evt_speaker: {
        type: String,
        required: [true, "Spaker Required"]
    },
    speaker_bio: {
        type: String,
        required: [true, "Spaker Bio Required"]
    },
    evt_link: {
        type: String,
        required: [true, "Unique identification required"]
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})

const SpeakerModel = mongoose.model('speaker', EventSpeaker);
module.exports = SpeakerModel;