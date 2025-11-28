const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authentication, authorization } = require('../middlewares/authMiddleware');
const { validateRequest, loginSchema,registerSchema } = require('../middlewares/validation');


router.post('/register',validateRequest(registerSchema), authController.register);
router.post('/login',validateRequest(loginSchema), authController.login);
router.get('/profile', authentication, authController.getProfile);
router.get('/profile', authorization("admin"), authController.getProfile);

module.exports = router;
