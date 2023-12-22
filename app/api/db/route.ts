// db.ts
import mysql from 'mysql2/promise';

let connection: mysql.Connection | null = null;

export async function connectToDatabase() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'your_database_name',
    });
  }

  return connection;
}

export async function closeDatabaseConnection() {
  if (connection) {
    await connection.end();
    connection = null;
  }
}
