const express = require('express');
const User = require('../models/user');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
//user registeration
authRouter.post('/signup', (req, res)=>{
    User.findOne({username: req.body.username})
    .populate('collegedestinys')
    .exec((err, existingUser)=>{
        if(err) return res.status(500).send({sucess:false, err})
    })
    if(existingUser !== null){
        return res.status(400).send({success:false, err:'That user already exists'})
    }
    const newUser = new User(req.body);
    newUser.save((err, user)=>{
        if(err) return res.status(500).send({success:false, err})
    const token = jwt.sign(user.toObject(), process.env.SECRET);
    return res.status(201).send({success: true, user: user.withoutPassword(),token});
}); });
//login new user

authRouter.post('/login',(req,res)=>{
    User.findOne({username: req.body.username.toLowerCase()})
    .populate("scholarships")
    .exec((err,user)=>{
if(err) return res.status(500).send(err)
   if(!User){
       return res.status(403).send({success:false, message:'Invalid username'})
       const token = jwt.sign(user.toObject(), porcess.env.SECRET, {expiresIn:'24h'});
       return res.status(200).send({token:token, user:user.withoutPassword(), success:true, message:'Heres your token'})
   } });
    
});
 module.exports = authRouter;