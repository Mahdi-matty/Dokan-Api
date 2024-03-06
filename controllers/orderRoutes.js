const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Product, Merchant, Review, Order, Basket, Category} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')


router.get('/', (req, res)=>{
    Order.findAll().then(findOrders=>{
        res.json(findOrders)
    }).catch(err=>{
        res.status(500).json({msg: 'itnernal server error', err})
    })
})
router.post('/', withTokenAuth,(req,res)=>{
    Order.create({
        productId: req.body.productId,
        BasketId: req.body.BasketId
    }).then((newOrder)=>{
        res.json(newOrder)
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.get('/:id', (req, res)=>{
    Order.findByPk(req.params.id, {
        include: [Product]
    }).then((findOrder)=>{
        if(!findOrder){
            res.status(404).json('order not found')
        }else{
            res.json(findOrder)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})


router.put('/:id', withTokenAuth, (req,res)=>{
 Order.update({
     productId : req.body.productId
 },{
     where: {
         id: req.params.id
     }
 }).then((updatedBask)=>{
     if(!updatedBask){
         res.status(404).json('order not found')
     }else{
         res.json(updatedBask)
     }
 }).catch((err)=>{
     res.status(500).json({msg: 'internal server error', err})
 })
})

router.delete('/:id', (req, res)=>{
 Order.destroy({
     where: {
         id: req.params.id
     }
 }).then((delsub)=>{
     if(!delsub){
         res.status(404).json('order not found')
     }else{
         res.json(delsub)
     }
 }).catch((err)=>{
     res.status(500).json({msg: 'internal server error', err})
 })
})

router.get('/basket/:basketId', async (req, res) => {
    try {
        const basketId = req.params.basketId;

        const findOrders = await Order.findAll({
            where: {
                BasketId: basketId
            }
        });

        if (findOrders.length === 0) {
            return res.status(404).json({ message: 'Orders not found for the specified basket' });
        }
        const orderProductPairs = await Promise.all(findOrders.map(async order => {
            const productId = order.productId;
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            });
            return {
                order: order,
                product: product
            };
        }));

        res.json(orderProductPairs);
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router