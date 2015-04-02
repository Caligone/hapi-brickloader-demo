'use strict';

var Brick = require('../Brick');
var BaseBrick = new Brick(__dirname, {
    attributes: {
        name: 'ExampleBrick',
        version: '0.1.0'
    }
});

exports.register = BaseBrick;