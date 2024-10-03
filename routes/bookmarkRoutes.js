const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkControllers');

router.get('/bookmarks', bookmarkController.getBookmark);

module.exports = router;