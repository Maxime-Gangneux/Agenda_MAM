import "./topbar.css";
import { useState, useEffect, useRef } from "react";
import Account_circle from "../../../../assets/account_circle.svg";
import logoutimage from "../../../../assets/logout.svg"
import Settings from "../../../../assets/settings.svg"
import logout from "../../../../back/connexion/logOut";

const Topbar = ({ handleToday, handleNextWeek, handlePrevWeek, checkToken }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    const handlelogout = async() =>{
        console.log("gh_eig");
        await logout();
        checkToken();
    }

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className="topbar">
            <div className="controls">
                <button className="aujourdhui" onClick={handleToday}>Aujourd'hui</button>
                <div className="arrows">
                    <button className="prev-week" onClick={handlePrevWeek}>◀</button>
                    <button className="next-week" onClick={handleNextWeek}>▶</button>
                </div>
            </div>
            <div className="profile" ref={menuRef}>
                <div className="profile-drop-down" onClick={toggleMenu}>
                    <img className="profile-image" src={Account_circle} alt="Profile" />
                </div>
                {isMenuOpen && (
                    <div className="profile-menu show" id="profile-menu">
                        <div className="profile-action">
                            <img src={Settings}></img>
                            Settings
                        </div>
                        <div className="profile-action" onClick={handlelogout}>
                            <img src={logoutimage}></img>
                            se déconecter
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topbar;
