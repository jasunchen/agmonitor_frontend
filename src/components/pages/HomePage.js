// SummaryHomePage.js
// Engineer: Alex Mei

import React from 'react';
import Navbar from "../shared/Navbar"
import Footer from "../shared/Footer"
import './background.css'
import Chart from "../utility/Chart";

function HomePage (props) {
    return (
        <div className = "overlay"> 
            <Navbar /> 

            <h1> Home Page </h1>

            <div className="row">
                <div className="summary-chart">
                    <Chart />
                </div>
                
                <div className="summary-chart">
                    <Chart />
                </div>                
            </div>

            <h1> Recommendations </h1>

            <div>
                Content
            </div>
            <Footer />
        </div>
        
    );
};

export default HomePage;