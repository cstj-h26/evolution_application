import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./components/Home.vue"; // Importation des composants de la page d'accueil
import Form from "./components/Form.vue"; // Importation des composants de la page du formulaire
import Accueil from "./components/Accueil.vue";

const routes = [
    {path: '/', name: 'Home', component: Home}, // Définition de la route pour la page d'accueil
    {path: '/accueil', name: 'Accueil', component: Accueil}, // Définition de la route pour le formulaire
];

const router = createRouter({
    history: createWebHashHistory(), // Utilisation de l'historique basé sur le hash pour la navigation
    routes, // Attribution des routes définies précédemment
});

export default router; // Exportation du routeur pour l'utiliser dans l'application Vue.js
