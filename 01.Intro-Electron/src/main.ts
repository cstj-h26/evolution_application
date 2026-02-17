import path from "path";
import { app, BrowserWindow, nativeImage, Tray } from 'electron';

const createWindows = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 500,

        minWidth: 500,
        minHeight: 500,

        maxWidth: 1200,
        maxHeight: 500,

        resizable: false,
        transparent: false,
        frame: true, // sup bar titre et bordure
        backgroundColor: "rgba(182, 222, 136, 0.33)",
        
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Charger le fichier HTML dans la fenêtre créée
    win.loadFile(path.join(__dirname, '../index.html'));

    const iconPath = path.join(__dirname, "assets/pomme.ico");
    const trayIcon = nativeImage.createFromPath(iconPath);
    const tray = new Tray(trayIcon);
    tray.setToolTip("Affichge avec tray");
    win.loadFile(path.join(__dirname, "../index.html"));
};

app.whenReady().then(() => {
    createWindows();
});
