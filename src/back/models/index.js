'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const settings = require('../../config/settings');

const { username, password, database } = settings.db;
const sequelize = module.exports = settings.db.url ?
    new Sequelize(settings.db.url, settings.db.options) :
    new Sequelize(database, username, password, settings.db.options);

const db = module.exports = fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .map (file => sequelize.import(path.join(__dirname, file)))
    .map (model => ({ [model.name]: model }))
    .reduce ((acc, curr) => Object.assign (acc, curr), {});

Object.values(db).forEach(
    model => model.associate && model.associate(db)
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
