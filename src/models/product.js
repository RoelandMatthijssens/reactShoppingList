'use strict';

module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define('Product', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        price: DataTypes.FLOAT,
    });

    Product.associate = (models) => {
        Product.belongsToMany(models.ShoppingList, {
            through: models.ShoppingListItem,
            foreignKey: 'itemId'
        });
    };

    return Product;
};
