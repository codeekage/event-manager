const HostModel = require("../models/host.model"),
UserModel = require("../models/users.model"),
    bcrypt = require("bcryptjs");


function create(newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

function getHostbyOrganization(organization, callback) {
    var query = { organization: organization };
    HostModel.findOne(query, callback);
}

function getHostById(id, callback) {
    HostModels.findById(id, callback);
}

function comparePassword(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

let Host = {
    create: create,
    getHostById: getHostById,
    getHostByOrganization: getHostbyOrganization,
    comparePassword: comparePassword,
    HostModel: HostModel,
    UserModel : UserModel
}

module.exports = Host