const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/users', userController.getUser);
router.post('/users', userController.createUser);
// router.put('/users/:id', userController.updateUserUser);
// router.delete('/users/:id', userController.deleteUser);

module.exports = router;