import React, { useState, useEffect,  } from "react";
import { useParams, useHistory } from 'react-router-dom';
import Select from 'react-select';
import {QuestionCircleOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';
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
  const [start_charge_time_hr, setStartChargeTimeHr] = useState();
  const [start_charge_time_min, setStartChargeTimeMin] = useState();
  const [end_charge_time_hr, setEndChargeTimeHr] = useState();
  const [end_charge_time_min, setEndChargeTimeMin] = useState();
  const [duration_time_hr, setDurationTimeHr] = useState();
  const [duration_time_min, setDurationTimeMin] = useState();
  const [demand, setDemand] = useState();

  function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

 
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
           setStartChargeTimeHr(pad(Math.floor(data['start_charge_time'] / 3600)));
           setStartChargeTimeMin(pad(Math.floor((data['start_charge_time'] % 3600)/ 60)));
           setEndChargeTimeHr(pad(Math.floor(data['end_charge_time'] / 3600)));
           setEndChargeTimeMin(pad(Math.floor((data['end_charge_time'] % 3600)/ 60)));
           setDurationTimeHr(Math.floor(parseInt(data['duration']) / 3600));
           setDurationTimeMin(Math.floor((parseInt(data['duration']) % 3600)/ 60));
           setDemand(parseInt(data['demand']));
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
        if(parseInt(duration_time_hr) == 0 && parseInt(duration_time_min) == 0){
          return;
        }


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
               "start_charge_time": parseInt(start_charge_time_hr) * 3600 + parseInt(start_charge_time_min) * 60,
               "end_charge_time" : parseInt(end_charge_time_hr) * 3600 + parseInt(end_charge_time_min) * 60,
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

        history.push("/asset")  
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

  const onDurationTimeHrChange = value => {
    setDurationTimeHr(value.value)
    
  };

  const onDurationTimeMinChange = value => {
    setDurationTimeMin(value.value)
  };

  const hourOptions = [];
  const minOptions = [];
  [...Array(24).keys()].map(i => 
   hourOptions[i] = {value: i.toString(), label:i < 10 ? "0" + i : "" +i}
  );
  [...Array(60).keys()].map(i => 
  minOptions[i] = {value: i.toString(), label:i < 10 ? "0" + i : "" +i}
  );
  


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

          <button 
              className = 'asset-delete-button'
              onClick = {handleDelete}> 
              Delete Asset
          </button>
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
         

          <div className = 'form-item'>
  <label className="form-label"> Change Declination: </label> 
  <Tooltip 
    title={<span>See solar panel documentation for declination (0 &deg; ~ 90 &deg;)</span>}
    className = 'form-question-mark'
    placement='right'> 
    <QuestionCircleOutlined className="form-question-mark"/>
</Tooltip>
 
 <input
 className="form-smallinput"
 type="number"
 value={declination}
 required
 min = '0'
 max = '90'
 onChange={(e) => setDeclination(e.target.value)} /> <label className="form-context">&deg;</label>
 




    
 </div>
 
 

<div className = 'form-item'>
<label className="form-label"> Change Azimuth: </label> 
<Tooltip 
    title={<span>See solar panel documentation for declination (0 &deg; ~ 90 &deg;)</span>}
    className = 'form-question-mark'
    placement='right'> 
    <QuestionCircleOutlined className="form-question-mark"/>
</Tooltip>
 <input
 className="form-smallinput"
 type="number"
 value={azimuth}
 required
 min = '-180'
 max = '180'
 onChange={(e) => setAzimuth(e.target.value)} /> <label className="form-context">&deg;</label>

</div>

 
 <div className = 'form-item'>
 <label className="form-label"> Change Modules Power: </label> 
 <Tooltip 
    title={<span>See solar panel documentation for declination (0 &deg; ~ 90 &deg;)</span>}
    className = 'form-question-mark'
    placement='right'> 
    <QuestionCircleOutlined className="form-question-mark"/>
</Tooltip>
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

          

          <div className="form-item" >
 <label className="form-label"> Start Charge Time: </label>
 <Tooltip 
    title={<span>Set your charging start time (HH:MM)</span>}
    className = 'form-question-mark'
    placement='right'> 
    <QuestionCircleOutlined className="form-question-mark"/>
</Tooltip>
 
{start_charge_time_hr &&

      <Select
        
        defaultValue={{ value: start_charge_time_hr, label:start_charge_time_hr }}
        
        onChange={onStartChargeTimeHrChange}
        options = {hourOptions}
      />}

        <label className="form-context"> : </label>
      {start_charge_time_min &&
      <Select
      
      defaultValue={{ value: start_charge_time_min, label:start_charge_time_min }}
      
      options = {minOptions}
      onChange={onStartChargeTimeMinChange}
    />}

</div>
<div className="form-item">
<label className="form-label">End charge time: </label>
<Tooltip 
    title={<span>Set your charging end time (HH:MM)</span>}
    className = 'form-question-mark'
    placement='right'> 
    <QuestionCircleOutlined className="form-question-mark"/>
</Tooltip>
{end_charge_time_hr &&
      <Select
        
        defaultValue={{ value: end_charge_time_hr, label:end_charge_time_hr }}
        
        options = {hourOptions}
        onChange={onEndChargeTimeHrChange}
      />
        
}
      
        <label className="form-context"> : </label>
{end_charge_time_min &&
      <Select
        
        defaultValue={{ value: end_charge_time_min, label:end_charge_time_min }}
        options = {minOptions}
        onChange={onEndChargeTimeMinChange}
      />
       
}

      </div>

      <div className="form-item">
                  <label className="form-label"> Asset Duration: </label>
                  <Tooltip 
    title={<span>Set your duration time in number of hours and minutes</span>}
    className = 'form-question-mark'
    placement='right'> 
    <QuestionCircleOutlined className="form-question-mark"/>
</Tooltip> 
                   
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
                  <label className="form-label"> Asset Energy Demand: </label>
                  <Tooltip 
    title={<span>Set your energy demand in kWH, must be greater than 1 kWH</span>}
    className = 'form-question-mark'
    placement='right'> 
    <QuestionCircleOutlined className="form-question-mark"/>
</Tooltip>
                  <input className="form-smallinput" type="number" value={demand} required
                    min = '1' onChange={(e) => setDemand(e.target.value)} /> 
                  <label className="form-context">kWH</label>
                  
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