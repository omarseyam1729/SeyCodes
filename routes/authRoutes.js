const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const auth = require('../middleware/auth');

router.get('/register',auth.deauth, (req, res) => res.render('auth/register',{user:req.user}));
router.get('/login', (req, res) => res.render('auth/login',{user:req.user}));
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/logout',auth.deauth,(req,res)=>{
    res.render('pages/home',{user:req.user});
})
module.exports=router;