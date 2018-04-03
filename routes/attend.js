const express = require("express"),
    routes = express.Router();


routes.get("/attend/:link", (req, res, next) => {
    res.render("attend", {
        layout : false
    })
});



module.exports = routes;