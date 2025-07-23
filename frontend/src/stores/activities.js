import { defineStore } from 'pinia';
import activitiesService from '../services/activitiesService';

export const useActivitiesStore = defineStore('activities', {
    state: () => ({
        currentActivity: null, // Guardará la última actividad generada
        isLoading: false,
        error: null,
    }),
    actions: {
        /**
         * Llama al servicio para generar una nueva actividad y actualiza el estado.
         * @param {{ childId: string, promptText: string }} generationData
         */
        async generateNewActivity(generationData) {
            this.isLoading = true;
            this.error = null;
            this.currentActivity = null;
            try {
                const response = await activitiesService.generate(generationData);
                this.currentActivity = response.data;
            } catch (err) {
                this.error = 'Ocurrió un error al generar la actividad. Inténtalo de nuevo.';
                console.error(err);
                // Lanzamos el error para que el componente pueda detectarlo si es necesario
                throw err;
            } finally {
                this.isLoading = false;
            }
        },
    },
});