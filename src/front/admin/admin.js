import React from "react";
import HoraireForm from "../horaires/horairesForm.js";

function Admin(){
    return(
        <div style={{display:"grid",height:"100vh", width:"100vw", gridTemplateColumns: "repeat(4, 24%)", gridTemplateRows: "repeat(2, 50%)"}}>
            <HoraireForm />
            <button onClick={() =>{window.location.hash ="calendar"}} ></button>
        </div>
    );   
}

export default Admin