const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;
const models = require('./models');

app.use(bodyParser());

const routeDefinitions = [
    './routes/items',
    './routes/shopping-list',
    './routes/users'
];

routeDefinitions.forEach(routeDefinition => require(routeDefinition)(app));

models.sequelize.sync().then(() => {
    app.listen(port);
    console.log('Shopping List RESTful API server started on: ' + port); //eslint-disable-line no-console
});
