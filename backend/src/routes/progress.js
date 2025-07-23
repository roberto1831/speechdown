const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createProgressRecord,
  getProgressByChild,
} = require('../controllers/progressController');

// Todas las rutas aquí están protegidas y requieren autenticación
router.use(auth);

// @route   POST /api/progress
// @desc    Crear un nuevo registro de progreso
router.post('/', createProgressRecord);

// @route   GET /api/progress/child/:childId
// @desc    Obtener el historial de progreso de un niño
router.get('/child/:childId', getProgressByChild);

module.exports = router;