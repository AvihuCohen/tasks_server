const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// /auth/signup => Post
router.post('/signup', authController.signup);

// /auth/login => Post
router.post('/login', authController.login);

// /auth/profile => Get
router.get('/profile', authController.getUserProfile);

// /auth/signup => Put
router.put('/profile', authController.editUserProfile);

// /auth/signup => Delete
router.delete('/profile', authController.deleteUserProfile);

module.exports = router;