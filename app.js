'use strict';

var Promise = global.Promise || require('promise');

const express = require('express'),
    app = express(),
    exphbs = require('express-handlebars'), // "express-handlebars"
    config = require('./config/env.config'),
    http = require('http').Server(app),
    mongooseconfig = require('./config/mongoose.config')(config),
    io = require('socket.io')(http),
    path = require('path');
   /*  jquery = require("jquery"),
    popper = require("popper.js"),
    boostrap = require("bootstrap-material-design"); */



const expressApp = require('./config/app.config')(app);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(422).send({ error: err.message })
});

app.use(function (req, res, next) {
    if (res.status(404)) {
        res.render("404", {
            page_title: "404",
            layout : false

        })
    }
});

/* io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
}); */

io.on('connection', (socket) => {
    console.log("connected!")

    socket.on('new-connection', (msg) => {
       console.log('connection'+ msg.user);
       io.emit("user connected")
    })

    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})


http.listen(config.env.port, function () {
    console.log(`express-handlebars example server listening on: ${config.env.port}`);
});