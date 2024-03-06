const Merchant = require ('./Merchant')
const Basket = require('./Basket')
const Category = require('./Category')
const Product = require('./Product')
const Review = require('./Review')
const Client = require('./Client')
const Order = require('./Order')
const Notification = require('./Notification')

Client.hasOne(Basket, {
    foreignKey: 'clientId'
})

Client.hasMany(Notification)
Notification.belongsTo(Client)
Product.hasOne(Notification)
Notification.belongsTo(Product)

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

Category.hasMany(Product)
Product.belongsTo(Category)

module.exports = {
    Order,
    Merchant,
    Review,
    Category,
    Client,
    Product,
    Basket,
    Notification
}       