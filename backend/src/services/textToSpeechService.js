
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();

/**
 * Convierte texto a un buffer de audio MP3 usando Google Cloud TTS.
 * @param {string} text - El texto a convertir.
 * @returns {Promise<Buffer>} - Un buffer con el audio en formato MP3.
 */
async function convertTextToSpeech(text) {
    const request = {
        input: { text: text },
        // La voz se puede personalizar. 'es-US-Standard-A' es una voz femenina en español de EE.UU.
        // Explora la documentación para encontrar la mejor voz para tu público objetivo.
        voice: { languageCode: 'es-US', name: 'es-US-Standard-A' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    try {
        const [response] = await client.synthesizeSpeech(request);
        return response.audioContent;
    } catch (error) {
        console.error("Error al comunicarse con la API de Google Text-to-Speech:", error);
        throw new Error("No se pudo generar el audio.");
    }
}

module.exports = { convertTextToSpeech };