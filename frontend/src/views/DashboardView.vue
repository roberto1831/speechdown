<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-800 mb-2">
      ¡Hola, {{ authStore.userName }}!
    </h1>
    <p class="text-slate-500 mb-8">
      Estamos listos para empezar un nuevo día de aprendizaje y diversión.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="bg-blue-600 rounded-xl shadow-lg p-8 text-white flex flex-col items-start h-full">
          <h2 class="text-3xl font-bold mb-4">¿Listos para practicar?</h2>
          <p class="text-blue-100 mb-6 max-w-md">
            Genera una nueva actividad interactiva basada en los objetivos de tu hijo. La IA creará un cuento o juego único en segundos.
          </p>
          <button class="mt-auto bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-100 transition transform hover:scale-105">
            <SparklesIcon class="h-5 w-5 inline-block mr-2" />
            Crear Nueva Actividad
          </button>
        </div>
      </div>

      <div class="space-y-8">
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="font-bold text-slate-800 mb-3">Resumen Semanal</h3>
          <div class="flex items-center space-x-4">
            <div class="bg-green-100 text-green-600 p-3 rounded-full">
              <CheckBadgeIcon class="h-6 w-6" />
            </div>
            <div>
              <p class="font-semibold text-slate-700">5 Actividades Completadas</p>
              <p class="text-sm text-slate-500">¡Sigan con el gran trabajo!</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="font-bold text-slate-800 mb-4">Actividades Recientes</h3>
          <ul class="space-y-3">
            <li class="flex justify-between items-center text-slate-600 hover:bg-slate-50 p-2 rounded-md">
              <span>Cuento de la Serpiente Samuel</span>
              <ChevronRightIcon class="h-5 w-5 text-slate-400" />
            </li>
            <li class="flex justify-between items-center text-slate-600 hover:bg-slate-50 p-2 rounded-md">
              <span>Juego de sílabas con animales</span>
              <ChevronRightIcon class="h-5 w-5 text-slate-400" />
            </li>
            <li class="flex justify-between items-center text-slate-600 hover:bg-slate-50 p-2 rounded-md">
              <span>La aventura del fonema /r/</span>
              <ChevronRightIcon class="h-5 w-5 text-slate-400" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';
import {
  SparklesIcon,
  CheckBadgeIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/solid';

// En un futuro, este nombre vendría del store de Pinia.
const userName = ref('Prueba');
const authStore = useAuthStore();
</script>