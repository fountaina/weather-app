import "../styles/App.css";
import React, {useEffect, useState} from 'react';
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
import compassIcon from "/images/compass.png";
import { fetchWeatherApi } from 'openmeteo';


const params = {
	"latitude": [6.4541, 9.0579],
	"longitude": [3.3947, 7.4951],
    "daily": "uv_index_max",
    "hourly": ["temperature_2m", "visibility"],
	"current": ["temperature_2m", "wind_speed_10m", "wind_gusts_10m", "apparent_temperature", "precipitation", "rain", "relative_humidity_2m", "weather_code"],
    "timezone": "auto"
};

const URL = "https://api.open-meteo.com/v1/forecast"

const App = () => {
    const [tempData, setTempData] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const getUvIndexLevel = () => {
        if (tempData.uvIndex <= 2) {
           return "Low" 
        } else if (tempData.uvIndex <= 5) {
           return "Moderate" 
        } else if (tempData.uvIndex <= 7) {
            return "High"
        } else if (tempData.uvIndex <= 10) {
            return "Very High"
        } else {
            return "Extreme"
        }
    }

const uvPostion = [
    "left-0", "left-[9%]",  "left-[18%]", "left-[27%]",  "left-[36%]", 
    "left-[45%]", "left-[54%]",  "left-[63%]",  "left-[72%]", "left-[81%]",  
    "left-[90%]",  "left-[97%]"
]
    const getUvGradientPos = (uvIndex) => {
        let gradientPos;

        switch (uvIndex) {
            case 0:
                gradientPos = "left-0"
                break;
            case 1:
                gradientPos = "left-[9%]"
                break;
            case 2:
                gradientPos = "left-[18%]"
                break;
            case 3:
                gradientPos = "left-[27%]"
                break;
            case 4:
                gradientPos = "left-[36%]"
                break
            case 5:
                gradientPos = "left-[45%]"
                break;
            case 6:
                gradientPos = "left-[54%]"
                break;
            case 7:
                gradientPos = "left-[63%]"
                break;
            case 8:
                gradientPos = "left-[72%]"
                break;
            case 9:
                gradientPos = "left-[81%]"
                break;
            case 10:
                gradientPos = "left-[90%]"
                break;
            case 11:
                gradientPos = "left-[97%]"
            default:
                gradientPos = "left-[97%]"
                break;
        }
        return gradientPos;
    }

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetchWeatherApi(URL, params)
                const currentTemp = Math.floor(response[0].current().variables(0).value())
                const windSpeed = Math.floor( response[0].current().variables(1).value() )
                const gustSpeed = Math.floor( response[0].current().variables(2).value() )
                const apparentTemp = Math.floor(response[0].current().variables(3).value())
                const precipitaion = response[0].current().variables(4).value()
                const humidity = response[0].current().variables(6).value()
                const uvIndex =  Math.round( response[0].daily().variables(0).valuesArray()[0] ) 
                const visibility = response[0].hourly().variables(1).valuesArray()[0] / 1000 // Dividing by 1000 to convert to convert meters to KM

                setTempData({
                    currentTemp: currentTemp,
                    apparentTemp: apparentTemp,
                    precipitaion: precipitaion,
                    humidity: humidity,
                    windSpeed: windSpeed, 
                    gustSpeed: gustSpeed,
                    uvIndex: uvIndex,
                    visibility: visibility,
                })
                // setTempData([currentTemp, apparentTemp, precipitaion, humidity, windSpeed, gustSpeed])
                console.log(tempData)
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchWeatherData();
    }, []);

    useEffect(() => {
        console.log("Temperature Data: " + tempData)
        // console.log("UV-index: " + tempData.uvIndex)
    }, [tempData]);

    return (
        <div className="main-page">
            <div className="current-block">
                <div className="search-block">
                    <img className="" src={locationIcon} alt="" />
                    <input className="search-bar" placeholder="Lagos, Nigeria"></input>
                </div>
                <div className="current-display">
                    <div className="top-current-display">                           
                        <h1 className="temp">{loading ? "Loading..." : tempData.currentTemp}<sup>&deg;C</sup></h1>
                        <h2 className="weather">Rainy Day</h2>
                        <p className="weather-note">Today, expect a rainy day with temperatures reaching a
                            maximum of 28&#8451;. Make sure you grab your umbrella and raincoat
                            before heading out.
                        </p>
                    </div>
                    <div className="bottom-current-display">
                        <Card icon={thermometerIcon} iconTitle="FEELS LIKE" value={loading ? "Loading..." : tempData.apparentTemp + "°"} note="Humidity is making it feel warmer"/>
                        <Card icon={precipitationIcon} iconTitle="PRECIPITATION" value={loading ? "Loading..." : tempData.precipitaion + '"'} subvalue="in last 24h" note='2" expected in the next 24h'/>
                        <Card icon={visibilityIcon} iconTitle="VISIBILITY" value={loading ? "Loading..." : tempData.visibility + " Km"}/>
                        <Card icon={humidityIcon} iconTitle="HUMIDITY" value={loading ? "Loading..." : tempData.humidity + "%"} note="The dew point is 25°C right now"/> 
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
                            <h2>{loading ? "Loading..." : tempData.uvIndex}</h2>
                            <h5 className="mb-1">
                                {loading ? "Loading..." : getUvIndexLevel()}
                            </h5>
                        </div>
                        <div className="uv-gradient">
                            {/* <div className={uvPostion[3] + " uv-gradient-marker"}></div> */}
                            <div className={!loading ?  `${getUvGradientPos(tempData.uvIndex)} uv-gradient-marker` : "left-0 uv-gradient-marker"}></div>
                            <div className={!loading ? console.log( getUvGradientPos(tempData.uvIndex) ) : "left-0" + " uv-gradient-marker"}></div>
                        </div>
                        <h3 className="text-xs mt-2">Use sun protection until 16:00</h3>
                    </div>
                    <div className="wind">
                        <div className="w-1/2">
                            <div className="top-hourly-daily-forecast">
                                <div className="forecast-icon">
                                    <img src={windIcon}/>
                                </div>
                                <h3>WIND</h3>
                            </div> 
                            <div className="wind-text-block-top">
                                <div className="flex items-center">  
                                    <h2 className="text-4xl">{loading ? "Loading..." : tempData.windSpeed}</h2>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 font-semibold">km/h</h3>
                                    <h3 className="font-semibold">Wind</h3>
                                </div>
                            </div>
                            <hr className="mt-2 w-full top-hr"/>
                            <div className="wind-text-block-top">
                                <div className="flex items-center">  
                                    <h2 className="text-4xl">{loading ? "Loading..." : tempData.gustSpeed}</h2>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 font-semibold">km/h</h3>
                                    <h3 className="font-semibold">Gusts</h3>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 pl-4 pt-3">
                            <img className="compass-img" src={compassIcon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>) 
}

export default App
