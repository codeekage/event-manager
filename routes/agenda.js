const express = require("express"),
routes = express.Router(),
AgendaModel = require("../models/agenda.model"),
EventModel = require("../models/events.model");

routes.get("/api/agenda", (req, res, next) => {
    AgendaModel.find({}).then((agenda) => {
        res.send({
            success : true, 
            agenda : agenda
        });
    }).catch(next)
});

routes.post('/api/agenda/:link', (req, res, next) => {
    EventModel.findOne({evt_link : req.params.link}).then((event) => {
        if(!event){
            res.status(422).send({
                success : false
            });
        }else{
            AgendaModel.create(req.body).then((agenda) => {
                let event_agenda = agenda.evt_agenda
                res.send({
                    success : true,
                    agenda : agenda
                });
            }).catch(next);
        }
    }).catch(next);
});

/* routes.post('/api/agendas/:link', (req, res, next) => {
    EventModel.findOne({evt_link : req.params.link}).then((event) => {
        if(!event){
            res.status(404).send({
                success : false
            });
        }else{
            EventModel.findOne({evt_link : req.params.link}).then((event) => {
                let newAgenda = event.event_agenda;
                newAgenda.push(req.body)
                res.send({
                    success : true,
                    event : event
                });
            }).catch(next)
        }
    }).catch(next);
}); */

module.exports = routes;