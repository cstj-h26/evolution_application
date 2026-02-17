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
    webPreferences: {
      preload: path__namespace.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.loadURL("http://localhost:5173");
}
electron.app.whenReady().then(createWindow);
electron.ipcMain.on("message-channel", (event, arg) => {
  console.log("Message reçu", arg);
  event.reply("message-channel", "réponse du main process");
});
electron.ipcMain.on("open-form-window", () => {
  const formWindow = new electron.BrowserWindow({
    width: 450,
    height: 650,
    backgroundColor: "#ffffff",
    webPreferences: {
      preload: path__namespace.join(__dirname, "../preload/preload.js"),
      contextIsolation: true
      // Isoler le contexte de rendu pour plus de sécurité
    }
  });
  formWindow.loadURL("http://localhost:5173/#/form");
});
electron.ipcMain.on("show-dialog", (event, formDataString) => {
  const formData = JSON.parse(formDataString);
  const message = {
    nom: formData.nom,
    prenom: formData.prenom,
    dateNaissance: formData.dateNaissance,
    email: formData.email,
    region: formData.region,
    statutProfessionnel: formData.statutProfessionnel.join(", "),
    etatMatrimonial: formData.etatMatrimonial,
    langagesChoisis: formData.langagesChoisis.join(", ")
  };
  electron.dialog.showMessageBox({
    type: "info",
    title: "Formulaire validé",
    message: "Donnée du formulaire",
    detail: Object.values(message).join("\n"),
    buttons: ["OK"]
  });
});
