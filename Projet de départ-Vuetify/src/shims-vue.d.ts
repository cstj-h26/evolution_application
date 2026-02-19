declare module '*.vue' {
    // Importation du type DefineComponent depuis Vue pour typer les composants Vue
    import { DefineComponent } from "vue";

    // Déclaration d'un composant Vue générique
    const component: DefineComponent<{}, {}, any>; 

    // Exportation du composant pour une utilisation dans les fichiers TypeScript
    export default component;
}
