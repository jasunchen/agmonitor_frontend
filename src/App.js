// App.js
// Modified by: Alex Mei
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';

import './App.css';
import "./css/Base.css"
import axios from 'axios';

import HomePage from './components/pages/HomePage';
import SummaryPage from './components/pages/SummaryPage';
import ErrorPage from './components/pages/ErrorPage';
import AboutPage from './components/pages/AboutPage';
import ExploreDataPage from './components/pages/ExploreDataPage';
import DashboardPage from './components/pages/DashboardPage';


const url = 'http://localhost:8000/';
function App() {
  const [temp, getTemp] = useState('default');

  useEffect(()=> {
    getTempData();
  }, []);

  const getTempData = () => {
    axios.get(`${url}getTemp`)
    .then((response) =>  {
      getTemp(response.data.temp);
    })
  }

  return (
    <main>
      <BrowserRouter>
        <Routes> 
          <Route path="/" exact element = {<HomePage/>}/> 
          <Route path="/summary" exact element = {<SummaryPage/>}/> 
          <Route path="/error" exact element = {<ErrorPage/>}/>
          <Route path="/about" exact element = {<AboutPage/>}/> 
          <Route path="/dashboard" exact element = {<DashboardPage/>}/> 
          <Route path="/explore_data" exact element = {<ExploreDataPage/>}/>  
          
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
