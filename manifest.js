'use strict';

var config = require('./config');

module.exports = {
    server: {
        app: config
    },
    connections: [{
        host: 'localhost',
        port: 3000,
        labels: ['api']
    }],
    plugins: {
        './database': {},
        './api/BaseBrick': {}
    }
};
