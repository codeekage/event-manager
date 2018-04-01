"use strict";
let mongoose = require('mongoose');

// activating Promises for mongoose
mongoose.Promise = global.Promise;

module.exports = (config) => {
    var dbURI = config.dev.db;
    global.Promise = mongoose.Promise

    // using new syntax for mongoose library
    // check the mongoose doc for more info
    mongoose.connect(dbURI, function (err) {
        if (err) {
            switch (err.name) {
                case 'MongoNetworkError':
                    console.log(`Please check that server is running your machine ${dbURI}`)
                    break;
                default:
                    throw e;
                    break;
            }

        } else {
            console.log(`Connected to ${dbURI}`);
        }
    });
};