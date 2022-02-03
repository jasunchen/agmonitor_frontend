import React, { useState, useEffect,  } from "react";
import { useParams, useHistory } from 'react-router-dom';
import {Select} from 'antd';
import { withAuth0 } from '@auth0/auth0-react';

function SpecificAssetPage() {
  let { id } = useParams();
  let int_id = parseInt(id)
  let history = useHistory();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [assetName, setAssetName] = useState('');
  const [assetDescription, setAssetDescription] = useState('');
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

 
   // configure server URL
   let server = "http://localhost:8000"
   if (process.env.REACT_APP_REMOTE === "1") { 
       server = "https://agmonitor-pina-colada-back.herokuapp.com"
   }
   
   useEffect(() => {     
       let requestUrl = `${server}/getSingleAsset?id=${id}`
 
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
           console.log(typeof(data['start_charge_time']));
           setAssetName(data['asset_name']);
           setAssetDescription(data['description']);
           setAzimuth(data['azimuth']);
           setDeclination(data['declination']);
           setModulesPower(data['modules_power']);
           setStartChargeTimeHr(Math.floor(data['start_charge_time'] / 3600));
           setStartChargeTimeMin(Math.floor((data['start_charge_time'] % 3600)/ 60));
           setEndChargeTimeHr(Math.floor(data['end_charge_time'] / 3600));
           setEndChargeTimeMin(Math.floor((data['end_charge_time'] % 3600)/ 60));
           setEndChargeTime(data['end_charge_time']);
           setLoading(false);
 
       })
       .catch((error) => console.log("Error: " + error))
   }, [])
  

  const handleNotGenerationChangeSubmit = (e) => {
    e.preventDefault();

    let requestUrl = `${server}/updateUserAsset`

    fetch(requestUrl, {
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },              
         body: JSON.stringify({
           "id" : int_id,
           "name" : assetName,
           "description" : assetDescription,
           "type_of_asset": false

         })
    })
    .then(response => response.json()) 
      .then(data1 => {
          console.log('successfuly changed base')
      })
      .catch((error) => console.log("Error: " + error)) 
    
    history.go(0)
    }

    const handleGenerationChangeSubmit = (e) => {
      e.preventDefault();
  
      let requestUrl = `${server}/updateUserAsset`
  
      fetch(requestUrl, {
           method: 'POST',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },              
           body: JSON.stringify({
             "id" : int_id,
             "name" : assetName,
             "description" : assetDescription,
             "type_of_asset": 'generation',
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

    
      const handleFlexibleChangeSubmit = (e) => {
        e.preventDefault();
    
        let requestUrl = `${server}/updateUserAsset`
    
        fetch(requestUrl, {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
             },              
             body: JSON.stringify({
              "id" : int_id,
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


    const handleDelete = (e) => {
      e.preventDefault();
  
      let requestUrl = `${server}/deleteUserAsset`
  
      fetch(requestUrl, {
           method: 'DELETE',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },              
           body: JSON.stringify({
             "id" : int_id,
           })
      })
      .then(response => response.json()) 
        .then(data2 => {
            console.log(data2)
        })
        .catch((error) => console.log("Error: " + error)) 

        history.push("/dashboard")  
        history.go(0)
      }

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


  return (
    <div className="overlay">
    
    {data['type_of_asset'] == 'base' &&
    <div>
    
    <div style={{fontWeight: "bold", color: "#E5C922", fontSize: 60}}> 
          {data['asset_name']}
    </div>

    <form className="asset-form" onSubmit={handleNotGenerationChangeSubmit}>
          <div className="form-item"> 
            <label className="form-label">Change Asset Name:</label> 
              <input
                  className="form-input"
                  type="text"
                  value={assetName}
                  required
                  onChange={(e) => setAssetName(e.target.value)} />
          </div>
                  <br></br>
          <div className="form-item">
              <label className="form-label">Change Asset Description:</label>
              <textarea
                  className="form-input"
                  value={assetDescription}
                  required
                  onChange={(e) => setAssetDescription(e.target.value)}
              ></textarea>
          </div>

          <button className='asset-button'>Submit</button>
    </form>

    </div>
    }



{data['type_of_asset'] == 'generation' &&
    <div>
    
    <div style={{fontWeight: "bold", color: "#E5C922", fontSize: 60}}> 
          {data['asset_name']}
    </div>

    <form className="asset-form" onSubmit={ handleGenerationChangeSubmit }>
          <div className="form-item"> 
            <label className="form-label">Change Asset Name:</label> 
              <input
                  className="form-input"
                  type="text"
                  value={assetName}
                  required
                  onChange={(e) => setAssetName(e.target.value)} />
          </div>
                  
          <div className="form-item">
              <label className="form-label">Change Asset Description:</label>
              <textarea
                  className="form-input"
                  value={assetDescription}
                  required
                  onChange={(e) => setAssetDescription(e.target.value)}
              ></textarea>
          </div>
          <label className="form-label2">
              See solar panel document for information below:
          </label>
          <div className = 'form-item'>
  <label className="form-label"> Change Declination: </label> 
 
 <input
 className="form-smallinput"
 type="number"
 value={declination}
 required
 min = '0'
 max = '90'
 onChange={(e) => setDeclination(e.target.value)} /> <label className="form-label">&deg;</label>
 </div>
 
 

<div className = 'form-item'>
<label className="form-label"> Change Azimuth: </label> 
 <input
 className="form-smallinput"
 type="number"
 value={azimuth}
 required
 min = '-180'
 max = '180'
 onChange={(e) => setAzimuth(e.target.value)} /> <label className="form-label">&deg;</label>
</div>

 
 <div className = 'form-item'>
 <label className="form-label"> Change Modules Power: </label> 
 
 <input
 className='form-smallinput'
 type="number"
 value={modules_power}
 required
 min = '1'
 onChange={(e) => setModulesPower(e.target.value)} /> 
 <label className="form-context"> kW </label>
 </div>


 <button className='asset-button'>Submit</button>

 <button 
      className = 'asset-delete-button'
      onClick = {handleDelete}> 
      Delete Asset
  </button>
    </form>

    </div>
  }



    
{data['type_of_asset'] == 'flexible' &&
    <div>
    
    <div style={{fontWeight: "bold", color: "#E5C922", fontSize: 60}}> 
          {data['asset_name']}
    </div>

    <form className="asset-form" onSubmit={handleFlexibleChangeSubmit}>
          <div className="form-item"> 
            <label className="form-label">Change Asset Name:</label> 
              <input
                  className="form-input"
                  type="text"
                  value={assetName}
                  required
                  onChange={(e) => setAssetName(e.target.value)} />
          </div>
                  <br></br>
          <div className="form-item">
              <label className="form-label">Change Asset Description:</label>
              <textarea
                  className="form-input"
                  value={assetDescription}
                  required
                  onChange={(e) => setAssetDescription(e.target.value)}
              ></textarea>
          </div>

          <div className="form-item">
 

 <label className="form-label"> Start Charge Time: </label>
{start_charge_time_min &&
<Select
        labelInValue
        defaultValue={{ value: start_charge_time_hr }}
        style={{ width: 70 }}
        size="large"
        onChange={onStartChargeTimeHrChange}
      >
        {[...Array(24).keys()].map(i => 
          <Option value={i}> {i < 10 ? "0" + i : i} </Option>
        )}
      </Select>}

        <label className="form-context"> : </label>
      {start_charge_time_min &&
      <Select
        labelInValue
        defaultValue={{ value: start_charge_time_min }}
        style={{ width: 70 }}
        size="large"
        onChange={onStartChargeTimeMinChange}
      >
        {[...Array(60).keys()].map(i => 
          <Option value={i}> {i < 10 ? "0" + i : i} </Option>
        )}
      </Select>
      }

</div>
<div className="form-item">
<label className="form-label">End charge time: </label>
{end_charge_time_hr &&
      <Select
        labelInValue
        defaultValue={{ value: end_charge_time_hr }}
        style={{ width: 70 }}
        size="large"
        onChange={onEndChargeTimeHrChange}
      >
        {[...Array(24).keys()].map(i => 
          <Option value={i}> {i < 10 ? "0" + i : i} </Option>
        )}
      </Select>
}
      
        <label className="form-context"> : </label>
{end_charge_time_min &&
      <Select
        labelInValue
        defaultValue={{ value: end_charge_time_min }}
        style={{ width: 70 }}
        size="large"
        onChange={onEndChargeTimeMinChange}
      >
        {[...Array(60).keys()].map(i => 
          <Option value={i}> {i < 10 ? "0" + i : i} </Option>
        )}
      </Select>
}
      </div>


          <button className='asset-button'>Submit</button>

          <button 
      className = 'asset-delete-button'
      onClick = {handleDelete}> 
      Delete Asset
    </button>

    </form>

    </div>
  }

        
 

 

              
    

    


    </div>

   
  );
}



export default withAuth0(SpecificAssetPage);