// DefaultHomePage.js
// Engineer: Alex Mei

import React from 'react';
import Navbar from "../NavBar/Navbar"
import Footer from "../NavBar/footer"
import './background.css'
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function HomePage (props) {
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
        <div className = "overlay"> 
            <Navbar /> 
            
            <h1> Home Page </h1>

            <HighchartsReact
                highcharts={Highcharts}
                options={options1}
            />

            <h1> Separating Text </h1>

            <HighchartsReact
                highcharts={Highcharts}
                options={options2}
            />

            <Footer />
        </div>
        
    );
};

export default HomePage;