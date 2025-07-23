import { ref, onMounted } from 'vue';
import { useChildrenStore } from '../stores/children';
import { useActivitiesStore } from '../stores/activities';
import { useProgressStore } from '../stores/progress';
import { useNotificationsStore } from '../stores/notifications';

export function useActivities() {
    const childrenStore = useChildrenStore();
    const activitiesStore = useActivitiesStore();
    const progressStore = useProgressStore();
    const notificationsStore = useNotificationsStore();

    const selectedChildId = ref('');
    const promptText = ref("Un cuento corto y divertido sobre una rana que no puede pronunciar la 'r' y viaja a la luna para aprender.");

    // Estado para el formulario de progreso
    const performanceRating = ref(0);
    const notes = ref('');

    onMounted(() => {
        if (childrenStore.children.length === 0) {
            childrenStore.fetchChildren();
        }
    });

    const handleGenerate = () => {
        // Limpiar estado anterior
        performanceRating.value = 0;
        notes.value = '';

        if (!selectedChildId.value || !promptText.value.trim()) {
            notificationsStore.addNotification({
                type: 'error',
                message: 'Por favor, selecciona un perfil y describe la actividad.'
            });
            return;
        }
        activitiesStore.generateNewActivity({
            childId: selectedChildId.value,
            promptText: promptText.value.trim(),
        });
    };

    const handleLogProgress = async () => {
        if (performanceRating.value === 0) {
            notificationsStore.addNotification({ type: 'error', message: 'Por favor, selecciona una calificación.' });
            return;
        }

        try {
            await progressStore.addProgressRecord({
                childId: selectedChildId.value,
                activityId: activitiesStore.currentActivity._id,
                performanceRating: performanceRating.value,
                notes: notes.value,
            });
            notificationsStore.addNotification({ type: 'success', message: '¡Progreso guardado con éxito!' });
            // Limpiar la actividad actual para ocultar el formulario
            activitiesStore.currentActivity = null;
        } catch (error) {
            notificationsStore.addNotification({ type: 'error', message: 'Hubo un error al guardar el progreso.' });
        }
    };


    return {
        // Stores
        childrenStore,
        activitiesStore,
        // Estado (refs)
        selectedChildId,
        promptText,
        performanceRating,
        notes,
        // Métodos
        handleGenerate,
        handleLogProgress,
    };
}