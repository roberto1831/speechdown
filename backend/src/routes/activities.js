const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
    createGeneratedActivity,
    getActivitiesByChild
} = require('../controllers/activityController');

// @route   POST /api/activities/generate
// @desc    Generar una nueva actividad
router.post('/generate', auth, createGeneratedActivity);

// @route   GET /api/activities/child/:childId
// @desc    Obtener historial de actividades de un niño
router.get('/child/:childId', auth, getActivitiesByChild);

//router.patch('/:id/favorite', auth, toggleFavorite);

module.exports = router;
