import React from "react";
import "./Home.scss"; 

const Home = () => {
    return (
        <div className="home flex-container">
            <div className="content-container">
                <img src="/owl.jpeg" alt="Owl" className="owl-image" />
            </div>
            <div className="content-container">
                <div className="text-container">
                    <h1>Improve Your Online Learning Experience Better Instantly</h1>
                    <p>Find the perfect course for you!</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
