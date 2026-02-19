import { createApp } from "vue";
import App from './App.vue';

import router from './router'; // Importation du routeur pour la navigation entre les pages


// Configuration de Vuetify

// @ts-ignore
import 'vuetify/styles'; // Importstion des styles CSS de Vuetify
import { createVuetify } from 'vuetify'; // Import des fonctions
import * as components from 'vuetify/components'; // Importation des composants
import * as directives from 'vuetify/directives';
// @ts-ignore
import '@mdi/font/css/materialdesignicons.css';


// Créeer et configurer l'instance de Vuetify
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
    }
});

// Ceci est une déclaration globale pour étendre l'interface Window avec une nouvelle propriété 'api' qui contient les méthodes 'send' et 'on' pour la communication entre le processus de rendu et le processus principal d'Electron.
declare global {
    interface Window {
        api: {
            // Méthode send dont le premier paramètre est un string 
            // Second paramètre de la méthode send utilise l'opérateur de décomposition pour accepter un nombre variable d'arguments
            // Second paramètre est un tableau de n'importe quel type
            send: (channel: string, ...args: any[]) => void;
            // Méthode on dont le premier paramètre est un string
            // Second paramètre de la méthode on est la fonction listener: prend un événement et un nombre variable d'arguments
            on: (channel: string, listener: (event: any, ...args: any[]) => void) => void;
        };
    }
}


const app = createApp(App); // Création de l'application Vue.js avec le composant principal App
app.use(router); // Utilisation du routeur pour la navigation entre les pages
app.use(vuetify); // Utilisation de Vuetify
app.mount('#app'); // Montage de l'application sur l'élément DOM avec l'ID 'app'




