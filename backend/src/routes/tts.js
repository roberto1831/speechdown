const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { speak } = require('../controllers/ttsController');

// @route   POST /api/tts/speak
// @desc    Convertir texto a voz
// @access  Privado
router.post('/speak', auth, speak);

module.exports = router;