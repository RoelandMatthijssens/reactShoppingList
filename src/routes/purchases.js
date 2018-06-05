'use strict';
module.exports = function(app) {
    const purchase = require('../controllers/purchase');

    app.route('/purchases')
        .get(purchase.list)
        .post(purchase.create);

    app.route('/purchases/:id')
        .get(purchase.view)
        .post(purchase.update)
        .delete(purchase.destroy);
};
