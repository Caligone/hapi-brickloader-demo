'use strict';

var requireDirectory = require('require-directory'),
    async = require('async'),
    _ = require('underscore');

// Load the blocs as plugins
exports.register = function (server, options, next) {
    
    var bricks = [];

    async.auto({
        // Load the routes
        routes: function (endLoadRoutes) {
            var routesRequired = requireDirectory(module, { include: /route.js$/ });
            var routes = [];
            _.each(routesRequired, function (routesWithinTheCurrentBrick, brickName) {
                brickName = brickName.replace('Brick', '');
                bricks.push(brickName);
                _.each(routesWithinTheCurrentBrick, function (routeWithDirectory) {
                    _.each(routeWithDirectory, function (routesWithoutDirectory) {
                        routes = routes.concat(routesWithoutDirectory);
                    });
                });
            });
            server.route(routes);
            endLoadRoutes(null, routes);
        },

        // Load the models
        models: function (endLoadModels) {
            var modelsRequired = requireDirectory(module, { include: /model.js$/ });

            var models = {}, brickModel;
            _.each(modelsRequired, function (modelsWithinTheCurrentBrick, brickName) {
                brickName = brickName.replace('Brick', '');
                brickModel = {};
                bricks.push(brickName);
                _.each(modelsWithinTheCurrentBrick, function (modelsWithDirectory) {
                    _.each(modelsWithDirectory, function (modelsWithoutDirectory, index) {
                        var modelName = index.replace('.model', '') + 'Model';
                        var model = modelsWithoutDirectory(server.plugins.mongoose.db);
                        models[modelName] = model;
                        brickModel[modelName] = model;
                    });
                });
                server.expose(brickName, brickModel);
            });
            endLoadModels(null, models);
        }
    }, function (err, results) {

        bricks = _.uniq(bricks);
        console.log(bricks.length + ' brick' + (bricks.length > 1 ? 's' : '') + ' loaded !');
        next();
    });
};

exports.register.attributes = {
    version: '0.1.0',
    name: 'brickloader'
};