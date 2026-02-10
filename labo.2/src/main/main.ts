import path from "path";
import { app, BrowserWindow, ipcMain, contextBridge, ipcRenderer} from 'electron';

let childWindow: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;


function openModalWindow() {
    if (!mainWindow) return;

    childWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: "Modal",
        modal: true,
        parent: mainWindow,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    childWindow.loadFile(path.join(__dirname, "..\\..\\src\\renderer\\splash.html"));

    childWindow.once("ready-to-show", childWindow.show);
}

const createWindows = () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,

        minWidth: 800,
        minHeight: 600,

        maxWidth: 1200,
        maxHeight: 500,

        resizable: true,
        transparent: false,
        frame: true,
        
        backgroundColor: "rgb(0, 0, 0)",
        
        webPreferences: {
            nodeIntegration: true
        },
        
        title: "TaskBox – Accueil",
        icon: path.join(__dirname, "..\\assets\\taskBox.ico"),
    });

    mainWindow.loadFile(path.join(__dirname, "..\\..\\src\\renderer\\index.html"));
};

app.whenReady().then(createWindows);
