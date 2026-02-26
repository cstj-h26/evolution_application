"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => electron.ipcRenderer.send(channel, data),
  on: (channel, callback) => {
    electron.ipcRenderer.on(channel, callback);
  }
});
