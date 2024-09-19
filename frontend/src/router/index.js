import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import UserTeams from '../components/UserTeams.vue';
import EditTeam from '../components/EditTeam.vue';

const routes = [
  { path: '/', name: 'Login', component: UserLogin },
  { path: '/auth/register', name: 'Register', component: UserRegister },
  { path: '/teams', name: 'Teams', component: UserTeams },
  { path: '/teams/:id', name: 'edit-team', component: EditTeam }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
