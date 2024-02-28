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

router.get('/basket/:basketId', (req, res)=>{
    const basketId = req.params.basketId
    Order.findAll({
        where: {
            BasketId: basketId
        }
    }).then(findOrders=>{
        if(findOrders.length == 0){
            res.status(404).json('order not found')
        }
        res.json(findOrders)
    }).catch(err=>{
        res.status(500).json({msg : 'internal server error', err})
    })
})

module.exports = router