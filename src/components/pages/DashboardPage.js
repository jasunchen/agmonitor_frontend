import React from 'react';
import Navbar from "../NavBar/Navbar";
import './background.css'
import Footer from "../NavBar/footer"


function DashboardPage (props) {

    return (
        <div className = "overlay">   
            <Navbar /> Dashboard Page
            <Footer />
        </div>
    );
};

export default DashboardPage;