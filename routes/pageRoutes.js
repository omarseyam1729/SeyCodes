// routes/index.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/',auth.authenticate, (req, res) => {
 
  res.render('pages/home',{user:req.user});
});
router.get('/about',auth.authenticate, (req, res) => {

  res.render('pages/about',{user:req.user});
});
router.get('/linkedlists',auth.authenticate,(req,res)=>{
  res.render('learn/linkedlists',{user:req.user});
});
router.get('/graphs',auth.authenticate,(req,res)=>{
  res.render('learn/graphs',{user:req.user});
});
router.get('/trees',auth.authenticate,(req,res)=>{
  res.render('learn/trees',{user:req.user});
});
router.get('/stacks',auth.authenticate,(req,res)=>{
  res.render('learn/stacks',{user:req.user});
});
router.get('/queues',auth.authenticate,(req,res)=>{
  res.render('learn/queue',{user:req.user});
});
router.get('/arrays',auth.authenticate,(req,res)=>{
  res.render('learn/arrays',{user:req.user});
});

module.exports = router;
