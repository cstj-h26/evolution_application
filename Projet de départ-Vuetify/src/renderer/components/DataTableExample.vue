<template>
    <v-data-table
        :header-props="headers"
        :items="desserts"
        :items-per-page="5"
        show-select
        v-model="select"
        return-object
        >

        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>
                    Listes des desserts
                </v-toolbar-title>
            </v-toolbar>
        </template>

    </v-data-table>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const select = ref([]);

const headers = [
    { title: 'Dessert', key: 'name' },
    { title: 'Calories', key: 'calories' },
    { title: 'Gras (g)', key: 'fat' },
];

const desserts = [
    { name: 'Frozen Yagourt', calories: 159, fat: 6.9 },
    { name: 'Ice cream', calories: 3227, fat: 9.8 },
    { name: 'Eclair', calories: 159, fat: 16.0 },
];
</script>