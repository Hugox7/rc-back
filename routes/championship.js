const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/middlewares');

const { createChamp, getChamp } = require('../controllers/championship');

router.post('/create', verifyToken, createChamp);
router.get('/get/:userId/:champId', verifyToken, getChamp);

module.exports = router;