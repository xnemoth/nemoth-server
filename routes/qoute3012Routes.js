const express = require('express');
const router = express.Router();
const qoutes3012Controller = require('../controllers/qoute3012Controllers');

router.get('/3012qoutes', qoutes3012Controller.getQuotes);

router.post('/3012qoutes', qoutes3012Controller.createQuote);

module.exports = router;