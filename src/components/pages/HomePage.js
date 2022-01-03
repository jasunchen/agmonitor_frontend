// HomePage.js
// Engineer: Alex Mei

import React, { useState, useEffect } from 'react';

import Chart from "../utility/Chart";
import "../../css/Home.css";

function HomePage (props) {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);

    // TODO: determine userId
    const userId = 3;

    // TODO: configure time
    const currentTime = 1609578000;
    const dayDelta = 86400;
    const hourDelta = 3600;

    // configure server URL
    let server = "http://0.0.0.0:8000"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://agmonitor-pina-colada-back.herokuapp.com"
    }

    useEffect(() => {     
        // DAILY VIEW
        let requestUrl = `${server}/getAssetData?id=${userId}&start=${currentTime - dayDelta}&end=${currentTime}`

        fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            let dayProduced = [];
            let dayConsumed = [];

            data.forEach(element => {
                dayProduced.push([element["start_time"] * 1000, element["produced_energy"]])
                dayConsumed.push([element["start_time"] * 1000, element["consumed_energy"]])
            })

            setState({
                ...state,
                "dayProduced" : dayProduced,
                "dayConsumed" : dayConsumed,
                "peakStart" : 1000 * (currentTime - 8 * hourDelta),
                "peakEnd" : 1000 * (currentTime - 3 * hourDelta)
            })
        })
        .catch((error) => console.log("Error: " + error))

        // WEEKLY VIEW
        requestUrl = `${server}/getAssetData?id=${userId}&start=${currentTime - 7 * dayDelta}&end=${currentTime}`
        
        fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            let weekProduced = [];
            let weekConsumed = [];

            data.forEach(element => {
                weekProduced.push([element["start_time"] * 1000, element["produced_energy"]])
                weekConsumed.push([element["start_time"] * 1000, element["consumed_energy"]])
            })

            setState({
                ...state,
                "weekProduced" : weekProduced,
                "weekConsumed" : weekConsumed,
            })
            setLoading(false)
        })
        .catch((error) => console.log("Error: " + error))
    }, [])

    if(loading){
        return <div> Loading... </div>
    }
    
    return (
        <div className = "overlay"> 

            <h1> Home Page </h1>

            <div className="row">
                <div className="summary-chart">
                    <Chart 
                        title="Daily Snapshot" 
                        produced={state["dayProduced"]} 
                        consumed={state["dayConsumed"]} 
                        plotBands={{
                            from: state["peakStart"],
                            to: state["peakEnd"],
                            color: "#FFDE7D",
                            label: "Peak Hours"
                        }}/>
                </div>
                
                <div className="summary-chart">
                    <Chart
                        title="Weekly Snapshot" 
                        produced={state["weekProduced"]} 
                        consumed={state["weekConsumed"]} />
                </div>                
            </div>

            <h1> Energy Schedule </h1>
            
            <div>
                Placeholder
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