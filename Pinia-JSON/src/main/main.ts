import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import { ParticipantService } from './service/participantService';

// Déclaration de la fenêtre principale
// nul indique que la fenêtre n'est pas encore créée
let mainWindow: BrowserWindow | null = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 760,
        autoHideMenuBar: true, // Masquer la barre de menu
        show:false,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'), // Utilisation d'un chemin absolu
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

  // Ceci est une fonction qui attend que la fenêtre soit prête à être affichée avant de l'afficher
  mainWindow?.once('ready-to-show', () => {
    mainWindow?.show()
  });

  // Ceci est une fonction qui attend que le contenu soit complètement chargé avant d'afficher la fenêtre
  mainWindow?.webContents.on('did-finish-load', () => {
    mainWindow?.show()
  });

    mainWindow.loadURL('http://localhost:5173'); // URL de l'application Vue.js
});

ipcMain.on('open-accueil', () => {
  const accueilWindow = new BrowserWindow({
    width: 550,
    height: 500,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
    },
  });

  // Ceci est une fonction qui attend que la fenêtre soit prête à être affichée avant de l'afficher
  // Pour qu'il n'y ait pas d'écran blanc avant le chargement complet de la vue
  accueilWindow?.once('ready-to-show', () => {
    accueilWindow?.show()
  });

  // Ceci est une fonction qui attend que le contenu soit complètement chargé avant d'afficher la fenêtre
  // Pour qu'il n'y ait pas d'écran blanc avant le chargement complet de la vue
  accueilWindow?.webContents.on('did-finish-load', () => {
    accueilWindow?.show()
  });

  // Charge la route Vue dans la nouvelle fenêtre
  accueilWindow.loadURL('http://localhost:5173/#/accueil')
});

// Communication entre le processus principal et le processus de rendu
ipcMain.on('message-channel', (event, arg)=> {
    console.log('Message reçu :', arg);
    event.reply('message-channel', 'Réponse du main process');
});


const participantService = new ParticipantService();

ipcMain.handle('Canal-ChargerParticipants', async () => {
  try {
    const data = await participantService.chargerParticipants()
    return {
      success: true, data
    }
  } catch(error: any) {
    return {
      success: false, error: error.message
    }
  }
})




