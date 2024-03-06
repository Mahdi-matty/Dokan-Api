const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Product, Merchant, Review, Order, Basket, Category, Notification} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')

router.post('/', async (req, res)=>{
    try {
      
        const product = await Product.findByPk(req.body.productId);

        if (product.status === 'available' && product.previous('status') === 'unavailable') {
            const newNote = await Notification.create({
                message: req.body.message,
                productId: req.body.productId,
            });
            return res.json(newNote);
        } else {
            return res.status(400).json({ msg: 'No new notification created' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error', error });
    }
});

router.get('/product/:producId', (req, res)=>{
    const productId = req.params/productId
    Notification.findAll({
        where:{
            poroductId :productId
        }
    }).then(findNot=>{
        if(findNot.length == 0){
            res.status(404).json('no notification to show')
        }
        res.json(findNot)
    }).catch(err=>{
        res.status(500).json({msg: 'itnernal server error', err})
    })
})


module.exports = router;