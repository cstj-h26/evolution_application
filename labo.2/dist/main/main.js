"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
let childWindow = null;
let mainWindow = null;
const createWindows = () => {
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
        title: "TaskBox – Accueil",
        icon: path_1.default.join(__dirname, "..\\assets\\taskBox.ico"),
    });
    mainWindow.loadFile(path_1.default.join(__dirname, "..\\..\\src\\renderer\\index.html"));
};
electron_1.app.whenReady().then(() => {
    createWindows();
});
