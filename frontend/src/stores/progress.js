import { defineStore } from 'pinia';
import progressService from '../services/progressService';

export const useProgressStore = defineStore('progress', {
    state: () => ({
        records: [], // Aquí se guardará el historial de progreso
        isLoading: false,
        error: null,
    }),
    actions: {
        /**
         * Obtiene los registros de progreso de un niño desde el backend.
         * @param {string} childId
         */
        async fetchProgressByChild(childId) {
            if (!childId) return;
            this.isLoading = true;
            this.error = null;
            try {
                const response = await progressService.getByChildId(childId);
                this.records = response.data;
            } catch (error) {
                this.error = 'No se pudo cargar el historial de progreso.';
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },

        /**
         * Crea un nuevo registro de progreso.
         * @param {{ childId: string, activityId: string, performanceRating: number, notes: string }} progressData
         */
        async addProgressRecord(progressData) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await progressService.createRecord(progressData);
                // Añade el nuevo registro al inicio de la lista para verlo inmediatamente
                this.records.unshift(response.data);
            } catch (error) {
                this.error = 'No se pudo guardar el registro de progreso.';
                console.error(error);
                throw error; // Lanza el error para que el componente lo maneje
            } finally {
                this.isLoading = false;
            }
        },
    },
});