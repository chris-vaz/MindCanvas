import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from 'dotenv';
import * as schema from '../../../migrations/schema'
import { migrate } from "drizzle-orm/postgres-js/migrator";
dotenv.config({ path: '.env' });

// This file allows us to query our database and do furthur db operations

if (!process.env.DATABASE_URL) {
    console.log('🔴 no database URL');
}

const client = postgres(process.env.DATABASE_URL as string)
const db = drizzle(client, { schema });
const migratedb = async () => {
    try {
        console.log('🟡 Migrating Client');
        await migrate(db, { migrationsFolder: 'migrations' });
        console.log('🟢 Successfully Migrated');
    } catch (error) {
        console.log('🔴 Error Migrating Client');
    }
};

migratedb();
export default db;
