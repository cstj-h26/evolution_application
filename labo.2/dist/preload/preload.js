"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
document.querySelector("button#about")?.addEventListener('click', () => {
    console.log("TEST");
    new electron_1.BrowserWindow({
        width: 400,
        height: 300,
        title: "Modal",
        modal: true,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
});
