'use strict';
module.exports = function(app) {
    const lists = require('../controllers/shopping-list');

    app.route('/shopping-lists')
        .get(lists.list)
        .post(lists.create);

    app.route('/shopping-lists/:id')
        .get(lists.view)
        .post(lists.update)
        .delete(lists.destroy);

    app.route('/shopping-lists/:id/items')
        .get(lists.showItems)
        .post(lists.addItem);
};
