const express = require("express"),
app = express.Router();

/*  app.get('/', ensureAuthenticated, function (req, res, next) {
    res.render('home', {
        title: 'Home',
        owner_name: "Node.js Africa"
    });
}); */

/* app.get('/events', ensureAuthenticated, (req, res, next) => {
    res.render('events', {
        title: "Events",
        owner_name: "Node.js Africa",
         page_title : "Event"
    })
}) */;


app.get('/attendees',ensureAuthenticated,  (req, res, next) => {
    res.render('attendees', {
        title: "Attendees",
        owner_name: "Node.js Africa"
    })
});


app.get('/chat', (req, res, next) => {
    res.render('chat', {
        layout : false
    })
   
})

app.get('/create', ensureAuthenticated, (req, res, next) => {
    res.render('settings', {
        title: "Event Creator",
        owner_name: "Node.js Africa",
        host : req.session.user_id,
        page_title: "Create"
    });
});


app.get('/login', (req, res, next) => {
    res.render('login', {
        layout : 'form',
        page_title : "Login"
    });
});

app.get('/test',  (req, res, next) => {
    res.render('test', {
        layout : false,
        page_title : "Login",
        user : req.session.user_id
    });
});

app.get('/registration', (req, res, next) => {
    res.render('registration', {
        layout: 'form',
        page_title: "Registration"
    });
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
module.exports = app;