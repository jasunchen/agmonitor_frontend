import React, { useState, useEffect } from 'react';
import '../../css/Explore.css';
import StockChart from "../utility/StockChart";
import DataGrid, {Row } from 'react-data-grid';

function ExploreDataPage (props) {
    const columns = [
        { key: 'time', name: 'Time' },
        { key: 'produced', name: 'Produced (kWH)' },
        { key: 'consumed', name: 'Consumed (kWH)' }
    ];
      
    const initialRows = [
        { time: "05/22/2021 00:00", produced: 0, consumed: 0.12},
        { time: "05/22/2021 01:00", produced: 0, consumed: 0.11},
        { time: "05/22/2021 02:00", produced: 0, consumed: 0.12},
        { time: "05/22/2021 03:00", produced: 0.08, consumed: 0},
        { time: "05/22/2021 04:00", produced: 0.47, consumed: 0},
        { time: "05/22/2021 05:00", produced: 0.82, consumed: 0},
        { time: "05/22/2021 06:00", produced: 0, consumed: 0.12},
        { time: "05/22/2021 07:00", produced: 0, consumed: 0.11},
        { time: "05/22/2021 08:00", produced: 0, consumed: 0.12},
        { time: "05/22/2021 09:00", produced: 0.08, consumed: 0},
        { time: "05/22/2021 10:00", produced: 0.47, consumed: 0},
        { time: "05/22/2021 11:00", produced: 0.82, consumed: 0},
    ];

    const [rows, setRows] = useState(initialRows);


    function rowKeyGetter(row) {
        return row.id;
    }

    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    
    // TODO: determine userId
    const userId = 3;

    // TODO: configure time
    const currentTime = 1609578000;
    
    // configure server URL
    let server = "http://0.0.0.0:8000"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://agmonitor-pina-colada-back.herokuapp.com"
    }
    
    useEffect(() => {     
        // DAILY VIEW
        let requestUrl = `${server}/getAssetData?id=${userId}&start=0&end=${currentTime}`

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

            data.forEach(element => {
                produced.push([element["start_time"] * 1000, element["produced_energy"]])
                consumed.push([element["start_time"] * 1000, element["consumed_energy"]])
            })

            setState({
                ...state,
                "produced" : produced,
                "consumed" : consumed,
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
            <h1> Explore Data Page </h1>
            <div className="row">
                <div className="explore-datagrid">
                    <DataGrid 
                        columns={columns} 
                        rows={rows} 
                        rowKeyGetter={rowKeyGetter}
                        onRowsChange={setRows}
                    />
                </div>
            </div>
            <div className="row">
                <div className="explore-chart">
                <StockChart title="Explore" produced={state["produced"]} consumed={state["consumed"]}/>
                </div>
            </div>
        </div>

    );
};

export default ExploreDataPage;