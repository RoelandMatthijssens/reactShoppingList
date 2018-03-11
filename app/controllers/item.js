'use strict';

const Models = require('../models');

exports.list = function(req, res) {
    Models.Item
        .findAll()
        .then(items => res.json(items));
};

exports.create = function(req, res) {
    Models.Item
        .build(req.body)
        .save()
        .then(newItem => res.json(newItem))
        .catch(err => res.status(400).send(err));
};

exports.view = function(req, res) {
    let query = {id: req.params.id}
    Models.Item
        .findOne({where: query})
        .then(item => res.json(item))
        .catch(err => res.status(400).send(err));
};

exports.update = function(req, res){
    Models.Item
        .findById(req.params.id)
        .then(item => {
            item.updateAttributes(req.body);
            res.json(item);
        })
        .catch(err => res.status(400).send(err));
};

exports.destroy = function(req, res){
    Models.Item
        .findById(req.params.id)
        .then(item => {
            item.destroy();
            res.json(item);
        })
        .catch(err => res.status(400).send(err));
};
