'use strict';

var config = require('../../../config');

module.exports = [
    {
        method: 'POST',
        path: '/example',
        handler: function (request, reply) {
            request.server.plugins.ExampleBrick.ExampleModel.create({label: 'Hi !'}).then(function (err, data) {
                reply(err);
            });
        }
    }
];