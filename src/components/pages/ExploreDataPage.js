import React from 'react';
import Navbar from "../shared/Navbar"
import './background.css'
import Footer from "../shared/Footer"
import Chart from "../utility/Chart";

function ExploreDataPage (props) {

    return (
        <div className = "overlay">   
            <Navbar /> 
            
            <h1> Explore Data Page </h1>

            <div className="row">
                <div className="summary-chart">
                    <Chart />
                </div>
            </div>

            <Footer />
        </div>

    );
};

export default ExploreDataPage;