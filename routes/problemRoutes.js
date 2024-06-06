const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const auth = require('../middleware/auth');
const ProblemController=require('../controllers/ProblemController')
router.get('/editor',auth.authenticate,ProblemController.editor);
router.get('/problemset',auth.authenticate,ProblemController.problemSet);
router.post('/run', auth.authenticate,ProblemController.runCode);
router.get('/problems/:problemId',auth.authenticate,ProblemController.getProblem);
  module.exports=router;
