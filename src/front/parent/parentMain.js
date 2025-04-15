import DisplayParent from "./displayParent.js";
import EditParentForm from "./editparentForm.js";
import React, { useState } from "react";
import "./parentMain.css";

const ParentMain = ({ changePages }) => {
    const [modalcreateParentisopen, setmodalcreateParentisopen] = useState(false);
    const [modalupdateParentisopen, setmodalupdateParentisopen] = useState(false);
    const [ParentId, setParentId] = useState(null);

    return (
        <div className="child-background">
            <div className="child-main">
                {modalupdateParentisopen && (
                    <div className="child-form" >
                        <EditParentForm ParentId={ParentId} setmodalupdateParentisopen = {setmodalupdateParentisopen} />
                        <div className="child-form-background" onClick={() => {setmodalupdateParentisopen(false)}}></div>
                    </div>
                )}
                <DisplayParent setmodalcreateParentisopen={setmodalcreateParentisopen} setmodalupdateParentisopen = {setmodalupdateParentisopen} setParentId = {setParentId}/>
            </div>
        </div>
    );
};

export default ParentMain;
