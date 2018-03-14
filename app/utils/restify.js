'use strict';

const METHODS = {
    LIST: 'list',
    CREATE: 'create',
    VIEW: 'view',
    UPDATE: 'update',
    DESTROY: 'destroy'
};

const respondWith = (req, res, promise) => {
    return promise
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
};

const creators = {
    list: model => (req, res) => {
        respondWith(req, res, model.findAll());
    },

    create: model => (req, res) => {
        respondWith(req, res, model.build(req.body).save());
    },

    view: model => (req, res) => {
        let query = { where: { id: req.params.id } };
        respondWith(req, res, model.findOne(query));
    },

    update: model => (req, res) => {
        respondWith(req, res, model
            .findById(req.params.id)
            .then(instance => instance.updateAttributes(req.body))
        );
    },

    destroy: model => (req, res) => {
        respondWith(req, res, model
            .findById(req.params.id)
            .then(item => item.destroy())
        );
    }
};

exports.restify = (model, methods = Object.values(METHODS)) => {
    return methods.reduce((acc, method) => {
        return Object.assign(acc, { [method]: creators[method](model) });
    }, {});
};

Object.assign(exports, creators);
Object.assign(exports, METHODS);
