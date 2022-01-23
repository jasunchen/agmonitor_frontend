// HomePage.js
// Engineer: Alex Mei

import React, { useState, useEffect } from 'react';

import Chart from "../utility/Chart";
import "../../css/Home.css";
import { withAuth0 } from '@auth0/auth0-react';

function HomePage (props) {
    // TODO: configure time
    const currentTime = 1635724800;
    const dayDelta = 86400;
    const hourDelta = 3600;

    const [state, setState] = useState({
        "dayProduced" : [],
        "dayConsumed" : [],
        "weekProduced" : [],
        "weekConsumed" : [],
        "peakStart" : 1000 * (currentTime - 8 * hourDelta),
        "peakEnd" : 1000 * (currentTime - 3 * hourDelta)
    });
    const [loading, setLoading] = useState(true);

    // TODO: determine userId
    const assetId = 1;

    // configure server URL
    let server = "http://localhost:8000"
    if (process.env.REACT_APP_REMOTE === "1") {
        server = "https://agmonitor-pina-colada-back.herokuapp.com"
    }

    useEffect(() => {
        // DAILY VIEW
        let requestUrl = `${server}/getAssetData?id=${assetId}&start=${currentTime - dayDelta}&end=${currentTime}&page=1`

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
        .catch((error) => console.log("Error: " + error))

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
                    setLoading(false);
                }
            })
            .catch((error) => console.log("Error: " + error))
        }

    }, [])

    if(loading){
        return <div>{props.auth0.user.email} </div>
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

export default withAuth0(HomePage);
