import "../styles/App.css";
import React from 'react';
import locationIcon from "/images/location.png"
import Card from "./UI/Card";
import HourlyCard from "./UI/HourlyCard.jsx";
import thermometerIcon from "/images/thermometer.png";
import visibilityIcon from "/images/eye.png";
import humidityIcon from "/images/humidity.png";
import precipitationIcon from "/images/blood-drop.png";
import clockIcon from "/images/clock.png";
import rainyIcon from "/images/rain.png"
import rainyThunder from "/images/rain-thunder.png";
import rainySun from "/images/rain-sun.png";

const App = () => {
    return (
        <div className="main-page">
            <div className="current-block">
                <div className="search-block">
                    <img className="" src={locationIcon} alt="" />
                    <input className="search-bar" placeholder="Lagos, Nigeria"></input>
                </div>
                <div className="current-display">
                    <div className="top-current-display">                           
                        <h1 className="temp">28<sup>&deg;C</sup></h1>
                        <h2 className="weather">Rainy Day</h2>
                        <p className="weather-note">Today, expect a rainy day with temperatures reaching a
                            maximum of 28&#8451;. Make sure you grab your umbrella and raincoat
                            before heading out.
                        </p>
                    </div>
                    <div className="bottom-current-display">
                        <Card icon={thermometerIcon} iconTitle="FEELS LIKE" value="30°" note="Humidity is making it feel warmer"/>
                        <Card icon={precipitationIcon} iconTitle="PRECIPITATION" value='2.3"' subvalue="in last 24h" note='2" expected in the next 24h'/>
                        <Card icon={visibilityIcon} iconTitle="VISIBILITY" value="6 mi"/>
                        <Card icon={humidityIcon} iconTitle="HUMIDITY" value="82%" note="The dew point is 25°C right now"/> 
                    </div>
                </div>
            </div>
            <div className="forecast-block">
                <div className="hourly-forecast">
                    <div className="top-hourly-forecast">
                        <div className="clock">
                            <img src={clockIcon} />
                        </div>
                        <h3>HOURLY FORECAST</h3>
                    </div>
                    <hr/>
                    <div className="mid-hourly-forecast">
                        <HourlyCard time="Now" temperature="28°" temperatureIcon={rainyIcon} /> 
                        <HourlyCard time="15:00" temperature="28°" temperatureIcon={rainyIcon} />
                        <HourlyCard time="16:00" temperature="26°" temperatureIcon={rainyThunder} />
                        <HourlyCard time="17:00" temperature="29°" temperatureIcon={rainyIcon} />
                        <HourlyCard time="18:00" temperature="32°" temperatureIcon={rainySun} />
                        <HourlyCard time="19:00" temperature="28°" temperatureIcon={rainyIcon} />
                    </div>
                    {/* <hr classname="w-64"/> */}
                </div>
                <div className="10-day-forecast">
                    
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default App
