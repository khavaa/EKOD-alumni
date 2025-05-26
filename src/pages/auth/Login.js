import React, { useState, useRef } from 'react';
import { auth } from '../../firebaseConfig';
import { Link, Navigate } from 'react-router-dom'; 
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css'; 

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [success, setSuccess] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoginError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          setSuccess("Connexion réussie");
          setRedirectToHome(true);
        } else {
          setLoginError("Veuillez vérifier votre email avant de vous connecter.");
        }
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  }

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Veuillez entrer votre email");
      return;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Veuillez entrer un email valide");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Un email de réinitialisation a été envoyé à votre adresse email.");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Bienvenue</h1>
        <p className="login-subtitle">Connectez-vous pour accéder à votre espace</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input type="text" name="email" placeholder="Votre email" ref={emailRef} />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input type="password" name="password" placeholder="Votre mot de passe" />
          </div>
          <div className="forgot-password">
            <a onClick={handleForgetPassword} href="#">Mot de passe oublié ?</a>
          </div>
          <button className="btn-login" type="submit">Se connecter</button>
        </form>

        {loginError && <p className="error-message">{loginError}</p>}
        {success && <p className="success-message">{success}</p>}

        <p className="signup-link">
          Nouveau ici ? <Link to="/SignUp">Créez un compte</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;