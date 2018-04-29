
const express = require("express"),
    routes = express.Router(),
    EventModel = require("../models/events.model"),
    HostModel = require("../models/host.model"),
    AgendaModel = require("../models/agenda.model"),
    SpeakerModel = require("../models/speaker.model"),
    jwt = require('jsonwebtoken');

routes.get('/chat/:link', (req, res, next) => {
    /*     jwt.verify(req.token, 'rMMOk7ULk17O7pFnNnnnurMIJzBbj7sQDg84', (err, auth) => {
            if (err) {
                res.status(403);
            } else { */

    EventModel.findOne({ evt_link: req.params.link }).then((event) => {
        if (!event) {
            res.status(404).render('404', {
                layout: false
            })
        } else {
            let hostID = req.session.user_id
            /*  HostModel.findOne({ _id: hostID }).then((host) => { */
            AgendaModel.find({ evt_link: req.params.link }).sort({ created_date: -1 }).then((agenda) => {
                SpeakerModel.find({ evt_link: req.params.link }).sort({ created_date: -1 }).then((speaker) => {
                    console.log(agenda)
                    res.render('chat', {
                        layout: false,
                        evt_name: event.evt_name,
                        evt_venue: event.evt_venue,
                        evt_date: event.evt_date,
                        noti_msg: event.noti_msg,
                        evt_type: event.evt_type,
                        agenda: agenda,
                        speaker: speaker,
                        evt_occ: event.evt_occ,
                        evt_passkey: event.evt_passkey,

                    })
                }).catch(next)
            }).catch(next)
            /* }).catch(next) */
        }
    }).catch(next)
    /*        }
       });
    */
})

module.exports = routes;