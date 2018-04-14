const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Controller = require('../controller/controller'),
    UserModel = require("../models/users.model");

passport.use(new LocalStrategy(
    function (username, password, done){
        UserModel.findOne({username : username}, function(err, user){
            if(err) throw err;
            if(!user){
               return done(null, false, "Incorrect username");
            }

            Controller.comparePassword(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(!user){
                    return done(null, false, "Incorrect password");
                }else{
                    return done(null, user);
                }
            });
            
        });
    }
));

passport.serializeUser((user, done) => {
    //console.log(user)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        console.log(user)
    })
});


module.exports = passport;
