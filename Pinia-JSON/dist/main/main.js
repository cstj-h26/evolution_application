"use strict";
const electron = require("electron");
const path = require("path");
let mainWindow = null;
electron.app.on("ready", () => {
  mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 760,
    autoHideMenuBar: true,
    // Masquer la barre de menu
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      // Utilisation d'un chemin absolu
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow?.once("ready-to-show", () => {
    mainWindow?.show();
  });
  mainWindow?.webContents.on("did-finish-load", () => {
    mainWindow?.show();
  });
  mainWindow.loadURL("http://localhost:5173");
});
electron.ipcMain.on("open-accueil", () => {
  const accueilWindow = new electron.BrowserWindow({
    width: 550,
    height: 500,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true
    }
  });
  accueilWindow?.once("ready-to-show", () => {
    accueilWindow?.show();
  });
  accueilWindow?.webContents.on("did-finish-load", () => {
    accueilWindow?.show();
  });
  accueilWindow.loadURL("http://localhost:5173/#/accueil");
});
electron.ipcMain.on("message-channel", (event, arg) => {
  console.log("Message reçu :", arg);
  event.reply("message-channel", "Réponse du main process");
});
