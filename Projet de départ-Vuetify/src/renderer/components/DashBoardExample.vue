<template>
    <v-card class="ma-4 pa-4">
        <v-card-title>
            <v-row>
                <v-col cols="1">
                    <v-img src="../components/images/cards/dashboard.png" height="40" width="30"></v-img>
                </v-col>
                <v-col cols="5" class="text-h5">
                    Tableau de bord
                </v-col>
            </v-row>
        </v-card-title>

        <v-card-text>
            <v-row>
                <v-col cols="12" md="4">
                    <v-card color="blue lighten-4" class="pa-4">
                        <v-icon size="40" color="primary" class="mr-2">mdi-calendar</v-icon>
                        <div class="text-h6 mt-2">Réservation du jour {{ resevationJour }}</div>
                        <v-chip class="ma-2" text-color="white">Voir les détails</v-chip>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-4">
                <v-col cols="12" md="4">
                    <v-card color="green lighten-4" class="pa-4">
                        <v-icon size="40" color="primary" class="mr-2">mdi-chart-line</v-icon>
                        <div class="text-h6 mt-2">Taux occupation: 75%</div>
                        <v-progress-circular :model-value="75" color="blue"></v-progress-circular>
                    </v-card>
                </v-col>
            </v-row>

              <v-row class="mt-4">
                <v-col cols="12" md="4">
                    <v-card color="orange lighten-4" class="pa-4">
                        <v-icon size="40" color="primary" class="mr-2">mdi-bell</v-icon>
                        <div class="text-h6 mt-2">Notification Recente</div>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const resevationJour = ref(12);



</script>