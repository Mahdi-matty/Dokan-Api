const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const withTokenAuth = require('../middleware/withTokenAuth');
const { Client, Merchant, Review, Basket, Product, Order } = require(`../models`);
require('dotenv').config();


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


module.exports = router