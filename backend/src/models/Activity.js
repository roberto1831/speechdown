const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  child: { // Para saber a qué niño pertenece la actividad
    type: Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
  },
  prompt: { // El texto que se usó para generar la actividad
    type: String,
    required: true,
  },
  generatedContent: { // El cuento o juego generado por la IA
    type: String,
    required: true,
  },
  activityType: { // Podría ser 'cuento', 'juego', 'articulación', etc.
    type: String,
    default: 'texto',
  },
  isCompleted: { // Para marcar si el niño completó la actividad
    type: Boolean,
    default: false,
  },
  isFavorite: {
  type: Boolean,
  default: false,
  },
  feedback: { // para guardar retroalimentación del terapeuta
    type: String,
  }
}, { timestamps: true }); // Para saber cuándo se creó

module.exports = mongoose.model('Activity', ActivitySchema);