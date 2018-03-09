'use strict';
module.exports = function(app) {
  const user = require('../controllers/user');

  app.route('/users')
    .get(user.list)
    .post(user.create);

  app.route('/users/:userId')
    .get(user.view)
    .post(user.update)
    .delete(user.destroy);
};
