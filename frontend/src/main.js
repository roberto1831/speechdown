import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './main.css';
import './style.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // Usar Pinia
app.use(router);
app.mount('#app');
