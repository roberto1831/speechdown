const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Obtener el token del encabezado
  const token = req.header('Authorization');

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso no válido.' });
  }

  // Si hay token, se extrae (formato "Bearer <token>")
  const tokenValue = token.split(' ')[1];
  if (!tokenValue) {
    return res.status(401).json({ msg: 'Formato de token no válido.' });
  }
  
  // Verificar el token
  try {
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = decoded.user; // Se añade el payload del token a la petición
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no es válido.' });
  }
};