const express = require('express');
const authController = require('../controllers/auth');

//validations
const validations = require('../util/validations/auth-validations');

// middleware
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

// /auth/signup => Post

router.post('/signup', validations.signupValidations, authController.signUp);

// /auth/login => Post
router.post('/login', validations.loginValidations, authController.login);

// /auth/profile => Get
router.get('/profile', isAuth, authController.getUserProfile);

// /auth/signup => Put
router.put('/profile', isAuth, authController.editUserProfile);

// /auth/signup => Delete
router.delete('/profile', isAuth, authController.deleteAccount);

module.exports = router;