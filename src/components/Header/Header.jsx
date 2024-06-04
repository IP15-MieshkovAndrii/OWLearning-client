import React from "react";
import "./Header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../Auth/Auth";
import { useSelector } from "react-redux";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    let user = useSelector(state => state.auth.user);
    const imageUser = JSON.parse(sessionStorage.getItem("user"))?.avatar || '/user.png'

    const togglePopup = () => {
        document.querySelector('.auth').style.display = 'flex';
    };

    const profileButton = () => {
        navigate('/profile')
    }

    return (
        <header className="header flex-container">
            <div className="header-left">
                <span className="logo">OWLearning</span>
            </div>
            <nav className="header-right">
                <ul className="navbar-lists">
                    <li className={path === "/" ? "active" : ""}><a href="/">Home</a></li>
                    <li className={path === "/courses" ? "active" : ""}><a href="/courses">Courses</a></li>
                    <li className={path === "/about" ? "active" : ""}><a href="/about">About</a></li>
                </ul>
                {user ? (
                    <div className="user" onClick={profileButton}>
                        <img className="mail"
                            src={imageUser}
                            loading="lazy" 
                            alt={'User'} 
                        /> 
                    </div>
                ) : (
                    <div className="avatar" onClick={togglePopup}>
                        <svg viewBox="0 0 1024 1024" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill="#000000" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0z"></path>
                            </g>
                        </svg>
                    </div>
                )}
            </nav>
                <Auth/>
        </header>
    );
};

export default Header;
