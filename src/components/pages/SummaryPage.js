// SummaryPage.js
// Engineer: Alex Mei

import React from 'react';
import Highcharts from 'highcharts';

function SummaryPage (props) {
        Highcharts.chart('container', {
            chart: {
                zoomType: 'x'
            },
            renderto: "largeincomingOrders",
            title: {
                text: 'USD to EUR exchange rate over time'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'USD to EUR',
                data: []
            }]
        });

    return (
        <div>
          <figure class="highcharts-figure">
              <div id="largeincomingOrders"></div>
              <p class="highcharts-description">
                  Highcharts has extensive support for time series, and will adapt
                  intelligently to the input data. Click and drag in the chart to zoom in
                  and inspect the data.
              </p>
          </figure>

          <script src="https://code.highcharts.com/highcharts.js"></script>
          <script src="https://code.highcharts.com/modules/data.js"></script>
          <script src="https://code.highcharts.com/modules/exporting.js"></script>
          <script src="https://code.highcharts.com/modules/export-data.js"></script>
          <script src="https://code.highcharts.com/modules/accessibility.js"></script>
        </div>
    );
};

export default SummaryPage;