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

routes.put('/api/agenda/:link', (req, res, next) => {
    EventModel.findOne({ evt_link: req.params.link }).then((event) => {
        if (!event) {
            res.status(422).send({
                success: false
            });
        } else {
            AgendaModel.findByIdAndUpdate({_id : req.query._id}, req.body).then((agenda) => {
                let event_agenda = agenda.evt_agenda
                res.send({
                    success: true,
                    agenda: agenda
                });
            }).catch(next);
        }
    }).catch(next);
})

routes.delete('/api/agenda/:link', (req, res, next) => {
    EventModel.findOne({ evt_link: req.params.link }).then((event) => {
        if (!event) {
            res.status(422).send({
                success: false
            });
        } else {
            AgendaModel.findByIdAndRemove({_id : req.query._id}).then((agenda) => {
                let event_agenda = agenda.evt_agenda
                res.send({
                    success: true,
                    agenda: agenda
                });
            }).catch(next);
        }
    }).catch(next);
})


app.get('/chat', (req, res, next) => {
    res.render('chat', {
        layout: false
    })

})

module.exports = routes;