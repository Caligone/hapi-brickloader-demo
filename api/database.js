'use strict';

var mongoose = require('mongoose');;

exports.register = function (server, options, next) {

    // TODO Use config and environment variables
    mongoose.connect(
       'mongodb://localhost/databasename'
    );

    server.expose('db', mongoose);
    next();
};

exports.register.attributes = {
    name: 'mongoose'
};