// HomePage.js
// Engineer: Alex Mei

import React, { useState, useEffect } from 'react';

import Chart from "../utility/Chart";
import "../../css/Home.css";
import { withAuth0 } from '@auth0/auth0-react';
import DataGrid, {Row } from 'react-data-grid';

function HomePage (props) {
    const [explanationState, setExplanationState] = useState({
        "charge" : false,
        "threshold" : false,
    });

    function chargeExplanationClick(){
        setExplanationState({
            ...explanationState,
            "charge" : !explanationState["charge"]
        });
    }
    
    function thresholdExplanationClick(){
        setExplanationState({
            ...explanationState,
            "threshold" : !explanationState["threshold"]
        });
    }
    

    let email = props.auth0.user.email;

    // TODO: configure time
    const currentTime = 1635724800;
    const dayDelta = 86400;
    const hourDelta = 3600;

    const [state, setState] = useState({
        "hasAsset": false,
        "loading": true,
        "dayProduced" : [],
        "dayConsumed" : [],
        "weekProduced" : [],
        "weekConsumed" : [],
        "peakStart" : 1000 * (currentTime - 8 * hourDelta),
        "peakEnd" : 1000 * (currentTime - 3 * hourDelta),
    });

    // TODO
    const [userInfo, setUserInfo] = useState({
        "pred_solar_generation" : 100,
        "pred_opt_threshold" : 100,
        "pred_should_charge" : false,
        "alerts" : [['Advisory', 'High Surf Advisory issued January 26 at 11:45AM PST until January 26 at 8:00PM PST by NWS Los Angeles/Oxnard CA'], ['Advisory', 'High Surf Advisory issued January 26 at 2:58AM PST until January 26 at 8:00PM PST by NWS Los Angeles/Oxnard CA'], ['Advisory', 'High Surf Advisory issued January 24 at 8:04PM PST until January 26 at 8:00PM PST by NWS Los Angeles/Oxnard CA']]
    })

    // configure server URL
    let server = "http://localhost:8000"
    if (process.env.REACT_APP_REMOTE === "1") {
        server = "https://agmonitor-pina-colada-back.herokuapp.com"
    }

    useEffect(() => {
        // AI OUTPUT
        let requestUrl = `${server}/getUser?email=${email}`
  
        fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            console.log(data);
            setUserInfo({
                ...userInfo,
                "pred_solar_generation" : data["pred_opt_threshold"],
                "pred_opt_threshold" : data["pred_solar_generation"],
                "pred_should_charge" : data["should_charge"],
            })
        })
        .catch((error) => console.log("Error: " + error))


        // GET GENERATION ASSET
        requestUrl = `${server}/getAllAssets?email=${email}`

        fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            if(data["generation"].length !== 0){
                const assetId = data["generation"][0]["id"];
                 // DAILY VIEW
                requestUrl = `${server}/getAssetData?id=${assetId}&start=${currentTime - dayDelta}&end=${currentTime}&page=1`

                fetch(requestUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => response.json())
                .then(data => {
                    let dayProduced = state["dayProduced"];
                    let dayConsumed = state["dayConsumed"];

                    data["data"].forEach(element => {
                        dayProduced.push([element["start_time"] * 1000, element["produced_energy"]])
                        dayConsumed.push([element["start_time"] * 1000, element["consumed_energy"]])
                    })

                    setState({
                        ...state,
                        "dayProduced" : dayProduced,
                        "dayConsumed" : dayConsumed
                    })
                })
                

                // WEEKLY VIEW
                let hasNext = true;
                for(let page = 1; page <= 8; page += 1){
                    requestUrl = `${server}/getAssetData?id=${assetId}&start=${currentTime - 7 * dayDelta}&end=${currentTime}&page=${page}`

                    fetch(requestUrl, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    })
                    .then(response => response.json())
                    .then(data => {
                        let weekProduced = state["weekProduced"];
                        let weekConsumed = state["weekConsumed"];

                        data["data"].forEach(element => {
                            weekProduced.push([element["start_time"] * 1000, element["produced_energy"]])
                            weekConsumed.push([element["start_time"] * 1000, element["consumed_energy"]])
                        })

                        weekProduced = weekProduced.sort(function(a, b) {
                            if (a[0] == b[0]) {
                            return a[1] - b[1];
                            }
                            return b[0] - a[0];
                        });

                        weekConsumed = weekConsumed.sort(function(a, b) {
                            return a[0] - b[0];
                        });

                        setState({
                            ...state,
                            "weekProduced" : weekProduced,
                            "weekConsumed" : weekConsumed,
                        })

                        if(data["has_next"] == false){
                            hasNext = false;
                            setState({
                                ...state,
                                "loading" : false,
                                "hasAsset" : true
                            })
                        }
                    })
                    .catch((error) => {
                        setState({
                            ...state,
                            "loading" : false
                        })
                        console.log("Error: " + error)
                    })
                }
            }
            else{
                setState({
                    ...state,
                    "loading": false
                })
            }
        })
        .catch((error) => console.log("Error: " + error))
    }, []);
    
    function calculateColor(x){
        if(x === true){
            return "#00B8A9";
        }

        return "#F6416C";
    }
    

    if(state["loading"]){
        return (
            <div className="overlay"> 
                <h1> Loading... </h1>
                <p> This might take a few minutes... </p>
            </div>
        )
    }

    if(!state["hasAsset"]){
        return (
            <div className="overlay"> 
                <h1> An error has occurred! Did you create an asset yet? </h1>
            </div>
        )
    }

    const columns = [
        { key: 'pred_solar_generation', name: 'Predicted Solar Generation' },
    ];

    return (
        <div className="overlay">
            <div className="recommendations">

            
                <h1> Recommendations </h1>
                
                <div className="snapshot-headers"> 
                    Today, you 
                    <span className="snapshot-head" style={{color: calculateColor(userInfo["pred_should_charge"])}}> 
                        {userInfo["pred_should_charge"] ? " Should " : " Should Not "} 
                    </span> 
                    charge your flexible assets. 
                    <span className="snapshot-explanation" onClick={chargeExplanationClick}>
                        { explanationState["charge"] ? " (Click to Hide Explanation)" : " (Click to See Explanation)" }
                    </span>
                </div>

                { explanationState["charge"] &&
                    <div className="row">
                        <div className="summary-chart">
                            <Chart
                                title="Energy Predictions"
                                series={[
                                    {
                                        name: 'Solar Generation',
                                        data: state["dayProduced"],
                                        color: "#00B8A9"
                                    },
                                    {
                                        name: 'Base Load Usage',
                                        data: state["dayConsumed"],
                                        color: "#F6416C"
                                    },
                                    {
                                        name: 'Utility Usage',
                                        data: state["dayProduced"],
                                        color: "#FFDE7D"
                                    },
                                ]}
                            />
                        </div>
                    </div>
                }

                <div className="snapshot-headers"> 
                    Today, you should set your Tesla Battery Threshold to
                    <span className="snapshot-head" style={{color: '#00B8A9'}}> 
                        &nbsp;{userInfo["pred_opt_threshold"]}%
                    </span> 
                    .
                    <span className="snapshot-explanation" onClick={thresholdExplanationClick}>
                        { explanationState["threshold"] ? " (Click to Hide Explanation)" : " (Click to See Explanation)" }
                    </span>
                </div>

                { explanationState["threshold"] &&
                    <div>
                        {userInfo["alerts"].length == 0 ? 
                            <div>
                                The threshold above was recommended because there were no weather alerts. 
                            </div>
                        : 
                            <div>
                                The threshold above was recommended due to the following alerts: 
                                { userInfo["alerts"].map(alert => (
                                    <li> <span className="alert-type"> {alert[0]}:</span> {alert[1]} </li>
                                ))
                                }
                            </div>
                        }
                    </div>
                }
            </div>

            <h1> Energy Snapshot </h1>

            <div className="row">
                <div className="summary-chart">
                    <Chart
                        title="Daily Snapshot"
                        series={[
                            {
                                name: 'Energy Produced',
                                data: state["dayProduced"],
                                color: "#00B8A9"
                            },
                            {
                                name: 'Energy Consumed',
                                data: state["dayConsumed"],
                                color: "#F6416C"
                            }
                        ]}
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
                        series={[
                            {
                                name: 'Energy Produced',
                                data: state["weekProduced"],
                                color: "#00B8A9"
                            },
                            {
                                name: 'Energy Consumed',
                                data: state["weekConsumed"],
                                color: "#F6416C"
                            }
                        ]}
                    />
                </div>
            </div>
        </div>

    );
};

export default withAuth0(HomePage);
