<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-800 mb-2">Generador de Actividades</h1>
    <p class="text-slate-500 mb-8">Crea un cuento o juego único para apoyar el desarrollo del habla.</p>

    <div class="bg-white p-6 md:p-8 rounded-xl shadow-md">
      <div class="mb-6">
        <label for="child-select" class="block text-lg font-semibold text-slate-700 mb-2">1. Selecciona un perfil</label>
        <div v-if="childrenStore.isLoading" class="text-slate-500">Cargando perfiles...</div>
        <select v-model="selectedChildId" id="child-select" class="w-full md:w-2/3 px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option disabled value="">Selecciona el perfil del niño</option>
          <option v-for="child in childrenStore.children" :key="child._id" :value="child._id">
            {{ child.name }}
          </option>
        </select>
      </div>
      <div class="mb-6">
        <label for="prompt" class="block text-lg font-semibold text-slate-700 mb-2">2. Describe la actividad que quieres</label>
        <textarea v-model="promptText" id="prompt" rows="4" class="w-full p-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ejemplo: Un cuento corto y divertido sobre una rana que no puede pronunciar la 'r' y viaja a la luna para aprender."></textarea>
      </div>
      <button @click="handleGenerate" :disabled="activitiesStore.isLoading || !selectedChildId" class="w-full bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
        <SparklesIcon class="h-5 w-5 mr-2" />
        {{ activitiesStore.isLoading ? 'Generando, por favor espera...' : 'Crear Nueva Actividad' }}
      </button>
    </div>

    <div v-if="activitiesStore.isLoading" class="text-center p-8">
      <p class="text-slate-600">La IA está creando algo increíble...</p>
    </div>

    <div v-if="activitiesStore.currentActivity" class="mt-8 bg-white p-6 md:p-8 rounded-xl shadow-md animate-fade-in">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-slate-800">¡Actividad Lista!</h2>
        <button @click="handleSpeak" class="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
          <SpeakerWaveIcon v-if="!isSpeaking" class="h-6 w-6" />
          <PauseCircleIcon v-else class="h-6 w-6" />
          <span>{{ isSpeaking ? 'Pausar' : 'Escuchar' }}</span>
        </button>
      </div>
      <div class="prose max-w-none text-slate-700 whitespace-pre-wrap mb-8 border-b pb-6">
        {{ activitiesStore.currentActivity.generatedContent }}
      </div>

      <h3 class="text-xl font-bold text-slate-800 mb-4">Registrar Progreso de la Actividad</h3>
      <form @submit.prevent="handleLogProgress">
        <div class="mb-4">
          <label class="block text-sm font-medium text-slate-600 mb-2">¿Cómo fue el desempeño? (1 a 5 estrellas)</label>
          <div class="flex space-x-2">
            <button v-for="star in 5" :key="star" type="button" @click="performanceRating = star" class="p-1">
              <StarIcon class="h-8 w-8 transition" :class="star <= performanceRating ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-300'" />
            </button>
          </div>
        </div>
        <div class="mb-6">
          <label for="notes" class="block text-sm font-medium text-slate-600 mb-2">Notas Adicionales (Opcional)</label>
          <textarea v-model="notes" id="notes" rows="3" class="w-full p-3 border border-slate-300 rounded-lg" placeholder="Ej: Tuvo dificultad con la 'rr' pero se divirtió mucho."></textarea>
        </div>
        <button type="submit" :disabled="!performanceRating" class="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-slate-400">
          Guardar Progreso
        </button>
      </form>
    </div>

    <div v-if="activitiesStore.error" class="mt-4 text-center text-red-500 font-semibold">
      {{ activitiesStore.error }}
    </div>
  </div>
</template>

<script setup>
import { useActivities } from '../../composables/useActivities';

import { ref, onMounted } from 'vue';
import { useChildrenStore } from '../../stores/children';
import { useActivitiesStore } from '../../stores/activities';
import { useProgressStore } from '../../stores/progress';
import activitiesService from '../../services/activitiesService';
import ttsService from '../../services/ttsService';
import {
  SparklesIcon,
  StarIcon as StarSolidIcon,
  SpeakerWaveIcon,
  PauseCircleIcon
} from '@heroicons/vue/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/vue/24/outline';

const {
  childrenStore,
  activitiesStore,
  selectedChildId,
  promptText,
  performanceRating,
  notes,
  handleGenerate,
  handleLogProgress,
} = useActivities();




const progressStore = useProgressStore();
const handleToggleFavorite = async () => {
  if (!activitiesStore.currentActivity) return;
  try {
    const response = await activitiesService.toggleFavorite(activitiesStore.currentActivity._id);

    activitiesStore.currentActivity.isFavorite = response.data.isFavorite;
  } catch (error) {
    console.error("Error al marcar como favorito:", error);

  }
};


// Estado para el nuevo formulario de progreso



const isSpeaking = ref(false);
const utterance = ref(null);


onMounted(() => {
  if (childrenStore.children.length === 0) {
    childrenStore.fetchChildren();
  }
});



/*
const handleSpeak = () => {
  if (!activitiesStore.currentActivity?.generatedContent) return;

  const synth = window.speechSynthesis;

  if (synth.speaking && !synth.paused) {
    // Si está hablando, lo pausamos
    synth.pause();
    isSpeaking.value = false;
  } else if (synth.paused) {
    // Si está en pausa, lo reanudamos
    synth.resume();
    isSpeaking.value = true;
  } else {
    // Si no está hablando, empezamos de cero
    utterance.value = new SpeechSynthesisUtterance(activitiesStore.currentActivity.generatedContent);

    // Configuración para voz en español (mejora la calidad)
    utterance.value.lang = 'es-ES';
    utterance.value.pitch = 1.1;
    utterance.value.rate = 0.9;

    // Callbacks para saber cuándo empieza y termina
    utterance.value.onstart = () => {
      isSpeaking.value = true;
    };
    utterance.value.onend = () => {
      isSpeaking.value = false;
      utterance.value = null;
    };
    utterance.value.onerror = () => {
      isSpeaking.value = false;
    };

    synth.speak(utterance.value);
  }
};

*/

const handleSpeak = async () => {
  if (isSpeaking.value) {
    if (audioSource.value) {
      audioSource.value.stop();
    }
    isSpeaking.value = false;
    return;
  }

  if (!activitiesStore.currentActivity?.generatedContent) return;

  isSpeaking.value = true; // Indicar que estamos procesando
  try {
    const response = await ttsService.speak(activitiesStore.currentActivity.generatedContent);
    const audioData = response.data;

    // Decodificar el audio para poder reproducirlo
    const source = audioContext.value.createBufferSource();
    audioContext.value.decodeAudioData(audioData, (buffer) => {
      source.buffer = buffer;
      source.connect(audioContext.value.destination);
      source.start(0);

      // Guardar la fuente para poder detenerla después
      audioSource.value = source;

      source.onended = () => {
        isSpeaking.value = false;
      };
    });
  } catch (error) {
    console.error("Error al reproducir el audio:", error);
    alert('No se pudo reproducir el audio. Revisa la consola para más detalles.');
    isSpeaking.value = false;
  }
};


</script>

<style scoped>
.prose {
  line-height: 1.7;
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>