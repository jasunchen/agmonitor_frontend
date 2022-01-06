import { Link } from 'react-router-dom';

function AssetsList(props){
  return (
    <div >
      {props.assets.map(asset => (
        <div key={asset["asset_name"]} >
          <Link to={`/dashboard/${asset["asset_name"]}`}>
            <h2>{ asset["asset_name"]}</h2>
            <p> Description: { asset["description"] }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
  
export default AssetsList;