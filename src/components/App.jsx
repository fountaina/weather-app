import "../styles/App.css";
import React from 'react';
import locationIcon from "/images/location.png"
import Card from "./UI/Card";
import HourlyCard from "./UI/HourlyCard.jsx";
import DailyCard from "./UI/DailyCard.jsx";
import thermometerIcon from "/images/thermometer.png";
import visibilityIcon from "/images/eye.png";
import humidityIcon from "/images/humidity.png";
import precipitationIcon from "/images/blood-drop.png";
import clockIcon from "/images/clock.png";
import rainyIcon from "/images/rain.png"
import rainyThunder from "/images/rain-thunder.png";
import rainySun from "/images/rain-sun.png";
import calendarIcon from "/images/calendar.png";
import windIcon from "/images/wind.png";

const uvPostion = [
    "left-0", "left-[9%]",  "left-[18%]", "left-[27%]",  "left-[36%]", 
    "left-[45%]", "left-[54%]",  "left-[63%]",  "left-[72%]", "left-[81%]",  
    "left-[90%]",  "left-[97%]"
]

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
                <div className="hourly-daily-forecast">
                    <div className="top-hourly-daily-forecast">
                        <div className="forecast-icon">
                            <img src={clockIcon} />
                        </div>
                        <h3>HOURLY FORECAST</h3>
                    </div>
                    <hr className="top-hr"/>
                    <div className="mid-hourly-daily-forecast">
                        <HourlyCard time="Now" temperature="28°" temperatureIcon={rainyIcon} /> 
                        <HourlyCard time="15:00" temperature="28°" temperatureIcon={rainyIcon} />
                        <HourlyCard time="16:00" temperature="26°" temperatureIcon={rainyThunder} />
                        <HourlyCard time="17:00" temperature="29°" temperatureIcon={rainyIcon} />
                        <HourlyCard time="18:00" temperature="32°" temperatureIcon={rainySun} />
                        <HourlyCard time="19:00" temperature="28°" temperatureIcon={rainyIcon} />
                    </div>
                    <hr className="bottom-hr"/>
                </div>
                <div className="hourly-daily-forecast">
                    <div className="top-hourly-daily-forecast">
                        <div className="forecast-icon">
                            <img src={calendarIcon} />
                        </div>
                        <h3>10-DAY FORECAST</h3>
                    </div>
                    <hr className="top-hr"/> 
                    <div className="mid-hourly-daily-forecast">
                        <DailyCard day="Today" date="16/09" temperature="28°" temperatureIcon={rainyIcon} /> 
                        <DailyCard day="Thu" date="17/09" temperature="28°" temperatureIcon={rainyIcon} /> 
                        <DailyCard day="Fri" date="18/09" temperature="28°" temperatureIcon={rainyThunder} />
                        <DailyCard day="Sat" date="19/09" temperature="29°" temperatureIcon={rainyIcon} />
                        <DailyCard day="Sun" date="20/09" temperature="32°" temperatureIcon={rainySun} />
                        <DailyCard day="Mon" date="21/09" temperature="28°" temperatureIcon={rainyIcon} />
                    </div>
                    <hr className="bottom-hr"/>
                </div>
                <div className="bottom-forecast">
                    <div className="uv-index">
                        <div className="top-hourly-daily-forecast">
                            <div className="forecast-icon">
                                <img src={thermometerIcon}/>
                            </div>
                            <h3>UV INDEX</h3> 
                        </div>
                        <div className="uv-text-block">
                            <h2>3</h2>
                            <h5>Moderate</h5>
                        </div>
                        <div className="uv-gradient">
                            <div className={uvPostion[3] + " uv-gradient-marker"}></div>
                        </div>
                        <h3 className="text-xs">Use sun protection until 16:00</h3>
                    </div>
                    <div className="wind">
                        <div className="top-hourly-daily-forecast">
                            <div className="forecast-icon">
                                <img src={windIcon}/>
                            </div>
                            <h3>WIND</h3>
                       </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default App
