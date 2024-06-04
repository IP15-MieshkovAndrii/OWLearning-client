import React from "react";
import "./Footer.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authActions";



const Footer = () => {
    const dispatch = useDispatch();
    const logoutButton = async(event) => {
        event.preventDefault();
        
        try {
            dispatch(logout());
            console.log("User logged out successfully");
  
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <footer className="footer flex-container">
            <div className="content-container">
                <p><a href="/about">About</a></p>
                <p><a href="/about">Privacy</a></p>
                <p className="logout" onClick={logoutButton}>Log out</p>
            </div>
            <div className="right content-container"
                onClick={() => window.location.href = 'mailto:andrey2004112@gmail.com'}>
                <img className="mail"
                src="/mail.png"
                loading="lazy" 
                alt={'Mail'} 
                /> 
            </div>

        </footer>
    );
};

export default Footer;
