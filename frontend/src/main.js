import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';

const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:4000';  
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;  
app.config.globalProperties.$http = axios;

app.use(router);
app.mount('#app');