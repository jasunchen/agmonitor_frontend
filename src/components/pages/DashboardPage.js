import React, {useState, useEffect} from "react";

import {Tabs,Form, Dropdown, Button, Slider, TimePicker, Select} from 'antd';

import AssetsList from "./AssetsList";
import AssetComponent from "./AssetComponent";
import UserPreference from "./UserPreference";
import {useHistory, Link } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import './dashboard.css'
import 'antd/dist/antd.css'





function DashboardPage(props) {
   //const {data: assets } = useFetch('http://localhost:8000/getUserAsset')

   const [data, setData] = useState({
     "base" : [],
     "flexible" : [],
     "generation" : []
   });
   
   const {TabPane} = Tabs

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
   const [start_charge_time_hr, setStartChargeTimeHr] = useState();
   const [start_charge_time_min, setStartChargeTimeMin] = useState();
   const [end_charge_time_hr, setEndChargeTimeHr] = useState();
   const [end_charge_time_min, setEndChargeTimeMin] = useState();
   const { Option } = Select;

   const [baseState = {
    baseVisible: false
  }, setBaseState] = useState();




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




    const handleBaseSubmit = (e) => {
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

  //////////////////////////////////

 
  const onStartChargeTimeHrChange = value => {
    setStartChargeTime(value.value * 3600 + start_charge_time_min * 60);
    setStartChargeTimeHr(value.value)
  };

  const onStartChargeTimeMinChange = value => {
    setStartChargeTime(value.value * 60 + start_charge_time_hr * 3600);
    setStartChargeTimeMin(value.value)
  };

  const onEndChargeTimeHrChange = value => {
    setEndChargeTime(value.value * 3600 + end_charge_time_min * 60);
    setEndChargeTimeHr(value.value)
  };

  const onEndChargeTimeMinChange = value => {
    setEndChargeTime(value.value * 60 + end_charge_time_hr * 3600);
    setEndChargeTimeMin(value.value)
  };

 



  ////////////////////////////////////////


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
    
      <Tabs defaultActive="1">
        <TabPane key="1" tab="View Assets">
          { data['base'].length + data['flexible'].length + data['generation'].length == 0 &&
            <div>
              You have not created any assets yet!
            </div>
          }
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
       

        <TabPane className="block" tab="Add a New Asset" key={2}>
          <Tabs defaultActive={1}>
            <TabPane key={1} tab="Add Base Asset">
              <form onSubmit={handleBaseSubmit}>
                <label className="form-label"> Asset Name: </label>
                <input type="text" className="form-input" required value={assetName}
                  onChange={(e) => setAssetName(e.target.value)} />
                
                <label className="form-label"> Asset Description: </label>
                <textarea required className="form-textarea" value={assetDescription}
                  onChange={(e) => setAssetDescription(e.target.value)} />
                
                <button className="asset-button">Add Asset</button>
              </form>
            </TabPane>

            <TabPane key={2} tab="Add Generation Asset">
              <form onSubmit = {handleGenerationSubmit}>
                <label className="form-label">Asset Name:</label> 
                <input className="form-input" type="text" required value={assetName}
                  onChange={(e) => setAssetName(e.target.value)} />

                <label className="form-label">Asset Description:</label>
                <textarea required className="form-textarea" value={assetDescription}
                  onChange={(e) => setAssetDescription(e.target.value)} />
  
                <label className="form-label"> Declination: </label> 
                <input className="form-smallinput" type="number" value={declination} required
                  min = '0' max = '90' onChange={(e) => setDeclination(e.target.value)} /> 
                <label className="form-label">&deg;</label>
 
                <label className="form-label"> Azimuth: </label> 
 
                <input className="form-smallinput" type="number" value={azimuth} required
                  min = '-180' max = '180' onChange={(e) => setAzimuth(e.target.value)} /> 
                <label className="form-label">&deg;</label>

                <label className="form-label"> Modules Power: </label> 
                <input className="form-smallinput" type="number" value={modules_power} required
                min = '1' onChange={(e) => setModulesPower(e.target.value)} /> 
                <label className="form-label"> kW </label>


                <button className="asset-button">Add Asset</button>
              </form>
            </TabPane>

            <TabPane key={3} tab='Add Flexible Asset'>
              <form onSubmit = {handleFlexibleSubmit}>
                <label className="form-label"> Asset Name: </label> 
                <input required className="form-input" type="text" value={assetName} 
                  onChange={(e) => setAssetName(e.target.value)} />
                
                <label className="form-label"> Asset Description: </label>
                <textarea className="form-textarea" value={assetDescription} required
                  onChange={(e) => setAssetDescription(e.target.value)} />

                <label className="form-label">Start charge time: </label>
                <Select labelInValue defaultValue={{ value: 0 }}
                  style={{ width: 70 }} size = "large"
                  onChange={onStartChargeTimeHrChange}>
                    {[...Array(24).keys()].map(i => 
                      <Option value={i}> {i < 10 ? "0" + i : i} </Option>
                    )}
                </Select>
                <label className="form-label"> : </label>
                <Select labelInValue defaultValue={{ value: 0 }}
                  style={{ width: 70 }} size = "large"
                  onChange={onStartChargeTimeMinChange}>
                    {[...Array(60).keys()].map(i => 
                      <Option value={i}> {i < 10 ? "0" + i : i} </Option>
                    )}
                </Select>

                <label className="form-label">End charge time: </label>
                <Select labelInValue defaultValue={{ value: 0 }}
                  style={{ width: 70 }} size = "large"
                  onChange={onEndChargeTimeHrChange}>
                    {[...Array(24).keys()].map(i => 
                      <Option value={i}> {i < 10 ? "0" + i : i} </Option>
                    )}
                </Select>
        
                <label className="form-label"> : </label>
                <Select labelInValue defaultValue={{ value: 0 }}
                  style={{ width: 70 }} size = "large"
                  onChange={onEndChargeTimeMinChange}>
                    {[...Array(60).keys()].map(i => 
                      <Option value={i}> {i < 10 ? "0" + i : i} </Option>
                    )}
                </Select>

                <button className="asset-button">Add Asset</button>
              </form>
            </TabPane>
          </Tabs> 
        </TabPane>
      
        <TabPane className="block" tab="Edit Preferences" key="3">
          <UserPreference />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default  withAuth0(DashboardPage);
