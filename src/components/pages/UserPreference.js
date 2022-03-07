import {useHistory, Link} from 'react-router-dom';
import React, {useState, useEffect} from "react";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import { Slider } from 'antd';
import {withAuth0} from '@auth0/auth0-react';
import PhoneInput from 'react-phone-input-2'
import {QuestionCircleOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';
import 'react-phone-input-2/lib/style.css'

function UserPreference(props) {
  const email = props.auth0.user.email;

  const [data, setData] = useState({});
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [low_limit, setLowLimit] = useState();
  const [max_limit, setMaxLimit] = useState();
  const [battery_size, setBatterySize] = useState("");
  const [hours_of_power, setHoursOfPower] = useState();
  const [cost_or_shutoff, setCostOrShutOff] = useState();
  const [address, setAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [phone_number, setPhoneNumber] = useState();


  // configure server URL
  let server = "http://localhost:8000"
  if (process.env.REACT_APP_REMOTE === "1") {
    server = "https://agmonitor-pina-colada-back.herokuapp.com"
  }

  useEffect(() => {
    let requestUrl = `${server}/getUser?email=${email}`;

    fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        setLowLimit(data['low_limit']);
        setMaxLimit(data['max_limit']);
        setBatterySize(data['battery_size']);
        setCostOrShutOff(data['cost_or_shutoff']);
        setHoursOfPower(data['hours_of_power']);
        setLat(data['latitude']);
        setLong(data['longitude']);
        setPhoneNumber(data['phone_number']);
        setLoading(false);
      })
      .catch((error) => console.log("Error: " + error));
  }, [])

  const handleUserPreferenceChange = (e) => {
    e.preventDefault();
    if ((phone_number.length) != 11){
      return;
    }

    let requestUrl = `${server}/updateUser`

    fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "low_limit": low_limit,
        "max_limit": max_limit,
        "battery_size": battery_size,
        "cost_or_shutoff": cost_or_shutoff,
        "hours_of_power": hours_of_power,
        "longitude": long,
        "latitude": lat,
        "phone_number": phone_number
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch((error) => console.log("Error: " + error))

    history.go(0)
  }

  const handleSelect = async value => {

    const results = await geocodeByAddress(value);
    const latlong = await getLatLng(results[0])
  
    // setAddress(value)
    setLat(latlong.lat)
    setLong(latlong.lng)

  }


  if (lat && long) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyAgWxooTzXCVXgF8O6J5czgHRwIopQxpVs`)
      .then(response => response.json())
      .then(data => {
        setCurrentAddress(data['results'][0]['formatted_address']);
      })
      .catch((error) => console.log("Error: " + error));
  }

  const sliderMarks = {
    0: '0',
    100: '100'
  }

  const costVsRiskSliderMarks = {
    0: '0',
    100: '100'
  }

  const handlePhoneChange = async value => {
    setPhoneNumber(value)
    console.log(phone_number)
  }

  

  return (
    <div className="user-preference">
      <form onSubmit={handleUserPreferenceChange}>
      
        <div className="form-item">
          <label className="form-label"> 
            <Tooltip 
              title={<span className="tooltip-title"> Text notifications will be sent to this phone number. </span>}
              className = 'form-question-mark'
              placement='left'> 
              <QuestionCircleOutlined className="form-pref-question-mark"/>
            </Tooltip>
            Phone Number:
          </label>
          
          <PhoneInput 
            className='form-smallinput'
            country={'us'}
            onlyCountries={["us"]}
            enableAreaCodes={true}
            value={phone_number}
            placeholder='please enter phone number'
            onChange={(value) => {
              setPhoneNumber(value);
           
          
            }}
            isValid={(phone_number) => {
              if ((phone_number.length) == 11) {
                return true;
              } 
            }}
          />
        {(!phone_number || phone_number.length != 11) && <label className = 'form-phone-error-message'>Invalid Phone Number!</label>}
          
        </div>
        { false && <div className='form-phone-error-message'> Invalid phone number!</div>}

        <div className="form-item">
          <label className="form-label"> 
            <Tooltip 
              title={<span className="tooltip-title"> The size of your battery, rounded to the nearest kilowatt hour.  </span>}
              className = 'form-question-mark'
              placement='left'> 
              <QuestionCircleOutlined className="form-pref-question-mark"/>
            </Tooltip>
            Battery Size: 
          </label>
          
          <input className="form-smallinput" 
                 type="number" 
                 required min = '1' 
                 value={battery_size}
                 onInput={(e) => setBatterySize(e.target.value)}/>
          <label className="form-context"> kWH </label>
        </div>

        <div className="form-item">
          <label className="form-label"> 
            <Tooltip 
              title={<span className="tooltip-title"> Set the range of your allowable battery threshold, which is the minimum percentage of reserve energy you will have at all times. (Valid Range: 0 to 100%)</span>}
              className = 'form-question-mark'
              placement='left'> 
              <QuestionCircleOutlined className="form-pref-question-mark"/>
            </Tooltip>
            Acceptable Battery Threshold: 
          </label>
          
          <Slider
            range={true}
            marks = {sliderMarks}
            min={0}
            max={100}
            value={[low_limit, max_limit]}
            onChange={(value) => {
              setLowLimit(value[0])
              setMaxLimit(value[1])
            }}/>
            <label className = "form-context2">   {low_limit} ~ {max_limit} </label>
        </div>

        <div className="form-item">
          <label className="form-label"> 
            <Tooltip 
              title={<span className="tooltip-title"> Number of hours of energy reserve requested, computed from your average base load usage. </span>}
              className = 'form-question-mark'
              placement='left'> 
              <QuestionCircleOutlined className="form-pref-question-mark"/>
            </Tooltip>
            Hours of Backup Power: 
          </label>
          
          <Slider
            marks = {sliderMarks}
            min={0}
            max={100}
            value={hours_of_power}
            onChange={(value) => setHoursOfPower(value)}/>
            <label className = "form-context2">  {hours_of_power} </label>
        </div>
      
        <div className="form-item">
          <label className="form-label"> 
            <Tooltip 
              title={<span className="tooltip-title"> If you favor cost savings, set this value toward 0. If you favor shutoff resiliency, set this value toward 100. </span>}
              className = 'form-question-mark'
              placement='left'> 
              <QuestionCircleOutlined className="form-pref-question-mark"/>
            </Tooltip>
            Cost versus Risk Tolerance: 
          </label>
          
          <Slider
            marks = {costVsRiskSliderMarks}
            min={0}
            max={100}
            value={cost_or_shutoff}
            onChange={(value) => setCostOrShutOff(value)}/>
            
            <label className = "form-context2">   {cost_or_shutoff} {cost_or_shutoff == 50 ? '(equally favor)' : cost_or_shutoff < 50 ? '(cost favor)' : '(risk favor)'} </label>
        </div>

        <div className="form-item">
          <label className='form-label'> 
            <Tooltip 
              title={<span className="tooltip-title"> Your current location. This is used to calculate your latitude and longitude for solar predictions. </span>}
              className = 'form-question-mark'
              placement='left'> 
              <QuestionCircleOutlined className="form-pref-question-mark"/>
            </Tooltip>

            Current Address: 
          </label>
          
          <div className="form-address-label"> {currentAddress} </div>
        </div>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Change your address here...",
                    className: 'location-search-input form-address-input'
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? {backgroundColor: '#7393B3', cursor: 'pointer'}
                      : {backgroundColor: '#ffffff', cursor: 'pointer'};
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

        <button className="asset-button"> Update Preferences </button>
      </form>
      




    </div>
  );
}

export default withAuth0(UserPreference);
