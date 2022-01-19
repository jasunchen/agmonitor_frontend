import AssetsList from "./AssetsList";
import {useHistory, Link } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';

import React, {useState, useEffect} from "react";

function DashboardPage(props) {
   //const {data: assets } = useFetch('http://localhost:8000/getUserAsset')

   const [data, setData] = useState({});
  
   const [loading, setLoading] = useState(true);
   const [assetName, setAssetName] = useState('');
   const [assetDescription, setAssetDescription] = useState('');
   const [checked, setChecked] = useState(false);
   const [declination, setDeclination] = useState();
   const [azimuth, setAzimuth] = useState();
   const [modules_power, setModulesPower] = useState();

   let history = useHistory();
   
   let email = props.auth0.user.email

   // configure server URL
   let server = "http://localhost:8000"
   if (process.env.REACT_APP_REMOTE === "1") { 
       server = "https://agmonitor-pina-colada-back.herokuapp.com"
   }
   
   useEffect(() => {     
       let requestUrl = `${server}/getAllAssets?email=${email}`
 
       fetch(requestUrl, {
           method: 'GET',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },              
       })
       .then(response => response.json()) 
       .then(data => {
           setData(data);
           console.log(data['assets']);
           console.log(data['generations'])
           setLoading(false);
 
       })
       .catch((error) => console.log("Error: " + error))
   }, [] 
   )


 

    const handleNotGenerationSubmit = (e) => {
      e.preventDefault();
  
      let requestUrl = `${server}/addUserAsset`
 
      fetch(requestUrl, {
           method: 'POST',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },              
           body: JSON.stringify({
             "email" : email,
             "name" : assetName,
             "description" : assetDescription,
             "is_generation": false
           })
      })
      .then(response => response.json()) 
      .then(data => {
          console.log("WORKED!")
      })
      .catch((error) => console.log("Error: " + error)) 

      
      history.go(0)
    }


    const handleGenerationSubmit = (e) => {
      e.preventDefault();
  
      let requestUrl = `${server}/addUserAsset`
  
      fetch(requestUrl, {
           method: 'POST',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },              
           body: JSON.stringify({
             "email" : email,
             "name" : assetName,
             "description" : assetDescription,
             "is_generation": true,
             "declination": declination,
             "azimuth" : azimuth,
             "modules_power": modules_power
             
           })
      })
      .then(response => response.json()) 
        .then(data1 => {
            console.log(data1)
        })
        .catch((error) => console.log("Error: " + error)) 
      
      history.go(0)
      }


    const handleCheckboxChange = () => {
      setChecked(!checked);
    };

  if(loading){
      return <div> Loading... </div>
  }

  return (
    <><div>
      <button>
          <Link to={`/userPreference`}>
            
            User Preference
        
          </Link>
        </button>

    <br></br>





          <h2>Add a New Asset</h2>
          <form onSubmit={ (checked && handleGenerationSubmit) || (!checked && handleNotGenerationSubmit)}>
              <label>Asset Name:</label>
              <input
                  type="text"
                  required
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)} />
              <label>Asset Description:</label>
              <textarea
                  required
                  value={assetDescription}
                  onChange={(e) => setAssetDescription(e.target.value)}
              ></textarea>
              <br></br>
              <label>is Generation?:</label>

              <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckboxChange} />
              <br></br>

              {checked && <label>Declination:</label>}
              {checked && <input
                  type="number"
                  required
                  value={declination}
                  onChange={(e) => setDeclination(e.target.value)} />}
                <br></br>
                
              {checked && <label>Azimuth:</label>}
              {checked && <input
                  type="number"
                  required
                  value={azimuth}
                  onChange={(e) => setAzimuth(e.target.value)} />}
                <br></br>
              {checked && <label>Modules power:</label>}
              {checked && <input
                  type="number"
                  required
                  value={modules_power}
                  onChange={(e) => setModulesPower(e.target.value)} />}

              <br></br>

              <button>Add Asset</button>




          </form>
        <br></br>
        <br></br>
      </div><div>
              {/* { error && <div>{ error }</div> }
    { isPending && <div>Loading...</div> } */}
                <h2>Non-generation assets:</h2>
                <AssetsList assets={data['assets']} /> 
                <br></br>
                <br></br>
                <h2>Generation assets:</h2>
                <AssetsList assets={data['generations']} />
          </div></>
  );
}
 
export default  withAuth0(DashboardPage);