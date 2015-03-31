'use strict';

var config = require('../../../config');

module.exports = [
    {
        method: 'GET',
        path: '/example',
        handler: function (request, reply) {
            request.server.plugins.brickloader.Example.ExampleModel.find({}).exec(function (err, data) {
                reply(data);
            });
        }
    }
];