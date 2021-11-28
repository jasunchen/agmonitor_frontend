import React from 'react';
import Navbar from "../shared/Navbar";
import './dashboard.css'
import Footer from "../shared/Footer"
import CollapsiblePanel from "./CollapsiblePanel";


function DashboardPage (props) {
    

    return (
        
        <div className = "overlay">   
            <Navbar />
        <h1>Assets</h1>
            <div className = "battery"> 
            </div>
        
        <h1>Variable Control</h1>


        <div className="App container my-2">
 
            <CollapsiblePanel title="Tesla" collapse={false}>
                <span>Settings for Tesla</span>
            </CollapsiblePanel>
            <CollapsiblePanel title="Pump" collapse={false}>
                <span>Settings for Pump</span>
            </CollapsiblePanel>
            <CollapsiblePanel title="AC" collapse={false}>
                <span>Settings for AC</span>
            </CollapsiblePanel>
        </div>

            <Footer />
        </div>
        
        
        
    );
};

export default DashboardPage;