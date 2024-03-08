const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const withTokenAuth = require('../middleware/withTokenAuth');
const { Client, Merchant, Review, Basket, Product, Order } = require(`../models`);
require('dotenv').config();
const jwt = require('jsonwebtoken')


const clientRoutes = require('./clientRoutes')
router.use('/api/clients', clientRoutes)

const merchantRoutes= require('./merchantRoutes')
router.use('/api/merchants', merchantRoutes)

const productRoutes = require('./productRoutes')
router.use('/api/products', productRoutes)

const orderRoutes = require('./orderRoutes')
router.use('/api/orders', orderRoutes)

const basketRoutes = require('./basketRoutes')
router.use('/api/basket', basketRoutes)

const reviewRoutes = require('./reviewRoutes')
router.use('/api/reviews', reviewRoutes)

const categoryRoutes = require('./categoryRoutes')
router.use('/api/categories', categoryRoutes)


const searchRoutes= require('./searchRoutes')
router.use('/search', searchRoutes)

const notificationRoutes = require('./notificationRoutes')
router.use('/api/notification', notificationRoutes)

const uploadRoute = require('./upload')
router.use('/api/upload', uploadRoute)


router.get('/tokenDataClient', (req,res)=>{
    console.log('Headers:', req.headers);
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token)
    console.log('==============================')
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded)
        const userName = decoded.username
        Client.findOne({
            where: {
                username: userName
            }
        }).then(foundClient => {
            if (foundClient) {
                // If a client is found, send the client as response
                return res.json(foundClient);
            } else {
                // If neither client nor merchant is found, handle the error
                throw new Error('User not found');
            }})
    } catch(err){
        console.log(err);
       return  res.status(403).json({msg:"invalid token!"})
    }
});
router.get('/tokenDataMerchant', (req,res)=>{
    console.log('Headers:', req.headers);
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token)
    console.log('==============================')
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded)
        const userName = decoded.username
        Merchant.findOne({
            where: {
                username: userName
            }
        }).then(foundMerchant => {
            if (foundMerchant) {
                // If a client is found, send the client as response
                return res.json(foundMerchant);
            } else {
                // If neither client nor merchant is found, handle the error
                throw new Error('User not found');
            }})
    } catch(err){
        console.log(err);
       return  res.status(403).json({msg:"invalid token!"})
    }
})


module.exports = router