<template>
  <v-container>
    <v-form @submit.prevent="submitForm" ref="formRef">
      <v-text-field v-model="editedParticipant.matricule" label="Matricule" type="number" disabled />
      <v-text-field v-model="editedParticipant.prenom" label="Prénom" required />
      <v-text-field v-model="editedParticipant.nom" label="Nom" required />

      <v-select
        v-model="editedParticipant.genre"
        :items="['M', 'F']"
        label="Genre"
        required
      />

      <v-select
        v-model="editedParticipant.niveau"
        :items="['Débutant', 'Intermédiaire', 'Professionnel']"
        label="Niveau"
        required
      />

      <v-text-field v-model="editedParticipant.email" label="Courriel" type="email" required />

      <v-switch v-model="editedParticipant.isActif" label="Actif" />

      <v-btn type="submit" color="primary">Enregistrer les modifications</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()

import type { Participant } from '../../common/participant'

// Copie locale pour éditer les données
const ... = ref<Participant>({
  matricule: 0,
  prenom: '',
  nom: '',
  genre: '',
  niveau: '',
  email: '',
  isActif: false,
})

function submitForm() {
  // Ici vous pouvez ajouter la logique pour modifier le participant
  console.log('Participant modifié:', editedParticipant.value)
}


</script>