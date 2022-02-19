// SnapshotPage.js
// Engineer: Alex Mei

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Chart from "../utility/Chart";
import "../../css/Snapshot.css";
import { Tooltip } from 'antd';
import { withAuth0 } from '@auth0/auth0-react';
import DataGrid, {Row } from 'react-data-grid';

function SnapshotPage (props) {
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
    const currentTime = 1621036800; // for historical data
    const todayTime = 1643932800;
    const dayDelta = 86400;
    const hourDelta = 3600;
    const intervalDelta = 900;

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

    const [userInfo, setUserInfo] = useState({
        "exists": true,
        "pred_solar_generation" : [[]],
        "pred_good_time" : [],
        "pred_opt_threshold" : 100,
        "pred_should_charge" : false,
        "hours_of_power" : 0,
        "cost_or_shutoff" : 0,
        "low_limit" : 0,
        "max_limit" : 100,
        "alerts" : [],
        "utility" : [[]],
        "baseload" : [[]],
        "netUsage" : 0,
        "battery_size" : 0,
        "good_time_range" : "",
        "recommendation_message" : "No recommendedations",
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
            if (!data["max_limit"]) {
                setUserInfo({
                    ...userInfo,
                    "exists" : false
                })
            }
            else {
                let solar = [];
                let utility = [];
                let baseload = [];
                let goodtime = [];
                let netUsage = 0;
                let textDict = JSON.parse(data["text"]);

                data["pred_solar_generation"].replace("[", "").replace("]", "").split(", ").map((e, i) => {
                    solar.push([(todayTime + intervalDelta * i) * 1000, parseFloat(e)]);
                })
                
                data["utility"].replace("[", "").replace("]", "").split(", ").map((e, i) => {
                    utility.push([(todayTime + intervalDelta * i) * 1000, parseFloat(e)]);
                    netUsage += parseFloat(e);
                })

                data["pred_baseload"].replace("[", "").replace("]", "").split(", ").map((e, i) => {
                    baseload.push([(todayTime + intervalDelta * i) * 1000, parseFloat(e)]);
                })

                data["pred_good_time"].replace("[", "").replace("]", "").split(", ").map((e, i) => {
                    goodtime.push(parseFloat(e));
                })


                setUserInfo({
                    ...userInfo,
                    "pred_solar_generation" : solar,
                    "utility" : utility,
                    "netUsage" : netUsage / 192,
                    "baseload" : baseload,
                    "pred_good_time" : goodtime,
                    "pred_opt_threshold" : data["pred_opt_threshold"],
                    "pred_should_charge" : data["should_charge"],
                    "hours_of_power" : data["hours_of_power"],
                    "cost_or_shutoff" : data["cost_or_shutoff"],
                    "low_limit" : data["low_limit"],
                    "max_limit" : data["max_limit"],
                    "battery_size" : data["battery_size"],
                    "alerts" : textDict["alerts"],
                    "good_time_range" : textDict["goodTimesRange"],
                    "recommendation_message" : textDict["recommendationMessage"],
                })
            }
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

                    /*
                    data["data"].forEach(element => {
                        dayProduced.push([element["start_time"] * 1000, element["produced_energy"]])
                        dayConsumed.push([element["start_time"] * 1000, element["consumed_energy"]])
                    })
                    */

                    setState({
                        ...state,
                        "dayProduced" : dayProduced,
                        "dayConsumed" : dayConsumed,
                        "loading" : false,
                        "hasAsset" : true
                    })
                })
                

                // WEEKLY VIEW
                /*
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
                */
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

    function batteryHeight(x) {
        return 156 * 0.01 * x + "px";
    }

    function batteryMargin(x) {
        return (156 - 156 * 0.01 * x) + "px";
    }

    if(state["loading"]){
        return (
            <div className="overlay"> 
                <h1> Loading... </h1>
                <p> This might take a few moments... </p>
            </div>
        )
    }

    if(!userInfo["exists"] || !state["hasAsset"]){
        return <Redirect to="/asset" />
    }

    return (
        <div className="overlay">
            <div className="recommendations">
                <h1> Recommendations </h1>
                
                <div>

                <div className="home-card" onClick={thresholdExplanationClick}>
                    <img className="click-icon" src="/click-icon.png" alt="" />

                    { explanationState["threshold"] ?
                        <div>
                            <div className="recommendation-text">
                                We base our recommendation on the following: 
                            </div>

                            <div>
                                <div className="recommendation-type">
                                    Your predicted energy usage:
                                </div>
                                <li className="threshold-reason"> 
                                    <span className="threshold-label"> Predicted Net Usage: </span> 
                                        {Math.round(userInfo["netUsage"] * 100) / 100} kWH
                                </li>
                            </div>
                            <div>
                                <div className="recommendation-type">
                                    Your configured preferences:
                                </div>
                                    <li className="threshold-reason"> 
                                        <span className="threshold-label"> Accepted Battery Threshold: </span> 
                                        &nbsp;{userInfo["low_limit"]}% - {userInfo["max_limit"]}%  
                                    </li>
                                    <li className="threshold-reason"> 
                                        <span className="threshold-label"> Energy Optimization: </span> 
                                        {userInfo["cost_or_shutoff"] == 50 &&
                                            <span className="threshold-span"> &nbsp;Reducing cost and shutoff risk equally </span>
                                        }
                                        {userInfo["cost_or_shutoff"] < 50 &&
                                            <span className="threshold-span"> &nbsp;Reducing cost in favor of reducing shutoff risk </span>
                                        }
                                        {userInfo["cost_or_shutoff"] > 50 &&
                                            <span className="threshold-span"> &nbsp;Reducing shutoff risk in favor of cost </span>
                                        }
                                    </li>
                                    <li className="threshold-reason"> 
                                        <span className="threshold-label"> Backup Power Requested: </span> 
                                        &nbsp;{userInfo["hours_of_power"]} Hours
                                    </li>
                            </div>

                            <div>
                                <div className="recommendation-type">
                                    Predicted Shutoff Risk via Weather Alerts:
                                </div>
                            </div>
                            {userInfo["alerts"].length == 0 ? 
                                <li className="threshold-reason">
                                    Currently, there are no weather alerts so there is minimal shutoff risk. 
                                </li>
                            : 
                                <div>
                                    { userInfo["alerts"].map(alert => (
                                        <li className="threshold-reason"> 
                                            <span className="threshold-label"> {alert[0]}: </span> 
                                            &nbsp;{alert[1]} 
                                        </li>
                                    ))
                                    }
                                </div>
                            }
                        </div>
                        :
                        <div> 
                            <div className="battery-image">
                                <div className="battery-top" /> 
                                <div className="battery-bottom">
                                    <div className="battery-level" 
                                        style={{
                                            height: batteryHeight(userInfo["pred_opt_threshold"]),
                                            marginTop: batteryMargin(userInfo["pred_opt_threshold"])
                                            }} />
                                </div> 
                            </div>

                            <div className="snapshot-headers battery-text">
                                Today, you should set your {Math.round(userInfo["battery_size"] * 100) / 100} kWH Battery Threshold to
                                <span className="snapshot-head"> 
                                    &nbsp;{Math.round(userInfo["pred_opt_threshold"] * 100) / 100}% 
                                </span> 
                                &nbsp;({Math.round(userInfo["pred_opt_threshold"] * userInfo["battery_size"]) / 100} kWH)
                                .
                            </div>
                        </div>
                    }
                    </div>

                    <div className="home-card" onClick={chargeExplanationClick}>
                        <img className="click-icon" src="/click-icon.png" alt="" />

                        { explanationState["charge"] ? 
                            <div className="explanation-chart">
                                <Chart
                                    title="Energy Predictions"
                                    dateformat="%H:%M"
                                    series={[
                                        {
                                            name: 'Solar Generation',
                                            data: userInfo["pred_solar_generation"].slice(0, 96),
                                            color: "#00B8A9"
                                        },
                                        {
                                            name: 'Base Load Usage',
                                            data: userInfo["baseload"].slice(0, 96),
                                            color: "#F6416C"
                                        },
                                        {
                                            name: 'Utility Usage',
                                            data: userInfo["utility"].slice(0, 96),
                                            color: "#FFDE7D"
                                        },
                                    ]}
                                />
                            </div>
                        :
                        <div>
                            <div className="snapshot-headers"> 
                                {userInfo["pred_should_charge"] ? "You should use your flexible loads tomorrow. " : "You should avoid using your flexible loads tomorrow. "}
                                The best times for you to charge tomorrow are from 
                                <span className="snapshot-head"> 
                                    &nbsp;{userInfo["good_time_range"]}
                                </span> 
                                .
                            </div>
                            <div className="good-time">
                                {userInfo["pred_good_time"].map((e, i) => 
                                    <Tooltip 
                                        title={
                                            <span> {Math.floor(i / 4) < 10 && "0"}{Math.floor(i / 4)} : 
                                                   {15 * (i % 4) < 10 && "0"}{15 * (i % 4)}
                                             </span>
                                        }
                                        className={
                                            e > 0.8 ? 'time-block a' : 
                                            e > 0.6 ? 'time-block b' : 
                                            e > 0.4 ? 'time-block c' : 
                                            e > 0.2 ? 'time-block d' : 
                                            'time-block e'
                                        }
                                        placement='right'
                                    />
                                )}
                            </div>
                            <div className="time-labels">
                                <div className="time-label">
                                    00:00
                                </div>
                                <div className="time-label">
                                    06:00
                                </div>
                                <div className="time-label">
                                    12:00
                                </div>
                                <div className="time-label">
                                    18:00
                                </div>
                            </div>
                            <div className="key-labels">
                                <div className="key-label">
                                    Worst Time
                                </div>   
                                <div className="key-label-color e" />   
                                <div className="key-label-color d" />   
                                <div className="key-label-color c" />  
                                <div className="key-label-color b" />  
                                <div className="key-label-color a" />  
                                <div className="key-label"  
                                    style={{
                                        textAlign: 'right'
                                    }}
                                >
                                    Best Time
                                </div>   
                            </div>
                        </div>
                            
                        }
                    </div>

                </div>
            </div>

            {/*
            <h1> Energy Snapshot </h1>

            <div className="row">
                <div className="summary-chart">
                    <Chart
                        title="Daily Snapshot"
                        dateformat='%b %d %H:%M'
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
                        dateformat='%b %d %H:%M'
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

            */}
        </div>

    );
};

export default withAuth0(SnapshotPage);