import { defineStore } from 'pinia';
import authService from '../services/authService';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
    }),
    getters: {
        userName: (state) => state.user?.name || 'Usuario',
    },
    actions: {
        async login(credentials) {
            const response = await authService.login(credentials);
            const { token, user } = response.data;
            this.setToken(token);
            this.setUser(user);
        },
        async register(user) {
            await authService.register(user);
        },
        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        setUser(user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
        },
    },
});