const express = require("express"),
    routes = express.Router(),
    EventModel = require("../models/events.model"),
    HostModel = require("../models/host.model"),
    AgendaModel = require("../models/agenda.model"),
    AttendeeModel = require("../models/attendee.model"),
    SpeakerModel = require("../models/speaker.model"),
    jwt = require('jsonwebtoken');

routes.get("/manage/:link", ensureAuthenticated, (req, res, next) => {
    EventModel.findOne({ evt_link: req.params.link }).then((event) => {
        if (!event) {
            res.status(404).render('404', {
                layout: false
            })
        } else {
            let hostID = req.session.user_id
            HostModel.findOne({ _id: hostID }).then((host) => {
                AgendaModel.find({ evt_link: req.params.link }).sort({ created_date: -1 }).then((agenda) => {
                    AttendeeModel.count({ evt_link: req.params.link }).then((count) => {
                        SpeakerModel.find({ evt_link: req.params.link }).sort({ created_date: -1 }).then((speaker) => {
                            console.log(agenda)
                            res.render('manage', {
                                layout: 'manage',
                                evt_name: event.evt_name,
                                evt_venue: event.evt_venue,
                                evt_link: event.evt_link,
                                evt_date: event.evt_date,
                                noti_msg: event.noti_msg,
                                evt_type: event.evt_type,
                                agenda: agenda,
                                speaker: speaker,
                                evt_occ: event.evt_occ,
                                evt_passkey: event.evt_passkey,
                                evt_status: event.evt_status,
                                organization: host.organization,
                                count: count
                            })
                        }).catch(next)
                    }).catch(next)
                }).catch(next)
            }).catch(next)
        }
    }).catch(next)
})


function ensureAuthenticated(req, res, next) {
    if (req.session.user_id) {
        console.log(req.session.user_id);
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/login')
    }
}


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader != 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403)
    }
}



module.exports = routes;