export class Participant {
    matricule: number;
    prenom: string;
    nom: string;
    genre: string;
    niveau: string;
    email: string;
    isActif: boolean;


    constructor(data?: Partial<Participant>) {
        // ?? retourner la valeur de droite si la valeur de gauche est null ou undefined
        this.matricule = data?.matricule ?? 0;
        // || retourner la valeur de droite si la valeur de gauche est falsy (null, undefined, 0, '', false)
        this.prenom = data?.prenom || '';
        this.nom = data?.nom || '';
        this.genre = Object.values(Genre).includes(data?.genre as Genre) ? data?.genre as Genre : '';
        this.niveau = Object.values(Niveau).includes(data?.niveau as Niveau) ? data?.niveau as Niveau : '';
        this.email = data?.email?.includes('@') ? data?.email : '';
        this.isActif = data?.isActif ?? true;
    }
}

export enum Genre {
    Masculin = 'Masculin',
    Feminin = 'Feminin',
    Autre = 'Autre'
}

export enum Niveau {
    Debutant = 'Debutant',
    Intermediaire = 'Intermediaire',
    Professionnel = 'Professionnel'
}