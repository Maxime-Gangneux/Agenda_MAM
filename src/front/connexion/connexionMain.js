import React, { useState } from "react";
import "./connexionMain.css";
import LoginForm from "./login/loginForm";
import SignupForm from "./signin/signupForm";

const ConnexionMain = ({loginSuccess}) => {
    const [currentConnexion, setcurrentConnexion] = useState("LoginForm");

    const pages = {
        LoginForm: <LoginForm setcurrentConnexion={setcurrentConnexion} loginSuccess={loginSuccess} />,
        SignupForm: <SignupForm setcurrentConnexion={setcurrentConnexion} loginSuccess={loginSuccess} />
    };

    return (
        <div>
            {pages[currentConnexion]}
        </div>
    );
}

export default ConnexionMain;
