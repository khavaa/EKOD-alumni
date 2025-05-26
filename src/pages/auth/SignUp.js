import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import  { auth }  from "../../firebaseConfig";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './SignUp.css';
const SignUp = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        const name = e.target.name.value;

        setError("");

        // Validation du mot de passe
        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        } else if (!accepted) {
            setError("Vous devez accepter les termes et conditions.");
            return;
        }

        // Créer l'utilisateur
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setSuccess("Inscription réussie");

                // Mettre à jour le nom de l'utilisateur
                updateProfile(result.user, { 
                    displayName: name 
                });

                sendEmailVerification(result.user).then(() => {
                    alert("Vérifiez votre email pour activer votre compte.");
                });
            })
            .catch((error) => setError(error.message));
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2 className="signup-title">Inscription</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom</label>
                    <input type="text" name="name" placeholder="Votre nom" required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Adresse email" required />
                </div>

                <div className="form-group password-group">
                    <label>Mot de passe</label>
                    <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mot de passe"
                    required
                    />
                    <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <div className="form-group terms-group">
                    <input type="checkbox" name="terms" id="terms" required />
                    <label htmlFor="terms">
                    J'accepte les <a href="#">termes et conditions</a>.
                    </label>
                </div>

                <button type="submit" className="btn-submit">
                    S'inscrire
                </button>
                </form>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <p className="login-link">
                Vous avez déjà un compte ? <Link to="/login">Connexion</Link>
                </p>
            </div>
        </div>
      );
    };
    
    export default SignUp;