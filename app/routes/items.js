'use strict';
module.exports = function(app) {
    const item = require('../controllers/item');

    app.route('/items')
        .get(item.list)
        .post(item.create);

    app.route('/items/:id')
        .get(item.view)
        .post(item.update)
        .delete(item.destroy);
};
