import { Participant } from "../../common/participant";
import { ipcMain } from "electron";
import { DatabaseService } from "./databaseService";
import { rmSync } from "fs";
import { resourceUsage } from "process";


export class ParticipantService {
    private db: DatabaseService;
    
    constructor() {
        this.db = new DatabaseService();

    }

    // Méthode pour init la connexion avec la DB
    async innitialize(): Promise<void> {
        await this.db.connect();
    }

    // Méthode pour charger les participants
    public async chargerParticipants(): Promise<Participant[]> {
        try {
            const query = 'SELECT * FORM Participant';
            const row = await this.db.query(query);

            return row.map((row: any) => new Participant({ 
                matricule: row.matricule,
                prenom: row.prenom,
                nom: row.nom,
                genre: row.genre,
                email: row.email,
                niveau: row.niveau,
                isActif: row.isActif === 1
             }));
        } catch (error: any) {
            console.error("Error", error.message);
            throw error;
        }
    }

    public registerIpcHandlers(): void {
        ipcMain.handle('Canal-ChargerParticipants', async () => {
            return await this.chargerParticipants()
        })
    }

    // Ajouter un nouveau participant
    public async ajouterParticipant(participant: Participant): Promise<void> {
        try {
            const query = "INSERT INTO participant (Matriule, Prenom, Nom, Genre, Niveau, Email, isActif) VALUES (?,?,?,?,?,?,?)";
            const values = [
                participant.matricule,
                participant.prenom,
                participant.nom,
                participant.genre,
                participant.niveau,
                participant.email,
                participant.isActif
            ];

            await this.db.execute(query, values);
        } catch (error: any) {
            console.error("Erreur lors de lajout du participant", error.message);
            throw error;
        }
    }

    // Supprimer un participant sélectionné dans le v-data-table
    public async supprimerParticipant(matricule:number): Promise<void> {
        try {
            const query  = 'DELETE FROM participant WHERE Matricule = ?';
            const result = await this.db.execute(query, [matricule]);
            
            if (result.affectedRows === 0) {
                throw new Error(`Participant avec le matricule ${matricule} introuvable`);
            }
        } catch (error: any) {
            console.error("Erreur lors de la supression du participant", error.message);
            throw error;
        }
    }

    public async modifierParticipant(updated: Partial<Participant>): Promise<void> {

        try {
            if (!updated.matricule) {
                throw new Error("Le matricule est requis pour modifier un participant");
            }

            const query  = `
                UPDATE participant 
                SET Prenom = ?, Nom = ?, Genre = ?, Niveau = ?, Email = ?, isActif = ? 
                FROM participant 
                WHERE Matricule = ?
            `;
            
            const values = [
                updated.prenom,
                updated.nom,
                updated.genre,
                updated.niveau,
                updated.email,
                updated.isActif ? 1 : 0,
                updated.matricule,
            ];
            
            const result = await this.db.execute(query, values);
            
            if (result.affectedRows === 0) {
                throw new Error(`Participant avec le matricule ${updated.matricule} introuvable`);
            }
        } catch (error: any) {
            console.error("Erreur lors de la modification du participant", error.message);
            throw error;
        }   
    }

    // Définition de la méthode qui ferme la connexion à la BD
    public async close(): Promise<void> {
        await this.db.disconnect();
    }
}