const express = require("express"),
    routes = express.Router(),
    EventModel = require("../models/events.model");



routes.get("/api/events", (req, res, next) => {
   EventModel.find({}).then((event) => {
       res.send(event);
   }).catch(next);
});

routes.post("/api/events", (req, res, next) => {
   EventModel.create(req.body).then((event) => {
        res.send(event);
    }).catch(next);
});

routes.put("/api/events:id", (req, res, next) => {
    EventModel.findByIdAndUpdate({id : event_id}).then((event) => {
        res.send(event);
    }).catch(next);
});

routes.delete("/api/events:id", (req, res, next) => {
    EventModel.findByIdAndRemove({id : event_id}).then((event) => {
        res.send(event)
    }).catch(next);
});


module.exports = routes;

