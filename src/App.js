// App.js
// Modified by: Alex Mei
import React, { useState, useEffect } from 'react';
import { Switch , Route } from 'react-router-dom';
import { withAuth0 } from "@auth0/auth0-react";
import './App.css';
import "./css/Base.css";
import axios from 'axios';
import {HomePage, ErrorPage, AboutPage, ExploreDataPage, DashboardPage, ProfilePage} from './components/pages';
import ProtectedRoute from './auth/protected-route';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Loading from './components/utility/loading';

class App extends React.Component {
  render() {
    const { isLoading } = this.props.auth0;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <main>
          <Navbar /> 
          <Switch> 
            <Route path="/" exact component = {AboutPage}/> 
            <Route path="/about" exact component = {AboutPage}/>   
            <Route path="/home" exact component = {HomePage}/> 
            <Route path="/profile" exact component = {ProfilePage}/> 
            <Route path="/dashboard" exact component = {DashboardPage}/> 
            <Route path="/explore_data" exact component = {ExploreDataPage}/>  
            <Route path="/error" exact component = {ErrorPage}/>
          </Switch>
          <Footer /> 
      </main>
    );
  }
}

export default withAuth0(App);
