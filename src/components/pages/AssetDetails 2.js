import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

function AssetDetails(props) {
    const { id } = useParams();
  // const { data: asset } = useFetch('http://localhost:8000/getUserAsset');
  // const history = useHistory();

  const [data, setData] = useEffect({});
  const [loading, setLoading] = useEffect(true);
  
  // configure server URL
  let server = "http://localhost:8000"
  if (process.env.REACT_APP_REMOTE === "1") { 
      server = "https://agmonitor-pina-colada-back.herokuapp.com"
  }
  
  useEffect(() => {     
      let requestUrl = `${server}/getUserAsset?email=jiawei_yu@ucsb.edu`

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


  if(loading){
    return <div> Loading... </div>
  }

  return (
    <div>
      {/* { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> } */}
      { asset && (
        <article>
          <h2>{ asset.assetName }</h2>
          <div>{ asset.assetDescription } </div>
        
        </article>
      )}
    </div>
  );
}
 
export default AssetDetails;