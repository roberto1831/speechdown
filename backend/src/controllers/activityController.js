// Cambia la importación para usar el nuevo servicio de Gemini
const { generateActivityWithGemini } = require('../services/geminiService');
const Activity = require('../models/Activity');
const Child = require('../models/Child');

// @route   POST /api/activities/generate
// @desc    Genera una nueva actividad con Google Gemini y la guarda
exports.createGeneratedActivity = async (req, res) => {
  const { childId, promptText } = req.body;

  if (!childId || !promptText) {
    return res.status(400).json({ msg: "Se requiere el ID del niño y un prompt." });
  }

  try {
    // Valida que el niño exista y pertenezca al usuario
    const child = await Child.findOne({ _id: childId, user: req.user.id });
    if (!child) {
      return res.status(404).json({ msg: "Perfil del niño no encontrado o no autorizado." });
    }
    
    // Llama al servicio de Gemini para generar el contenido
    const generatedContent = await generateActivityWithGemini(promptText);

    // Guarda la nueva actividad en la base de datos
    const newActivity = new Activity({
      child: childId,
      prompt: promptText,
      generatedContent,
      activityType: 'cuento', 
    });
    await newActivity.save();

    res.status(201).json(newActivity);

  } catch (error) {
    // El error ya se registra en el servicio, aquí solo enviamos una respuesta genérica
    res.status(500).send("Error en el servidor al generar la actividad.");
  }
};

// @route   GET /api/activities/child/:childId
// @desc    Obtener el historial de actividades de un niño
exports.getActivitiesByChild = async (req, res) => {
    try {
        const { childId } = req.params;

        // Validar que el niño pertenece al usuario logueado para seguridad
        const child = await Child.findOne({ _id: childId, user: req.user.id });
        if (!child) {
            return res.status(404).json({ msg: 'Perfil del niño no encontrado o no autorizado.' });
        }

        const activities = await Activity.find({ child: childId }).sort({ createdAt: -1 });
        res.json(activities);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};
// @route   PATCH /api/activities/:id/favorite
// @desc    Marcar/desmarcar una actividad como favorita
exports.toggleFavorite = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ msg: 'Actividad no encontrada.' });
    }
    // Asegurarse de que la actividad pertenece al usuario del niño
    const child = await Child.findOne({ _id: activity.child, user: req.user.id });
    if (!child) {
      return res.status(401).json({ msg: 'Usuario no autorizado.' });
    }

    activity.isFavorite = !activity.isFavorite;
    await activity.save();
    res.json(activity);
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
};