export class Participant {
    matiricule: number;
    prenom: string;
    nom: string;
    genre: string;
    niveau: string;
    email: string;
    isActif: boolean;

    constructor(data?: Partial<Participant>) {
        this.matiricule = data?.matiricule ?? 0;
        this.prenom = data?.prenom || '';
        this.nom = data?.nom || '';

    this.genre = Object.values(Genre).includes(data?.genre as Genre) ? data?.genre as Genre : '';
    this.niveau = Object.values(Niveau).includes(data?.niveau as Genre) ? data?.niveau as Niveau : '';

    this.isActif = data?.isActif ?? true;
}
}


export enum Genre {
    M = 'M',
    F = 'F'
}

export enum Niveau {
    Débutant = 'Débutant',
    Intermédiaire = 'Intermédiaire',
    Professionnel = 'Professionel'
}


Niveau.Débutant