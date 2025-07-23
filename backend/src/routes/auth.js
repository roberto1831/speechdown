const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Registrar un usuario
router.post('/register', authController.register);

// @route   POST api/auth/login
// @desc    Autenticar usuario y obtener token
router.post('/login', authController.login);

module.exports = router;