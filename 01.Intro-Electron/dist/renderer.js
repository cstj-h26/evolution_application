"use strict";
console.log("Le renderer est prêt");
document.addEventListener("DOMContentLoaded", () => {
    console.log("Electron est prêt");
});
document.getElementById("bonjour")?.addEventListener('click', () => {
    alert('Bonjour depuis le renderer process!');
});
