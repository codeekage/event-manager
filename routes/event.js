const express = require("express"),
    routes = express.Router(),
    EventModel = require("../models/events.model");



routes.get("/api/event", (req, res, next) => {
   EventModel.find({}).then((event) => {
       res.send(event);
   }).catch(next);
});

routes.post("/api/event", (req, res, next) => {
    EventModel.create(req.body).then((event) => {
        res.send(event);
    }).catch(next);
});

routes.put("/api/event:id", (req, res, next) => {
    EventModel.findByIdAndUpdate({id : event_id}).then((event) => {
        res.send(event);
    }).catch(next);
});

routes.delete("/api/event:id", (req, res, next) => {
    EventModel.findByIdAndRemove({id : event_id}).then((event) => {
        res.send(event)
    }).catch(next);
});


module.exports = routes;

