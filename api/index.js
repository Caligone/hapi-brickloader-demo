'use strict';

// TODO Use Glue

var Hapi = require('hapi'),
    config = require('../config'),
    server = new Hapi.Server(),
    Plugins = require('./plugins');

server.connection({ port: config.port });

server.register(Plugins, function (err) {
    server.start(function(err) {
        console.log('Server is running...');
    });
});

module.exports = server;