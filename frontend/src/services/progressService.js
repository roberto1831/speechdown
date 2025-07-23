import apiClient from './api';

export default {
    /**
     * Crea un nuevo registro de progreso para una actividad completada.
     * @param {{ childId: string, activityId: string, performanceRating: number, notes: string }} progressData
     * @returns {Promise}
     */
    createRecord(progressData) {
        return apiClient.post('/api/progress', progressData);
    },

    /**
     * Obtiene el historial de progreso para un niño específico.
     * @param {string} childId
     * @returns {Promise}
     */
    getByChildId(childId) {
        return apiClient.get(`/api/progress/child/${childId}`);
    },
};