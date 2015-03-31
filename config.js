'use strict';

var path = require('path'),
    packageJson = require('./package.json'),
    env = process.env.NODE_ENV || 'development';

var config = {
    rootPath: path.normalize(__dirname),
    port: parseInt(process.env.PORT, 10) || 3000,
    env: env,
    apiVersion:  packageJson.version,
    prefix: '/v' + packageJson.version.split('.')[0],
    db: {
        name: (process.env.DB_NAME || 'connect'),
        user: (process.env.DB_USER || 'connect'),
        pwd: (process.env.DB_PWD || 'connect'),
        options: {
            dialect: 'postgres', // mysql, postgres, sqlite and mariadb
            host: (process.env.DB_HOST || 'localhost'),
            port: (parseInt(process.env.DB_PORT, 10) || 5432),
            logging: (env !== 'production' ? true : false)
        }
    },
    mailer: {
        host: (process.env.MAILER_HOST || ''),
        user: (process.env.MAILER_USER || ''),
        pwd: (process.env.MAILER_PWD || ''),
    },
    forceDB: false
};

// DB switch if testing env
if (env === 'testing') {
    config.db.name += '-testing';
    config.forceDB = true;
}

module.exports = config
