'use strict';

//require application dependencies
const express = require('express');
const exphbs = require('express-handlebars'),
logger = require('morgan'),
    helpers = require('../app_modules/handlebars.helpers'),
    routes = require("../app_modules/express.routes");

module.exports = (app) => {

    //logger 
    app.use(logger('dev'))

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

    app.use("/", require("../routes/index"));
    routes("/", app);
}


