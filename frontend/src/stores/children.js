import { defineStore } from 'pinia';
import childrenService from '../services/childrenService';

export const useChildrenStore = defineStore('children', {
    state: () => ({
        children: [], // Aquí se guardará la lista de niños
        isLoading: false,
        error: null,
    }),
    actions: {
        // Acción para obtener los perfiles desde el backend
        async fetchChildren() {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await childrenService.getChildren();
                this.children = response.data;
            } catch (error) {
                this.error = 'No se pudieron cargar los perfiles de los niños.';
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },

        // Acción para añadir un nuevo perfil
        async addChild(newChildData) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await childrenService.createChild(newChildData);
                // Añade el nuevo perfil a la lista sin tener que recargar todo
                this.children.unshift(response.data);
            } catch (error) {
                this.error = 'No se pudo crear el perfil.';
                console.error(error);
                throw error; // Lanza el error para que el componente lo pueda manejar
            } finally {
                this.isLoading = false;
            }
        },

        // Acción para eliminar un perfil
        async removeChild(childId) {
            this.isLoading = true;
            this.error = null;
            try {
                await childrenService.deleteChild(childId);
                // Filtra la lista para quitar el perfil eliminado
                this.children = this.children.filter(child => child._id !== childId);
            } catch (error) {
                this.error = 'No se pudo eliminar el perfil.';
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});