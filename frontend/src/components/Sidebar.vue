<template>
  <aside class="w-64 bg-white shadow-md flex flex-col">
    <div class="p-6 text-2xl font-bold text-blue-600 border-b">
      SpeechDown
    </div>
    <nav class="flex-1 p-4 space-y-2">
      <router-link to="/dashboard" class="nav-link">
        <HomeIcon class="h-6 w-6" />
        <span>Panel</span>
      </router-link>
      <router-link to="/activities" class="nav-link">
        <BookOpenIcon class="h-6 w-6" />
        <span>Actividades</span>
      </router-link>
      <router-link to="/progress" class="nav-link">
        <ChartBarIcon class="h-6 w-6" />
        <span>Progreso</span>
      </router-link>
      <router-link to="/profile" class="nav-link">
        <UserCircleIcon class="h-6 w-6" />
        <span>Perfil del Niño</span>
      </router-link>
    </nav>
    <div class="p-4 border-t">
      <button @click="handleLogout" class="nav-link w-full">
        <ArrowLeftOnRectangleIcon class="h-6 w-6" />
        <span>Cerrar Sesión</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import {
  HomeIcon,
  BookOpenIcon,
  ChartBarIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  BookmarkSquareIcon,
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.nav-link {
  @apply flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition;
}
.router-link-active {
  @apply bg-blue-100 text-blue-700 font-semibold;
}
</style>