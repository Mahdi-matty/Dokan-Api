const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Product, Merchant, Review, Order, Basket, Category} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')

   
router.post('/', withTokenAuth,(req,res)=>{
       Basket.create({
           clientId: req.body.clientId
       }).then((newProduct)=>{
           res.json(newProduct)
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   })
   
   router.get('/:id', (req, res)=>{
       Basket.findByPk(req.params.id, {
           include: [Product, Order]
       }).then((findBasket)=>{
           if(!findBasket){
               res.status(404).json('no such a user')
           }else{
               res.json(findBasket)
           }
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   })

   router.put('/:id', withTokenAuth, (req,res)=>{
    Basket.update({
        orderId : req.body.orderId
    },{
        where: {
            id: req.params.id
        }
    }).then((updatedBask)=>{
        if(!updatedBask){
            res.status(404).json('no such a Subejct')
        }else{
            res.json(updatedBask)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.delete('/:id', withTokenAuth, (req, res)=>{
    Basket.destroy({
        where: {
            id: req.params.id
        }
    }).then((delsub)=>{
        if(!delsub){
            res.status(404).json('no such a subject')
        }else{
            res.json(delsub)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

module.exports = router