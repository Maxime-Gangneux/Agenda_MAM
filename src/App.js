import React, { useState, useEffect } from "react";
import CalendarMain from "./front/calendar/calendarMain.js";
import Admin from "./front/admin/admin.js";
import ConnexionMain from "./front/connexion/connexionMain.js";
import ChildMain from "./front/child/ChildMain.js";
import ParentMain from "./front/parent/parentMain.js";
import VerifyPage from "./front/connexion/verifyPage/verifyPage.js";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("ConnexionMain");
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
        const user = JSON.parse(userInfo);
        return user;
    }
    return "";
});


  function checkToken() {
    const token = localStorage.getItem("sb-glpkdirtdltarpihfolo-auth-token");

    if (!token) {
      window.location.hash = "login"; // Si pas de token, rediriger vers la page de connexion
    }
  }

  function loginSuccess() {
    let targetPage = "calendar";
    const userinfos = localStorage.getItem("userInfo");
  
    if (!userinfos) return;
  
    const user = JSON.parse(userinfos);
    setUser(user);

    if (user.role === "parent" && !user.is_verified) {
      targetPage = "verifyPage";
    }
  
    window.location.hash = targetPage;
  }
  

  useEffect(() => {
    checkToken();

    window.addEventListener("storage", checkToken); // Réécoute le changement du token dans le localStorage

    // Initialisation de la page basée sur le hash actuel
    const initialPage = window.location.hash.slice(1) || "ConnexionMain";
    setCurrentPage(initialPage);

    // Écouteur pour les changements de hash dans l'URL
    const handleHashChange = () => {
      const pageFromHash = window.location.hash.slice(1); // Récupère la page depuis le hash
      setCurrentPage(pageFromHash); // Met à jour l'état avec la page du hash
    };

    window.addEventListener("hashchange", handleHashChange);

    // Nettoyage de l'écouteur à la destruction du composant
    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkToken(); // Vérification du token toutes les minutes
    }, 60000);

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  function changePages(page) {
    window.location.hash = page;
    setCurrentPage(page);
  }

  const pages = {
    calendar: <CalendarMain checkToken={checkToken} user = {user} />,
    admin: <Admin/>,
    login: <ConnexionMain loginSuccess={loginSuccess} />,
    ChildMain: <ChildMain user = {user} />,
    ParentMain: <ParentMain />,
    verifyPage: <VerifyPage />,
  };

  return (
    <div className="App">
      {pages[currentPage]}
    </div>
  );
}

export default App;
