const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  createChild,
  getChildrenByUser,
  updateChild,
  deleteChild
} = require('../controllers/childController');

// Aplicamos el middleware de autenticación a todas las rutas de este archivo.
// Así nos aseguramos de que solo usuarios logueados puedan acceder.

// @route   POST /api/children
// @desc    Crear un nuevo perfil de niño
router.post('/', authMiddleware, createChild);

// @route   GET /api/children
// @desc    Obtener todos los perfiles de un usuario
router.get('/', authMiddleware, getChildrenByUser);

// @route   PUT /api/children/:id
// @desc    Actualizar un perfil por su ID
router.put('/:id', authMiddleware, updateChild);

// @route   DELETE /api/children/:id
// @desc    Eliminar un perfil por su ID
router.delete('/:id', authMiddleware, deleteChild);

module.exports = router;