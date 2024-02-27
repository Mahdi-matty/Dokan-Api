const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Client, Product, Basket, Review} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')


router.get('/', (req, res)=>{
    Client.findAll().then(allClient=>{
        res.json(allClient)
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:'internal server error', err})
    })
})

router.get('/:id', (req,res)=>{
    Client.findByPk(req.params.id, {
        include:[Basket, Review]
    }).then(Client=>{
        if(!Client){
            res.status(404).json({msg:'no such a user'})
        }else{
            res.json(Client)
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.get('/datafromtoken', (req,res)=>{
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token)
    console.log('==============================')
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        Client.findByPk(decoded.id).then(foundUser=>{
            res.json(foundUser)
        })
    } catch(err){
        console.log(err);
       return  res.status(403).json({msg:"invalid token!"})
    }
})

router.post('/', (req, res)=>{
    Client.create({
        username:req.body.username,
        email: req.body.email,
        password:req.body.password
    }).then((newUser)=>{
        Basket.create({
            clientId: newUser.id
        }).then((newBasket)=>{
             const token = jwt.sign({
            email:newUser.email,
            id:newUser.id,
            username: newUser.username
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.json({
            token,
            Client:newUser,
            Basket: newBasket
        })
        })
       
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.put('/:id', withTokenAuth, (req, res)=>{
    Client.update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    },{
        where: {
            id: req.tokenData.id
        }
    }).then((editeduser)=>{
        if(!editeduser[0]){
            res.status(404).json({msg: 'no such a user'})
        }else{
            res.json(editeduser[0])
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.delete('/:id', (req, res)=>{
    Client.destroy({
        username:req.body.username,
        password:req.body.password,
        email: req.body.email,
    },{
        where: {
            id: req.params.id
        }
    }).then((deleteeduser)=>{
        if(!deleteeduser){
            res.status(404).json({msg: 'no such a user'})
        }else {
            res.json(deleteeduser)
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.post('/login', (req,res)=>{
    Client.findOne({
        where: {
            username:req.body.username
        }
    }).then((foundUser)=>{
        if(!foundUser || !bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid login credentials"})
        };
        const token = jwt.sign({
            email:foundUser.email,
            id:foundUser.id,
            username: foundUser.username
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.json({
            token,
            client:foundUser
        })
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.get("/logged-user", withTokenAuth, (req, res) => {
    Client.findByPk(req.tokenData.id, {
        include: [Review, Basket]
    }).then(dbStudent => {
        if (!dbStudent) {
            res.status(404).json({ msg: "no such student!!!!" })
        } else {
            res.json(dbStudent)
        }
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

router.get('/logOut', (req,res)=>{
    req.session.destroy((err)=>{
        if (err) {
            return res.status(500).json({ msg: 'Failed to logout' });
          }  
          // Clear the session token from a cookie or local storage
          res.clearCookie('sessionToken');  
          // Send a response indicating successful logout
          res.json({ msg: 'Logout successful' });
        });
    })

module.exports= router