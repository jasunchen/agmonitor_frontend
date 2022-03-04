import React, {useState, useEffect} from "react";

import { Tabs, Tooltip } from 'antd';

import AssetsList from "./AssetsList";
import AssetComponent from "./AssetComponent";
import UserPreference from "./UserPreference";
import {useHistory, Link } from 'react-router-dom';
import Select from 'react-select';
import {QuestionCircleOutlined} from '@ant-design/icons';
import { withAuth0 } from '@auth0/auth0-react';
import '../../css/Asset.css'
import 'antd/dist/antd.css'





function AssetPage(props) {
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
   const [start_charge_time_hr, setStartChargeTimeHr] = useState(0);
   const [start_charge_time_min, setStartChargeTimeMin] = useState(0);
   const [end_charge_time_hr, setEndChargeTimeHr] = useState(0);
   const [end_charge_time_min, setEndChargeTimeMin] = useState(0);
   const [duration_time_hr, setDurationTimeHr] = useState();
   const [duration_time_min, setDurationTimeMin] = useState();
   const [demand, setDemand] = useState();
   
   


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


console.log(typeof(start_charge_time_hr))

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
      console.log(JSON.stringify({
        "email" : email,
        "name" : assetName,
        "description" : assetDescription,
        "type_of_asset": "flexible",
        // "start_charge_time": parseInt(start_charge_time_hr) * 3600 + parseInt(start_charge_time_min) * 60,
        // "end_charge_time" : parseInt(end_charge_time_hr) * 3600 + parseInt(end_charge_time_min) * 60,
        "start_charge_time": 0,
             "end_charge_time" : 0,
        "duration": (duration_time_hr * 3600 + duration_time_min * 60).toString(),
        "demand": demand.toString()
      }));

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
            //  "start_charge_time": parseInt(start_charge_time_hr) * 3600 + parseInt(start_charge_time_min) * 60,
            //  "end_charge_time" : parseInt(end_charge_time_hr) * 3600 + parseInt(end_charge_time_min) * 60,
             "start_charge_time": 0,
             "end_charge_time" : 0,
             "duration": (duration_time_hr * 3600 + duration_time_min * 60).toString(),
             "demand": demand.toString()
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


  


 
    const onStartChargeTimeHrChange = value => {
      setStartChargeTimeHr(value.value)
    };
  
    const onStartChargeTimeMinChange = value => {
      setStartChargeTimeMin(value.value) 
    };
  
    const onEndChargeTimeHrChange = value => {
      setEndChargeTimeHr(value.value)
    };
  
    const onEndChargeTimeMinChange = value => {
      setEndChargeTimeMin(value.value)
    };

    // const onDurationTimeHrChange = value => {
    //   setDurationTimeHr(value.value)
    //   console.log(duration_time_hr)
    // };
  
    // const onDurationTimeMinChange = value => {
    //   setDurationTimeMin(value.value)
    //   console.log(duration_time_min)
    // };
  
    const hourOptions = [];
    const minOptions = [];
    [...Array(24).keys()].map(i => 
     hourOptions[i] = {value: i.toString(), label:i < 10 ? "0" + i : "" +i}
    );
    [...Array(60).keys()].map(i => 
    minOptions[i] = {value: i.toString(), label:i < 10 ? "0" + i : "" +i}
    );

 



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
              You have not created any assets yet! You must setup your assets for this application to be functional.
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
              <form className="user-preference" onSubmit={handleBaseSubmit}>
                <div className="form-item">
                  <label className="form-label"> Asset Name: </label>
                  <input type="text" className="form-input" required value={assetName}
                    onChange={(e) => setAssetName(e.target.value)} />
                </div>
                
                <div className="form-item">
                  <label className="form-label"> Asset Description: </label>
                  <textarea required className="form-textarea" value={assetDescription}
                    onChange={(e) => setAssetDescription(e.target.value)} />
                </div>
                
                <button className="asset-button"> Create Base Asset </button>
              </form>
            </TabPane>

            <TabPane key={2} tab="Add Generation Asset">
              <form className="user-preference" onSubmit = {handleGenerationSubmit}>
                <div className="form-item">
                  <label className="form-label">Asset Name:</label> 
                  <input className="form-input" type="text" required value={assetName}
                    onChange={(e) => setAssetName(e.target.value)} />
                </div>

                <div className="form-item">
                  <label className="form-label">Asset Description:</label>
                  <textarea required className="form-textarea" value={assetDescription}
                    onChange={(e) => setAssetDescription(e.target.value)} />
                </div>
                
                <div className="form-item">
                  <label className="form-label"> 
                    <Tooltip 
                        title={<span className="tooltip-title"> Solar panel declination angle. Refer to your asset documentation for more details. (Valid Range: 0 to 90&deg;)</span>}
                        placement='left'> 
                        <QuestionCircleOutlined className="form-question-mark"/>
                    </Tooltip>
                    Asset Declination: 
                  </label> 
                  
                  <input className="form-smallinput" type="number" value={declination} required
                    min = '0' max = '90' onChange={(e) => setDeclination(e.target.value)} /> 
                  <label className="form-context">&deg;</label>
                
                </div>
 
                <div className="form-item">
                  <label className="form-label"> 
                    <Tooltip 
                        title={<span className="tooltip-title"> Solar panel azimuth angle. Refer to your asset documentation for more details. (Valid Range: -180 to 180&deg;)</span>}
                        placement='left'> 
                        <QuestionCircleOutlined className="form-question-mark"/>
                    </Tooltip>
                    Asset Azimuth: 
                  </label> 
                  
                  <input className="form-smallinput" type="number" value={azimuth} required
                    min = '-180' max = '180' onChange={(e) => setAzimuth(e.target.value)} /> 
                  <label className="form-context">&deg;</label>
                  
                </div>

                <div className="form-item">
                  <label className="form-label"> 
                    <Tooltip 
                        title={<span className="tooltip-title"> Solar panel maximum peak power. Refer to your asset documentation for more details. </span>}
                        placement='left'> 
                        <QuestionCircleOutlined className="form-question-mark"/>
                    </Tooltip>
                    Asset Power: 
                  </label> 
                  
                  <input className="form-smallinput" type="number" value={modules_power} required
                  min = '1' onChange={(e) => setModulesPower(e.target.value)} /> 
                  <label className="form-context"> kW </label>
                
                </div>

                <button className="asset-button"> Create Generation Asset </button>
              </form>
            </TabPane>

            <TabPane key={3} tab='Add Flexible Asset'>
              <form className="user-preference" onSubmit = {handleFlexibleSubmit}>
                <div className="form-item">
                  <label className="form-label"> Asset Name: </label> 
                  <input required className="form-input" type="text" value={assetName} 
                    onChange={(e) => setAssetName(e.target.value)} />
                </div>

                <div className="form-item">
                  <label className="form-label"> Asset Description: </label>
                  <textarea className="form-textarea" value={assetDescription} required
                    onChange={(e) => setAssetDescription(e.target.value)} />
                </div>

                

                {/* <div className="form-item">
                  <label className="form-label"> 
                    <Tooltip 
                        title={<span>Set your charging start time (HH:MM)</span>}
                        className = 'form-question-mark'
                        placement='right'> 
                        <QuestionCircleOutlined className="form-question-mark"/>
                    </Tooltip>
                    Charging Start Time: 
                  </label>
                  
                  <Select
                    defaultValue={{ value: '0', label:'00' }}
                    style={{ width: 70 }}
                    onChange={onStartChargeTimeHrChange}
                    options = {hourOptions}
                  />

                  <label className="form-context"> : </label>
                  
                  <Select
                    defaultValue={{ value: '0', label:'00' }}
                    style={{ width: 70 }}
                    options = {minOptions}
                    onChange={onStartChargeTimeMinChange}
                  />

                </div>

                <div className="form-item">
                  <label className="form-label">
                    <Tooltip 
                        title={<span>Set your charging end time (HH:MM)</span>}
                        className = 'form-question-mark'
                        placement='right'> 
                        <QuestionCircleOutlined className="form-question-mark"/>
                    </Tooltip>
                    Charging End Time: 
                  </label>

                  <Select
                    defaultValue={{ value: '0', label:'00' }}
                    style={{ width: 70 }}
                    options = {hourOptions}
                    onChange={onEndChargeTimeHrChange}
                  />
                    
                  <label className="form-context"> : </label>
                  <Select
                    defaultValue={{ value: '0', label:'00' }}
                    style={{ width: 70 }}
                    options = {minOptions}
                    onChange={onEndChargeTimeMinChange}
                  />
                </div> */}

                <div className="form-item">
                  <label className="form-label"> 
                    <Tooltip 
                      title={<span className="tooltip-title"> The duration needed to fully charge your asset. </span>}
                      className = 'form-question-mark'
                      placement='left'> 
                      <QuestionCircleOutlined className="form-question-mark"/>
                    </Tooltip> 
                    Time to Charge: 
                  </label>
                             
                  <input required className="form-smallinput" type="number" value={duration_time_hr} 
                    onChange={(e) => setDurationTimeHr(e.target.value)} />

                  <label className="form-context"> hr </label>
                  
                  <input required className="form-smallinput" type="number" value={duration_time_min} 
                                      onChange={(e) => setDurationTimeMin(e.target.value)} />
                                      <label className="form-context"> min </label>

                  {(duration_time_hr == 0  && duration_time_min == 0) &&
                  <div className = 'form-duration-error-message'> Duration must be greater than 0 hr 0 min! </div>}
                </div>

                <div className="form-item">
                  <label className="form-label"> 
                    <Tooltip 
                      title={<span className="tooltip-title">  The energy consumption of your asset. </span>}
                      className = 'form-question-mark'
                      placement='left'> 
                      <QuestionCircleOutlined className="form-question-mark"/>
                    </Tooltip>
                    Energy Demand: 
                  </label> 
                  
                  <input className="form-smallinput" type="number" value={demand} required
                    min = '1' onChange={(e) => setDemand(e.target.value)} /> 
                  <label className="form-context">kWH</label>
                </div>

                <button className="asset-button"> Create Flexible Asset </button>
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

export default  withAuth0(AssetPage);
