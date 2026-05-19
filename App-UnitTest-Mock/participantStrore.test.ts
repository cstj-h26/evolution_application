import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { Participant, Genre, Niveau } from '../src/common/participant'
import { useParticipantStore } from '../src/renderer/stores/participantStore'

// Déclaration global pour dire a TypeScript que l'objet window possède une propriété api 
declare global {
    interface Window {
        api: any
    }
}

describe('participantStore', () => {
        
    let participants: Participant[]

    beforeEach(() => {

        // Créer un Mock global de window.api avant chaque test
        global.window = global.window || {} as any;
        
        (global.window as any).api = {
            send: vi.fn(), // Mock de la méthode send
            on: vi.fn(), // Mock de la méthode on
            once: vi.fn(), // Mock de la méthode once
            ajouterParticipant: vi.fn(), // Mock de la méthode ajouterParticipant
            modifierParticipant: vi.fn(), // Mock de la méthode modifierParticipant
            supprimerParticipant: vi.fn(), // Mock de la méthode supprimerParticipant
            chargerParticipants: vi.fn(), // Mock de la méthode chargerParticipants
            showMessageBox: vi.fn() // Mock de la méthode showMessageBox
        }


        // Initialisation d'une instance de Pinia avant chaque test
        setActivePinia(createPinia())

        // Créer un jeu de données de test avant chaque test
        participants = [
            new Participant({
                matricule: 1,
                prenom: 'Alice',
                nom: 'Tremblay',
                genre: 'F' as Genre,
                niveau: 'Débutant' as Niveau,
                email: 'alice@example.com',
                isActif: true
            }),
            new Participant({
                matricule: 2,
                prenom: 'Bob',
                nom: 'Gagnon',
                genre: 'M' as Genre,
                niveau: 'Intermédiaire' as Niveau,
                email: 'bob@example.com',
                isActif: true
            }),
            new Participant({
                matricule: 3,
                prenom: 'Charlie',
                nom: 'Dubois',
                genre: 'M' as Genre,
                niveau: 'Professionnel' as Niveau,
                email: 'charlie@example.com',
                isActif: false
            }),
            new Participant({
                matricule: 4,
                prenom: 'Diana',
                nom: 'Leblanc',
                genre: 'F' as Genre,
                niveau: 'Débutant' as Niveau,
                email: 'diana@example.com',
                isActif: true
            })
        ]
    })

    // Tester le fonctionnement du getter participantsActifs
    describe('participantsActifs', () => {
        it('devrait retourner uniquement les participants actifs', () => {
            const store = useParticipantStore()
            
            store.participants = participants
            
            // Appel au getter
            const actifs = store.participantsActifs
            
            // Vérification que seuls les participants actifs sont retournés
            expect(actifs).toHaveLength(3) // dans le jeu de test créé, il y a 3 participants actifs
            expect(actifs.every(p => p.isActif)).toBe(true) // tous les participants retournés doivent être actifs
            expect(actifs.find(p => p.matricule === 3)).toBeUndefined() // le participant avec matricule 3 est inactif et ne doit pas être dans la liste des actifs
            expect(actifs.map(p => p.matricule)).toEqual([1, 2, 4]) // les matricules des participants actifs doivent être 1, 2 et 4
        })
    });

    // Avec Mock: Tester l'ajout d'un participant en utilisant la simulation de l'API avec un Mock vi de Vitest
    it('Ajouter participant avec Mock', async () => {
        // Créer un participant de test
        const participant = new Participant({
            matricule: 12345,
            prenom: 'Jean',
            nom: 'Dupont',
            genre: 'M',
            niveau: 'Débutant',
            email: 'jean.dupont@example.com',
            isActif: true
        });

        // Configurer le Mock pour retourner run succès lors de l'appel à ajouterParticipant
        (window.api.ajouterParticipant as any).mockResolvedValue({
             success: true 
        })

        await useParticipantStore().ajouterParticipant(participant);

        // Verifier que le mock a ete appelé avec les bons arguments
        expect(window.api.ajouterParticipant).toHaveBeenCalledWith(participant);

        
    })


    // Tester le fonctionnement de supprimerParticipant en utilisant la simulation de l'API avec un Mock vi de Vitest
    // Test avec un Mock (bouchon) pour simuler la suppression d'un participant
    describe('supprimerParticipant', () => {
        it('devrait supprimer un participant existant', async () => {
            const store = useParticipantStore();

            const matriculeASupprimer = 1; // Participant avec matricule 1 existe dans le jeu de test

            // Configurer le Mock pour retourner un succès lors de l'appel à supprimerParticipant
            (window.api.supprimerParticipant as any).mockResolvedValue({
                success: true,
                message: 'Participant supprimé avec succès'
            });

            // Act
            const result = await store.supprimerParticipant(matriculeASupprimer);

            // Assert
            expect(result).toEqual({ sucess: true });

            // Verigier que le mock a ete appele une seule fois avec le bon argument
            expect(window.api.supprimerParticipant).toHaveBeenCalledTimes(1);
            expect(window.api.supprimerParticipant).toHaveBeenCalledWith(matriculeASupprimer);
        });

        it('Devrait gerer les erreurs lors de la suppression avec mock', async () => {
            // Arrange
            const store = useParticipantStore();

            const matriculeASupprimer = 999; // Participant avec ce matricule n'existe pas

            // Configurer le Mock pour retourner une erreur lors de l'appel à supprimerParticipant
            (window.api.supprimerParticipant as any).mockResolvedValue({
                success: false,
                error: 'Participant non trouvé'
            });

            // Act
            const result = await store.supprimerParticipant(matriculeASupprimer);

            // Assert
            expect(result).toEqual({ success: false, error: 'Participant non trouvé' });

            // Verigier que le mock a ete appele une seule fois avec le bon argument
            expect(window.api.supprimerParticipant).toHaveBeenCalledTimes(1);
            expect(window.api.supprimerParticipant).toHaveBeenCalledWith(matriculeASupprimer);
        });
    });

})
