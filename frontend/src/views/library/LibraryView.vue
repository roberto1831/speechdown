<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-800 mb-6">Biblioteca de Actividades</h1>
    <p class="text-slate-500 mb-8">Aquí encontrarás todas las actividades que has guardado como favoritas.</p>

    <div class="mb-8">
      <label for="child-select-library" class="block text-lg font-semibold text-slate-700 mb-2">
        Filtrar por perfil
      </label>
      <select
          v-model="selectedChildId"
          id="child-select-library"
          class="w-full md:w-1/2 px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todos los perfiles</option>
        <option v-for="child in childrenStore.children" :key="child._id" :value="child._id">
          {{ child.name }}
        </option>
      </select>
    </div>

    <div v-if="isLoading" class="text-center p-8">Cargando actividades favoritas...</div>
    <div v-else-if="favoriteActivities.length > 0" class="space-y-4">
      <div v-for="activity in favoriteActivities" :key="activity._id" class="bg-white p-5 rounded-lg shadow-md">
        <p class="font-semibold text-slate-800">{{ activity.prompt }}</p>
        <p class="text-sm text-slate-500 mt-1">Generado para: {{ findChildName(activity.child) }}</p>
        <p class="mt-3 text-slate-600 whitespace-pre-wrap">{{ activity.generatedContent }}</p>
      </div>
    </div>
    <div v-else class="text-center text-slate-500 bg-white p-8 rounded-lg shadow-md">
      No tienes ninguna actividad guardada en tu biblioteca. ¡Genera una y márcala con una estrella!
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useChildrenStore } from '../../stores/children';
import activitiesService from '../../services/activitiesService';

const childrenStore = useChildrenStore();
const allActivities = ref([]);
const isLoading = ref(false);
const selectedChildId = ref('');

// Carga todas las actividades de todos los niños al montar el componente
onMounted(async () => {
  isLoading.value = true;
  await childrenStore.fetchChildren();
  const promises = childrenStore.children.map(child => activitiesService.getActivitiesByChild(child._id));
  const results = await Promise.all(promises);
  allActivities.value = results.flat(); // Aplanar el array de arrays
  isLoading.value = false;
});

// Filtra las actividades para mostrar solo las favoritas y, opcionalmente, por niño
const favoriteActivities = computed(() => {
  return allActivities.value.filter(activity => {
    const isFav = activity.isFavorite;
    const matchesChild = !selectedChildId.value || activity.child === selectedChildId.value;
    return isFav && matchesChild;
  });
});

// Función para encontrar el nombre del niño a partir de su ID
const findChildName = (childId) => {
  const child = childrenStore.children.find(c => c._id === childId);
  return child ? child.name : 'Desconocido';
};
</script>