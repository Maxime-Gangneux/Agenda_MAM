import "./topbar.css";
import { useState, useEffect, useRef } from "react";
import Account_circle from "../../../../assets/account_circle.svg";
import logoutimage from "../../../../assets/logout.svg";
import Settings from "../../../../assets/settings.svg";
import logout from "../../../../back/connexion/logOut";
import arrow_left from "../../../../assets/keyboard_arrow_left.svg";
import arrow_right from "../../../../assets/keyboard_arrow_right.svg";
import helpIcon from "../../../../assets/help.svg";

const Topbar = ({ handleToday, handleNextWeek, handlePrevWeek, checkToken, changetoolbarrisopen }) => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const helpMenuRef = useRef(null);

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen((prev) => !prev);
        setIsHelpMenuOpen(false);
    };

    const toggleHelpMenu = () => {
        setIsHelpMenuOpen((prev) => !prev);
        setIsProfileMenuOpen(false);
    };

    const handleClickOutside = (event) => {
        if (
            profileMenuRef.current &&
            !profileMenuRef.current.contains(event.target) &&
            helpMenuRef.current &&
            !helpMenuRef.current.contains(event.target)
        ) {
            setIsProfileMenuOpen(false);
            setIsHelpMenuOpen(false);
        }
    };

    const handlelogout = async () => {
        await logout();
        checkToken();
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="topbar">
            <div className="controls">
                <button className="toolbarbutton" onClick={() => changetoolbarrisopen()}>Menu</button>
                <button className="aujourdhui" onClick={handleToday}>Aujourd'hui</button>
                <div className="arrows">
                    <button className="prev-week" onClick={handlePrevWeek}><img src={arrow_left} /></button>
                    <button className="next-week" onClick={handleNextWeek}><img src={arrow_right} /></button>
                </div>
            </div>
            <div className="menus">
                <div className="help" ref={helpMenuRef}>
                    <div className="profile-drop-down" onClick={toggleHelpMenu}>
                        <img className="profile-image" src={helpIcon} alt="Aide" />
                    </div>
                    {isHelpMenuOpen && (
                        <div className="profile-menu show" id="help-menu">
                            <div className="profile-section">
                                <div className="profile-title">Étape 1 : Ajouter son enfant</div>
                                <p className="profile-description">Accédez à l’onglet "Enfants" dans le menu à gauche et cliquez sur le bouton "+".</p>
                            </div>
                            <div className="profile-section">
                                <div className="profile-title">Étape 2 : Attribuer un horaire à l’enfant de plusieurs manières</div>
                                <p className="profile-description">Cliquez sur le calendrier à la date et l'heure souhaitées, puis choisissez votre enfant. Vous pouvez aussi utiliser le menu déroulant "Ajouter un horaire" à gauche.</p>
                            </div>
                            <div className="profile-section">
                                <div className="profile-title">Étape 3 : Ne pas oublier de cocher la case couleur des enfants</div>
                                <p className="profile-description">Cochez la case avec le prénom de votre enfant dans le menu déroulant "Couleurs des enfants" pour que l’horaire soit visible.</p>
                            </div>
                            <div className="profile-section">
                                <div className="profile-title">Étape 4 : Attribuer des modèles</div>
                                <p className="profile-description">Attribuez un modèle pour ajouter en un clic les horaires récurrents grâce au menu templates.</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="profile" ref={profileMenuRef}>
                    <div className="profile-drop-down" onClick={toggleProfileMenu}>
                        <img className="profile-image" src={Account_circle} alt="Profil" />
                    </div>
                    {isProfileMenuOpen && (
                        <div className="profile-menu show" id="profile-menu">
                            <div className="profile-action">
                                <img src={Settings} />
                                Paramètres
                            </div>
                            <div className="profile-action" onClick={handlelogout}>
                                <img src={logoutimage} />
                                Se déconnecter
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Topbar;
