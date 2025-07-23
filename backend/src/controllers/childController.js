const Child = require('../models/Child');

// @desc    Crear un nuevo perfil de niño
// @route   POST /api/children
// @access  Privado
exports.createChild = async (req, res) => {
  try {
    const { name, dateOfBirth, therapeuticGoals } = req.body;

    // El ID del usuario viene del middleware de autenticación
    const userId = req.user.id;

    const child = new Child({
      name,
      dateOfBirth,
      user: userId,
      therapeuticGoals
    });

    const newChild = await child.save();
    res.status(201).json(newChild);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// @desc    Obtener todos los perfiles de niños del usuario logueado
// @route   GET /api/children
// @access  Privado
exports.getChildrenByUser = async (req, res) => {
  try {
    const children = await Child.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(children);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// @desc    Actualizar un perfil de niño
// @route   PUT /api/children/:id
// @access  Privado
exports.updateChild = async (req, res) => {
  try {
    const { name, dateOfBirth, therapeuticGoals } = req.body;
    let child = await Child.findById(req.params.id);

    if (!child) {
      return res.status(404).json({ msg: 'Perfil del niño no encontrado.' });
    }

    // Asegurarse de que el usuario es el dueño del perfil
    if (child.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Usuario no autorizado.' });
    }

    const updatedData = { name, dateOfBirth, therapeuticGoals };
    child = await Child.findByIdAndUpdate(req.params.id, { $set: updatedData }, { new: true });

    res.json(child);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};


// @desc    Eliminar un perfil de niño
// @route   DELETE /api/children/:id
// @access  Privado
exports.deleteChild = async (req, res) => {
  try {
    let child = await Child.findById(req.params.id);

    if (!child) {
      return res.status(404).json({ msg: 'Perfil del niño no encontrado.' });
    }
    
    // Asegurarse de que el usuario es el dueño del perfil
    if (child.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Usuario no autorizado.' });
    }

    await Child.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Perfil del niño eliminado correctamente.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};