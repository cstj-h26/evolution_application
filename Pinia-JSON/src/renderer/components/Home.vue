<template>
  <v-app>

    <!-- Barre de navigation supérieure -->
    <v-app-bar app color="primary" dark elevation="10">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Gestion d’état avec Pinia et persistence de données avec JSON</v-toolbar-title>
    </v-app-bar>

    <!-- Menu latéral -->
    <v-navigation-drawer app v-model="drawer" temporary width="200" color="green lighten-4" elevation="10">
      <!-- Contenu du menu vertical -->
       <v-list>
         <v-list-item title="Accueil" prepend-icon="mdi-home" @click="openAccueil"></v-list-item>
       </v-list>
    </v-navigation-drawer> 

    <v-main>
      <v-container>
        
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">

// importer la fonction ref pour créer une référence réactive
import { ref } from 'vue'

// initiliser une variable réactive pour contrôler l'ouverture ou la fermeture du menu latéral
const drawer = ref(true);

function openAccueil() {
  window.api.send('open-accueil', "Accueil");
}

</script>