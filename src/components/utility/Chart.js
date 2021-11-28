// Chart.js
// Engineer: Alex Mei

import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Chart (props) {
    const options = {
        title: {
          text: props.title,
          style: {"fontSize": "24px", "fontWeight" : "400"}
        },
        yAxis: [
            {
                title: {
                    text: 'Power Usage (kWh)',
                    style: {"fontSize": "22px", "fontWeight" : "300"}
                },
                labels: {
                    style: {"fontSize": "16px", "fontWeight" : "200"}
                }
            }
        ],
        xAxis: [
            {
                title: {
                    text: 'Time',
                    style: {"fontSize": "22px", "fontWeight" : "300"}
                },
                type: "datetime",
                labels: {
                    formatter: function() {
                        return Highcharts.dateFormat('%m/%d/%Y', this.value);
                    },
                    style: {"fontSize": "16px", "fontWeight" : "200"}
                }
            } 
        ],
        series: [
            {
                name: 'Meter 1',
                data: props.data,
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