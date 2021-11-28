import React from 'react';
import Navbar from "../shared/Navbar"
import '../../css/Explore.css'
import Footer from "../shared/Footer"
import Chart from "../utility/Chart";

function ExploreDataPage (props) {

    return (
        <div className = "overlay">               
            <h1> Explore Data Page </h1>
            <div className="row">
                <div className="explore-chart">
                <Chart title="Explore" data={[[1638077080000, 1], [1638078080000, 4], [1638079080000, 9]]}/>
                </div>
            </div>
        </div>

    );
};

export default ExploreDataPage;