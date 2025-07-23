import apiClient from './api';

export default {
    /**
     * Envía texto al backend para convertirlo en audio.
     * @param {string} text - El texto a convertir.
     * @returns {Promise<ArrayBuffer>} - La promesa con el buffer de audio.
     */
    speak(text) {
        return apiClient.post('/api/tts/speak', { text }, {
            responseType: 'arraybuffer' // ¡Importante para recibir el audio!
        });
    },
};