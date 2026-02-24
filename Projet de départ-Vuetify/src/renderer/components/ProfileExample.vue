<template>
  <v-container>
    <v-expansion-panels multiple variant="popout" elevation="5">
      <!-- Informations personnelles -->
      <v-expansion-panel title="Informations personnelles">
        <v-expansion-panel-text>
          <v-row>            
            <!-- Colonne texte -->
            <v-col cols="12" md="9">
              <v-text-field label="Nom" v-model="nom" />
              <v-text-field label="Email" v-model="email" />
            </v-col>
          </v-row>
        </v-expansion-panel-text>
    </v-expansion-panel>

      <!-- Préférences -->
      <v-expansion-panel title="Préférences">
        <v-expansion-panel-text>
            <v-combobox
                v-model="interets"
                :items="optionsInterets"
                label="Centre - d'interet"
                multiple
                chips
                clearable
            />
          <p> Degré de satisfaction</p>
          <v-btn color="primary">
            Enregistrer les préférences
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Coordonnées -->
      <v-expansion-panel title="Coordonnées">
        <v-expansion-panel-text>
          <p>Téléphone : 450-123-4567</p>
          <p>Adresse: 123, rue Fleury, St-Jérôme</p>
          <p>Email : john.doe@example.com</p>
        </v-expansion-panel-text>
      </v-expansion-panel>

    </...>
    </v-expansion-panels>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const interets = ref([]);
const optionsInterets = [
    'Musiques',
    'Sport',
    'Technologie',
    'Gaming'
]

const nom = ref('')
const email = ref('')

</script>
