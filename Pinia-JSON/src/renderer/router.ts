import { createRouter, createWebHashHistory } from "vue-router";

import Home from './components/Home.vue';
import Accueil from './components/Accueil.vue';

const routes = [
    {path: '/', name: 'Home', component: Home}, 
    { path: '/accueil', name: 'Accueil', component: Accueil }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;