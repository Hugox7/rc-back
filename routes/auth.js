const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../controllers/auth');
const { checkDuplicateNameOrEmail } = require('../middlewares/middlewares');

//signup
router.post('/signup', checkDuplicateNameOrEmail, signUp );

//signin
router.post('/signin', signIn);

module.exports = router;