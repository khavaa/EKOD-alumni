import React, { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false); 
        navigate("/"); 
      })
      .catch((error) => {
        console.error(error); 
      });
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="home-container">
      {!isAuthenticated ? (
        <>
          <div className="welcome-container">
            <h1>Bienvenue sur EKOD Alumni</h1>
            <p>Connectez-vous pour découvrir les parcours de nos anciens élèves et les offres de stage et d'emploi.</p>
          </div>
          <div className="auth-links">
            <a href="/login" className="btn-login">Se connecter</a>
          </div>
        </>
      ) : (
        <div className="auth-links">
          <p>Bienvenue sur EKOD Alumni !</p>
          <button onClick={handleSignOut} className="btn-logout">Se déconnecter</button>
        </div>
      )}

      <div className="links-container">
        <a href="/alumni" className="btn">Annuaire des Alumni</a>
        <a href="/jobBoard" className="btn">Offres de Stage et Emploi</a>
      </div>
    </div>
  );
};

export default Home;