import AssetsList from "./AssetsList";
import useFetch from "./useFetch";
import React, {useState, useEffect} from "react";

const DashboardPage = () => {
   //const {data: assets } = useFetch('http://localhost:8000/getUserAsset')

   const [data, setData] = useState({});
   const [loading, setLoading] = useState(true);
   const [assetName, setAssetName] = useState('');
   const [assetDescription, setAssetDescription] = useState('');
   

   // configure server URL
   let server = "http://0.0.0.0:8000"
   if (process.env.REACT_APP_REMOTE === "1") { 
       server = "https://agmonitor-pina-colada-back.herokuapp.com"
   }
   
   useEffect(() => {     
       let requestUrl = `${server}/getUserAsset?email=alexmei@ucsb.edu`
 
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

    const handleSubmit = (e) => {
      e.preventDefault();
  
      let requestUrl = `${server}/addUserAsset`
 
      fetch(requestUrl, {
           method: 'POST',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },              
           body: JSON.stringify({
             "email" : "alexmei@ucsb.edu",
             "name" : assetName,
             "description" : assetDescription
           })
      })
      .then(response => response.json()) 
      .then(data => {
          console.log("WORKED!")
      })
      .catch((error) => console.log("Error: " + error)) 
    }

  if(loading){
      return <div> Loading... </div>
  }

  return (
    <><div>
          <h2>Add a New Asset</h2>
          <form onSubmit={handleSubmit}>
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
              
              <button>Add Asset</button>
          </form>
      </div><div>
              {/* { error && <div>{ error }</div> }
    { isPending && <div>Loading...</div> } */}
               <AssetsList assets={data} />
          </div></>
  );
}
 
export default DashboardPage;