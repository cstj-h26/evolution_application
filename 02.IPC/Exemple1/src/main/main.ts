import { app, BrowserWindow, ipcMain} from 'electron';
import * as path from 'path';

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

    setupIPC();
}

function setupIPC() {
    ipcMain.on('get-app-info', (event) => {
        event.returnValue = {
            name: app.getName(),
            version: app.getVersion(),
            platform: process.platform
        };
    });

    // Exemple b. Communication IPC asynchrone
    // Le main process se met à l'écoute (on) de IPC
    ipcMain.on('perform-task', (event, data) => {
        console.log("Tâche reçue", data);

        // Une fois le traitement terminé, le mainProcess envoi une réponse (send) au renderer
        mainWindow.webContents.send('task-result', {
            sucess: true,
            result: 'Tâche accomplie pâr le main'
        })
    });
}

app.whenReady().then(createWindow);