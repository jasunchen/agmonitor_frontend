import React from 'react';
import Navbar from "../NavBar/Navbar"
import './background.css'
import Footer from "../NavBar/footer"

function AboutPage (props) {

    return (
        <div className = "overlay">   
            <Navbar /> About Page
            <Footer />
        </div>

    );
};

export default AboutPage;