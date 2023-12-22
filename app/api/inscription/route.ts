import { NextResponse } from 'next/server';
import { connectToDatabase } from '../db/route';

export async function POST(request: Request) {
  try {
    const { formation } = await request.json();
    



    // connection bdd
    const connection = await connectToDatabase();

    // Exécutez la requête SQL pour insérer l'inscription
    const [result] = await connection.execute(
      'INSERT INTO inscription (formation) VALUES (?)',
      [formation]
    );

    

    console.log('Résultat de l\'insertion dans la base de données :', result);
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    return NextResponse.json({ error: 'Erreur lors de l\'inscription.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'success' });
}
