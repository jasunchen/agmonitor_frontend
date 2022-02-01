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
    
    {data['type_of_asset'] == 'flexible' &&
    <div>
    
    <div style={{fontWeight: "bold", color: "#E5C922", fontSize: 60}}> 
          {data['asset_name']}
    </div>
    </div>
    }

    {data['type_of_asset'] == 'base' &&
    <div>
    
    <div style={{fontWeight: "bold", color: "#F6416C", fontSize: 60}}> 
          {data['asset_name']}
    </div>
    </div>
    }

    {data['type_of_asset'] == 'generation' &&
    <div>
    
    <div style={{fontWeight: "bold", color: "#00B8A9", fontSize: 60}}> 
          {data['asset_name']}
    </div>
    </div>
    }

    


        <form onSubmit={ ((data['type_of_asset'] == 'base') && handleNotGenerationChangeSubmit) || (data['type_of_asset'] == 'generation' && handleGenerationChangeSubmit) || (data['type_of_asset'] == 'flexible' && handleFlexibleChangeSubmit)}>
            <label className="form-label">Change Asset Name:</label> 
              <input
                  className="form-input"
                  type="text"
                  value={assetName}
                  required
                  onChange={(e) => setAssetName(e.target.value)} />
                  <br></br>
              <label style={{fontSize: 30, fontWeight:"normal"}}>Change Asset Description:</label>
              <textarea
                  className="form-textarea"
                  value={assetDescription}
                  required
                  onChange={(e) => setAssetDescription(e.target.value)}
              ></textarea>
              
              
              

{data['type_of_asset'] == 'generation' &&
 <div>
   <br></br>
  <label className="form-label"> Change Declination: </label> 
 
 <input
 className="form-smallinput"
 type="number"
 value={declination}
 required
 min = '0'
 max = '90'
 onChange={(e) => setDeclination(e.target.value)} /> <label className="form-label">&deg;</label>
 
 <br></br>
 
<label className="form-label"> Change Azimuth: </label> 
 
 <input
 className="form-smallinput"
 type="number"
 value={azimuth}
 required
 min = '-180'
 max = '180'
 onChange={(e) => setAzimuth(e.target.value)} /> <label className="form-label">&deg;</label>
 
 <br></br>
 
 
 <label className="form-label"> Change Modules Power: </label> 
 
 <input
 style={{ width: 95, fontWeight:'normal' }}
 type="number"
 value={modules_power}
 required
 min = '1'
 onChange={(e) => setModulesPower(e.target.value)} /> <label style={{fontSize: 25, fontWeight: "normal"}}>kW</label>
 </div>
}


 { data['type_of_asset'] == 'flexible' && <div> 
 <div>
 <br></br>
   <label className="form-label"> Start Charge Time: </label>
{start_charge_time_min &&
 <Select
          labelInValue
          defaultValue={{ value: start_charge_time_hr }}
          style={{ width: 70 }}
          size="large"
          onChange={onStartChargeTimeHrChange}
        >
          <Option value= {0} > 00 </Option>
          <Option value= {1} > 01 </Option>
          <Option value= {2} > 02 </Option>
          <Option value= {3} > 03 </Option>
          <Option value= {4} > 04 </Option>
          <Option value= {5} > 05 </Option>
          <Option value= {6} > 06 </Option>
          <Option value= {7} > 07 </Option>
          <Option value= {8} > 08 </Option>
          <Option value= {9} > 09 </Option>
          <Option value= {10} > 10 </Option>
          <Option value= {11} > 11 </Option>
          <Option value= {12} > 12 </Option>
          <Option value= {13} > 13 </Option>
          <Option value= {14} > 14 </Option>
          <Option value= {15} > 15 </Option>
          <Option value= {16} > 16 </Option>
          <Option value= {17} > 17 </Option>
          <Option value= {18} > 18 </Option>
          <Option value= {19} > 19 </Option>
          <Option value= {20} > 20 </Option>
          <Option value= {21} > 21 </Option>
          <Option value= {22} > 22 </Option>
          <Option value= {23} > 23 </Option>
        </Select>}

          <label className="form-label"> : </label>
        {start_charge_time_min &&
        <Select
          labelInValue
          defaultValue={{ value: start_charge_time_min }}
          style={{ width: 70 }}
          size="large"
          onChange={onStartChargeTimeMinChange}
        >
          <Option value= {0} > 00 </Option>
          <Option value= {1} > 01 </Option>
          <Option value= {2} > 02 </Option>
          <Option value= {3} > 03 </Option>
          <Option value= {4} > 04 </Option>
          <Option value= {5} > 05 </Option>
          <Option value= {6} > 06 </Option>
          <Option value= {7} > 07 </Option>
          <Option value= {8} > 08 </Option>
          <Option value= {9} > 09 </Option>
          <Option value= {10} > 10 </Option>
          <Option value= {11} > 11 </Option>
          <Option value= {12} > 12 </Option>
          <Option value= {13} > 13 </Option>
          <Option value= {14} > 14 </Option>
          <Option value= {15} > 15 </Option>
          <Option value= {16} > 16 </Option>
          <Option value= {17} > 17 </Option>
          <Option value= {18} > 18 </Option>
          <Option value= {19} > 19 </Option>
          <Option value= {20} > 20 </Option>
          <Option value= {21} > 21 </Option>
          <Option value= {22} > 22 </Option>
          <Option value= {23} > 23 </Option>
          <Option value= {24} > 24 </Option>
          <Option value= {25} > 25 </Option>
          <Option value= {26} > 26 </Option>
          <Option value= {27} > 27 </Option>
          <Option value= {28} > 28 </Option>
          <Option value= {29} > 29 </Option>
          <Option value= {30} > 30 </Option>
          <Option value= {31} > 31 </Option>
          <Option value= {32} > 32 </Option>
          <Option value= {33} > 33 </Option>
          <Option value= {34} > 34 </Option>
          <Option value= {35} > 35 </Option>
          <Option value= {36} > 36 </Option>
          <Option value= {37} > 37 </Option>
          <Option value= {38} > 38 </Option>
          <Option value= {39} > 39 </Option>
          <Option value= {40} > 40 </Option>
          <Option value= {41} > 41 </Option>
          <Option value= {42} > 42 </Option>
          <Option value= {43} > 43 </Option>
          <Option value= {44} > 44 </Option>
          <Option value= {45} > 45 </Option>
          <Option value= {46} > 46 </Option>
          <Option value= {47} > 47 </Option>
          <Option value= {48} > 48 </Option>
          <Option value= {49} > 49 </Option>
          <Option value= {50} > 50 </Option>
          <Option value= {51} > 51 </Option>
          <Option value= {52} > 52 </Option>
          <Option value= {53} > 53 </Option>
          <Option value= {54} > 54 </Option>
          <Option value= {55} > 55 </Option>
          <Option value= {56} > 56 </Option>
          <Option value= {57} > 57 </Option>
          <Option value= {58} > 58 </Option>
          <Option value= {59} > 59 </Option>
        </Select>
}
  </div>
  <br></br>
  <div>
  <label className="form-label">End charge time: </label>
  {end_charge_time_hr &&
        <Select
          labelInValue
          defaultValue={{ value: end_charge_time_hr }}
          style={{ width: 70 }}
          size="large"
          onChange={onEndChargeTimeHrChange}
        >
          <Option value= {0} > 00 </Option>
          <Option value= {1} > 01 </Option>
          <Option value= {2} > 02 </Option>
          <Option value= {3} > 03 </Option>
          <Option value= {4} > 04 </Option>
          <Option value= {5} > 05 </Option>
          <Option value= {6} > 06 </Option>
          <Option value= {7} > 07 </Option>
          <Option value= {8} > 08 </Option>
          <Option value= {9} > 09 </Option>
          <Option value= {10} > 10 </Option>
          <Option value= {11} > 11 </Option>
          <Option value= {12} > 12 </Option>
          <Option value= {13} > 13 </Option>
          <Option value= {14} > 14 </Option>
          <Option value= {15} > 15 </Option>
          <Option value= {16} > 16 </Option>
          <Option value= {17} > 17 </Option>
          <Option value= {18} > 18 </Option>
          <Option value= {19} > 19 </Option>
          <Option value= {20} > 20 </Option>
          <Option value= {21} > 21 </Option>
          <Option value= {22} > 22 </Option>
          <Option value= {23} > 23 </Option>
        </Select>
}
        
          <label className="form-label"> : </label>
{end_charge_time_min &&
        <Select
          labelInValue
          defaultValue={{ value: end_charge_time_min }}
          style={{ width: 70 }}
          size="large"
          onChange={onEndChargeTimeMinChange}
        >
          <Option value= {0} > 00 </Option>
          <Option value= {1} > 01 </Option>
          <Option value= {2} > 02 </Option>
          <Option value= {3} > 03 </Option>
          <Option value= {4} > 04 </Option>
          <Option value= {5} > 05 </Option>
          <Option value= {6} > 06 </Option>
          <Option value= {7} > 07 </Option>
          <Option value= {8} > 08 </Option>
          <Option value= {9} > 09 </Option>
          <Option value= {10} > 10 </Option>
          <Option value= {11} > 11 </Option>
          <Option value= {12} > 12 </Option>
          <Option value= {13} > 13 </Option>
          <Option value= {14} > 14 </Option>
          <Option value= {15} > 15 </Option>
          <Option value= {16} > 16 </Option>
          <Option value= {17} > 17 </Option>
          <Option value= {18} > 18 </Option>
          <Option value= {19} > 19 </Option>
          <Option value= {20} > 20 </Option>
          <Option value= {21} > 21 </Option>
          <Option value= {22} > 22 </Option>
          <Option value= {23} > 23 </Option>
          <Option value= {24} > 24 </Option>
          <Option value= {25} > 25 </Option>
          <Option value= {26} > 26 </Option>
          <Option value= {27} > 27 </Option>
          <Option value= {28} > 28 </Option>
          <Option value= {29} > 29 </Option>
          <Option value= {30} > 30 </Option>
          <Option value= {31} > 31 </Option>
          <Option value= {32} > 32 </Option>
          <Option value= {33} > 33 </Option>
          <Option value= {34} > 34 </Option>
          <Option value= {35} > 35 </Option>
          <Option value= {36} > 36 </Option>
          <Option value= {37} > 37 </Option>
          <Option value= {38} > 38 </Option>
          <Option value= {39} > 39 </Option>
          <Option value= {40} > 40 </Option>
          <Option value= {41} > 41 </Option>
          <Option value= {42} > 42 </Option>
          <Option value= {43} > 43 </Option>
          <Option value= {44} > 44 </Option>
          <Option value= {45} > 45 </Option>
          <Option value= {46} > 46 </Option>
          <Option value= {47} > 47 </Option>
          <Option value= {48} > 48 </Option>
          <Option value= {49} > 49 </Option>
          <Option value= {50} > 50 </Option>
          <Option value= {51} > 51 </Option>
          <Option value= {52} > 52 </Option>
          <Option value= {53} > 53 </Option>
          <Option value= {54} > 54 </Option>
          <Option value= {55} > 55 </Option>
          <Option value= {56} > 56 </Option>
          <Option value= {57} > 57 </Option>
          <Option value= {58} > 58 </Option>
          <Option value= {59} > 59 </Option>
        </Select>
}
        </div> 
        </div>}
        <br></br>  
              <button style={{ width: 70, fontWeight:"normal" }}>Submit</button>
              
    </form>

    <br></br>
    <button onClick = {handleDelete} style={{ fontWeight:"normal", color: 'red' }}> Delete Asset</button>


    </div>

   
  );
}



export default withAuth0(SpecificAssetPage);