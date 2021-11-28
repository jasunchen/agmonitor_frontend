// HomePage.js
// Engineer: Alex Mei

import React from 'react';
import "../../css/Home.css"
import Chart from "../utility/Chart";

function HomePage (props) {
    return (
        <div className = "overlay"> 

            <h1> Home Page </h1>

            <div className="row">
                <div className="summary-chart">
                    <Chart title="Aggregate 1" data={[[1638079060000, 1], [1638079070000, 4], [1638079080000, 9]]}/>
                </div>
                
                <div className="summary-chart">
                    <Chart title="Aggregate 2" data={[[1638077080000, 1], [1638078080000, 4], [1638079080000, 9]]}/>
                </div>                
            </div>

            <h1> Recommendations </h1>

            <div>
                <ul>
                    <li> Increase usage during the following hours: 12 - 2 PM. </li>
                    <li> Reduce usage during the following hours: 5 - 9 PM. </li>   
                </ul>
            </div>
        </div>
        
    );
};

export default HomePage;