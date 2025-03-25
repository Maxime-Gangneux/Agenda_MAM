import React, { useState } from "react";
import "./connexionMain.css";
import LoginForm from "./login/loginForm";
import SignupForm from "./signin/signupForm";

const ConnexionMain = ({checkToken}) => {
    const [currentConnexion, setcurrentConnexion] = useState("LoginForm");

    const pages = {
        LoginForm: <LoginForm setcurrentConnexion={setcurrentConnexion} checkToken={checkToken} />,
        SignupForm: <SignupForm setcurrentConnexion={setcurrentConnexion} checkToken={checkToken} />
    };

    return (
        <div>
            {pages[currentConnexion]}
        </div>
    );
}

export default ConnexionMain;
