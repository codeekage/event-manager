const User = require('../controller/controller'),
    bcrypt = require('bcryptjs');

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