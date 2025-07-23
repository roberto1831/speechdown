const mongoose = require('mongoose');

const ChildSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del niño es obligatorio.'],
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria.'],
  },
  // Relación con el usuario (padre o terapeuta) que lo registró.
  // Esto es crucial para saber a quién pertenece cada perfil.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Hace referencia al modelo 'User' que ya tienes
    required: true,
  },
  // Puedes expandir esto en el futuro para objetivos más complejos
  therapeuticGoals: {
    type: [String],
    default: [],
  },
  // Timestamps para saber cuándo fue creado o actualizado el registro
}, { timestamps: true });

module.exports = mongoose.model('Child', ChildSchema);