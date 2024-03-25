const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Product, Client, Product, Fav} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')


router.get('/user/:userId', withTokenAuth, (req, res)=>{
    const userId = req.params.userId
    Fav.findAll({
        where: {
            userId: userId
        }
    }).then(findFav=>{
        res.json(findFav)
    }).catch(err=>{
        res.status(500).json({msg: 'itnernal server error', err})
    })
})

router.post('/', withTokenAuth,(req,res)=>{
    Fav.create({
        productId: req.body.productId,
    }).then((newFav)=>{
        res.json(newFav)
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.get('/:id', (req, res)=>{
    Fav.findByPk(req.params.id, {
        include: [Product]
    }).then((findFav)=>{
        if(!findFav){
            res.status(404).json('item not found')
        }else{
            res.json(findFav)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})


router.put('/:id', withTokenAuth, (req,res)=>{
 Fav.update({
     productId : req.body.productId
 },{
     where: {
         id: req.params.id
     }
 }).then((updatedFav)=>{
     if(!updatedFav){
         res.status(404).json('order not found')
     }else{
         res.json(updatedFav)
     }
 }).catch((err)=>{
     res.status(500).json({msg: 'internal server error', err})
 })
})

router.delete('/:id', (req, res)=>{
 Fav.destroy({
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

module.exports = router