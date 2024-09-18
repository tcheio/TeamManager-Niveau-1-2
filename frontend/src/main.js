import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:4000'; 

app.config.globalProperties.$http = axios;

app.mount('#app');
