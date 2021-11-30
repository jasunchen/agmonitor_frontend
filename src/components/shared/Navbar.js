import React, {Component} from 'react';
// import {MenuItems} from "./Menuitems"
import { Link, NavLink} from 'react-router-dom'
import AuthNav from './auth/auth-nav'
import { useAuth0 } from "@auth0/auth0-react";
import '../../css/Navbar.css'

const divStyle = {
    color: 'blue',
  };

const Navbar = () => {
    const { isAuthenticated } = useAuth0();

    return( 
    <nav className="Navbar">
        <ul className='nav-menu'>
            <AuthNav />
            {isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/dashboard"> Dashboard </Link> </li>}
            {isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/explore_data"> Explore </Link> </li>}
            <li className="nav-item"><Link className="nav-link" to="/about"> About </Link> </li>
            {isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/home"> Home </Link> </li>}
        </ul>
    </nav>
    )
}


export default Navbar