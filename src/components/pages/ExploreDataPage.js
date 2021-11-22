import React from 'react';
import Navbar from "../NavBar/Navbar"
import './background.css'
import Footer from "../NavBar/footer"

function ExploreDataPage (props) {

    return (
        <div className = "overlay">   
            <Navbar /> Explore Data Page
            <Footer />
        </div>

    );
};

export default ExploreDataPage;