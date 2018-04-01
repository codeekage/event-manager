'use strict';

var Promise = global.Promise || require('promise');

const express = require('express'),
    exphbs = require('express-handlebars'), // "express-handlebars"
    config = require('./config/env.config'),
    mongooseconfig = require('./config/mongoose.config')(config);

var app = express();

const expressApp = require('./config/app.config')(app);
app.use(express.static('./public/'));

app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(422).send({ error: err.message })
});

app.listen(config.env.port, function () {
    console.log(`express-handlebars example server listening on: ${config.env.port}`);
});