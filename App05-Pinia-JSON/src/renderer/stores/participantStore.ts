import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { Participant } from '../../common/participant';

export const useParticipantStore = defineStore('participant', () => {
    // state
    const participants = ref<Participant[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    
    // getters
    
    const participantsActif = computed(() => {
        return participants.value.filter(p => p.isActif);
    })

    const participantsParNiveau = computed(() => {
        return (niveau: string) => participants.value.filter(p => p.niveau === niveau);
    })

    const participantParMatricule = computed(() => {
        return (matricule: number) => participants.value.find(p => p.matricule === matricule);
    })

    const totalParticipants = computed(() => {
        return participants.value.length;
    })

    // Actions
    
    // Charger tous les participants depuis le service Electron
    async function chargerParticipants() {
        isLoading.value = true
        error.value = null

        try {
        const result = await window.api.chargerParticipants();
        
        if (result.success) {
            participants.value = result.data
        } else {
            error.value = result.error || 'Erreur lors du chargement'
        }
        } catch (e: any) {
        error.value = e.message
        console.error('Erreur:', e)
        } finally {
        isLoading.value = false
        }
    }

    // Reinitailisation de l'état du store. Utile pour les operations CRUD ou lors de la deconnexion
    function resetState() {
        participants.value = []
        isLoading.value = false
        error.value = null
    }

    // Ajouter un nouveau particiapant
    async function ajouterParticipant(participant: Participant) {
        isLoading.value = true
        error.value = null

        try {
            const plainParticipant = JSON.parse(JSON.stringify(participant));
            const result = await window.api.ajouterParticipant(plainParticipant);
            if (result.success) {
                return {success: true};
            } else {
                error.value = result.error || 'Erreur lors de l\'ajout du participant';
                return {success: false, error: error.value};
            }
        } catch (e: any) {
            error.value = e.message;
            return {success: false, error: e.message};
        } finally {
            isLoading.value = false;
        }
    }

    // Fonction pour ecouter les notifications IPC pour les changements (depuis d'autres fenetres)
    function setUpIpcListeners() {
        window.api.on('participants-added', (event: any, participant: Participant) => {
            const exists = participants.value.some(p => p.matricule === participant.matricule);
            if (!exists) {
                participants.value.push(participant);
                console.log(`Participant ajouté (via IPC): ${participant.nom} ${participant.prenom}`);
            } else {
                console.warn(`Participant avec matricule ${participant.matricule} existe déjà. Ignorer l'ajout.`);
            }
        });
    }

        
    async function supprimerParticipant(matricule: number) {
        isLoading.value = true;
        error.value = null;

        try {
            const result = await window.api.supprimerParticipant(matricule);

            if (result.success) {
                const index = participants.value.findIndex(p => p.matricule === matricule);
                if (index !== -1) {
                    participants.value.splice(index, 1)
                }

                return {
                    success: true
                }
            } else {
                error.value = result.error || "erreur lors de la supression";
                return {
                    success: false,
                    error: error.value
                }
            }
        } catch (error: any) {
            error.value = error.message
            return {
                success: false,
                error: error.message
            }
        } finally {
            isLoading.value = false;
        }
    } 

    return {
        // State
        participants,
        isLoading,
        error,
        // Getters
        participantsActif,
        participantsParNiveau,
        participantParMatricule,        
        totalParticipants,
        // Actions
        chargerParticipants,
        resetState,
        ajouterParticipant,
        setUpIpcListeners,
        supprimerParticipant
    }

});
