<template>
    <div id="app">
        <h1>Application Electron avec Vue.js</h1>
        
        <button @click="openFormWindow">
            Formulaire d'inscription
        </button>
    </div>
</template>


<script lang="ts">
    export default {
        methods: {
            openFormWindow() {
                window.api.send('open-form-window', "Ouvrir le formulaire d'inscription");
            }
        }
    }
</script>