"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  nom?: string | null | undefined;
  prenom?: string | null | undefined;
  email?: string | null | undefined;
  id?: number | null | undefined;

}

const Profil = () => {
  const { data: session, status } = useSession();

  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session && session.user) {
      // Ajoutez le paramètre d'email à la requête pour filtrer les formations par utilisateur
      fetch(`http://localhost:3000/api/utilisateur?email=${session.user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Échec de la requête');
          }
          return res.json();
        })
        .then((userData) => {
          setData(userData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
          setIsLoading(false);
        });
    }
  }, [status, session]);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  return (
    <div className="barre">
      <h1>Profil</h1>
      <div className="debut">
        {data.map((item, index) => (
          <div key={index}>
            <div>
              <h2>{item.nom}</h2>
              <p>{item.prenom}</p>
              <p>{item.id}</p>
              <div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profil;
