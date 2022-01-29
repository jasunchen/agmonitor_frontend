import {useHistory, Link} from 'react-router-dom';
import React, {useState, useEffect} from "react";
import PlacesAutocomplete, {geocodeByAddress, geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';
import { Slider } from 'antd';
import {withAuth0} from '@auth0/auth0-react';
import './userPreference.css'

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
        setLoading(false);
      })
      .catch((error) => console.log("Error: " + error));
  }, [])

  const handleUserPreferenceChange = (e) => {
    e.preventDefault();

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
        "latitude": lat
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
    console.log(latlong)
    // setAddress(value)
    setLat(latlong.lat)
    setLong(latlong.lng)

  }


  if (lat && long) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyAgWxooTzXCVXgF8O6J5czgHRwIopQxpVs`)
      .then(response => response.json())
      .then(data => {
        console.log("Hello World");
        console.log(data);
        setCurrentAddress(data['results'][0]['formatted_address']);
      })
      .catch((error) => console.log("Error: " + error));
  }

  return (
    <div className="user-preference">
      <div className="back" onClick={() => props.history.go(-1)}>Back to dashboard</div>
      <form onSubmit={handleUserPreferenceChange}>
        <label>Set low limit to: </label>
        <Slider
          min={0}
          max={100}
          value={low_limit}
          onChange={(value) => setLowLimit(value)}/>
        <br></br>
        <label>Set max limit to: </label>
        <Slider
          min={0}
          max={100}
          value={max_limit}
          onChange={(value) => setMaxLimit(value)}/>
        <br></br>
        <label>Set battery size to: </label>
        <input
          type="number"
          required
          value={battery_size}
          onInput={(e) => setBatterySize(e.target.value)}/>
        {!(battery_size >= 0 || /^\d+$/.test(battery_size)) &&
          <div className="red">the size should be larger than 0</div>}
        <br></br>
        <label>Set hours of power to: </label>
        <Slider
          min={0}
          max={100}
          value={hours_of_power}
          onChange={(value) => setHoursOfPower(value)}/>
        <br></br>
        <label>Set cost or shutoff to: </label>
        <Slider
          min={0}
          max={100}
          value={cost_or_shutoff}
          onChange={(value) => setCostOrShutOff(value)}/>
        <br></br>

        <button> Update Preferences</button>
      </form>


      <h2> address: {currentAddress}</h2>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Type in your address...',
                className: 'location-search-input'
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

      <p>lat: {lat}</p>
      <p>long: {long}</p>


      <button onClick={handleUserPreferenceChange}>Update Address</button>
    </div>
  );
}

export default withAuth0(UserPreference);
