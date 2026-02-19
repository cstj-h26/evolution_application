"use strict";
const electron = require("electron");
const path = require("path");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
let mainWindow;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    titleBarOverlay: false,
    webPreferences: {
      preload: path__namespace.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.loadURL("http://localhost:5173");
}
electron.app.whenReady().then(createWindow);
electron.ipcMain.on("open-form-window", () => {
  const formWindow = new electron.BrowserWindow({
    width: 450,
    height: 650,
    backgroundColor: "#d5cdcb",
    webPreferences: {
      preload: path__namespace.join(__dirname, "../preload/preload.js"),
      contextIsolation: true
      // Sécurise l'application en isolant le contexte de rendu
    }
  });
  formWindow.loadURL("http://localhost:5173/#/form");
});
electron.ipcMain.on("message-channel", (event, arg) => {
  console.log("Message reçu :", arg);
  event.reply("message-channel", "Réponse du main process");
});
electron.ipcMain.on("show-dialog", (event, formDataString) => {
  const formData = JSON.parse(formDataString);
  const message = `
    Nom: ${formData.nom}

    Prénom: ${formData.prenom}

    Date de naissance: ${formData.dateNaissance}

    Email: ${formData.email}

    Région: ${formData.region}

    Statut professionnel : ${formData.statutProfessionnel.join(", ")}

    État matrimonial : ${formData.etatMatrimonial}

    Langages choisis : ${formData.langagesChoisis.join(", ")}
    `;
  electron.dialog.showMessageBox({
    type: "info",
    title: "Formulaire validée",
    message: "Données du formulaire: ",
    detail: message,
    // Affichage du message dans “detail” du MessageBox
    buttons: ["OK"]
  });
});
electron.ipcMain.on("focus-nom", (event) => {
  event.sender.send("apply-focus");
});
electron.ipcMain.on("show-error-dialog", (event) => {
  electron.dialog.showMessageBox({
    type: "error",
    title: "Erreur",
    message: "Le champ nom est obligatoire",
    buttons: ["OK"]
  });
});
electron.ipcMain.on("open-accueil", (event) => {
  const accueilWindow = new electron.BrowserWindow({
    width: 550,
    height: 500,
    title: "Accueil",
    modal: true,
    parent: mainWindow || void 0,
    show: false,
    webPreferences: {
      preload: path__namespace.join(__dirname, "../preload/preload.js"),
      contextIsolation: true
    }
  });
  accueilWindow?.webContents.on("did-finish-load", () => {
    accueilWindow?.show();
  });
  accueilWindow.loadURL("http://localhost:5173/#/accueil");
});
