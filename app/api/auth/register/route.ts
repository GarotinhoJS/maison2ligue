// route.ts
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { connectToDatabase } from '../../db/route';

export async function POST(request: Request) {
  try {
    const { nom, prenom, datedenaissance, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Les champs email et password sont obligatoires' }, { status: 400 });
    }
    if (!nom || !prenom || !datedenaissance) {
      return NextResponse.json({ error: 'Tous les champs ne sont pas remplis' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    // Utiliser la fonction de connexion à la base de données
    const connection = await connectToDatabase();

    // Exécuter la requête SQL
    const [result] = await connection.execute(
      'INSERT INTO utilisateur (nom, prenom, datedenaissance, email, mdp) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, datedenaissance, email, hashedPassword]
    );

    // Fermer la connexion après l'exécution de la requête
    await connection.end();

    console.log('Résultat de l\'insertion dans la base de données :', result);
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    return NextResponse.json({ error: 'Erreur lors de l\'inscription.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'success' });
}
