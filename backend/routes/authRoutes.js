const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const auth = require('../middleware/auth');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', auth.authenticate, auth.requireAuth, AuthController.logout);
router.get('/me', auth.authenticate, auth.requireAuth, AuthController.getMe);

module.exports = router;