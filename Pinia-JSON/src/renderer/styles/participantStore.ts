import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { Participant } from '@/common/participant';

export const useParticipantStore = defineStore('participant', () => {
    // state
    const participants = ref<Participant[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    
    // getters
    
    const participantsActifs = computed(() => {
        return participants.value.filter(p => p.isActif)
    })

    const participantsParNiveau = computed(() => {
        return (niveau: string) => participants.value.filter(p => p.niveau)
    })

    const participantParMatricule = computed(() => {
        return (matricule: number) => participants.value.find(p => p.matiricule === matricule)
    })

    const totalParticipants = computed(() => participants.value.length)

    // Actions
    
    // Charger tous les participants depuis le service Electron
    try {
        isLoading.value = true
        error.value = null

        try {
        const result = await window.api.chargerParticipants()
        
        if (result.success) {
            participants.value = result.data;
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

    function ... {
        ... = []
        ... = false
        ... = null
    }

    return {
        // State
        ...
        // Getters
        ...
        // Actions
        ...
    }

});
