import mysql, { Connection } from 'mysql2/promise';

export class DatabaseService {
    private connection: Connection | null = null;

    private readonly config = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'gestionparticipants',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };

    // Definition d'une méthode pour établir une connexion à la base de données
    public async connect(): Promise<void> {
        // if (this.connection) {
        //     return;
        // }
        try {
            this.connection = await mysql.createConnection(this.config);
            console.log('Connected to the database successfully.');
            
        } catch (error) {
            console.error('Error connecting to database:', error);
            throw error;
        }
    }

    // Definition d'une méthode pour fermer la connexion à la base de données
    async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.end();
            this.connection = null;
            console.log('Disconnected from the database successfully.');
        }
    }

    // Definition d'une méthode pour exécuter une requête SQL
    async query(sql: string, values?: any[]): Promise<any> {
        if (!this.connection) {
            throw new Error('Database connection is not established.');
        }

        try {

            const [rows] = await this.connection.execute(sql, values);
            return rows as any[];

        } catch (error: any) {
            console.error('Error executing query:', error);
            throw error;
        }
    }


    // Definition d'une méthode pour exécuter une requête SQL de type INSERT, UPDATE ou DELETE
    async execute(sql: string, values?: any[]): Promise<{affectedRows: number; insertId?: number}> {
        if (!this.connection) {
            throw new Error('Database connection is not established.');
        }

        try {
            const [result] = await this.connection.execute(sql, values);

            return {
                affectedRows: (result as any).affectedRows,
                insertId: (result as any).insertId
            };

        } catch (error: any) {
            console.error('Error executing query:', error);
            throw error;
        }

    }

    // Methode pour vérifier si la connexion à la base de données est établie
    public isConnected(): boolean {
        return this.connection !== null;
    }

    // Methode pour obtenir la configuration de la base de données
    getConfig() {
        return { ...this.config };
    }
}