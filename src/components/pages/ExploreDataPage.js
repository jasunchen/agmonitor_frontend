import React from 'react';
import '../../css/Explore.css'
import Chart from "../utility/Chart";
import DataGrid from 'react-data-grid';

function ExploreDataPage (props) {
    const columns = [
        { key: 'time', name: 'Time' },
        { key: 'produced', name: 'Produced (kWH)' },
        { key: 'consumed', name: 'Consumed (kWH)' }
      ];
      
      const rows = [
        { time: "03/22/2021 11:00", produced: 0, consumed: 0.12},
        { time: "03/22/2021 11:00", produced: 0, consumed: 0.11},
        { time: "03/22/2021 07:00", produced: 0, consumed: 0.12},
        { time: "03/22/2021 08:00", produced: 0.08, consumed: 0},
        { time: "03/22/2021 09:00", produced: 0.47, consumed: 0},
        { time: "03/22/2021 10:00", produced: 0.82, consumed: 0},
        { time: "03/22/2021 11:00", produced: 0, consumed: 0.12},
        { time: "03/22/2021 11:00", produced: 0, consumed: 0.11},
        { time: "03/22/2021 07:00", produced: 0, consumed: 0.12},
        { time: "03/22/2021 08:00", produced: 0.08, consumed: 0},
        { time: "03/22/2021 09:00", produced: 0.47, consumed: 0},
        { time: "03/22/2021 10:00", produced: 0.82, consumed: 0},
      ];

    return (
        <div className = "overlay">               
            <h1> Explore Data Page </h1>
            <div className="row">
                <div className="explore-datagrid">
                    <DataGrid columns={columns} rows={rows}/>
                </div>
            </div>
            <div className="row">
                <div className="explore-chart">
                <Chart title="Explore" data={[[1638077080000, 1], [1638078080000, 4], [1638079080000, 9]]}/>
                </div>
            </div>
        </div>

    );
};

export default ExploreDataPage;