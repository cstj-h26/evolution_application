import path from "path";
import { app, BrowserWindow, ipcMain, contextBridge, ipcRenderer, Tray, nativeImage, Menu } from 'electron';


let tray: Tray | undefined;
let mainWindow: BrowserWindow | undefined;

const ICON_PATH = path.join(__dirname, "..\\assets\\taskBox.ico");
const ABOUT_PAGE_PATH = path.join(__dirname, "..\\..\\src\\renderer\\about.html");
const INDEX_PAGE_PATH = path.join(__dirname, "..\\..\\src\\renderer\\index.html");
const SPLASH_PAGE_PATH = path.join(__dirname, "..\\..\\src\\renderer\\splash.html");

const APP_NAME = "TaskBox";


function openMainWindow() {
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
        
        title: `${APP_NAME} – Accueil`,
        icon: ICON_PATH,
    });

    mainWindow.loadFile(INDEX_PAGE_PATH);
    
    mainWindow.on("ready-to-show", () => {
        const modalWindow = new BrowserWindow({
            width: 500,
            height: 500,
            title: "About",
            modal: true,
            parent:  mainWindow,
            show: false,
            center: true,
            resizable: false,
            webPreferences: {
                nodeIntegration: true
            }
        });

        modalWindow.loadFile(ABOUT_PAGE_PATH);    
        modalWindow.once("ready-to-show", modalWindow.show);
    });
};

function openSplashWindow() {
    const splashWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: "Splash",
        modal: false,
        center: true,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    splashWindow.loadFile(SPLASH_PAGE_PATH);
    
    createTray();

    splashWindow.once("ready-to-show", () => {
        splashWindow.show();

        setTimeout(() => {
            splashWindow.close();
            openMainWindow();
        }, 3000);
    });    
}


function createTray() {
    tray = new Tray(ICON_PATH);

    const menu = Menu.buildFromTemplate([
        { label: `Show ${APP_NAME}`, click: mainWindow?.show },
        { label: "Quit", click: app.quit }
    ]);

    tray.setToolTip(APP_NAME);
    tray.setContextMenu(menu);
}

// app.whenReady().then(openSplashWindow);
app.whenReady().then(openMainWindow);
