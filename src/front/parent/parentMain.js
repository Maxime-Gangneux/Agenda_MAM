import DisplayParent from "./displayParent.js";
import EditParentForm from "./editparentForm.js";
import React, { useState } from "react";
import "./parentMain.css";

const ParentMain = ({ changePages }) => {
    const [modalcreateParentisopen, setmodalcreateParentisopen] = useState(false);
    const [modalupdateParentisopen, setmodalupdateParentisopen] = useState(false);
    const [ParentId, setParentId] = useState(null);

    return (
        <div className="parent-background">
            <div className="parent-main">
                {modalupdateParentisopen && (
                    <div className="parent-form" >
                        <EditParentForm ParentId={ParentId} setmodalupdateParentisopen = {setmodalupdateParentisopen} />
                        <div className="parent-form-background" onClick={() => {setmodalupdateParentisopen(false)}}></div>
                    </div>
                )}
                <DisplayParent setmodalcreateParentisopen={setmodalcreateParentisopen} setmodalupdateParentisopen = {setmodalupdateParentisopen} setParentId = {setParentId}/>
            </div>
        </div>
    );
};

export default ParentMain;
