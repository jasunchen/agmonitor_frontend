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

    const produced7 = [
        [1579395661000, 0.5],
        [1609462861000, 1], 
        [1612141261000, 1.1],
        [1610067661000, 1.2],
        [1610413261000, 1.5],
        [1611018061000, 1.8],
        [1612141261000, 2],
        [1614560461000, 3],
        [1617238861000, 4],
        [1619830861000, 5],
        [1622509261000, 6],
        [1625101261000, 7],
        [1627779661000, 8],
        [1630458061000, 9],
        [1633050061000, 10],
        [1635728461000, 11],
        [1638320461000, 12],
    ];

    const consumed7 = [
        [1609462861000, 1], 
        [1612141261000, 2],
        [1614560461000, 3],
        [1617238861000, 4],
        [1619830861000, 5],
        [1622509261000, 6],
        [1625101261000, 7],
        [1627779661000, 8],
        [1630458061000, 9],
        [1633050061000, 10],
        [1635728461000, 11],
        [1638320461000, 12],
    ];

    const [rows, setRows] = useState(initialRows);


    function rowKeyGetter(row) {
        return row.id;
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
                <StockChart title="Explore"  produced={produced7} consumed={consumed7}/>
                </div>
            </div>
        </div>

    );
};

export default ExploreDataPage;