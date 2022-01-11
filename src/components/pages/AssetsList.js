import { Link } from 'react-router-dom';

function AssetsList(props){
  
  

  return (
    <div >
      {props.assets.map(asset => (
        <div key={asset["id"]} >
          <Link to={`/dashboard/${asset.id}`}>
            <h2>{ asset["asset_name"]}</h2>
            <p> id: { asset["id"] }</p>
            <p> Description: { asset["description"] }</p>

            
        
          </Link>
        </div>
      ))}
    </div>
  );
}
  
export default AssetsList;