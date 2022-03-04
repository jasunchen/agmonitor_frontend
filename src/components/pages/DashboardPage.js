import React from 'react';
import Navbar from "../shared/Navbar";
import './dashboard.css'
import Footer from "../shared/Footer"
import CollapsiblePanel from "./CollapsiblePanel";
import DashboardAssets from "./DashboardAssets"


function DashboardPage (props) {
    

    return (
        
        <div className = "overlay">   
        <h1>Assets</h1>
            <div className = "battery"> 
            </div>
        
        <h1>Variable Control</h1>
        

    
        <DashboardAssets />


        </div>
        
        
        
    );
};

export default DashboardPage;