const express = require('express');
const bodyParser = require('body-parser');

const settings = require('./config/settings');
const models = require('./models');

const routeDefinitions = [
    './routes/products',
    './routes/shopping-list',
    './routes/users'
];

const main = module.exports = port => {
    const app = express();
    app.use(bodyParser());

    routeDefinitions.forEach(routeDefinition => require(routeDefinition)(app));

    return models.sequelize.sync().then(() => {
        const server = app.listen(port);
        /* eslint-disable-next-line no-console */
        console.log('Shopping List RESTful API server started on: ' + port);
        return server;
    });
};

if ( settings.env === 'production' || settings.env === 'development' ) {
    main (settings.port);
}
