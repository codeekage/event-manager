const express = require("express"),
    routes = express.Router(),
    EventModel = require("../models/events.model"),
    HostModel = require("../models/host.model")

routes.get("/manage/:link", ensureAuthenticated, (req, res, next) => {
    EventModel.findOne({evt_link : req.params.link}).then((event) => {
        if(!event){
            res.status(404).render('404', {
                layout : false
            })
        }else{
            let hostID = req.session.user_id
            HostModel.findOne({_id : hostID}).then((host) => {

                res.render('manage', {
                    layout: false,
                    evt_name : event.evt_name,
                    evt_venue : event.evt_venue,
                    evt_date : event.evt_date,
                    noti_msg : event.noti_msg,
                    evt_type : event.evt_type,
                    evt_occ : event.evt_occ,
                    evt_passkey : event.evt_passkey,
                    organization : host.organization
                })
            })
        }
    })
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