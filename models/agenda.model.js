const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventAgenda = new Schema({
    evt_agenda: {
        type: [String],
        required: [true, "Agenda Required"]
    },
    evt_link: {
        type: String,
        required: [true, "Unique identification required"]
    },
    created_date : {
        type : Date,
        default : Date.now()
    }
})

const AgendaModel = mongoose.model('agenda', EventAgenda);
module.exports = AgendaModel;