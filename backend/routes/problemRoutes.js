const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ProblemController = require('../controllers/ProblemController');

router.get('/', auth.authenticate, auth.requireAuth, ProblemController.problemSet);
router.get('/:problemId', auth.authenticate, auth.requireAuth, ProblemController.getProblem);
router.post('/run', auth.authenticate, auth.requireAuth, ProblemController.runCode);

module.exports = router;
