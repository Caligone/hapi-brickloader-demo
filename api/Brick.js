'use strict';

var requireDirectory = require('require-directory'),
    async = require('async'),
    _ = require('underscore');

module.exports = function Brick (dirname, opts) {
    // Check the use of new
    if (!(this instanceof Brick)) {
        throw new Error('You have to use ’new’ to create an instance of Brick');
    }

    // Check the dirname
    if(!(dirname)) {
        throw new Error('dirname must be defined');
    }

    // Check the name of the brick
    if(!(opts.attributes) || !(opts.attributes.name)) {
        throw new Error('‘options.attributes.name‘ must be defined');
    }

    this.dirname = dirname;
    this.register = function (server, options, next) {
        async.auto({
            // Load the routes
            routes: function (endLoadRoutes) {
                var routesRequired = requireDirectory(module, {
                    include: function (path) {
                        if(/.route.js$/.test(path) && path.indexOf(dirname) !== -1) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                });
                var routes = [];

                // TODO Rewrite this to handle more than 2 levels
                _.each(routesRequired, function (routeWithDirectory) {
                    _.each(routeWithDirectory, function (routesWithFile) {
                        _.each(routesWithFile, function (routesWithoutFile) {
                            routes = routes.concat(routesWithoutFile);
                        });
                    });
                });
                server.route(routes);
                endLoadRoutes(null, routes);
            },

            // Load the models
            models: function (endLoadModels) {
                var modelsRequired = requireDirectory(module, { 
                    include: function (path) {
                        if(/.model.js$/.test(path) && path.indexOf(dirname) !== -1) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                });

                var models = {};
                // TODO Rewrite this to handle more than 2 levels
                _.each(modelsRequired, function (modelsWithDirectory) {
                    _.each(modelsWithDirectory, function (modelsWithFile, index) {
                        _.each(modelsWithFile, function (modelsWithoutFile, index) {
                            var modelName = index.replace('.model', '') + 'Model';
                            var model = modelsWithoutFile(server.plugins.mongoose.db);
                            models[modelName] = model;
                            server.expose(modelName, model);
                        });
                    });
                });
                endLoadModels(null, models);
            }
        }, function (err, results) {
            console.log(opts.attributes.name + ' loaded !');
            next();
        });
    };

    this.register.attributes = opts.attributes;

    return this.register;
};
