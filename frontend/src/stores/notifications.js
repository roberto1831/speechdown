import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationsStore = defineStore('notifications', () => {
    const notifications = ref([]);

    function addNotification(notification) {
        const id = Date.now() + Math.random();
        notifications.value.push({ ...notification, id });

        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            removeNotification(id);
        }, 5000);
    }

    function removeNotification(id) {
        notifications.value = notifications.value.filter(n => n.id !== id);
    }

    return { notifications, addNotification, removeNotification };
});