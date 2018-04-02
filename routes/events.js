const express = require("express"),
    routes = express.Router(),
    EventModel = require("../models/events.model"),
    HostModel = require("../models/host.model")



routes.get("/api/events", (req, res, next) => {
   EventModel.find({}).then((event) => {
      res.send(event)
   }).catch(next);
});

routes.post("/api/events", (req, res, next) => {
   EventModel.create(req.body).then((event) => {
       res.send({
           success: true,
           data: event
       });
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


routes.get("/events", ensureAuthenticated, (req, res, next) => {
    let session = req.session.user_id
    HostModel.findById({ _id: req.session.user_id}).then((host) => {
        EventModel.find({ host_id: session }).then((events) => {
            res.render("events", {
                page_title: "Events",
                events: events,
                owner_name: host.organization
            });
            console.log(events)
        }).catch(next)
    }).catch(next);
});


function ensureAuthenticated(req, res, next) {
    if (req.session.user_id) {
        console.log(req.session.user_id);
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/login')
    }
}

module.exports = routes;

