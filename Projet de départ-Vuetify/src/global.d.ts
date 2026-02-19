export interface api {
    
    // Méthode send dont le premier paramètre est un string 
    // Second paramètre de la méthode send utilise l'opérateur de décomposition pour accepter un nombre variable d'arguments
    // Second paramètre est un tableau de n'importe quel type
    send: (channel: string, ...args: any[]) => void;
   
    // Méthode on dont le premier paramètre est un string
    // Second paramètre de la méthode on est la fonction listener: prend un événement et un nombre variable d'arguments
    on: (channel: string, listener: (event: any, ...args: any[]) => void) => void;

}

declare global {
    interface Window {
        api : api;
    }
}
