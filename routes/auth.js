const express = require('express');
const authController = require('../controllers/auth');
const {body} = require('express-validator/check');

//validations
const validations = require('../validations/auth-validations');

const router = express.Router();



// /auth/signup => Post

router.post('/signup', validations.signupValidations, authController.signup);

// /auth/login => Post
router.post('/login', validations.signupValidations,authController.login);

// /auth/profile => Get
router.get('/profile', authController.getUserProfile);

// /auth/signup => Put
router.put('/profile', authController.editUserProfile);

// /auth/signup => Delete
router.delete('/profile', authController.deleteUserProfile);

module.exports = router;