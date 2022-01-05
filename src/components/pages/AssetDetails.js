import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const AssetDetails = () => {
//   const { id } = useParams();
  const { data: asset } = useFetch('http://localhost:8000/getUserAsset');
  const history = useHistory();

//   const handleClick = () => {
//     fetch('http://localhost:8000/blogs/' + blog.id, {
//       method: 'DELETE'
//     }).then(() => {
//       history.push('/');
//     }) 
//   }

  return (
    <div>
      {/* { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> } */}
      { asset && (
        <article>
          <h2>{ asset.assetName }</h2>
          <div>{ asset.assetDescription }</div>
        
        </article>
      )}
    </div>
  );
}
 
export default AssetDetails;