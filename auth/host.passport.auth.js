const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Controller = require('../controller/controller'),
    HostModel = require("../models/host.model")


passport.use(new LocalStrategy(
    function (username, password, done) {
        HostModel.findOne({ organization: username }, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, "Incorrect username")
            }
            
            Controller.comparePassword(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(!isMatch){
                    return done(null, false, "Incorrect Password")
                }else{
                    return done(null, user)
                }
            });

          
        })
    }
));

passport.serializeUser((user, done) => {
    //console.log(user)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    HostModel.findById(id, (err, user) => {
        console.log(user)
    })
});

module.exports = passport;