require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log('MongoDB conectado'))
 .catch(err => console.log(err));

// Middlewares
app.use(cors()); // peticiones desde el frontend
app.use(express.json()); // servidor entender JSON


app.use('/api/auth', require('./routes/auth'));
app.use('/api/children', require('./routes/children'));
app.use('/api/activities', require('./routes/activities')); 
app.use('/api/progress', require('./routes/progress'));
app.use('/api/tts', require('./routes/tts'));

// prueba
app.get('/', (req, res) => {
    res.send('API de SpeechDown funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

