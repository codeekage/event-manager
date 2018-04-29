const User = require('../controller/controller'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');

//REGISTER A  USER
module.exports.registerUser = (req, res) => {

    // Validation
    req.checkBody("username", "Cannot be empty and must be longer than 8 ").isLength({ min: 8 });
    req.checkBody("email", "Make sure email is correct").isEmail();
    req.checkBody('password', 'Password must contain alphanumberic and must be longer than 6').isLength({ min: 6 }).matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/);
    req.checkBody('password2', 'Password dose not match').equals(req.body.password);
    req.checkBody('handles', 'Please list one handle').notEmpty();
    req.checkBody('fullname', 'Please enter full name').notEmpty();


    //Initialize errors variable
    var errors = req.validationErrors();

     if (errors) {
        res.send({
            success: false,
            errors: errors
        })
    } else {

        let dbError = null;
        var newUser = new User.UserModel(req.body);

        User.create(newUser, (err, user) => {
            if (err) {
                res.send({
                    success: false,
                    message: [err.message]
                });

                // throw err;
                console.log(err)
                // return;
            } else {
                res.send({
                    success: true,
                    errors: [null],
                    message: "Registration Complete!",
                    user : user
                });
                // res.redirect("/login")
                console.log(user);
            }

        });
    }
}

module.exports.loginUser = (res, req, next) => {
    User.getUserbyUsername(req.body.username, (err, user) => {
        if(err) throw err;

        if(!user){
         return   res.send({
                success : false,
                message : "Incorrect username"
            });
        }

       User.comparePassword(req.body.password, user.password, (err, isMatch) => {
            if (err) throw err;
            
            if(!isMatch){
                res.send({
                    success : false,
                    message : "Incorrect Password"
                });
            }else{
                const authUser = {
                    username : user.username,
                    user_id : user.id
                };

                jwt.sign({ authUser },'rMMOk7ULk17O7pFnNnnnurMIJzBbj7sQDg84', (err, token) => {
                    if(err) throw err;
                    res.send({
                        token : token,
                        user : authUser
                    });
                });

            }
       })
    });
}