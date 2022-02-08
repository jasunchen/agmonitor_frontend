import React, { useState, useEffect } from 'react';
import '../../css/Explore.css';
import StockChart from "../utility/StockChart";
import Chart from "../utility/Chart";
import DataGrid, {Row } from 'react-data-grid';
import { Redirect } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';

function ExplorePage (props) {
    const email = props.auth0.user.email;
    const dayDelta = 86400;

    const [state, setState] = useState({
        "loading": true,
        "hasAsset": false,
        "base": [],
        "flexible": [],
        "generation": [],
        "rows" : [],
    });

    const [currentTime, setTime] = useState(1620950400);
    const [searchValue, setSearchValue] = useState(null);

    const columns = [
        { key: 'time', name: 'Time' },
        { key: 'produced', name: 'Energy Produced (kWH)' },
        { key: 'consumed-base', name: 'Energy Consumed (Base) (kWH)' },
        { key: 'consumed-flexible', name: 'Energy Consumed (Flexible) (kWH)' }
    ];

    function rowKeyGetter(row) {
        return row.id;
    }
    
    function onSearchChange(e) {
        setSearchValue(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        
        let t = new Date(searchValue).getTime();
        if (isNaN(t)) {
            alert("Invalid input!")
        }
        else {
            setTime(t / 1000);
        }
    }
    // configure server URL
    let server = "http://localhost:8000"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://agmonitor-pina-colada-back.herokuapp.com"
    }
    
    useEffect(() => {     
        // GET GENERATION ASSET
        let requestUrl = `${server}/getAllAssets?email=${email}`

        fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data["generation"].length + data["base"].length + data["flexible"].length == 0) {
                setState({
                    ...state,
                    "loading": false
                })
            }
            else {
                let assetIds = [];
                data["base"].map(asset => assetIds.push(asset["id"]));
                data["flexible"].map(asset => assetIds.push(asset["id"]));
                data["generation"].map(asset => assetIds.push(asset["id"]));
                
                // DAILY VIEW
                requestUrl = `${server}/getAssetData?id=${assetIds}&start=${currentTime}&end=${currentTime + dayDelta}&page=1`

                fetch(requestUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },              
                })
                .then(response => response.json()) 
                .then(data => {
                    let base = [];
                    let flexible = [];
                    let generation = [];
                    let rows = [];

                    console.log("Hello World");
                    for(let i = 0; i < 96; ++i) {
                        rows.push({
                            "time": 0,
                            "produced": 0, 
                            "consumed-base" : 0,
                            "consumed-flexible" : 0
                        })
                    }



                    data.forEach(element => {
                        if (element["type"] == "generation") {
                            element["data"].forEach((e, i) => {
                                generation.push([e["start_time"] * 1000, e["produced_energy"]]);
                                rows[i]["time"] = new Date(e["start_time"] * 1000).toUTCString().replace("GMT", "");
                                rows[i]["produced"] = e["produced_energy"];
                            })
                        }
                        else if (element["type"] == "flexible") {
                            element["data"].forEach((e, i) => {
                                flexible.push([e["start_time"] * 1000, e["consumed_energy"]]);
                                rows[i]["time"] = new Date(e["start_time"] * 1000).toUTCString().replace("GMT", "");
                                rows[i]["consumed-flexible"] = e["consumed_energy"];
                            })
                        }
                        else {
                            element["data"].forEach((e, i) => {
                                base.push([e["start_time"] * 1000, e["consumed_energy"]]);
                                rows[i]["time"] = new Date(e["start_time"] * 1000).toUTCString().replace("GMT", "");
                                rows[i]["consumed-base"] = e["consumed_energy"];
                            })
                        }
                    })

                    console.log(rows);

                    setState({
                        ...state,
                        "base" : base,
                        "flexible" : flexible,
                        "generation" : generation,
                        "rows": rows,
                        "loading" : false,
                        "hasAsset": true,
                    })
                })
                .catch((error) => console.log("Error: " + error))
            }
        })
        .catch((error) => console.log("Error: " + error))
    }, [currentTime])

    if(state["loading"]){
        return (
            <div className="overlay"> 
                <h1> Loading... </h1>
                <p> This might take a few moments... </p>
            </div>
        )
    }

    if(!state["hasAsset"]){
        return <Redirect to="/asset" />
    }
    

    return (
        <div className = "overlay">               
            <h1> Explore Data Page </h1>

            <div className="date-block">
                <div className="date-title"> Enter Date: </div>
                <form className="date-choice" onSubmit={handleSubmit}>
                <input placeholder="mm/dd/yyyy" value={searchValue} onChange={onSearchChange}/>
                </form>
            </div>

            <h1> Raw Data </h1>

            <div className="row">
                <div className="explore-datagrid">
                    <DataGrid 
                        columns={columns} 
                        rows={state["rows"]} 
                        rowKeyGetter={rowKeyGetter}
                    />
                </div>
            </div>

            <div className="row">
                <div className="explore-chart">
                <Chart 
                    title="Visualization" 
                    dateformat='%b %d %H:%M'
                    series={[
                        {
                            name: 'Energy Produced',
                            data: state["generation"],
                            color: "#00B8A9"
                        },
                        {
                            name: 'Energy Consumed (Base)',
                            data: state["base"],
                            color: "#F6416C"
                        },
                        {
                            name: 'Energy Consumed (Flexible)',
                            data: state["flexible"],
                            color: "#FFDE7D"
                        }
                    ]}
                />
                </div>
            </div>
        </div>

    );
};

export default withAuth0(ExplorePage);