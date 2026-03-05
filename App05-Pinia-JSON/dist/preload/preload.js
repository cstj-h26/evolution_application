"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => electron.ipcRenderer.send(channel, data),
  on: (channel, callback) => {
    electron.ipcRenderer.on(channel, callback);
  },
  chargerParticipants: () => electron.ipcRenderer.invoke("Canal-ChargerParticipants"),
  ajouterParticipant: (participant) => electron.ipcRenderer.invoke("Canal-AjouterParticipant", participant),
  showMessageBox: (options) => electron.ipcRenderer.invoke("showMessageBox", options),
  supprimerParticipant: (matricule) => electron.ipcRenderer.invoke("Canal-SupprimerParticipant", matricule)
});
