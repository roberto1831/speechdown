const Progress = require('../models/Progress');
const Child = require('../models/Child');

// @route   POST /api/progress
// @desc    Crear un nuevo registro de progreso para una actividad
exports.createProgressRecord = async (req, res) => {
  const { childId, activityId, performanceRating, notes } = req.body;
  const userId = req.user.id;

  try {
    // Verificar que el niño pertenece al usuario para seguridad
    const child = await Child.findOne({ _id: childId, user: userId });
    if (!child) {
      return res.status(404).json({ msg: 'Perfil del niño no autorizado o no encontrado.' });
    }

    const newProgress = new Progress({
      child: childId,
      activity: activityId,
      user: userId,
      performanceRating,
      notes,
    });

    const progress = await newProgress.save();
    res.status(201).json(progress);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// @route   GET /api/progress/child/:childId
// @desc    Obtener todos los registros de progreso para un niño
exports.getProgressByChild = async (req, res) => {
  const { childId } = req.params;
  const userId = req.user.id;

  try {
    // Verificar que el niño pertenece al usuario
    const child = await Child.findOne({ _id: childId, user: userId });
    if (!child) {
      return res.status(404).json({ msg: 'Perfil del niño no autorizado o no encontrado.' });
    }

    const progressRecords = await Progress.find({ child: childId })
      .populate('activity', ['prompt', 'activityType']) // Trae info de la actividad
      .sort({ completionDate: -1 });

    res.json(progressRecords);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};