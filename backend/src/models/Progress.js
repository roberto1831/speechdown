const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgressSchema = new Schema({
  // A qué niño corresponde este registro
  child: {
    type: Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
  },
  // La actividad específica que se completó
  activity: {
    type: Schema.Types.ObjectId,
    ref: 'Activity',
    required: true,
  },
  // Quién registró el progreso (el padre/terapeuta)
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Fecha en que se completó la actividad
  completionDate: {
    type: Date,
    default: Date.now,
  },
  // Una métrica simple. Podría ser una calificación de 1-5 estrellas
  // sobre qué tan bien el niño realizó la actividad.
  performanceRating: {
    type: Number,
    min: 1,
    max: 5,
  },
  // Notas o comentarios del padre/terapeuta
  notes: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Progress', ProgressSchema);