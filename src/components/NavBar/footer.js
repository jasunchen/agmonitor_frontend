import React, {Component} from 'react';
import { Container } from 'react-bootstrap';
// import {MenuItems} from "./Menuitems"
import { Link, NavLink} from 'react-router-dom'
import './footer.css'


const Footer = () => {
    return( 
    <footer className = "footer">
        <h style={{color: 'white'}}> Team Pinda Colada </h>
        <li style={{color: 'white'}}>Alex M.</li>
        <li style={{color: 'white'}}>Jasun C.</li>
        <li style={{color: 'white'}}>Kaiwen L.</li>
        <li style={{color: 'white'}}>Alice W.</li>
        <li style={{color: 'white'}}>Jayden Y.</li>


        
        
    </footer>
    )
}


export default Footer