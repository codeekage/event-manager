'use strict';

//require application dependencies
const express = require('express');
const exphbs = require('express-handlebars'),
logger = require('morgan'),
    helpers = require('../app_modules/handlebars.helpers'),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    session = require("express-session"),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    expressValidator = require("express-validator"),
    routes = require("../app_modules/express.routes");

module.exports = (app) => {

    //logger 
    app.use(logger('dev'))

    //SET UP BodyParser MIDDLEWARE
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }))
  


    //Passport init
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(cookieParser("cookie storage"));
    //Express Session
    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true
    }));


    //Connect Flash
    app.use(flash());

    //Global Vars
    app.use(function (req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });

    // Create `ExpressHandlebars` instance with a default layout.
    var hbs = exphbs.create({
        defaultLayout: 'main',
        helpers: helpers,

        // Uses multiple partials dirs, templates in "shared/templates/" are shared
        // with the client-side of the app (see below).
        partialsDir: [
            'shared/templates/',
            'views/partials/'
        ]
    });

    // Register `hbs` as our view engine using its bound `engine()` function.
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    
   
    

    // Middleware to expose the app's shared templates to the cliet-side of the app
    // for pages which need them.
    function exposeTemplates(req, res, next) {
        // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
        // templates which will be shared with the client-side of the app.
        hbs.getTemplates('shared/templates/', {
            cache: app.enabled('view cache'),
            precompiled: true
        }).then(function (templates) {
            // RegExp to remove the ".handlebars" extension from the template names.
            var extRegex = new RegExp(hbs.extname + '$');

            // Creates an array of templates which are exposed via
            // `res.locals.templates`.
            templates = Object.keys(templates).map(function (name) {
                return {
                    name: name.replace(extRegex, ''),
                    template: templates[name]
                };
            });

            // Exposes the templates during view rendering.
            if (templates.length) {
                res.locals.templates = templates;
            }

            setImmediate(next);
        })
            .catch(next);
    }



    // Express Validator
    app.use(expressValidator({
        errorFormatter: function (param, msg, value) {
            var namespace = param.split('.'),
                root = namespace.shift(),
                formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    }));


    app.use("/", require("../routes/index"));
    routes("/", app);
}


