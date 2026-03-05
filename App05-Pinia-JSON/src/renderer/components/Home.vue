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
        <v-list-item title="Ajouter" prepend-icon="mdi-plus" @click="ouvrirAjouterParticipant"></v-list-item>
        <v-list-item title="Supprimer" prepend-icon="mdi-delete" @click="supprimerParticipant"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-data-table class="lignes-alternance" :items="participants" :headers="headers" show-expand
        @click:row="($event: MouseEvent, row: {item: Participant}) => handleRowClick(row.item)">
          
          <!-- Afficher la colonne Niveau sous forme d'une liste deroulante desactivee -->
           <template v-slot:item.niveau="{ item }">
            <v-select 
            :items="['Debutant', 'Intermédiaire', 'Professionnel']" 
            density="compact"
            variant="outlined"
            hide-details
            class="disabled-black"
            disabled></v-select>
          </template>

          <template v-slot:expanded-row="{ item }">
            <td colspan="headers.length">
              <div class="text-center">
                <!-- <h3>Informations détaillées de {{ item.nom }} {{ item.prenom }}</h3> -->
                <p><strong>Email:</strong> {{ item.email }}</p>
                <p><strong>Actif:</strong> {{ item.isActif ? 'Oui' : 'Non' }}</p>
                <img :src="'../bricks-brick.gif'" alt="Statut"> // item.isActif ? "../bricks-brick.gif" : "../bricks-brick-gray.gif"
              </div>
            </td>
          </template>

        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">

// importer la fonction ref pour créer une référence réactive
import { ref, computed, onMounted } from 'vue'
import { useParticipantStore } from '../stores/participantStore'

import { Participant } from "../../common/participant";
import { title } from 'process';

// initiliser une variable réactive pour contrôler l'ouverture ou la fermeture du menu latéral
const drawer = ref(true);

const selectedParticipant = ref<Participant | null>(null);

async function supprimerParticipant() {
  const participant = selectedParticipant.value;
  if (participant && participant.matricule) {
    const result = await participantStore.supprimerParticipant(participant.matricule);
    if (result.success) {
      await window.api.showMessageBox({
        type: "info",
        title: "Supression",
        message: `Participant ${participant.nom} supprimé avec succès`
      })
    } else {
      await window.api.showMessageBox({
        type: "error",
        title: "Erreur de suppression",
        message: `Erreur lors de la suppression du participants: ${result?.error}`,
      })
    }
  } else {
    await window.api.showMessageBox({
        type: "warning",
        title: "Aucun participant sélectionné",
        message: `Veuillez cliquer sur la ligne du participant à supprimer`,
      })
  }
}

// Utiliser le store participant
const participantStore = useParticipantStore();

// Récupérer les participants depuis le store
const participants = computed(() => participantStore.participants);

// Définir les en-têtes du tableau de données
const headers = [
  { title: 'Matricule', value: 'matricule' },
  { title: 'Nom', value: 'nom' },
  { title: 'Prénom', value: 'prenom' },
  { title: 'Niveau', value: 'niveau' },
  { title: 'Actif', value: 'isActif' },
  { title: 'Email', value: 'email' },
  { title: 'Genre', value: 'genre' }
];

// async pour attendre l'appel de chargerParticipants() avant de continuer l'exécution du code
onMounted( async() => {
  await participantStore.chargerParticipants();

  // Configurer les écouteurs IPC pour les changements
  participantStore.setUpIpcListeners()
});

function handleRowClick(item: Participant) {
  console.log("Ligne cliquée:", item.nom, item.prenom);
  // Vous pouvez ajouter ici des actions supplémentaires, comme ouvrir une fenêtre de détails
  selectedParticipant.value = item;
}

function ouvrirAjouterParticipant() {
  window.api.send('ajouter-participant', "Ajouter un participant");
}


</script>

<style scoped>
.lignes-alternance :deep(tbody tr:nth-child(odd)) {
  background-color: #d7e7d3;
}

.lignes-alternance :deep(tbody tr:nth-child(even)) {
  background-color: #f0f0f0;
}

.disabled-black :deep(.v-field--disabled) {
  color: black;
  opacity: 1;
}
</style>