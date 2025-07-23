import apiClient from './api';

export default {
    /**
     * Envía una solicitud para generar una nueva actividad.
     * @param {{ childId: string, promptText: string }} data - Los datos para la generación.
     * @returns {Promise} - La promesa con la respuesta de la API.
     */
    generate(data) {
        return apiClient.post('/api/activities/generate', data);
    },

    /**
     * Obtiene todas las actividades de un niño (se usará para la biblioteca).
     * @param {string} childId
     * @returns {Promise}
     */
    getActivitiesByChild(childId) {
        return apiClient.get(`/api/activities/child/${childId}`);
    },

    /**
     * Marca o desmarca una actividad como favorita.
     * @param {string} activityId - El ID de la actividad a modificar.
     * @returns {Promise} - La promesa con la actividad actualizada.
     */
    toggleFavorite(activityId) {
        return apiClient.patch(`/api/activities/${activityId}/favorite`);
    },
};