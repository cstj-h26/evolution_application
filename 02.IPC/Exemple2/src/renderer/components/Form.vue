<template>
    <div>
      <h1 style="color: #26008B; text-align: center;">Formulaire d'inscription</h1>

      <div class="table-grid">
        <!-- Nom -->
        <label for="nom">Nom :</label>
        <input id="nom" v-model="nom" type="text" ref="monInput" />
       
        <!-- Prénom -->
        <label for="prenom">Prénom :</label>
        <input id="prenom" v-model="prenom" type="text" @focus="checkNom" />

        <!-- Date de naissance -->
        <label for="dateNaissance">Date de naissance :</label>
        <input id="dateNaissance" v-model="dateNaissance" type="date" />
  
        <!-- Adresse de courriel -->
        <label for="email">Adresse de courriel :</label>
        <div>
          <div v-if="showEmailError" style="color: red; font-size: 0.9em;">The format of your email isn't good!</div>
          <input id="email" v-model="email" type="email" placeholder="exemple@domaine.com" @dblclick="email = ''" @blur="validateEmail"/>
        </div>
    
        <!-- Région -->
        <label for="region">Région :</label>
        <select id="region" v-model="region">
            <option value="Laurentides">Laurentides</option>
            <option value="Laval">Laval</option>
            <option value="Lanaudière">Lanaudière</option>
            <option value="Montréal">Montréal</option>
        </select>
  
        <!-- Statut professionnel -->
        <label>Statut professionnel :</label>
        <span>
            <div class="inline-container">
                <input id="etudiant" type="checkbox" v-model="statutProfessionnel" value="Étudiant" />
                <label for="etudiant">Étudiant</label>
            </div>
            <div class="inline-container">
                <input id="salarie" type="checkbox" v-model="statutProfessionnel" value="Salarié" />
                <label for="salarie">Salarié</label>
            </div>
            <div class="inline-container">
                <input id="recherche" type="checkbox" v-model="statutProfessionnel" value="Recherche de travail" />
                <label for="recherche">Recherche de travail</label>
            </div>
        </span>
      
        <!-- État matrimonial -->
        <label>État matrimonial :</label>
        <span>
            <div>
                <input id="celibataire" type="radio" v-model="etatMatrimonial" value="Célibataire" />
                <label for="celibataire">Célibataire</label>
            </div>
            <div>
                <input id="fiance" type="radio" v-model="etatMatrimonial" value="Fiancé" />
                <label for="fiance">Fiancé</label>
            </div>
            <div>
                <input id="marie" type="radio" v-model="etatMatrimonial" value="Marié" />
                <label for="marie">Marié</label>
            </div>
        </span>
        </div>
  
        <!-- Langages de programmation préférés -->
         <div class="second-table-grid">
            <span>
                <label> Faites un choix (2 ou +): </label>
                <div v-if="showLangageError" style="color: red; font-size: 0.9em;">Please select between 2 and 4 programming languages</div>
                <select v-model="listeLangages" multiple style="width: 150px;" @change="validateLangages">
                    <option>C#</option>
                    <option>Java</option>
                    <option>Python</option>
                    <option>Ruby</option>
                    <option>Visual Basic .NET</option>
                    <option>JavaScript</option>
                    <option>Swift</option>
                    <option>Kotlin</option>
                </select>
            </span>

            <!-- Boutons -->
            <span style="vertical-align: middle; margin-top: 40px;">
                <button @click="copierLangages" style="margin-bottom: 10px;">Copier &gt;&gt;</button>
                <button @click="viderLangages">Vider &lt;&lt;</button>
            </span>
  
            <!-- ListBox pour copier les langages -->
            <span>
                <div style="border: 1px solid grey;">
                    <label>Langages choisis :</label>
                    <ul>
                        <li v-for="langage in langagesChoisis" :key="langage">{{ langage }}</li>
                    </ul>
                </div>
            </span>
        </div>

        <div class="third-table-grid">
            <button @click="valider">Valider</button>
            <button @click="annuler">Annuler</button>
        </div>
    </div>
  </template>
  
  <script lang="ts">
  
  // Définition d'un composant Vue.js
  // data permet de définir les données réactives du composant
  export default {
    data() {
      return {
        nom: '',
        prenom: '',
        dateNaissance: '',
        email: 'exemple@domaine.com',
        region: 'Laurentides',
        statutProfessionnel: [],
        etatMatrimonial: '',
        listeLangages: [],
        langagesChoisis: [], // Liste des langages choisis
        showEmailError: false,
        showLangageError: false,
      };
    },

    mounted() {
        // Envoi d'un message au processus ¸
        window.api.send("focus-nom")

        // Appliquer focus une fois le signal reçu du main process
        window.api.on("applu-focus", () => {
            this.focusNom();
        });

        // Écouter la réponse du dialog
        window.api.on("nom-error-ok", () => {
            this.focusNom();
        });
    },

    methods: {
        validateLangages() {
            const count = this.listeLangages.length;
            this.showLangageError = count < 2 || count > 4;
        },

        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.showEmailError = !emailRegex.test(this.email);
        },

        checkNom() {
            if (!this.nom.trim()) {
                window.api.send("show-nom-error");
            }
        },

        focusNom() {
            const inputElement = this.$refs.monInput as HTMLInputElement;

            if (inputElement) inputElement.focus()
            else console.error("Non trouvé!")
        },

        copierLangages() {
            // Copier les valeurs sélectionnées de listeLangages et de les assigner à langagesChoisis
            this.langagesChoisis = [...this.listeLangages];
        },
        
        viderLangages() {
            // Vide la liste des langages choisis
            this.langagesChoisis = [];
        },
      
        valider() {
            // Logique pour valider le formulaire
            console.log('Formulaire validé avec les données :', this.$data);
        
            const formData = {...this};

            window.api.send("show-dialog", JSON.stringify(formData));
        },

        annuler() {
            this.nom = '';
            this.prenom = '';
            this.dateNaissance = '';
            this.email = '';
            this.region = 'Laurentides';
            this.statutProfessionnel = [];
            this.etatMatrimonial = '';
            this.listeLangages = [];
            this.langagesChoisis = [];
            this.showEmailError = false;
            this.showLangageError = false;
            this.focusNom();
        },
    },
  };
  </script>
  
  <style scoped>

.table-grid {
    display: grid;
    grid-template-columns: 1.5fr 3fr;
    gap: 10px;
    margin-bottom: 20px;
    max-width: 700px;
}

.second-table-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    gap: 10px;
    margin-bottom: 20px;
    max-width: 700px;
}

.third-table-grid {
    display: grid;
    grid-template-columns: 2fr 2fr;
    gap: 10px;
    margin-bottom: 20px;
    max-width: 700px;
}
</style>
