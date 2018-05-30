'use strict';

module.exports = function(sequelize, DataTypes) {
    const Purchase = sequelize.define('Purchase', {
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

    Purchase.associate = models => {
        Purchase.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id' });
        Purchase.belongsTo(models.ShoppingList, { foreignKey: 'shoppingListId', targetKey: 'id' });
    };

    return Purchase;
};
