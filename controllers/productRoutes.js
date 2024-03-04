const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Product, Merchant, Review, Order, Basket, Category} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')
const { Op } = require('sequelize');


router.get('/', (req,res)=>{
    Product.findAll().then(allproduct=>{
       res.json(allproduct)
    }).catch((err)=>{
       res.status(500).json({msg: 'internal server error', err})
    })
   })
   
router.post('/', withTokenAuth,(req,res)=>{
       Product.create({
           title: req.body.title,
           content: req.body.content,
           price: req.body.price,
           productPic: req.body.productPic,
           stock: req.body.stock
       }).then((newProduct)=>{
           res.json(newProduct)
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });
   
router.get('/:id', (req, res)=>{
       Product.findByPk(req.params.id, {
           include: [Review, Category]
       }).then((findproduct)=>{
           if(!findproduct){
               res.status(404).json('product not found')
           }else{
               res.json(findproduct)
           }
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });

   router.put('/:id', withTokenAuth, (req,res)=>{
    Product.update({
        title: req.body.title,
        content: req.body.content,
        price: req.body.status,
        productPic: req.body.productPic,
        stock: req.body.stock
    },{
        where: {
            id: req.params.id
        }
    }).then((updatedProd)=>{
        if(!updatedProd){
            res.status(404).json('product not found')
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
            res.status(404).json('product not found')
        }else{
            res.json(delsub)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.get('/categoryByName/:name', (req, res)=>{
    const name= req.params.name
    Category.findAll({
        where: {
            name: name
        }
    }).then(findedCat=>{
        if(findedCat.length == 0){
            res.status(404).json('no such a category')
        }
        res.json(findedCat)
    }).catch(err=>{
        res.status(500).json({msg: "internal server error", err})
    })
});

router.get('/categoryByNameSub/:name/:sub', (req, res)=>{
    const name= req.params.name;
    const sub = req.params.sub;
    Category.findAll({
        where:{
            name: name,
            sub: sub
        }
    }).then(findCat=>{
        if(findCat.length == 0){
            res.status(500).json('no such subcategory')
        }
        res.json(findCat)
    }).catch(err=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})


router.get('/merchant/:merchantId', withTokenAuth, (req, res)=>{
    const merchantId = req.params.merchantId
    Product.findAll({
        where:{
            merchantId: merchantId
        }
    }).then(findProduct=>{
        if(findProduct.length == 0){
            res.status(404).json('product not found')
        }
         res.json(findProduct)
    }).catch(err=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})
module.exports = router