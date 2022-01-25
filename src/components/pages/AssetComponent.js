import { Link } from 'react-router-dom';

function AssetComponent(props){

    function calculateColor(x){
        if(x === "Generation"){
            return "#00B8A9";
        }
        if(x === "Base"){
            return "#F6416C";
        }

        return "#FFDE7D";
    }

  return (
          <Link to={`/dashboard/${props.asset['id']}`}>
              <div className="asset-component">
                <div className="asset-name">
                    <div className="name-left">
                        { props.asset["asset_name"]}
                    </div>
                    <div className="name-right" style={{color: calculateColor(props.type)}}>
                        {props.type} Asset
                    </div>
                </div>
                <div className="asset-description">
                    { props.asset["description"] }
                </div>
                { props.asset['declination'] && 
                    <div className="asset-property">
                        <div className="property-left">
                            Asset Declination: 
                        </div> 
                        <div className="property-right">
                            {props.asset['declination']} &deg;
                        </div>
                    </div>
                } 
                { props.asset['azimuth'] && 
                    <div className="asset-property">
                        <div className="property-left">
                            Asset Azimuth: 
                        </div> 
                        <div className="property-right">
                            {props.asset['azimuth']} &deg;
                        </div>
                    </div>
                } 
                { props.asset['modules_power'] && 
                    <div className="asset-property">
                        <div className="property-left">
                            Asset Power: 
                        </div> 
                        <div className="property-right">
                            {props.asset['modules_power']} kW
                        </div>
                    </div>
                }
                { props.asset['start_charge_time'] && 
                    <div className="asset-property"> 
                        <div className="property-left">
                            Preferred Charging Start:
                        </div> 
                        <div className="property-right">
                            { props.asset['start_charge_time'] } units
                        </div>
                    </div> 
                } 
                { props.asset['end_charge_time'] && 
                     <div className="asset-property"> 
                        <div className="property-left">
                            Preferred Charging End:
                        </div> 
                        <div className="property-right">
                            { props.asset['end_charge_time'] } units
                        </div>
                    </div> 
                } 
            </div>
        </Link>
  );
}
  
export default AssetComponent;