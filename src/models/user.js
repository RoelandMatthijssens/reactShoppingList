'use strict';

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false}
    });

    return User;
};
