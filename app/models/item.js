'use strict';

module.exports = function(sequelize, DataTypes) {
    const Item = sequelize.define("Item", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        price: DataTypes.FLOAT,
    });

    return Item;
};
