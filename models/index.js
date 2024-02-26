const Merchant = require ('./Merchant')
const Basket = require('./Basket')
const Category = require('./Category')
const Product = require('./Product')
const Review = require('./Review')
const Client = require('./Client')
const Order = require('./Order')


Client.hasOne(Basket, {
    foreignKey: 'clientId'
})

Client.afterCreate(async (client, options) => {
    try {
        await Basket.create({ clientId: client.id });
    } catch (error) {
        console.error('Error creating basket:', error);
    }
});
Basket.belongsTo(Client, {
    foreignKey: 'clientId'
})

Basket.hasMany(Order, {
    foreignKey: 'basketId'
})

Order.belongsTo(Basket, {
    foreignKey: 'basketId'
})

Basket.hasMany(Product, {
    through: Order,
    foreignKey: 'productid'
})
Product.belongsToMany(Basket, {
    through: Order,
    foreignKey: 'productId'
})

Merchant.hasMany(Product, {
    foreignKey: 'merchantId'
})
Product.belongsTo(Merchant, {
    foreignKey: 'merchantId'
})

Client.hasMany(Review, {
    foreignKey: 'clientId'
})
Review.belongsTo(Client, {
    foreignKey: 'clientId'
})

Product.hasMany(Review, {
    foreignKey: 'productId'
})
Review.belongsTo(Product, {
    foreignKey: 'productId'
})

Category.hasMany(Product, {
    foreignKey: 'categoryId'
})
Product.belongsTo(Category, {
    foreignKey: 'categoryId'
})

module.exports = {
    Order,
    Merchant,
    Review,
    Category,
    Client,
    Product,
    Basket
}       