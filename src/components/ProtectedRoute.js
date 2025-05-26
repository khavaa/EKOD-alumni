import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null); // null pour attendre la réponse
  const [loading, setLoading] = React.useState(true); // pour savoir si l'on est en train de vérifier l'authentification

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // si l'utilisateur est connecté, isAuthenticated = true
      setLoading(false); // On arrête le chargement une fois l'état vérifié
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  return children;
};

export default ProtectedRoute;
