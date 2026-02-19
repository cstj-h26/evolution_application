import {app, BrowserWindow, ipcMain, dialog} from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | undefined;


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        titleBarOverlay: false,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    })

    mainWindow.loadURL('http://localhost:5173'); // URL de l'application Vue.js
}

app.whenReady().then(createWindow);


ipcMain.on('open-form-window', () => {
    const formWindow = new BrowserWindow({
        width: 450,
        height: 650,
        backgroundColor: '#d5cdcb',
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true, // Sécurise l'application en isolant le contexte de rendu
        },
    });

    //Charger la route du formulaire Form.vue
    formWindow.loadURL('http://localhost:5173/#/form'); // URL de l'application Vue.js pour le formulaire
});

// Communication entre le processus principal et le processus de rendu
ipcMain.on('message-channel', (event, arg)=> {
    console.log('Message reçu :', arg);
    event.reply('message-channel', 'Réponse du main process');
});

// ipcMain.on pour écouter les messages du renderer process
ipcMain.on('show-dialog', (event, formDataString) => {

    const formData = JSON.parse(formDataString); // Convertit la chaîne JSON en objet JavaScript

    const message = `
    Nom: ${formData.nom}\n
    Prénom: ${formData.prenom}\n
    Date de naissance: ${formData.dateNaissance}\n
    Email: ${formData.email}\n
    Région: ${formData.region}\n
    Statut professionnel : ${formData.statutProfessionnel.join(", ")}\n
    État matrimonial : ${formData.etatMatrimonial}\n
    Langages choisis : ${formData.langagesChoisis.join(", ")}
    `; // Crée un message formaté

    dialog.showMessageBox({
        type: 'info',
        title: "Formulaire validée",
        message: "Données du formulaire: ",
        detail: message, // Affichage du message dans “detail” du MessageBox
        buttons: ['OK'],
    });
});

// Événement au chargement du formulaire pour placer le focus dans le champ "nom"
ipcMain.on('focus-nom', (event) => {
    // Envoie un message au processus de rendu pour appliquer le focus
    event.sender.send("apply-focus"); 
});

// c- Au chargement de la fenêtre, le curseur doit être dans la zone de nom
ipcMain.on('show-error-dialog', (event) => {
    dialog.showMessageBox({
        type: 'error',
        title: 'Erreur',
        message: 'Le champ nom est obligatoire',
        buttons: ['OK'],
    })
});

ipcMain.on('open-accueil', (event) => {
    const accueilWindow = new BrowserWindow({
        width: 550,
        height: 500,
        title: "Accueil",
        modal: true,
        parent: mainWindow || undefined,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true
        }
    });

    accueilWindow?.webContents.on('did-finish-load', () => {
        accueilWindow?.show()
    });
    
    accueilWindow.loadURL('http://localhost:5173/#/accueil')
});