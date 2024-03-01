const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Product, Merchant, Review, Order, Basket, Category} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')


router.get('/', (req,res)=>{
    Category.findAll().then(allCategory=>{
       res.json(allCategory)
    }).catch((err)=>{
       res.status(500).json({msg: 'internal server error', err})
    })
   })
   
router.post('/', withTokenAuth,(req,res)=>{
       Category.create({
           name: req.body.name,
           sub: req.body.sub
       }).then((newCategory)=>{
           res.json(newCategory)
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });
   
router.get('/:id', (req, res)=>{
       Category.findByPk(req.params.id).then((findCategory)=>{
           if(!findCategory){
               res.status(404).json('product not found')
           }else{
               res.json(findCategory)
           }
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
    })

       
       module.exports = router