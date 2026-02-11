const { Pool } = require('pg');

const DbConfig = {
    user: 'neondb_owner',
    host: 'ep-lively-rice-a4t1cwwv-pooler.us-east-1.aws.neon.tech',
    database: 'neondb',
    password: 'npg_vu2OGqPZsJb5',
    port: 5432,
    ssl: { rejectUnauthorized: false }
};

export async function executeSQL(sqlScript) {
    const pool = new Pool(DbConfig);
    const client = await pool.connect();
    try {
        const res = await client.query(sqlScript);
        return res;
    } catch (error) {
        console.error('Error executing SQL script:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}