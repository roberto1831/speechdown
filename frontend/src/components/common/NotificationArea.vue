<template>
  <div class="fixed bottom-5 right-5 z-50 w-full max-w-sm space-y-3">
    <transition-group name="list" tag="div">
      <div
          v-for="notification in notificationsStore.notifications"
          :key="notification.id"
          class="p-4 rounded-lg shadow-lg text-white font-medium flex justify-between items-center"
          :class="notificationTypeClass(notification.type)"
      >
        <span>{{ notification.message }}</span>
        <button @click="notificationsStore.removeNotification(notification.id)" class="ml-4 opacity-70 hover:opacity-100">
          &times;
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useNotificationsStore } from '../../stores/notifications';

const notificationsStore = useNotificationsStore();

const notificationTypeClass = (type) => {
  switch (type) {
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    default:
      return 'bg-blue-500';
  }
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>