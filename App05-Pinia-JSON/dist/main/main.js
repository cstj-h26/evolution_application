"use strict";
const electron = require("electron");
const path = require("path");
const fs = require("fs");
class Participant {
  matricule;
  prenom;
  nom;
  genre;
  niveau;
  email;
  isActif;
  constructor(data) {
    this.matricule = data?.matricule ?? 0;
    this.prenom = data?.prenom || "";
    this.nom = data?.nom || "";
    this.genre = Object.values(Genre).includes(data?.genre) ? data?.genre : "";
    this.niveau = Object.values(Niveau).includes(data?.niveau) ? data?.niveau : "";
    this.email = data?.email?.includes("@") ? data?.email : "";
    this.isActif = data?.isActif ?? true;
  }
}
var Genre = /* @__PURE__ */ ((Genre2) => {
  Genre2["Masculin"] = "Masculin";
  Genre2["Feminin"] = "Feminin";
  Genre2["Autre"] = "Autre";
  return Genre2;
})(Genre || {});
var Niveau = /* @__PURE__ */ ((Niveau2) => {
  Niveau2["Debutant"] = "Debutant";
  Niveau2["Intermediaire"] = "Intermediaire";
  Niveau2["Professionnel"] = "Professionnel";
  return Niveau2;
})(Niveau || {});
class ParticipantService {
  participantsFilePath;
  constructor(participantsFilePath) {
    const dataDir = path.join(electron.app.getAppPath(), "data");
    this.participantsFilePath = path.join(dataDir, "participants.json");
  }
  // Méthode privee pour lire les participants depuis le fichier JSON
  async lireParticipants() {
    try {
      const data = await fs.promises.readFile(this.participantsFilePath, "utf-8");
      return JSON.parse(data).map((p) => new Participant(p));
    } catch (error) {
      if (error.code === "ENOENT") {
        console.warn(`Le fichier ${this.participantsFilePath} n'existe pas. Retourne une liste vide.`);
        return [];
      } else {
        console.error("Erreur lors de la lecture du fichier participants.json:", error);
        return [];
      }
    }
  }
  // Méthode publique pour charger les participants, qui utilise la méthode privée de lecture
  async chargerParticipants() {
    return await this.lireParticipants();
  }
  registerIpcHandlers() {
    electron.ipcMain.handle("Canal-ChargerParticipants", async () => {
      try {
        return await this.chargerParticipants();
      } catch (error) {
        console.error("Erreur lors du chargement des participants:", error);
        throw error;
      }
    });
  }
  // Ajouter un nouveau participant
  async ajouterParticipant(participant) {
    try {
      const participants = await this.lireParticipants();
      participants.push(participant);
      await this.ecrireParticipants(participants);
    } catch (error) {
      console.error("Erreur lors de l'ajout du participant:", error);
      throw error;
    }
  }
  async ecrireParticipants(participants) {
    try {
      const jsonData = JSON.stringify(participants, null, 2);
      await fs.promises.writeFile(this.participantsFilePath, jsonData, "utf-8");
    } catch (error) {
      console.error("Erreur lors de l'écriture du fichier participants.json:", error);
      throw error;
    }
  }
  async supprimerParticipant(matricule) {
    const participants = await this.lireParticipants();
    const index = participants.findIndex((p) => p.matricule === matricule);
    if (index !== -1) {
      participants.splice(index, 1);
      await this.ecrireParticipants(participants);
    } else {
      throw new Error(`Participant avec matricule ${matricule} introuvable`);
    }
  }
}
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
electron.ipcMain.on("ajouter-participant", () => {
  const ajoutWindow = new electron.BrowserWindow({
    width: 550,
    height: 500,
    show: false,
    // Fenêtre modale
    modal: true,
    parent: mainWindow || void 0,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true
    }
  });
  ajoutWindow?.once("ready-to-show", () => {
    ajoutWindow?.show();
  });
  ajoutWindow?.webContents.on("did-finish-load", () => {
    ajoutWindow?.show();
  });
  ajoutWindow.loadURL("http://localhost:5173/#/ajouterParticipant");
});
electron.ipcMain.on("message-channel", (event, arg) => {
  console.log("Message reçu :", arg);
  event.reply("message-channel", "Réponse du main process");
});
const participantService = new ParticipantService("");
electron.ipcMain.handle("Canal-ChargerParticipants", async () => {
  try {
    const data = await participantService.chargerParticipants();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
electron.ipcMain.handle("Canal-AjouterParticipant", async (_event, participant) => {
  try {
    await participantService.ajouterParticipant(participant);
    if (mainWindow) {
      mainWindow.webContents.send("participant-added", participant);
    }
    return { success: true, data: participant };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
electron.ipcMain.handle("showMessageBox", async (event, options) => {
  return electron.dialog.showMessageBox(options);
});
electron.ipcMain.handle(`Canal-SupprimerParticipant`, async (_event, matricule) => {
  try {
    await participantService.supprimerParticipant(matricule);
    return {
      success: true
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});
