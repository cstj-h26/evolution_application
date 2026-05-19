import { createRouter, createWebHashHistory } from "vue-router";

import Home from './components/Home.vue';
import AjouterParticipant from './components/AjouterParticipant.vue';
import ModifierParticipant from "./components/ModifierParticipant.vue";

import StatsParticipants from "./components/StatsParticipants.vue";

const routes = [
    {path: '/', name: 'Home', component: Home}, 
    { path: '/ajouterParticipant', name: 'AjouterParticipant', component: AjouterParticipant },
    { path: '/modifierParticipant', name: 'ModifierParticipant', component: ModifierParticipant },
    { path: '/statsParticipants', name: 'StatsParticipants', component: StatsParticipants }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;