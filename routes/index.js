const express = require("express"),
app = express.Router();

app.get('/', function (req, res) {
    res.render('home', {
        title: 'Home',
        owner_name: "Node.js Africa"
    });
});


app.get('/events', (req, res, next) => {
    res.render('events', {
        title: "Events",
        owner_name: "Node.js Africa"
    })
});

app.post('/ow/events', (req, res, next) => {
    console.log(req.body)
});


app.get('/attendees', (req, res, next) => {
    res.render('attendees', {
        title: "Attendees",
        owner_name: "Node.js Africa"
    })
});


app.get('/settings', (req, res, next) => {
    res.render('settings', {
        title: "Settings",
        owner_name: "Node.js Africa"
    });
});


app.get('/login', (req, res, next) => {
    res.render('login', {
        layout : 'form',
        page_title : "Login"
    });
});

app.get('/registration', (req, res, next) => {
    res.render('registration', {
        layout: 'form',
        page_title: "Registration"
    });
});


module.exports = app;