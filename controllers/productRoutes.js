const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Product, Merchant, Review, Order, Basket, Category} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')

router.get('/', (req,res)=>{
    Product.findAll().then((allproduct)=>{
       res.json(allproduct)
    }).catch((err)=>{
       res.status(500).json({msg: 'internal server error', err})
    })
   })
   
   router.post('/', withTokenAuth,(req,res)=>{
       Product.create({
           title: req.body.title,
           content: req.body.content,
           price: req.body.status,
           productPic: req.body.productPic,
           status: req.body.status
       }).then((newProduct)=>{
           res.json(newProduct)
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   })
   
   router.get('/:id', (req, res)=>{
       Product.findByPk(req.params.id, {
           include: [Review, Category]
       }).then((findproduct)=>{
           if(!findproduct){
               res.status(404).json('no such a user')
           }else{
               res.json(findproduct)
           }
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   })

   router.put('/:id', withTokenAuth, (req,res)=>{
    Product.update({
        title: req.body.title,
        content: req.body.content,
        price: req.body.status,
        productPic: req.body.productPic,
        status: req.body.status
    },{
        where: {
            id: req.params.id
        }
    }).then((updatedProd)=>{
        if(!updatedProd){
            res.status(404).json('no such a Subejct')
        }else{
            res.json(updatedProd)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.delete('/:id', withTokenAuth, (req, res)=>{
    Product.destroy({
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
router.get('/categoryProd/:categoryId', withTokenAuth, (req, res) => {
    Category.findByPk(req.params.categoryId, {
        include: [Product]
    }).then(dbcategory => {
        if (!dbcategory) {
            res.status(404).json({ msg: "no such category!!!!" })
        } else {
            res.json(dbcategory.Subjects)
        }
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

module.exports = router