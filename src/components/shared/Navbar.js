import React, {Component} from 'react';
// import {MenuItems} from "./Menuitems"
import { Link, NavLink} from 'react-router-dom'
import '../../css/Navbar.css'

const divStyle = {
    color: 'blue',
  };

const Navbar = () => {
    return( 
    <nav className="Navbar">
        <ul className='nav-menu'>
            <li className="nav-item"><Link className="nav-link" to="/dashboard"> Dashboard </Link> </li>
            <li className="nav-item"><Link className="nav-link" to="/explore_data"> Explore </Link> </li>
            <li className="nav-item"><Link className="nav-link" to="/about"> About </Link> </li>
            <li className="nav-item"><Link className="nav-link" to="/"> Home </Link> </li>
        </ul>
    </nav>
    )
}


export default Navbar