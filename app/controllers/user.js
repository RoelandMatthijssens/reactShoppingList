'use strict';

const Models = require('../models');

exports.list = function(req, res) {
  Models.User.findAll().then(function(users){
    res.json(users);
  });
};

exports.create = function(req, res) {
  Models.User.build(req.body)
    .save()
    .then(function(newUser){
        res.json(newUser);
    });
};

exports.view = function(req, res) {
    Models.User.findOne({
        attributes: ['name', 'email'],
        where: {
            id: req.params.userId
        }
    }).then(function(user, err) {
        if (err){
            res.send(err);
        }
        res.json(user);
    });
};

exports.update = function(req, res){
    Models.User.findById(req.params.userId).then(function(user, err) {
        user.updateAttributes(req.body);
        res.json(user);
    });
};

exports.destroy = function(req, res){
    Models.User.findById(req.params.userId).then(function(user, err) {
        user.destroy();
        res.json("");
    });
};
