import React from 'react';
import Navbar from "../shared/Navbar"
import './background.css'
import Footer from "../shared/Footer"

function ExploreDataPage (props) {

    return (
        <div className = "overlay">   
            <Navbar /> Explore Data Page
            <Footer />
        </div>

    );
};

export default ExploreDataPage;