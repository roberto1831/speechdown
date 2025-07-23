<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-800 mb-6">Perfiles de los Niños</h1>

    <div class="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 class="text-xl font-semibold text-slate-700 mb-4">Añadir Nuevo Perfil</h2>
      <form @submit.prevent="handleAddNewChild">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label for="name" class="block text-sm font-medium text-slate-600 mb-1">Nombre Completo</label>
            <input type="text" v-model="newChild.name" id="name" required class="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label for="dob" class="block text-sm font-medium text-slate-600 mb-1">Fecha de Nacimiento</label>
            <input type="date" v-model="newChild.dateOfBirth" id="dob" required class="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" :disabled="childrenStore.isLoading" class="bg-blue-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-slate-400">
            {{ childrenStore.isLoading ? 'Guardando...' : 'Añadir Perfil' }}
          </button>
        </div>
      </form>
      <p v-if="formError" class="text-red-500 mt-2">{{ formError }}</p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-md">
      <h2 class="text-xl font-semibold text-slate-700 mb-4">Perfiles Registrados</h2>
      <div v-if="childrenStore.isLoading && childrenStore.children.length === 0" class="text-slate-500">Cargando perfiles...</div>
      <div v-else-if="childrenStore.children.length > 0" class="space-y-4">
        <div v-for="child in childrenStore.children" :key="child._id" class="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
          <div>
            <p class="font-semibold text-slate-800">{{ child.name }}</p>
            <p class="text-sm text-slate-500">Nacimiento: {{ new Date(child.dateOfBirth).toLocaleDateString() }}</p>
          </div>
          <button @click="handleDeleteChild(child._id)" class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition">
            <TrashIcon class="h-6 w-6"/>
          </button>
        </div>
      </div>
      <div v-else class="text-slate-500">No hay perfiles registrados. Añade uno para comenzar.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useChildrenStore } from '../../stores/children';
import { TrashIcon } from '@heroicons/vue/24/outline';

const childrenStore = useChildrenStore();
const formError = ref(null);

const newChild = ref({
  name: '',
  dateOfBirth: '',
});

onMounted(() => {
  childrenStore.fetchChildren();
});

const handleAddNewChild = async () => {
  formError.value = null;
  if (!newChild.value.name || !newChild.value.dateOfBirth) {
    formError.value = "Por favor, completa todos los campos.";
    return;
  }
  try {
    await childrenStore.addChild(newChild.value);
    // Limpiar el formulario
    newChild.value.name = '';
    newChild.value.dateOfBirth = '';
  } catch (error) {
    formError.value = "Ocurrió un error al guardar el perfil.";
  }
};

const handleDeleteChild = (childId) => {
  if (confirm('¿Estás seguro de que quieres eliminar este perfil?')) {
    childrenStore.removeChild(childId);
  }
};
</script>