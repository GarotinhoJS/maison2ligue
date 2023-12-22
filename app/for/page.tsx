"use client"
import React, { useState, useEffect } from 'react';
import "./formation.css"
import { useDispatch } from 'react-redux';

interface Formation {
  id: string;
  nom: string;
  competence: string;
  date: string;
  lieu: string;
  description: string;
}

const Formation = () => {
  const [data, setData] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [recherche, setRecherche] = useState("");
  const [formationFiltre, setFormationFiltre] = useState<Formation[]>([]);


  const effectuerRecherche = (texteRecherche: string) => {
    const formationFiltre = data.filter((item) =>
      item.nom.toLowerCase().includes(texteRecherche.toLowerCase())
    );
    setFormationFiltre(formationFiltre);
  };

  const handleRechercheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texteRecherche = e.target.value;
    setRecherche(texteRecherche);
    if (texteRecherche === '') {
      // Si la recherche est vide, affiche toutes les formations
      setFormationFiltre(data);
    } else {
      effectuerRecherche(texteRecherche);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('http://localhost:3000/api/formation') // API
        .then((res) => {
          if (!res.ok) {
            throw new Error('Échec de la requête');
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsLoading(false);
          setFormationFiltre(data); // Afficher toutes les formations par défaut
        })
        .catch((err) => {
          console.error(err);
          setError(err);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  const handlePop = async (formationId: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formation: formationId,
          
          // Ajoutez d'autres données nécessaires pour l'inscription, comme nom, prénom, date, etc.
        }),
      });
  
      if (!response.ok) {
        throw new Error('Échec de la requête d\'inscription');
      }
  
      console.log('Inscription réussie!');
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      // Gérez l'erreur, affichez un message d'erreur, etc.
    }
  };
  

  return (
    <div>
      <h1>Formations</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Recherche"
          value={recherche}
          onChange={handleRechercheChange}
        />
      </div>

      {formationFiltre.length === 0 && <p>Aucune formation trouvée.</p>}

      {formationFiltre.map ((item) => (
        <div className='tout'>
        <div key={item.id} className="formation-card">
          <div>
            <h2>{item.nom}</h2>
            <p>{item.date}</p>
            <p>{item.lieu}</p>
            <div>
              <p>{item.description}</p>
            </div>
            <button onClick={() => handlePop(item.id)}>S'inscrire à la formation</button>
          </div>
        </div>
        </div>
      ))}
    </div>
    
  );
};

export default Formation;
