const Models = require ('../models');

module.exports = {
    isAuthenticated (req) { //eslint-disable-line no-unused-vars
        return true;
    },
    getAssosiatedUser (req) {
        let id = parseInt (req.get ('Authorization'));
        return Models.User.findById (id);
    }
};
