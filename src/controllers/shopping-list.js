'use strict';

const restify = require('../utils/restify');
const Models = require('../models');

Object.assign(exports, restify.restify(Models.ShoppingList));

exports.showProducts = (req, res) => {
    Models.ShoppingList
        .findById(req.params.id)
        .then(list => list.getProducts())
        .then(products => res.json(products))
        .catch(err => res.status(400).send(err));
};

exports.addProduct = (req, res) => {
    Promise.all([
        Models.ShoppingList.findById(req.params.id),
        Models.Product.findById(req.body.productId)
    ])
        .then(([list, product]) => {list.addProduct(product); return product;})
        .then(product => res.json(product))
        .catch(err => res.status(400).send(err));
};
