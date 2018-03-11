'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("ShoppingList", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        due_date: { type: DataTypes.DATE, allowNull: false }
    });
};
