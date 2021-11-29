// SummaryHomePage.js
// Engineer: Alex Mei

import React from 'react';
import './background.css'
import Chart from "../utility/Chart";

function HomePage (props) {
    return (
        <div className = "overlay"> 

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
        </div>
        
    );
};

export default HomePage;