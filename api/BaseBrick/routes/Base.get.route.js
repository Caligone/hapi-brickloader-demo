'use strict';

var config = require('../../../config');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            console.log(request.server.plugins);
            request.server.plugins.BaseBrick.BaseModel.find({}).exec(function (err, data) {
                reply(data);
            });
        }
    }
];