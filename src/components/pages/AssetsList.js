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
            <p> { asset['declination'] && <div> declination: { asset['declination'] }</div> } </p>
            <p> { asset['azimuth'] && <div> azimuth: { asset['azimuth'] }</div> } </p>
            <p> { asset['modules_power'] && <div> modules_power: { asset['modules_power'] }</div> } </p>
            
        
          </Link>
        </div>
      ))}
    </div>
  );
}
  
export default AssetsList;