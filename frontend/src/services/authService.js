import apiClient from './api';

export default {
    register(user) {
        return apiClient.post('/api/auth/register', user);
    },
    login(credentials) {
        return apiClient.post('/api/auth/login', credentials);
    },
};