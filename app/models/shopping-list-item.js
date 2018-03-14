'use strict';

module.exports = function(sequelize, DataTypes) {
    const ShoppingListItem = sequelize.define('ShoppingListItem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {min: 0}
        }
    });

    ShoppingListItem.associate = models => {
        ShoppingListItem.belongsTo(models.Item, { foreignKey: 'itemId', targetKey: 'id' });
        ShoppingListItem.belongsTo(models.ShoppingList, { foreignKey: 'shoppingListId', targetKey: 'id' });
    };

    return ShoppingListItem;
};
