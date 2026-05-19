import { contextBridge, ipcRenderer } from "electron";

import { Participant } from "../common/participant"
import { channel } from "diagnostics_channel";

interface ApiResponse {
    success: boolean
    error?: string
}

contextBridge.exposeInMainWorld('api', {
    send: (channel: string, data: any) => ipcRenderer.send(channel, data),
    on: (channel:string, callback: (event: any, data: any) => void) => {
        ipcRenderer.on(channel, callback);
    },

    chargerParticipants: () => ipcRenderer.invoke('Canal-ChargerParticipants'),

    ajouterParticipant: (participant: Participant) : Promise<ApiResponse> => ipcRenderer.invoke('Canal-AjouterParticipant', participant),

    showMessageBox: (options: any) => ipcRenderer.invoke("showMessageBox", options),

    supprimerParticipant: (matricule: number): Promise<ApiResponse> => ipcRenderer.invoke('Canal-SupprimerParticipant', matricule),

    once: (channel: string, callback: (event: any, data: any) => void) => { ipcRenderer.once(channel, callback); },

    modifierParticipant: (participant: Participant): Promise<ApiResponse> => ipcRenderer.invoke('Canal-ModifierParticipant', participant)
});