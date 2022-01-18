import React, { useState, useEffect,  } from "react";
import { Link, useParams, useHistory } from 'react-router-dom';
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
           console.log(data);
 
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
           "is_generation": false

         })
    })
    .then(response => response.json()) 
      .then(data1 => {
          console.log(data1)
      })
      .catch((error) => console.log("Error: " + error)) 
    history.push("/dashboard")  
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
             "is_generation": 1,
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
      history.push("/dashboard")  
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

      console.log('kek')
      console.log(typeof(data['is_generation']))
  return (
    <div>
    
      <div> id: {id} </div>
    <h style={{ fontSize: "50px" }}>
           Now showing asset: {data["asset_name"]}
    </h>  

    <p> Asset description: {data["description"]} 
    </p>
    <p> { data['is_generation'] && <div> declination: { data['declination'] }</div> } </p>
            <p> { data['is_generation'] && <div> azimuth: { data['azimuth'] }</div> } </p>
            <p> { data['is_generation'] && <div> modules_power: { data['modules_power'] }</div> } </p>

    <form onSubmit={ data['is_generation'] && handleGenerationChangeSubmit || (!data['is_generation']) && handleNotGenerationChangeSubmit}>
              <label>Change this Asset Name:</label>
              <input
                  type="text"
                  required
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)} />
                  <br></br>
              <label>Change this Asset Description:</label>
              <textarea
                  required
                  value={assetDescription}
                  onChange={(e) => setAssetDescription(e.target.value)}
              ></textarea>
              <br></br>



 { data['is_generation'] && <label> Change declination: </label> }
 { data['is_generation'] && 
 <input
 type="number"
 required
 value={declination}
 onChange={(e) => setDeclination(e.target.value)} />}
 <br></br>
 { data['is_generation'] && <label> Change azimuth: </label> }
 { data['is_generation'] && 
 <input
 type="number"
 required
 value={azimuth}
 onChange={(e) => setAzimuth(e.target.value)} />}
 <br></br>
 { data['is_generation'] && <label> Change modules_power: </label> }
 { data['is_generation'] && 
 <input
 type="number"
 required
 value={modules_power}
 onChange={(e) => setModulesPower(e.target.value)} />}

              
              <button>Submit</button>
    </form>


    <button onClick = {handleDelete}> Delete Asset</button>


    </div>

   
  );
}



export default SpecificAssetPage;