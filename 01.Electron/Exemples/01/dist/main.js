"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const createWindows = () => {
    const win = new electron_1.BrowserWindow({
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
    win.loadFile(path_1.default.join(__dirname, '../index.html'));
};
electron_1.app.whenReady().then(() => {
    createWindows();
});
