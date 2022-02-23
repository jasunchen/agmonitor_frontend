import { Link } from 'react-router-dom';

function AssetComponent(props){

    function calculateColor(x){
        if(x === "Generation"){
            return "#00B8A9";
        }
        if(x === "Base"){
            return "#F6416C";
        }

        return "#c4a702";
    }

    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }


  return (
          <Link to={`/asset/${props.asset['id']}`}>
              <div className="asset-component" style = {{border: `1px solid ${calculateColor(props.type)}`}}>
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
                {/* { props.asset['start_charge_time'] != null && 
                    <div className="asset-property"> 
                        <div className="property-left">
                            Charging Start Time:
                        </div> 
                        <div className="property-right">
                            { pad(Math.floor(props.asset['start_charge_time']/3600)) } : {pad(Math.floor((props.asset['start_charge_time'] % 3600) / 60))}
                           
                        </div>
                    </div> 
                } 
                { props.asset['end_charge_time'] != null && 
                     <div className="asset-property"> 
                        <div className="property-left">
                            Charging End Time:
                        </div> 
                        <div className="property-right">
                            { pad(Math.floor(props.asset['end_charge_time']/3600)) } : {pad(Math.floor((props.asset['end_charge_time'] % 3600) / 60))}
                        </div>
                    </div> 
                }  */}
                { props.asset['duration'] != null && 
                    <div className="asset-property">
                        <div className="property-left">
                            Asset Duration: 
                        </div> 
                        <div className="property-right">
                        { Math.floor(parseInt(props.asset['duration'])/3600) } hr {Math.floor((parseInt(props.asset['duration']) % 3600) / 60)} min
                        </div>
                    </div>
                }
                { props.asset['demand'] != null && 
                    <div className="asset-property">
                        <div className="property-left">
                            Asset Demand: 
                        </div> 
                        <div className="property-right">
                            {parseInt(props.asset['demand'])} kWH
                        </div>
                    </div>
                }
            </div>
        </Link>
  );
}
  
export default AssetComponent;