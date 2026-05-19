import { describe, it, expect, beforeEach } from "vitest";
import { Sphere, Vector3D } from "../src/index"; 


describe("Vector 3D", () => {
    // Le nom doit correspondre à la fonctionnalité à tester
    it("Doit initialiser correctement les coordonnées X, Y, Z", () => {
        const v = new Vector3D(1, 2, 3);
        
        expect(v.X).toBe(1); // toBe pour une égalité stricte de valeur et de type
        expect(v.Y).toEqual(2); // toEqual pour == avec valeur sans les types
        expect(v.Z).toBe(3);
    });
});

/*
.only pour isoler un test
.skip pour ignorer

*/

describe.only("Sphere", () => {

    // 1. Décalration de variables dans la portée de describe pour y avoir accès dans les "it"
    let v: Vector3D;
    let f: Sphere;

    // 2. Initialiser ces varibles avant chaque test
    beforeEach(() => {
        v = new Vector3D(1, 2, 3);
        f = new Sphere(v, 3);
    });

    it ("doit initialiser coorectement l'emplacement", () => {
        expect(f.Emplacement).toBe(v);
        expect(f.Rayon).toBe(3);
    });

    it.skip("l'emplcement de l'axe 'x'", () => {
        expect(f.Emplacement.X).toBe(10)
    })
});