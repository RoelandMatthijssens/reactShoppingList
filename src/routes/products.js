'use strict';
module.exports = function(app) {
    const product = require('../controllers/product');

    app.route('/products')
        .get(product.list)
        .post(product.create);

    app.route('/products/:id')
        .get(product.view)
        .post(product.update)
        .delete(product.destroy);
};
