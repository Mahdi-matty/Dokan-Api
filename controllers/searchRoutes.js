const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Product, Merchant, Review, Order, Basket, Category} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')
const { Op } = require('sequelize')


router.get('/search', async(req,res)=>{
    try{
        const {tag} = req.query
        const products = await Product.findAll({
            where: {
                title: {
                    [Op.like]: `${tag}%`
                }
            }
        }) ;
         res.json(products)
    }catch(error){
        console.error('error happens while searching for product', error)
        res.status(500).json({msg: 'internal server error', error})
    }
    
})


module.exports = router