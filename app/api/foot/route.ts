// api/formation.ts
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { connectToDatabase, closeDatabaseConnection } from '../db/route';

export async function GET(request: NextApiRequest) {
  try {
    const connection = await connectToDatabase();

    // Requête SQL pour sélectionner toutes les formations de la table 'formation'
    const selectFormationsQuery = "SELECT * FROM formation WHERE formation.sport = 'foot'";


    // Exécutez la requête et récupérez les résultats
    const [rows] = await connection.query(selectFormationsQuery);

    closeDatabaseConnection();

    // Renvoyez les résultats en tant que réponse JSON
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des formations.' }, { status: 500 });
  }
}
