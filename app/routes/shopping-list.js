'use strict';
module.exports = function(app) {
    const lists = require ('../controllers/shopping-list');

    app.route('/shopping-lists')
        .get(lists.list)
        .post(lists.create);

    app.route('/shopping-lists/:id')
        .get(lists.view)
        .post(lists.update)
        .delete(lists.destroy);
};
