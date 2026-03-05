import { Participant } from "../../common/participant";
import { promises as fs } from 'fs';
import path from 'path';
import { app, ipcMain } from 'electron';

export class ParticipantService {
    private participantsFilePath: string;

    constructor(participantsFilePath: string) {
        const dataDir = path.join(app.getAppPath(), 'data');
        this.participantsFilePath = path.join(dataDir, 'participants.json');
    }


    // Méthode privee pour lire les participants depuis le fichier JSON
    private async lireParticipants(): Promise<Participant[]> {
        try {

            const data = await fs.readFile(this.participantsFilePath, 'utf-8');
            return JSON.parse(data).map((p: any) => new Participant(p));

        } catch (error: any) {
            if (error.code === 'ENOENT') {
                console.warn(`Le fichier ${this.participantsFilePath} n\'existe pas. Retourne une liste vide.`);
                return [];
            } else {
                console.error('Erreur lors de la lecture du fichier participants.json:', error);
                return [];
            }
            throw error;
        }
    }

    // Méthode publique pour charger les participants, qui utilise la méthode privée de lecture
    public async chargerParticipants(): Promise<Participant[]> {
        return await this.lireParticipants();
    }

    public registerIpcHandlers(): void {
        ipcMain.handle('Canal-ChargerParticipants', async () => {
            try {
                return await this.chargerParticipants();
            } catch (error) {
                console.error('Erreur lors du chargement des participants:', error);
                throw error;
            }
        });
    }

    // Ajouter un nouveau participant
    public async ajouterParticipant(participant: Participant): Promise<void> {
        try {
            const participants = await this.lireParticipants();
            participants.push(participant);
            await this.ecrireParticipants(participants);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du participant:', error);
            throw error;
        }
    }

    private async ecrireParticipants(participants: Participant[]): Promise<void> {
        try {
            const jsonData = JSON.stringify(participants, null, 2);
            await fs.writeFile(this.participantsFilePath, jsonData, 'utf-8');
        } catch (error) {
            console.error('Erreur lors de l\'écriture du fichier participants.json:', error);
            throw error;
        }
    }

    public async supprimerParticipant(matricule: number): Promise<void> {
        const participants = await this.lireParticipants();
        const index = participants.findIndex(p => p.matricule === matricule)
        if (index !== -1) {
            participants.splice(index, 1); // Supprimer un élément du tableau 
            await this.ecrireParticipants(participants);
        } else {
            throw new Error(`Participant avec matricule ${matricule} introuvable`);
        }
    }
}

