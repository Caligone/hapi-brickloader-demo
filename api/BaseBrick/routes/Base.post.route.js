'use strict';

var config = require('../../../config');

module.exports = [
    {
        method: 'POST',
        path: '/',
        handler: function (request, reply) {
            request.server.plugins.BaseBrick.BaseModel.create({label: 'Hi !'}).then(function (err, data) {
                reply(err);
            });
        }
    }
];