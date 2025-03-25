import React, { useState, useEffect } from "react";
import CalendarMain from "./front/calendar/calendarMain.js";
import Admin from "./front/admin/admin.js";
import ConnexionMain from "./front/connexion/connexionMain.js";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("ConnexionMain");

  const checkToken = () => {
    const token = localStorage.getItem('supabase_token');
    if (token) {
      setCurrentPage("calendar");
    } else {
      setCurrentPage("ConnexionMain");
    }
  };

  useEffect(() => {

    checkToken();

    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  const changepages = (page) => () => {
    setCurrentPage(page);
  };

  const pages = {
    calendar: <CalendarMain changepages={changepages} />,
    admin: <Admin changepages={changepages} />,
    ConnexionMain: <ConnexionMain checkToken={checkToken} />
  };

  return (
    <div className="App">
      {pages[currentPage]}
    </div>
  );
}

export default App;
