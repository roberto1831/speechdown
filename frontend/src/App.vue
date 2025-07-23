<template>
  <div v-if="authStore.token" class="flex h-screen bg-slate-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
        <div class="container mx-auto px-6 py-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth';
import Sidebar from './components/Sidebar.vue';
import NotificationArea from './components/common/NotificationArea.vue';

const authStore = useAuthStore();
</script>


