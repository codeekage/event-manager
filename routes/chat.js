
const express = require("express"),
    routes = express.Router(),
    EventModel = require("../models/events.model"),
    HostModel = require("../models/host.model"),
    AgendaModel = require("../models/agenda.model"),
    SpeakerModel = require("../models/speaker.model"),
    AttendeeModel = require("../models/attendee.model"),
    UserModel = require("../models/users.model"),
    ChatModel = require("../models/chat.model"),
    jwt = require('jsonwebtoken');

routes.get('/chat/:link', ensureAuth, (req, res, next) => {
    getChatsData(req.link, req, res, next);
})

routes.get('/api/attendee/:link', (req, res, next) => {
    AttendeeModel.find({ evt_link: req.params.link }).sort({ created_date: -1 }).then((attendee) => {
        res.send(attendee)
    }).catch(next)
})

routes.get('/api/users', (req, res, next) => {
    UserModel.find({}).then((user) => {
       res.send(user)
    }).catch(next)
})

routes.get('/api/users/:userid', (req, res, next) => {
    UserModel.findOne({user_id : req.params.userid}).then((user) => {
       res.send(user)
    }).catch(next)
})

routes.get('/api/attendee', (req, res, next) => {
    AttendeeModel.find({}).then((user) => {
       res.send(user)
    }).catch(next)
})


routes.post('/chat/message', (req, res, next) =>{
    ChatModel.create(req.body).then((chat) => {
        res.send(chat)
    }).catch(next);
})

routes.get('/chat/message/:link', (req, res, next) =>{
    ChatModel.find({evt_link : req.params.link}).sort({join_date : -1}).then((chat) => {
        res.send(chat)
    }).catch(next);
});

function getChatsData(link, req, res, next) {
    EventModel.findOne({ evt_link: link }).then((event) => {
        if (!event || event.evt_status === false) {
            res.status(404).render('404', {
                layout: false
            })
        } else {
            let hostID = req.session.user_id
            AgendaModel.find({ evt_link: link }).sort({ created_date: -1 }).then((agenda) => {
                SpeakerModel.find({ evt_link: link }).sort({ created_date: -1 }).then((speaker) => {
                    AttendeeModel.find({ evt_link: link }).sort({ created_date: -1 }).then((attendee) => {
                           // console.log(user)
                            res.render('chat', {
                                layout: false,
                                evt_name: event.evt_name,
                                evt_link: event.evt_link,
                                evt_venue: event.evt_venue,
                                evt_date: event.evt_date,
                                noti_msg: event.noti_msg,
                                evt_type: event.evt_type,
                                agenda: agenda,
                                title : event.evt_name,
                                speaker: speaker,
                                evt_occ: event.evt_occ,
                                evt_passkey: event.evt_passkey,
                                attendee: attendee

                            })

                            console.log(agenda, speaker)
                    }).catch(next)
                }).catch(next)
            }).catch(next)
        }
    }).catch(next)
}

function ensureAuth(req, res, next) {
    let chatParams = req.params.link;
    if (chatParams.indexOf('.') > -1) {
        let loggedUser = req.params.link.split('.')[1],
            link = req.params.link.split('.')[0];
        AttendeeModel.findOne({ user_id: loggedUser }).where('evt_link').equals(link).then(evt => {
            if (!evt) {
                res.sendStatus(404)
            } else {
                req.link = link;
                next();
            }
        }).catch(next);
    } else {
        res.status(404).render('404', {
            layout: false
        })
    }
}


module.exports = routes;