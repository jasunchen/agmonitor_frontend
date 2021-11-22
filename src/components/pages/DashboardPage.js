import React from 'react';
import Navbar from "../shared/Navbar";
import './background.css'
import Footer from "../shared/Footer"


function DashboardPage (props) {

    return (
        <div className = "overlay">   
            <Navbar /> Dashboard Page
            <Footer />
        </div>
    );
};

export default DashboardPage;