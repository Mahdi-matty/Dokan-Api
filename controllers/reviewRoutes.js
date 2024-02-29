const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Product, Merchant, Review, Order, Basket, Category, Client} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')


router.post('/', withTokenAuth,(req,res)=>{
    Review.create({
        comment: req.body.comment,
        productId: req.body.productId,
        clientId: req.body.clientId,
    }).then((newProduct)=>{
        res.json(newProduct)
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.get('/:id', (req, res)=>{
    Review.findByPk(req.params.id, {
        include: [Product, Client]
    }).then((findReview)=>{
        if(!findReview){
            res.status(404).json('review not found')
        }else{
            res.json(findReview)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.put('/:id', withTokenAuth, (req,res)=>{
    Review.update({
        comment: req.body.comment,
    },{
        where: {
            id: req.params.id
        }
    }).then((updatedReview)=>{
        if(!updatedReview){
            res.status(404).json('review not found')
        }else{
            res.json(updatedReview)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.delete('/:id', withTokenAuth, (req, res)=>{
    Review.destroy({
        where: {
            id: req.params.id
        }
    }).then((delReview)=>{
        if(!delReview){
            res.status(404).json('review not found')
        }else{
            res.json(delReview)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.get('/product/:productId', (req, res) => {
    const productId = req.params.productId
    Review.findAll( {
        where: {
            productId: productId
        }
    }).then(dbReview => {
        if (!dbReview) {
            res.status(404).json({ msg: "review not found!!!!" })
        } else {
            res.json(dbReview)
        }
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

module.exports = router