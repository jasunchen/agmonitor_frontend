// DefaultHomePage.js
// Engineer: Alex Mei

import React from 'react';
import Navbar from "../NavBar/Navbar"
import Footer from "../NavBar/footer"
import './background.css'

function HomePage (props) {

    return (
        <div className = "overlay"> 
            <Navbar /> Home Page
            <Footer />
        </div>
        
    );
};

export default HomePage;