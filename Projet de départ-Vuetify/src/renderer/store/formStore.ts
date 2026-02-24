import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFormStore = defineStore('form', () => {
    const nom = ref('');
    const email = ref('');
    const niveau = ref('');
    const genre = ref('');

    const newsletter = ref(false);
    const isSubmitting = ref(false);

    // getters
    const isFormValid = computed(() => {
        return nom.value.length > 0 &&
                email.value.includes('@') &&
                niveau.value.length > 0 &&
                genre.value.length > 0 &&
                typeof newsletter.value === 'boolean';
    });

    const formData = computed(() => ({
        nom: nom.value,
        email: email.value,
        niveau: niveau.value,
        genre: genre.value,
        newsletter: newsletter.value,
    }));

    // Actions
    function resultForm() {
        nom.value = '';
        email.value = '';
        niveau.value = '';
        genre.value = '';
        newsletter.value = false;
    }

    async function submitForm() {
        if (!isFormValid.value) {
            throw new Error('Formulaire invalide');
        }

        isSubmitting.value = true;

        try {
            // Simuler un appel API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('Formulaire soumis:', formData.value);        
            
            resultForm();

            return { success: true, message: 'Formulaire soumis avec succès' };
        
        } catch (error) {
            console.error('Erreur:', error)
            
            return { success: false, message: 'Erreur d\'envoi!' }
        
        } finally {
            isSubmitting.value = false;
        }
    }

    // Retourner les propriétés et méthodes pour qu'elles soient accessibles depuis les composants
    return {
        // state
        nom,
        email,
        niveau,
        genre,
        newsletter,
        isSubmitting,

        // getters
        isFormValid,
        formData,
        
        // actions
        resultForm,
        submitForm,
    }

});
