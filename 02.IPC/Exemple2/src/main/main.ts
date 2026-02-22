import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';

let mainWindow: BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadURL('http://localhost:5173');
}

app.whenReady().then(createWindow);

ipcMain.on("message-channel", (event, arg) => {
    console.log("Message reçu", arg);
    event.reply("message-channel", "réponse du main process");
});

ipcMain.on("open-form-window", () => {
    const formWindow = new BrowserWindow({
        width: 450,
        height: 650,
        backgroundColor: "#ffffff",
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true // Isoler le contexte de rendu pour plus de sécurité
        }
    })

    formWindow.loadURL('http://localhost:5173/#/form');
});

// Afficher la boîte de message contenant 
ipcMain.on("show-dialog", (event, formDataString) => {
    const formData = JSON.parse(formDataString);
    const message = {
        nom: formData.nom,
        prenom: formData.prenom,
        dateNaissance: formData.dateNaissance,
        email: formData.email,
        region: formData.region,
        statutProfessionnel: formData.statutProfessionnel.join(", "),
        etatMatrimonial: formData.etatMatrimonial,
        langagesChoisis: formData.langagesChoisis.join(", "), 
    };

    dialog.showMessageBox({
        type: 'info',
        title: "Formulaire validé",
        message: "Donnée du formulaire",
        detail: Object.values(message).join('\n'),
        buttons: ['OK']
    })
});

// b-
ipcMain.on('focus-nom', (event) => {
    event.sender.send("apply-focus");
});

// Afficher le dialog d'erreur pour le champ nom
ipcMain.on("show-nom-error", (event) => {
    dialog.showMessageBox({
        type: 'warning',
        title: "Erreur de saisie",
        message: 'Veuillez remplir le champ "Nom" d\'abord',
        buttons: ['OK']
    }).then(() => {
        event.sender.send("nom-error-ok");
    });
});
