// Chart.js
// Engineer: Alex Mei

import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Chart (props) {
    const options = {
        title: {
          text: 'Energy Usage Data'
        },
        subtitle: {
            text: 'Context Subtitle'
        },
        yAxis: [
            {
                title: {
                    text: 'Power (KiloWatt Hours)'
                }
            }
        ],
        xAxis: [
            {
                title: {
                    text: 'Time'
                }
            }
        ],
        series: [
            {
                name: 'Meter 1',
                data: [[1, 1], [2, 4], [3, 9]]
            },
            {
                name: 'Meter 2',
                data: [[5, 5], [6, 6], [7, 7]]
            }
        ]
    }

    return (
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { width: "100%", height: "100%" } }}
            />
    );
};

export default Chart;