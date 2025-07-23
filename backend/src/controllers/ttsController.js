const { convertTextToSpeech } = require('../services/textToSpeechService');

exports.speak = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ msg: "El campo 'text' es requerido." });
    }

    try {
        const audioBuffer = await convertTextToSpeech(text);
        res.setHeader('Content-Type', 'audio/mpeg');
        res.send(audioBuffer);
    } catch (error) {
        res.status(500).send("Error en el servidor al generar el audio.");
    }
};