"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // COmmunication sychrone
  getAppInfo: () => electron.ipcRenderer.sendSync("get-app-info"),
  // Communication asynchrone
  onTaskResult: (callback) => {
    electron.ipcRenderer.on("task-result", (_, result) => callback(result));
  },
  performTask: (data) => electron.ipcRenderer.send("perform-task", data),
  calculate: (a, b) => electron.ipcRenderer.invoke("calculate", { a, b })
});
