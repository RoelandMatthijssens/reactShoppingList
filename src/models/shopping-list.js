'use strict';

module.exports = (sequelize, DataTypes) => {
    const ShoppingList = sequelize.define('ShoppingList', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        due_date: { type: DataTypes.DATE, allowNull: false }
    });

    ShoppingList.associate = models => {
        ShoppingList.belongsToMany(models.Product, {
            through: models.ShoppingListItem,
            foreignKey: 'shoppingListId'
        });
    };

    return ShoppingList;
};
