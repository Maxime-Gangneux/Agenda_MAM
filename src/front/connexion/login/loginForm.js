import React, { useState } from "react";
import login from "../../../back/connexion/login.js"; // Assurez-vous que le chemin est correct
import "./login.css";
import logo from "../../../assets/logo mam.png";

const LoginForm = ({ setcurrentConnexion, checkToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); 

        // Appel à la fonction login et gestion des erreurs
        const result = await login(email, password);

        if (result.error) {
            setMessage(`❌ Erreur : ${result.error}`); // Affiche le message d'erreur
        } else if (result.success) {
            setMessage("✅ Connexion réussie !");
            localStorage.setItem("supabase_token", result.token); // Stocke le token dans localStorage
            checkToken();
        }

        setTimeout(() => setMessage(""), 3000); // Efface le message après 3 secondes
    };

    const changeConnexionForm = () => {
        setcurrentConnexion("SignupForm");
    };

    return (
        <div className="login-background">
            <div className="login-main">
                <div className="login-title-container">
                    <h2 className="login-title">Se connecter</h2>
                    <img className="login-logo" src={logo} alt="Logo" />
                </div>
                <div className="login-form-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-form-section">
                            <label className="login-form-label">E-mail</label>
                            <input
                                className="login-form-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="login-form-section">
                            <label className="login-form-label">Mot de passe</label>
                            <input
                                className="login-form-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {message && <p className="message">{message}</p>}

                        <div className="login-form-section">
                            <button className="login-form-button" type="submit">
                                Se connecter
                            </button>
                        </div>
                    </form>
                    <a className="login-form-switch">
                        Pas encore de compte ? <strong className="login-form-switch-button" onClick={changeConnexionForm}>Inscrivez-vous</strong>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
