import apiClient from './api';

export default {
    // Obtener la lista de niños del usuario logueado
    getChildren() {
        return apiClient.get('/api/children');
    },

    // Crear un nuevo perfil de niño
    createChild(childData) {
        return apiClient.post('/api/children', childData);
    },

    // Eliminar un perfil de niño por su ID
    deleteChild(childId) {
        return apiClient.delete(`/api/children/${childId}`);
    },


    // updateChild(childId, childData) {
    //   return apiClient.put(`/api/children/${childId}`, childData);
    // }
};