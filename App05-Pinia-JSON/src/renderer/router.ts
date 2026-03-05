import { createRouter, createWebHashHistory } from "vue-router";

import Home from './components/Home.vue';

import Accueil from './components/Accueil.vue';
import AjouterParticipant from "./components/AjouterParticipant.vue";

const routes = [
    {path: '/', name: 'Home', component: Home}, 
    { path: '/ajouterParticipant', name: 'AjouterParticipant', component: AjouterParticipant }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;