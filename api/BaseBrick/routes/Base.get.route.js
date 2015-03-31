'use strict';

var config = require('../../../config');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            request.server.plugins.brickloader.Base.BaseModel.find({}).exec(function (err, data) {
                reply(data);
            });
        }
    }
];