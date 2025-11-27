const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authentication } = require('../middlewares/authMiddleware');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authentication, authController.getProfile);

module.exports = router;
