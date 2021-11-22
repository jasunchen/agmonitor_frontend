import React from 'react';
import Navbar from "../shared/Navbar"
import './background.css'
import Footer from "../shared/Footer"

function AboutPage (props) {

    return (
        <div className = "overlay">   
            <Navbar /> About Page
            <Footer />
        </div>

    );
};

export default AboutPage;