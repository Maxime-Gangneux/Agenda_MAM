import React from "react";
import ChildForm from '../horaires/horairesForm.js';
import ParentForm from '../parent/parentFrom.js';
import DisplayChild from '../child/displayChild.js';
import DisplayParent from "../parent/displayParent.js"
import HoraireForm from "../horaires/horairesForm.js";

function Admin(){
    return(
        <div style={{display:"grid",height:"100vh", width:"100vw", gridTemplateColumns: "repeat(4, 24%)", gridTemplateRows: "repeat(2, 50%)"}}>
            <ChildForm />
            <ParentForm />
            <DisplayChild />
            <DisplayParent />
            <HoraireForm />
        </div>
    );   
}

export default Admin