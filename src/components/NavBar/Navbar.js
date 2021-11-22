import React, {Component} from 'react';
// import {MenuItems} from "./Menuitems"
import { Link, NavLink} from 'react-router-dom'
import './Navbar.css'
const divStyle = {
    color: 'blue',
  };

const Navbar = () => {
    return( 
    <nav className = "Navbar">
        <ul className = 'nav-menu'>
            <li ><Link to = "/"> Home </Link> </li>
            <li ><Link to = "/about"> About </Link> </li>
            <li ><Link to = "/explore_data"> Explore Data </Link> </li>
            <li ><Link to = "/dashboard"> Dashboard </Link> </li>
        </ul>
    </nav>
    )
}


export default Navbar