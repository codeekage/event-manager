const Host = require('../controller/host.controller'),
    bcrypt = require('bcryptjs');

//REGISTER A  USER
module.exports.registerHost = (req, res) => {

    // Validation
    req.checkBody("organization", "Cannot be empty and must be longer than 8 ").isLength({min : 8});
    req.checkBody("host_email", "Make sure email is correct").isEmail();
    req.checkBody('password', 'Password must contain alphanumberic and must be longer than 6').isLength({ min: 6 }).matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/);


    //Initialize errors variable
    var errors = req.validationErrors();

    if (errors) {
        res.send({
            success: false,
            errors: errors
        })
    } else {

        let dbError = null;
        var newHost = new Host.HostModel(req.body);

        Host.createHost(newHost, (err, host) => {
            if (err) {
                res.send({
                    success: false,
                    errors: [err.message]
                });

                // throw err;
                console.log(err)
                // return;
            } else {
                res.send({
                    success: true,
                    errors: [null],
                    msg: "Registration Complete!",
                    host: host
                }); 
               // res.redirect("/login")
                console.log(host);
            }

        });
    }
}