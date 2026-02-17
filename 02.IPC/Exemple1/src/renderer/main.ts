import { createApp } from 'vue';

import App from './App.vue';

createApp(App).mount('#app');

const appInfoElement = document.createElement('div');
const taskButton = document.createElement('button');
const resultElement = document.createElement('div');
const calculatorElement = document.createElement('div');

taskButton.textContent = 'Exécuter la tâche';
document.body.append(appInfoElement, taskButton, resultElement, calculatorElement);

// Exemple Communication Syncrone
const info = window.electronAPI.getAppInfo();
appInfoElement.innerHTML = `
    <h2>Information sur l'application</h2>
    <p>Nom : ${info.name}</p>
    <p>Version : ${info.version}</p>
    <p>Platforme : ${info.platform}</p>
`;

taskButton.addEventListener('click', () => {
    window.electronAPI.performTask({
        action: 'Exécuter une tâche',
        payload: 'test'
    });
});

window.electronAPI.onTaskResult(result => {
    resultElement.textContent = `Résultât de la tâche: ${JSON.stringify(result)}`;
});

document.querySelector("#add")!.addEventListener('click', async () => {
    const a = parseInt((document.querySelector("#a") as HTMLInputElement).value, 10);
    console.log("Valeur de a : " + a);

    const b = parseInt((document.querySelector("#b") as HTMLInputElement).value, 10);
    console.log("Valeur de a : " + b);

    const somme = await window.electronAPI.calculate(a, b)
    console.log("Somme : " + somme);

    (document.getElementById("result") as HTMLInputElement)!.value = "Résultat: " + somme;
});

