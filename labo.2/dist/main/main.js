"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
let tray;
let mainWindow;
const ICON_PATH = path_1.default.join(__dirname, "..\\assets\\taskBox.ico");
const ABOUT_PAGE_PATH = path_1.default.join(__dirname, "..\\..\\src\\renderer\\about.html");
const INDEX_PAGE_PATH = path_1.default.join(__dirname, "..\\..\\src\\renderer\\index.html");
const SPLASH_PAGE_PATH = path_1.default.join(__dirname, "..\\..\\src\\renderer\\splash.html");
const APP_NAME = "TaskBox";
function openMainWindow() {
    mainWindow = new electron_1.BrowserWindow({
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
        const modalWindow = new electron_1.BrowserWindow({
            width: 500,
            height: 500,
            title: "About",
            modal: true,
            parent: mainWindow,
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
}
;
function openSplashWindow() {
    const splashWindow = new electron_1.BrowserWindow({
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
    tray = new electron_1.Tray(ICON_PATH);
    const menu = electron_1.Menu.buildFromTemplate([
        { label: `Show ${APP_NAME}`, click: mainWindow?.show },
        { label: "Quit", click: electron_1.app.quit }
    ]);
    tray.setToolTip(APP_NAME);
    tray.setContextMenu(menu);
}
// app.whenReady().then(openSplashWindow);
electron_1.app.whenReady().then(openMainWindow);
