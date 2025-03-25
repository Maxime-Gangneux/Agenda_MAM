import React, { useState } from "react";
import signup from "../../../back/connexion/signup";
import "./signup.css";
import logo from "../../../assets/logo mam.png";

const SignupForm = ({ setcurrentConnexion }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Réinitialise le message avant une nouvelle tentative

        // Appel de la fonction signup et récupération de la réponse
        const response = await signup(email, firstName, lastName, password);

        // Vérification du résultat de l'inscription
        if (response.error) {
            setMessage(`❌ Erreur : ${response.error}`);
        } else {
            setMessage("✅ Inscription réussie !");
            setTimeout(() => setcurrentConnexion("LoginForm"), 2000); // Passer au formulaire de connexion après 2 secondes
        }

        setTimeout(() => setMessage(""), 3000); // Efface le message après 3 secondes
    };

    const changeConnexionForm = () => {
        setTimeout(() => setcurrentConnexion("LoginForm"), 0); // Passer au formulaire de connexion
    };

    return (
        <div className="signup-background">
            <div className="signup-main">
                <div className="signup-title-container">
                    <h2 className="signup-title">S'inscrire</h2>
                    <img className="signup-logo" src={logo} alt="Logo" />
                </div>
                <div className="signup-form-container">
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="signup-form-section">
                            <label className="signup-form-label">Nom</label>
                            <input
                                className="signup-form-input"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-form-section">
                            <label className="signup-form-label">Prénom</label>
                            <input
                                className="signup-form-input"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-form-section">
                            <label className="signup-form-label">e-mail</label>
                            <input
                                className="signup-form-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-form-section">
                            <label className="signup-form-label">Mot de passe</label>
                            <input
                                className="signup-form-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {message && <p className="message">{message}</p>}

                        <div className="signup-form-section">
                            <button className="signup-form-button" type="submit">
                                S'inscrire
                            </button>
                        </div>
                    </form>
                    <a className="signup-form-switch">
                        Vous possédez déjà un compte ? <strong className="signup-form-switch-button" onClick={changeConnexionForm}>Identifiez-vous</strong>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
