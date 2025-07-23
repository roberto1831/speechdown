import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Importa tus vistas
import LandingView from '../views/LandingView.vue';
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import ProfileView from '../views/profile/ProfileView.vue';
import ActivitiesView from '../views/activities/ActivitiesView.vue';
import ProgressView from '../views/progress/ProgressView.vue';
import LibraryView from '../views/library/LibraryView.vue';

const routes = [
    { path: '/', component: LandingView, name: 'Landing' },
    { path: '/login', component: LoginView, name: 'Login' },
    { path: '/register', component: RegisterView, name: 'Register' },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: { requiresAuth: true } // Esta es una ruta protegida
    },
    {
        path: '/activities',
        name: 'Activities',
        component: ActivitiesView,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileView,
        meta: { requiresAuth: true }
    },
    {
        path: '/progress',
        name: 'Progress',
        component: ProgressView,
        meta: { requiresAuth: true }
    },
    {
        path: '/library',
        name: 'Library',
        component: LibraryView,
        meta: { requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation Guard para proteger rutas
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth &&!authStore.token) {
        // Si la ruta requiere autenticación y no hay token, redirige a login
        next('/login');
    } else if ((to.path === '/login' || to.path === '/register') && authStore.token) {
        // Si el usuario ya está logueado e intenta ir a login/register, redirige al dashboard
        next('/dashboard');
    } else {
        next(); // De lo contrario, permite el acceso
    }
});



export default router;