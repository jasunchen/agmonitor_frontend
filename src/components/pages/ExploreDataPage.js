import React, { useState, useEffect } from 'react';
import '../../css/Explore.css';
import StockChart from "../utility/StockChart";
import Chart from "../utility/Chart";
import DataGrid, {Row } from 'react-data-grid';
import { withAuth0 } from '@auth0/auth0-react';

function ExploreDataPage (props) {
    const email = props.auth0.user.email;
    const dayDelta = 86400;

    const [state, setState] = useState({
        "loading": true,
        "hasAsset": false,
        "produced": [],
        "consumed": [],
        "rows" : [],
    });

    const [currentTime, setTime] = useState(1635638400);
    const [searchValue, setSearchValue] = useState(null);

    const columns = [
        { key: 'time', name: 'Time' },
        { key: 'produced', name: 'Produced (kWH)' },
        { key: 'consumed', name: 'Consumed (kWH)' }
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
            if(data["generation"].length !== 0){
                const assetId = data["generation"][0]["id"];
                // DAILY VIEW
                requestUrl = `${server}/getAssetData?id=${assetId}&start=${currentTime}&end=${currentTime + dayDelta}&page=1`

                fetch(requestUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },              
                })
                .then(response => response.json()) 
                .then(data => {
                    let produced = [];
                    let consumed = [];
                    let rows = [];

                    data["data"].forEach(element => {
                        produced.push([element["start_time"] * 1000, element["produced_energy"]])
                        consumed.push([element["start_time"] * 1000, element["consumed_energy"]])
                        rows.push({
                            "time": new Date(element["start_time"] * 1000).toUTCString().replace("GMT", ""),
                            "produced": element["produced_energy"], 
                            "consumed": element["consumed_energy"]
                        })
                    })

                    setState({
                        ...state,
                        "produced" : produced,
                        "consumed" : consumed,
                        "rows": rows,
                        "loading" : false,
                        "hasAsset": true,
                    })
                })
                .catch((error) => console.log("Error: " + error))
            }
            else{
                setState({
                    ...state,
                    "loading": false
                })
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
        return (
            <div className="overlay"> 
                <h1> An error has occurred! Did you create an asset yet? </h1>
            </div>
        )
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
                    series={[
                        {
                            name: 'Energy Produced',
                            data: state["produced"],
                            color: "#00B8A9"
                        },
                        {
                            name: 'Energy Consumed',
                            data: state["consumed"],
                            color: "#F6416C"
                        }
                    ]}
                />
                </div>
            </div>
        </div>

    );
};

export default withAuth0(ExploreDataPage);