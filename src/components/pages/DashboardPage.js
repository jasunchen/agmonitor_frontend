import React, {useState, useEffect} from "react";

import {Tabs,Form, Dropdown, Button, Slider, TimePicker, Select} from 'antd';

import AssetsList from "./AssetsList";
import AssetComponent from "./AssetComponent";
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

  if(loading){
      return <div> Loading... </div>
  }
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





  return (
    <><div className="overlay">
      <div>
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



    <Tabs defaultActive={1}>
      <TabPane key={1} tab="Display Assets">
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
        <div >
        <Tabs defaultActive={1}>
          <TabPane key={1} tab="Add Base Asset">
          <div >
        
        <form onSubmit={handleBaseSubmit}>
              <label style={{fontSize: 30, fontWeight: "normal"}}>Asset Name:</label>
              <input
                  type="text"
                  style={{ width: 300, fontWeight:"normal"}}
                  required
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)} />
                  <br></br>
              <label style={{fontSize: 30, fontWeight: "normal"}}>Asset Description:</label>
              <textarea
                  required
                  style={{ width: 644, fontWeight:"normal" }}
                  value={assetDescription}
                  onChange={(e) => setAssetDescription(e.target.value)}
              ></textarea>
            <br></br>

              <button style={{ width: 100, fontWeight:"normal" }}>Add Asset</button>
          </form>
      </div>
          </TabPane>

          <TabPane key={2} tab="Add Generation Asset">
          <div>
    
    <form onSubmit = {handleGenerationSubmit}>
    
    <label style={{fontSize: 30, fontWeight: "normal"}}>Asset Name:</label> 
              <input
                  style={{ width: 300, fontWeight:"normal"}}
                  type="text"
                  value={assetName}
                  required
                  onChange={(e) => setAssetName(e.target.value)} />
                  <br></br>
              <label style={{fontSize: 30, fontWeight:"normal"}}>Asset Description:</label>
              <textarea
                  style={{ width: 644, fontWeight:"normal" }}
                  value={assetDescription}
                  required
                  onChange={(e) => setAssetDescription(e.target.value)}>
              </textarea>
   <br></br>
   <div>
  <label style={{fontSize: 30, fontWeight: "normal"}}> Declination: </label> 
 
 <input
 style={{ width: 70, fontWeight:'normal' }}
 type="number"
 value={declination}
 required
 min = '0'
 max = '90'
 onChange={(e) => setDeclination(e.target.value)} /> <label style={{fontSize: 30, fontWeight: "normal"}}>&deg;</label>
 
 <br></br>
 
<label style={{fontSize: 30, fontWeight: "normal"}}> Azimuth: </label> 
 
 <input
 style={{ width: 70, fontWeight:'normal' }}
 type="number"
 value={azimuth}
 required
 min = '-180'
 max = '180'
 onChange={(e) => setAzimuth(e.target.value)} /> <label style={{fontSize: 30, fontWeight: "normal"}}>&deg;</label>
 
 <br></br>
 
 
 <label style={{fontSize: 30, fontWeight: "normal"}}> Modules Power: </label> 
 
 <input
 style={{ width: 95, fontWeight:'normal' }}
 type="number"
 value={modules_power}
 required
 min = '1'
 onChange={(e) => setModulesPower(e.target.value)} /> <label style={{fontSize: 25, fontWeight: "normal"}}>kW</label>

 </div>
 <br></br>

 <button style={{ width: 100, fontWeight:"normal" }}>Add Asset</button>
    </form>
    
</div>
          </TabPane>


          <TabPane key={3} tab='Add Flexible Asset'>
          <div>
  
            
  <form onSubmit = {handleFlexibleSubmit}>
  <label style={{fontSize: 30, fontWeight: "normal"}}>Asset Name:</label> 
              <input
                  style={{ width: 300, fontWeight:"normal"}}
                  type="text"
                  value={assetName}
                  required
                  onChange={(e) => setAssetName(e.target.value)} />
                  <br></br>
              <label style={{fontSize: 30, fontWeight:"normal"}}>Asset Description:</label>
              <textarea
                  style={{ width: 644, fontWeight:"normal" }}
                  value={assetDescription}
                  required
                  onChange={(e) => setAssetDescription(e.target.value)}>
              </textarea>
   <br></br>
      <div>
  <label style={{fontSize: 30, fontWeight: "normal"}}>Start charge time: </label>
        <Select
          labelInValue
          defaultValue={{ value: 0 }}
          style={{ width: 70 }}
          size = "large"
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
        </Select>
        
          <label> : </label>
        <Select
          labelInValue
          defaultValue={{ value: 0 }}
          style={{ width: 70 }}
          size = "large"
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
        </div>
        <br></br>

        <div>
  <label style={{fontSize: 30, fontWeight: "normal"}}>End charge time: </label>
        <Select
          labelInValue
          defaultValue={{ value: 0 }}
          style={{ width: 70 }}
          size = "large"
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
        
          <label> : </label>
        <Select
          labelInValue
          defaultValue={{ value: 0 }}
          style={{ width: 70 }}
          size = "large"
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
        </div>
        <br></br>

        <button style={{ width: 100, fontWeight:"normal" }}>Add Asset</button>
  </form>
</div>
          </TabPane>

        </Tabs>

      </div>
          
        
      </TabPane>
              {/* { error && <div>{ error }</div> }
    { isPending && <div>Loading...</div> } */}
    
      </Tabs>
          </div></>
  );
}
 
export default  withAuth0(DashboardPage);