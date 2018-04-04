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
                evt_link : event.evt_link,
                evt_name : event.evt_name,
                noti_msg : event.noti_msg,
                evt_date : event.evt_date
            });
        }
    }).catch(next);
 
});

routes.post("/attend/:link", (req, res, next) => {
    EventModel.findOne({
        evt_link : req.params.link,
        evt_passkey : req.body.passkey
    }).then((event) => {
        if(!event){
            res.send({
                success : false,
                message : "Incorrect passkey, please check and try again"
            })
        }else{
            res.send({
                success : true,
                message : event
            })
        }
    })
})



module.exports = routes;