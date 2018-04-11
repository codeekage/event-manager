const express = require("express"),
    routes = express.Router(),
    SpeakerModel = require("../models/speaker.model"),
    EventModel = require("../models/events.model")

routes.get("/api/speaker", (req, res, next) => {
    SpeakerModel.find({}).then((speaker) => {
        res.send({
            success : true,
            speakers : speaker
        });
    }).catch(next);
});


routes.post("/api/speaker/:link", (req, res, next) => {
    EventModel.findOne({evt_link : req.params.link}).then((event) => {
        if(!event){
            res.status(404).render('404',  {
                layout : false
            });
        }else{
           SpeakerModel.create(req.body).then((speaker) => {
               res.send({
                   success : true,
                   speaker : speaker
               });
           }).catch(next);
        }
    }).catch(next);
});

routes.put("/api/speaker/:link", (req, res, next) => {
    EventModel.findOne({evt_link : req.params.link}).then((event) => {
        if(!event){
            res.status(404).render('404',  {
                layout : false
            });
        }else{
           SpeakerModel.findByIdAndUpdate({_id : req.query._id}, req.body).then((speaker) => {
               res.send({
                   success : true,
                   speaker : speaker
               });
           }).catch(next);
        }
    }).catch(next);
});

routes.delete("/api/speaker/:link", (req, res, next) => {
    EventModel.findOne({ evt_link: req.params.link }).then((event) => {
        if (!event) {
            res.status(404).render('404', {
                layout: false
            });
        } else {
            SpeakerModel.findByIdAndRemove({_id : req.query._id}).then((speaker) => {
                res.send({
                    success: true,
                    speaker: speaker
                });
            }).catch(next);
        }
    }).catch(next);
});

module.exports = routes;