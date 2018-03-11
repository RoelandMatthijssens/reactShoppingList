'use strict';

const Models = require('../models');

exports.list = (req, res) => {
    Models.ShoppingList
        .findAll()
        .then(instances => res.json(instances))
        .catch(err => res.status(400).send(err));
};

exports.create = (req, res) => {
    Models.ShoppingList
        .build(req.body)
        .save()
        .then(instance => res.json(instance))
        .catch(err => res.status(400).send(err));
};

exports.view = (req, res) => {
    let query = { where: { id: req.params.id } };
    Models.ShoppingList
        .findOne(query)
        .then(instance => res.json(instance))
        .catch(err => res.status(400).send(err));
};

exports.update = (req, res) => {
    let id = req.params.id;
    Models.ShoppingList
        .findById(req.params.id)
        .then(instance => {
            instance.updateAttributes(req.body);
            res.json(instance);
        })
        .catch(err => res.status(400).send(err));
};

exports.destroy = (req, res) => {
    Models.ShoppingList
        .findById(req.params.id)
        .then(instance => {
            instance.destroy();
            res.json(instance);
        })
        .catch(err => res.status(400).send(err));
};
