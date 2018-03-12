'use strict';

module.exports = function(sequelize, DataTypes) {
    const Item = sequelize.define("Item", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        price: DataTypes.FLOAT,
    });

    Item.associate = (models) => {
        Item.belongsToMany(models.ShoppingList, {
            through: models.ShoppingListItem,
            foreignKey: 'itemId'
        });
    };

    return Item;
};
