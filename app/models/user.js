'use strict';

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        email: DataTypes.STRING,
    });

    return User;
};
