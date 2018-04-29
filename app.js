// Invoke Strict Mode
'use strict';

// Initialize GLOBAL Promise
let Promise = global.Promise || require('promise');

// Require Dependencies
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


// Setup Express Configuration for App
const expressApp = require('./config/app.config')(app);
app.use(express.static(path.join(__dirname, 'public')));

// MIDDLEWARE FOR ERROR HANDLING
app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(422).send({ error: err.message })
});

// MIDDLEWARE FOR PAGE NOT FOUND ERROR
app.use(function (req, res, next) {
    if (res.status(404)) {
        res.render("404", {
            page_title: "404",
            layout : false

        });
    }
});


// SET SOCKET.IO CONNECTIVITY
io.on('connection', (socket) => {
    //
    console.log("connected!")

    //Check user that joined socker 
    socket.on('new-connection', (data) => {
        io.emit('new-connection', {
            msg : data
        });
    });

    //Socker Emit to Message Sender
    socket.on('chat sender', (data) => {
        socket.emit('chat sender', {
            message : data.message,
            from : data.socket
        });
        console.log(data)
    });

    //Emit Message to Audience
    socket.on('chat reciever', (msg) => {
        socket.broadcast.emit('chat reciever', msg);
    });

    //Emit Disconnection of A User
    socket.on('disconnect',  () => {
        io.emit('disconnect', 'user disconnected')
        console.log('disconnected');
    });
})


http.listen(config.env.port, function () {
    console.log(`express-handlebars example server listening on: ${config.env.port}`);
});