# Structure de base dans le dossier Exemple01
mkdir -p src/{main,preload,renderer}
touch electron.vite.config.ts 

#Structure des dossiers main et preload 
touch src/main/main.ts src/preload/preload.ts 

# Structure du dossier src/renderer 
touch src/renderer/main.ts src/renderer/index.html src/renderer/router.ts src/renderer/App.vue 
touch src/global.d.ts 

# Fichier de déclaration de modules de Vue 
touch src/shims-vue.d.ts 

# Structure du dossier src/renderer/components 
mkdir src/renderer/components 

# Structure du dossier src/renderer/styles 
mkdir src/renderer/styles touch src/renderer/styles/styles.css