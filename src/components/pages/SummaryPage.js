// SummaryPage.js
// Engineer: Alex Mei

import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function SummaryPage (props) {
    const options1 = {
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

    const options2 = {
        title: {
          text: 'Second Chart'
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
        <div>
            <h1> Summary Page </h1>

            <HighchartsReact
                highcharts={Highcharts}
                options={options1}
            />

            <h1> Separating Text </h1>

            <HighchartsReact
                highcharts={Highcharts}
                options={options2}
            />
        </div>
        
    );
};

export default SummaryPage;