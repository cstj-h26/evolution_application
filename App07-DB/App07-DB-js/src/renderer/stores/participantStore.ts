import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { Participant } from '../../common/participant'

export const useParticipantStore = defineStore('participant', () => {
    // state
    const participants = ref<Participant[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const selectedParticipant = ref<Participant | null>(null);

    // getters
    
    const participantsActifs = computed(() => {
        return participants.value.filter(p => p.isActif)
    })

    const participantsParNiveau = computed(() => {
        return (niveau: string) => participants.value.filter(p => p.niveau === niveau)
    })

    const participantParMatricule = computed(() => {
        return (matricule: number) => participants.value.find(p => p.matricule === matricule)
    })

    const totalParticipants = computed(() => participants.value.length)

    // Actions
    
    // Charger tous les participants depuis le service Electron
    async function chargerParticipants() {
        isLoading.value = true
        error.value = null

        try {
        const result = await window.api.chargerParticipants()
        
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

    // Réinitialisation de l'état du store. Utile pour les opérations CRUD
    function resetState() {
        participants.value = []
        isLoading.value = false
        error.value = null
    }

    // Ajouter un nouveau participant
    async function ajouterParticipant(participant: Participant){
        isLoading.value = true
        error.value = null

        try{
            const plainParticipant = JSON.parse(JSON.stringify(participant))
            const result = await window.api.ajouterParticipant(plainParticipant)

            if(result.success){
                return { success: true }
            } else {
                error.value = result.error || 'Erreur lors de l\'ajout'
                return { success: false, error: error.value }
            }
        }catch(e: any)
        {
            error.value = e.message
            return { success: false, error: e.message }
        }finally {
            isLoading.value = false
        }
    }

    // Fonction pour écouter les notifications IPC pour les changements (depuis d'autres fenêtres)
    function setupIpcListeners(){

        window.api.on('participant-added', (event: any, participant: Participant) => {
            const exists = participants.value.some(p => p.matricule === participant.matricule)

            if(!exists)
            {
                participants.value.push(participant)
                console.log('Participant ajouté via IPC: ', participant)
            }
        })

        // Écouter les modifications de participant depuis la fenêtre de modification
        window.api.on('participant-modifier', (event: any, updatedParticipant: Participant) => {
            // Trouver et MAJ le participant dans la liste locale
            const index = participants.value.findIndex(p => p.matricule === updatedParticipant.matricule)
            
            if (index !== -1) {
                participants.value[index] = updatedParticipant
                console.log('Participant modifié via IPC: ', updatedParticipant)
            }
        })
    }

    // Fonction pour demander la suppression du participant sélectionné dans le v-data-table
    async function supprimerParticipant(matricule: number) {
        isLoading.value = true
        error.value = null

        try {
            const result = await window.api.supprimerParticipant(matricule)

            if(result.success) {
                // Supprimer localement
                const index = participants.value.findIndex(p => p.matricule === matricule)

                if(index!== -1)
                {
                    participants.value.splice(index, 1)
                    return { success: true }
                }                
            } else {
                error.value = result.error || 'Erreur lors de la suppression'
                return { success: false, error: error.value }
            }
        }catch(e:any)
        {
            error.value = e.message
            return { success: false, error: e.message }
        } finally {
            isLoading.value = false
        }
    }
    function selectParticipant(participant: Participant) {
        selectedParticipant.value = { ...participant}
    }

    function clearSelectedParticipant() {
        selectedParticipant.value = null
    }

    return {
        // State
        participants,
        isLoading,
        error,
        selectedParticipant,
        // Getters
        participantsActifs,
        participantParMatricule,
        participantsParNiveau,
        totalParticipants,
        // Actions
        chargerParticipants,
        resetState,
        ajouterParticipant,
        setupIpcListeners,
        supprimerParticipant,
        selectParticipant,
        clearSelectedParticipant
    }

});
