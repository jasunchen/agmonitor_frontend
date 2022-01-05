import AssetsList from "./AssetsList";
import useFetch from "./useFetch";
import React, {useState} from "react";

const DashboardPage = () => {
  const {data: assets } = useFetch('http://localhost:8000/getUserAsset')

    const email = 'jiawei_yu@ucsb.edu'
    const [assetName, setAssetName] = useState('');
    const [assetDescription, setAssetDescription] = useState('');
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const asset = { email, assetName, assetDescription };
  
      fetch('http://localhost:8000/addUserAsset', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify(asset)
    })
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
                  requi red
                  value={assetDescription}
                  onChange={(e) => setAssetDescription(e.target.value)}
              ></textarea>
              
              <button>Add Asset</button>
          </form>
      </div><div>
              {/* { error && <div>{ error }</div> }
    { isPending && <div>Loading...</div> } */}
              {assets && <AssetsList assets={assets} />}
          </div></>
  );
}
 
export default DashboardPage;