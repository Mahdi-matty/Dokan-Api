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


router.get('/datafromtoken', (req,res)=>{
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
        }).then(foundClient=>{
            if(!foundClient){
                Merchant.findOne({
                    where: {
                        username: userName
                    }
                }).then(foundMerchant=>{
                    res.json({
                        user: foundMerchant,
                        status: 'merchant'
                    })
                })
            }
            res.json({
                user: foundClient,
                status: 'client'
            })
        })
        // const userId = decoded.id
        // Client.findByPk(userId).then(foundUser=>{
        //      res.json(foundUser)
        // })
    } catch(err){
        console.log(err);
       return  res.status(403).json({msg:"invalid token!"})
    }
})


module.exports = router