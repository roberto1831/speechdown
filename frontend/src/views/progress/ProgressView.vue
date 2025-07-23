<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-800 mb-6">Seguimiento de Progreso</h1>

    <div class="mb-8">
      <label for="child-select-progress" class="block text-lg font-semibold text-slate-700 mb-2">
        Selecciona un perfil para ver su progreso
      </label>
      <select
          v-model="selectedChildId"
          @change="loadProgressForChild"
          id="child-select-progress"
          class="w-full md:w-1/2 px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option disabled value="">Selecciona un niño</option>
        <option v-for="child in childrenStore.children" :key="child._id" :value="child._id">
          {{ child.name }}
        </option>
      </select>
    </div>

    <div v-if="selectedChildId && !progressStore.isLoading && progressStore.records.length > 0" class="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 class="text-xl font-semibold text-slate-700 mb-4">Evolución del Desempeño</h2>
      <div style="height: 400px;">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <div v-if="progressStore.isLoading" class="text-center text-slate-500 p-8">
      Cargando historial...
    </div>
    <div v-else-if="selectedChildId && progressStore.records.length === 0" class="text-center text-slate-500 bg-white p-8 rounded-lg shadow-md">
      Aún no hay registros de progreso para este perfil. ¡Completa una actividad para empezar!
    </div>

    <div v-if="progressStore.records.length > 0" class="space-y-4">
      <h2 class="text-xl font-semibold text-slate-700 mb-2">Historial Detallado</h2>
      <div
          v-for="record in progressStore.records"
          :key="record._id"
          class="bg-white p-5 rounded-lg shadow-md border-l-4"
          :class="getBorderColor(record.performanceRating)"
      >
        <div class="flex flex-col md:flex-row justify-between">
          <div class="flex-1 mb-4 md:mb-0">
            <p class="font-bold text-slate-800">{{ record.activity.prompt }}</p>
            <p class="text-sm text-slate-500 mt-1">
              Completado el: {{ new Date(record.completionDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </p>
            <p v-if="record.notes" class="mt-2 text-sm text-slate-600 bg-slate-50 p-2 rounded">
              <strong>Notas:</strong> {{ record.notes }}
            </p>
          </div>
          <div class="flex items-center justify-start md:justify-end space-x-1">
            <StarIcon
                v-for="star in 5"
                :key="star"
                class="h-6 w-6"
                :class="star <= record.performanceRating ? 'text-yellow-400' : 'text-slate-300'"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useChildrenStore } from '../../stores/children';
import { useProgressStore } from '../../stores/progress';
import { StarIcon } from '@heroicons/vue/24/solid';

// Importaciones para el gráfico
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const childrenStore = useChildrenStore();
const progressStore = useProgressStore();

const selectedChildId = ref('');

onMounted(() => {
  if (childrenStore.children.length === 0) {
    childrenStore.fetchChildren();
  }
});

const loadProgressForChild = () => {
  if (selectedChildId.value) {
    progressStore.fetchProgressByChild(selectedChildId.value);
  }
};

// Datos y opciones para el gráfico (COMPUTED)
const chartData = computed(() => {
  // Los registros vienen del más nuevo al más antiguo, así que los invertimos para el gráfico
  const reversedRecords = [...progressStore.records].reverse();

  return {
    labels: reversedRecords.map(record => new Date(record.completionDate).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Calificación de Desempeño',
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        data: reversedRecords.map(record => record.performanceRating),
        tension: 0.2, // Para suavizar las líneas
        fill: false,
      },
    ],
  };
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 5, // La calificación máxima es 5
      ticks: {
        stepSize: 1,
      },
      grid: {
        color: '#e5e7eb',
      }
    },
    x: {
      grid: {
        display: false,
      }
    }
  },
  plugins: {
    legend: {
      display: false // Se puede ocultar si solo hay una línea de datos
    },
    tooltip: {
      backgroundColor: '#1e293b',
      titleFont: { size: 16 },
      bodyFont: { size: 14 },
      padding: 12,
      boxPadding: 4,
    }
  }
});

const getBorderColor = (rating) => {
  if (rating >= 4) return 'border-green-500';
  if (rating >= 3) return 'border-blue-500';
  return 'border-red-500';
};
</script>