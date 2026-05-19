export class Dessinateur3D {

    // Méthode pour dessiner une sphère 
    public DessinerSphere(x: number, y: number, z: number, rayon: number): void {
        // ... logique pour dessiner la sphère 
        console.log(`Sphère à (${x}, ${y}, ${z}) avec rayon ${rayon}`);
    }
    // Méthode pour dessiner un cube 
    public DessinerCube(x: number, y: number, z: number, arete: number): void {
        // ... logique pour dessiner le cube 
        console.log(`Cube à (${x}, ${y}, ${z}) avec arête ${arete}`);
    }
}

export class Vector3D {
    public X: number;
    public Y: number;
    public Z: number;

    constructor(x: number, y: number, z: number) {
        this.X = x;
        this.Y = y;
        this.Z = z;
    }
}

export abstract class Forme {
    public Emplacement: Vector3D;

    constructor(emplacement: Vector3D) {
        this.Emplacement = emplacement;
    }
}

export class Sphere extends Forme {
    public Rayon: number;

    constructor(emplacement: Vector3D, rayon: number) {
        super(emplacement); this.Rayon = rayon;
    }

    public DessinerSphere(): void {
        console.log("Sphere drawn!\n" + "X = " + this.Emplacement.X + ", Y = " + this.Emplacement.Y + ", Z = " + this.Emplacement.Z + "\nRayon = " + this.Rayon);
    }
}

export class Cube extends Forme {
    public LongueurArete: number;

    constructor(emplacement: Vector3D, longueurArete: number) {
        super(emplacement);
        this.LongueurArete = longueurArete;
    }

    public DessinerCube(): void {
        console.log(
            "Cube dessiné!\n" +
            "X = " + this.Emplacement.X +
            ", Y = " + this.Emplacement.Y +
            ", Z = " + this.Emplacement.Z +
            "\nLongueur côté = " + this.LongueurArete
        );
    }
}

export function main(): void {
    const sphere1 = new Sphere(new Vector3D(20, 20, 20), 8);
    sphere1.DessinerSphere();

    console.log("\n");

    const cube1 = new Cube(new Vector3D(10, 10, 10), 5);
    cube1.DessinerCube();
}

// Lancer le programme
main();
