import ChildForm from "./childForm";
import DisplayChild from "./displayChild";
import EditChildForm from "./editChildForm";
import React, { useState } from "react";
import "./ChildMain.css";

const ChildMain = ({ changePages }) => {
    const [modalcreateChildisopen, setmodalcreateChildisopen] = useState(false);
    const [modalupdateChildisopen, setmodalupdateChildisopen] = useState(false);
    const [childId, setchildId] = useState(null);

    return (
        <div className="child-background">
            <div className="child-main">
                {modalcreateChildisopen && (
                    <div className="child-form" >
                        <ChildForm setmodalcreateChildisopen = {setmodalcreateChildisopen}/>
                        <div className="child-form-background" onClick={() => {setmodalcreateChildisopen(false)}}></div>
                    </div>
                )}
                {modalupdateChildisopen && (
                    <div className="child-form" >
                        <EditChildForm childId={childId} setmodalupdateChildisopen = {setmodalupdateChildisopen} />
                        <div className="child-form-background" onClick={() => {setmodalupdateChildisopen(false)}}></div>
                    </div>
                )}
                <DisplayChild setmodalcreateChildisopen={setmodalcreateChildisopen} setmodalupdateChildisopen = {setmodalupdateChildisopen} setchildId = {setchildId}/>
            </div>
        </div>
    );
};

export default ChildMain;
