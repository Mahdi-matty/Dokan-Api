const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Product, Merchant, Review, Order, Basket, Category} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')


router.get('/', (req, res) => {
    Category.findAll().then(allCategory => {
        const groupedCategories = allCategory.reduce((acc, category) => {
            if (!acc[category.name]) {
                acc[category.name] = [];
            }
            acc[category.name].push(category.sub);
            return acc;
        }, {});

        res.json(groupedCategories);
    }).catch((err) => {
        res.status(500).json({ msg: 'internal server error', err });
    });
});

router.get('/sub/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName
    Category.findAll({
        where :{
            name: categoryName
        },
            include: [Product]
        }).then(allCategory => {
        if(allCategory.length == 0){
            res.status(404).json('category not found')
        }
        const response = {
            category: allCategory,
            products: allCategory.map(category => category.Products)
        };
        res.json(response);
    }).catch((err) => {
        res.status(500).json({ msg: 'internal server error', err });
    });
});
   
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
       Category.findByPk(req.params.id, {
        include: [Product]
       }).then((findCategory)=>{
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