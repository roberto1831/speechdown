<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-100">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">

      <div>
        <h1 class="text-3xl font-bold text-center text-blue-600">SpeechDown</h1>
        <h2 class="mt-2 text-xl font-semibold text-center text-slate-700">Crear una Cuenta</h2>
        <p class="mt-1 text-center text-slate-500">Únete a nuestra comunidad.</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-slate-600">Nombre</label>
          <input
              type="text"
              v-model="name"
              id="name"
              required
              class="w-full px-4 py-3 mt-1 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre completo"
          />
        </div>

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
              placeholder="Mínimo 6 caracteres"
          />
        </div>

        <p v-if="error" class="text-sm text-center text-red-600">{{ error }}</p>

        <div>
          <button
              type="submit"
              class="w-full bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            Registrarse
          </button>
        </div>
      </form>

      <p class="text-sm text-center text-slate-500">
        ¿Ya tienes una cuenta?
        <router-link to="/login" class="font-semibold text-blue-600 hover:underline">
          Inicia sesión aquí
        </router-link>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { useNotificationsStore } from '../../stores/notifications';

const authStore = useAuthStore();
const router = useRouter();
const notificationsStore = useNotificationsStore();
const name = ref('');
const email = ref('');
const password = ref('');
const error = ref(null);

const handleRegister = async () => {
  error.value = null;
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value
    });
    // Redirigir al login después de un registro exitoso con un mensaje
    router.push('/login');
    notificationsStore.addNotification({
      type: 'success',
      message: '¡Registro exitoso! Ahora puedes iniciar sesión.'
    });

  } catch (err) {
    error.value = err.response?.data?.msg || 'Error en el registro. Inténtalo de nuevo.';
    console.error('Error en el registro:', err);
  }
};
</script>