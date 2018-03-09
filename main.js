const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;
const models = require('./app/models');

app.use(bodyParser());

const userRoutes = require('./app/routes/users');
userRoutes(app);

models.sequelize.sync().then(() => {
    app.listen(port);
    console.log('Shopping List RESTful API server started on: ' + port);
})
