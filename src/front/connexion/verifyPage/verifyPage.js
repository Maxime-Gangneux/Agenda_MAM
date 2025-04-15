import React from "react";
import logout from "../../../back/connexion/logOut.js";
import "./verifyPage.css";

const VerifyPage = () => {

    return (
        <div className="verify-container">
            <div className="verify-card">
                <h2>Compte non vérifié</h2>
                <p>
                    Votre compte n'a pas encore été vérifié par une assistante maternelle.<br />
                    Veuillez patienter. Si cela prend trop de temps, n'hésitez pas à les contacter.
                </p>
                <div className="verify-buttons">
                    <button className="verify-btn" onClick={() => {logout(); window.location.hash = "login";}}>
                        Retour à la page de connexion et se déconnecter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyPage;
