import React, {useState, useEffect} from "react";

import {Tabs} from 'antd'
import AssetsList from "./AssetsList";
import AssetComponent from "./AssetComponent";
import UserPreference from "./UserPreference";
import {useHistory, Link } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import './dashboard.css'
import 'antd/dist/antd.css'
const {TabPane} = Tabs



function DashboardPage(props) {
   //const {data: assets } = useFetch('http://localhost:8000/getUserAsset')

   const [data, setData] = useState({
     "base" : [],
     "flexible" : [],
     "generation" : []
   });

   const [loading, setLoading] = useState(true);
   const [assetName, setAssetName] = useState('');
   const [assetDescription, setAssetDescription] = useState('');
   const [checked, setChecked] = useState(false);
   const [checked2, setChecked2] = useState(false);
   const [declination, setDeclination] = useState();
   const [azimuth, setAzimuth] = useState();
   const [modules_power, setModulesPower] = useState();
   const [start_charge_time, setStartChargeTime] = useState();
   const [end_charge_time, setEndChargeTime] = useState();

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
          setData({
            ...data,
            "base": data["base"],
            "generation": data["generation"],
            "flexible": data["flexible"]
           });
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
             "type_of_asset": false
           })
      })
      .then(response => response.json())
      .then(data => {
          console.log("WORKED!")
      })
      .catch((error) => console.log("Error: " + error))


      history.go(0)
    }


    const handleFlexibleSubmit = (e) => {
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
             "type_of_asset": "flexible",
             "start_charge_time": start_charge_time,
             "end_charge_time" : end_charge_time


           })
      })
      .then(response => response.json())
        .then(data1 => {
            console.log(data1)
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
               "type_of_asset": "generation",
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
      setChecked2(false);
    };
    const handleCheckboxChange2 = () => {
      setChecked2(!checked2);
      setChecked(false);
    };
  // const onTabClick = (key) => {
  //   if (key == 3) {
  //     props.history.push('/userPreference')
  //   }
  // }
  if(loading){
      return (
        <div className="overlay"> 
          <h1> Loading... </h1>
          <p> This might take a few moments... </p>
        </div>
      )
  }

  return (
    <div className="overlay">
    <div className="sa">
      <div>
    <button>
        <Link to={`/userPreference`}>
          
          User Preference
      
        </Link>
      </button>
      </div>
      <div> </div> <div> </div>
      <div> </div>
      </div>
  <br></br>


    
   <Tabs defaultActive="2">
      <TabPane key="1" tab="Display Assets">
        {data['base'].map(asset => (
          <AssetComponent asset={asset} type="Base"/>
          ))}
        {data['flexible'].map(asset => (
          <AssetComponent asset={asset} type="Flexible"/>
        ))}
        {data['generation'].map(asset => (
          <AssetComponent asset={asset} type="Generation"/>
        ))}
      </TabPane>
       

      <TabPane className="block" tab="Add a New Asset" key="2">
          <form onSubmit={ (checked && handleGenerationSubmit) || (checked2 && handleFlexibleSubmit) || ((!checked && !checked2) && handleNotGenerationSubmit)}>
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
              <div>
              <label>is Generation?:</label>
              <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckboxChange} />
                  </div>
              <br></br>
              <div>
              <label>is Flexible?:</label>
              <input
                  type="checkbox"
                  checked={checked2}
                  onChange={handleCheckboxChange2} />
                  </div>
              <br></br>

              {checked2 && <label>Start charge time:</label>}
              {checked2 && <input
                  type="number"
                  required
                  value={start_charge_time}
                  onChange={(e) => setStartChargeTime(e.target.value)} />}
                <br></br>

                {checked2 && <label>End charge time:</label>}
              {checked2 && <input
                  type="number"
                  required
                  value={end_charge_time}
                  onChange={(e) => setEndChargeTime(e.target.value)} />}
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
      </TabPane>
      <TabPane className="block" tab="User Preference" key="3">
              {/* { error && <div>{ error }</div> }
    { isPending && <div>Loading...</div> } */}
        <UserPreference />
      </TabPane>
      </Tabs>
          </div>
  );
{"}"}

export default  withAuth0(DashboardPage);}
