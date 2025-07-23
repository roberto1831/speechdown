<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-100">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">

      <div>
        <h1 class="text-3xl font-bold text-center text-blue-600">SpeechDown</h1>
        <h2 class="mt-2 text-xl font-semibold text-center text-slate-700">Iniciar Sesión</h2>
        <p class="mt-1 text-center text-slate-500">¡Nos alegra verte de nuevo!</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-slate-600">Email</label>
          <input
              type="email"
              v-model="email"
              id="email"
              required
              class="w-full px-4 py-3 mt-1 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu.correo@ejemplo.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-slate-600">Contraseña</label>
          <input
              type="password"
              v-model="password"
              id="password"
              required
              class="w-full px-4 py-3 mt-1 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
          />
        </div>

        <p v-if="error" class="text-sm text-center text-red-600">{{ error }}</p>

        <div>
          <button
              type="submit"
              class="w-full bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            Entrar
          </button>
        </div>
      </form>

      <p class="text-sm text-center text-slate-500">
        ¿No tienes una cuenta?
        <router-link to="/register" class="font-semibold text-blue-600 hover:underline">
          Regístrate aquí
        </router-link>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref(null);
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  error.value = null;
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push('/dashboard');
  } catch (err) {
    error.value = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
    console.error('Error de inicio de sesión:', err);
  }
};
</script>