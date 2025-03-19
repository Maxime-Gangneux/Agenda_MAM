import React, { useState } from "react";
import Calendar from "./front/calendar/calendar.js";
import Admin from "./front/admin/admin.js";
import "./App.css";

const pages = { calendar: <Calendar />, admin: <Admin /> };

function App() {
  const [currentPage, setCurrentPage] = useState("calendar");

  const changepages = (page) => () => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <button onClick={changepages("calendar")}>Calendar</button>
      <button onClick={changepages("admin")}>Admin</button>
      {pages[currentPage]}
    </div>
  );
}

export default App;
