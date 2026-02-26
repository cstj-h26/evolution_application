import {
    Participant
} from "@/common/participant";

import { ipcMain, app } from "electron";
import {promises as fs} from 'fs';
import path from "path";

export class ParticipantService {
    private participantFilePath: string;

    constructor() {
        const dataDir = path.join(
            app.getAppPath(),
            'data'
        )
        
        this.participantFilePath = path.join(dataDir, 'participant');
    }

    private async lireParticipants(): Promise<Participant[]> {
        try {
            const data = await fs.readFile(
                this.participantFilePath,
                'utf-8'
            );

            const participants = JSON.parse(data);

            return participants.map((p: any) => new Participant(p))
        } catch (error: any) {
            if (error.code === "ENOENT") {
                console.warn("Fichier ... ")
                return []
            }
            throw error;
        }
    }

    public async chargerParticipants(): Promise<Participant[]> {
        return await this.lireParticipants();
    }

    public registerIpcHandlers(): void {
        ipcMain.handle('Canal-ChargerParticipants', async () => {
            return await this.chargerParticipants();
        })
    }
} 