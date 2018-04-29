const express = require("express"),
    routes = express.Router(),
    EventModel = require("../models/events.model"),
    HostModel = require("../models/host.model"),
    AttendeeModel = require("../models/attendee.model");



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

routes.put("/api/events/:link", (req, res, next) => {
    EventModel.findOne({ evt_link: req.params.link }).then((event) => {
        EventModel.findByIdAndUpdate({ _id: event._id }, req.body).then((newevent) => {
            console.log(req.body)
            res.send({
                success: true,
                event: newevent
            });
        }).catch(next);
    }).catch(next);
});

routes.delete("/api/events/:link", (req, res, next) => {
    EventModel.findOne({ evt_link: req.params.link }).then((event) => {
        EventModel.findByIdAndRemove({ _id: event._id }, req.body).then((newevent) => {
            console.log(req.body)
            res.send({
                success: true,
                event: newevent
            });
        }).catch(next);
    }).catch(next);
});


routes.get("/", ensureAuthenticated, (req, res, next) => {
    let session = req.session.user_id
    HostModel.findById({ _id: req.session.user_id }).then((host) => {
        EventModel.find({ host_id: session }).where('delete_status').equals(0).sort({ created_date: -1 }).then((events) => {
            res.render("events", {
                page_title: "Events",
                events: events,
                title: host.organization
            });
            console.log(events)
        }).catch(next)
    }).catch(next);
});


routes.get("/api/events/attendee", (req, res, next) => {
    AttendeeModel.find({}).then((attendee) => {
        res.send(attendee);
    }).catch(next);
});

routes.post("/api/events/attendee", (req, res, next) => {
    AttendeeModel.create(req.body).then(attendee => {
        res.send(attendee);
    }).catch(next);
})

routes.delete("/api/events/attendee/:id", (req, res, next) => {
    AttendeeModel.findByIdAndRemove({ _id: id }).then(attendee => {
        res.send(attendee);
    }).catch(next);
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

module.exports = routes;

