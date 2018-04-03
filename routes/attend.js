const express = require("express"),
    routes = express.Router(),
    EventModel = require("../models/events.model")


routes.get("/attend/:link", (req, res, next) => {
    EventModel.findOne({evt_link : req.params.link}).then((event) => {
        if(!event){
            res.status(404).render("404",{
                layout : false
            });
        }else{
            res.render("attend", {
                layout: false,
                evt_link : event.evt_link
            });
        }
    }).catch(next);
 
});

routes.post("/attend/:link", (req, res, next) => {
    EventModel.findOne({evt_passkey : req.body.passkey}).then((event) => {
        if(!event){
            res.send({
                success : false
            })
        }else{
            res.send({
                success : true,
                event : event
            })
        }
    })
})



module.exports = routes;