const express = require('express');
const app = express();
const routes = express.Router();
const hostPassport = require('../auth/host.passport.auth');
const userPassport = require('../auth/user.passport.auth');
const HostAuth = require('../auth/host.auth')
const UserAuth = require('../auth/user.auth')
const HostModel = require("../models/host.model");
const path = require('path')

routes.post("/host/registration", (req, res, next) => {
    HostAuth.registerHost(req, res);
});

routes.post("/signup", (req, res, next) => {
    UserAuth.registerUser(req, res);
});


routes.post('/login',
    hostPassport.authenticate('host', {sucessRedirect : "/", failureRedirect: "/login", failureFlash: true, successFlash : true}),
    (req, res, next) => {
        req.session.user_id = req.user.id;
        res.redirect("/")
    });

routes.post('/join', 
    userPassport.authenticate('user', { sucessRedirect: "/", failureFlash: true, successFlash: true }),
    (req, res, next) => {
       console.log(req.attendee)
        res.redirect("/chat")
    });


routes.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect("/login");
    });
});

routes.get("/api/hosts", (req, res, next) => {
    HostModel.find({}).then((host) => {
        res.send(host)
    }).catch(next)
})

module.exports = routes;