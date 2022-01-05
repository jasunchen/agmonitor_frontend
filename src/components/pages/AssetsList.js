import { Link } from 'react-router-dom';

const AssetsList = ({ props }) => {
  const assets = props.assets
  return (
    <div >
      {assets.map(asset => (
        <div key={asset.assetName} >
          <Link to={`/dashboard/${asset.assetName}`}>
            <h2>{ asset.assetName}</h2>
            <p>Email: { asset.email }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
  
export default AssetsList;