'use strict';

const restify = require('../utils/restify');
const Models = require('../models');

Object.assign(exports, restify.restify(Models.ShoppingList));

exports.showItems = (req, res) => {
    Models.ShoppingList
        .findById(req.params.id)
        .then(list => list.getItems())
        .then(items => res.json(items))
        .catch(err => res.status(400).send(err));
}

exports.addItem = (req, res) => {
    Promise.all([
        Models.ShoppingList.findById(req.params.id),
        Models.Item.findById(req.body.itemId)
    ])
    .then(([list, item]) => {list.addItem(item); return item})
    .then(item => res.json(item))
    .catch(err => res.status(400).send(err));
}
