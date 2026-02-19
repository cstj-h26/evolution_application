import { defineConfig } from 'electron-vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    main: {
        build: {
            outDir: './dist/main',
        },
        plugins: [],
    },
    preload: {
        build: {
            outDir: './dist/preload',
        },
        plugins: [],
    },
    renderer: {
        build: {
            outDir: './dist/renderer',
            rollupOptions: {
                input: './src/renderer/index.html', // fichier d'entrée
            },
        },
        plugins: [vue()],
    },
});
