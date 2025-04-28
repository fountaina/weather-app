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
import ThunderstormSlighHailIcon from "/images/thunderstorm-slight-hail.png"
import ThunderstormHeavyHailIcon from "/images/thunderstorm-heavy-hail.png"
import ThunderstormIcon from "/images/thunderstorm.png"
import HeavySnowIcon from "/images/heavy-snow.png"
import StormyRainIcon from "/images/stormy-rain.png"
import GrainySnow from "/images/grainy-snow.png"
import BlowingSnow from "/images/blowing-snow.png"
import ModerateSnow from "/images/moderate-snow.png"
import Snowflake from "/images/snowflake.png";
import FreezingRain from "/images/freezing-rain.png";
import HeavyRain from "/images/heavy-rain.png";
import ModerateRain from "/images/moderate-rain.png";
import SunRain from "/images/sun-rain.png";
import Icedropplets from "/images/ice-droplets.png";
import SnowRain from "/images/snow-rain.png";
import drizzleIcon from "/images/drizzle.png";
import RimeFogIcon from "/images/rime-fog.png";
import FogIcon from "/images/fog.png";
import CloudsIcon from "/images/clouds.png";
import PartlyCloudyIcon from "/images/partly-cloudy.png";
import SunIcon from "/images/sun.png";

import { fetchWeatherApi } from 'openmeteo';


const params = {
    "latitude": [6.4541, 9.0579],
    "longitude": [3.3947, 7.4951],
    "daily": "uv_index_max",
    "hourly": ["temperature_2m", "visibility", "weather_code"],
    "current": ["temperature_2m", "wind_speed_10m", "wind_gusts_10m", "apparent_temperature", "precipitation", "rain", "relative_humidity_2m", "weather_code"],
    "timezone": "auto",
    "precipitation_unit": "inch"
};

const URL = "https://api.open-meteo.com/v1/forecast"

const currentHour = new Date().getHours();

function getHourString(hoursToAdd) {
    // Get the hours in 24-hour format
    const now = new Date();
    now.setHours(now.getHours() + hoursToAdd);
    const futureHour = String(now.getHours()).padStart(2, '0') + ":00";
    return futureHour;
}

export function getWeatherCodeData(code, weatherCodes) {
    // Gets the data (including Icon) attached to the weather wmo code.
    const weatherCodeData = weatherCodes.find(weatherCode => weatherCode.code === code); 
    return weatherCodeData;
};


function getWeatherIcon(code, weatherCodes) {
    const icon = getWeatherCodeData(code, weatherCodes).icon;
    return icon;
};

 export const weatherCodes = [
        {
            code: 0,
            type: "Clear",
            description: "Clear sky",
            icon: SunIcon,
            severity: 0
        },
        {
            code: 1,
            type: "Partly Cloudy",
            description: "Mainly clear (0-25% clouds)",
            icon: PartlyCloudyIcon,
            severity: 0
        },
        {
            code: 2,
            type: "Partly Cloudy",
            description: "Partly cloudy (25-50% clouds)",
            icon: PartlyCloudyIcon,
            severity: 0
        },
        {
            code: 3,
            type: "Overcast",
            description: "Fully cloudy (100% clouds)",
            icon: CloudsIcon,
            severity: 0
        },
        {
            code: 45,
            type: "Fog",
            description: "Fog (visibility <1km)",
            icon: FogIcon,
            severity: 1
        },
        {
            code: 48,
            type: "Fog",
            description: "Depositing rime fog",
            icon: RimeFogIcon,
            severity: 1
        },
        // Precipitation (Rain/Drizzle/Snow)
        {
            code: 51,
            type: "Drizzle",
            description: "Light drizzle",
            icon: drizzleIcon,
            severity: 1
        },
        {
            code: 53,
            type: "Drizzle",
            description: "Moderate drizzle",
            icon: drizzleIcon,
            severity: 2
        },
        {
            code: 55,
            type: "Drizzle",
            description: "Dense drizzle",
            icon: drizzleIcon,
            severity: 2
        },
        {
            code: 56,
            type: "Drizzle",
            description: "Light Freezing Drizzle",
            icon: SnowRain,
            severity: 2
        },
        {
            code: 57,
            type: "Drizzle",
            description: "Dense Freezing Drizzle",
            icon: Icedropplets,
            severity: 2
        },
        {
            code: 61,
            type: "Rain",
            description: "Slight rain",
            icon: SunRain,
            severity: 1
        },
        {
            code: 63,
            type: "Rain",
            description: "Moderate rain",
            icon: ModerateRain, 
            severity: 2
        },
        {
            code: 65,
            type: "Rain",
            description: "Heavy rain",
            icon: HeavyRain, 
            severity: 3
        },
        // Freezing Precipitation
        {
            code: 66,
            type: "Freezing Rain",
            description: "Light freezing rain",
            icon: FreezingRain, 
            severity: 3
        },
        {
            code: 67,
            type: "Freezing Rain",
            description: "Heavy freezing rain",
            icon: FreezingRain, 
            severity: 4
        },
        // Snow
        {
            code: 71,
            type: "Snow",
            description: "Slight snowfall",
            icon: Snowflake, 
            severity: 1
        },
        {
            code: 73,
            type: "Snow",
            description: "Moderate snowfall",
            icon: ModerateSnow, 
            severity: 2
        },
        {
            code: 75,
            type: "Snow",
            description: "Heavy snowfall",
            icon: BlowingSnow, 
            severity: 3
        },
        {
            code: 77,
            type: "Snow Grains",
            description: "Ice pellets (no flakes)",
            icon: GrainySnow, 
            severity: 1
        },
        // Showers
        {
            code: 80,
            type: "Rain Shower",
            description: "Slight rain showers",
            icon: SunRain, 
            severity: 1
        },
        {
            code: 81,
            type: "Rain Shower",
            description: "Moderate rain showers",
            icon: ModerateRain, 
            severity: 2
        },
        {
            code: 82,
            type: "Rain Shower",
            description: "Violent rain showers",
            icon: StormyRainIcon, 
            severity: 3
        },
        {
            code: 85,
            type: "Snow Shower",
            description: "Slight snow showers",
            icon: ModerateSnow, 
            severity: 1
        },
        {
            code: 86,
            type: "Snow Shower",
            description: "Heavy snow showers",
            icon: HeavySnowIcon, 
            severity: 3
        },
        // Thunderstorms
        {
            code: 95,
            type: "Thunderstorm",
            description: "Moderate thunderstorm",
            icon: ThunderstormIcon, 
            severity: 3
        },
        {
            code: 96,
            type: "Thunderstorm",
            description: "Thunderstorm with slight hail",
            icon: ThunderstormSlighHailIcon, 
            severity: 4
        },
        {
            code: 99,
            type: "Thunderstorm",
            description: "Thunderstorm with heavy hail",
            icon: ThunderstormHeavyHailIcon, 
            severity: 5
        }
    ];


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
                const visibility = Math.round(response[0].hourly().variables(1).valuesArray()[0] * 0.0003048) // convert  ft  to KM
                const hourlyTemps = response[0].hourly().variables(0).valuesArray();
                const hourlyWeatherCodes = response[0].hourly().variables(2).valuesArray();

                setTempData({
                    currentTemp: currentTemp,
                    apparentTemp: apparentTemp,
                    precipitaion: precipitaion,
                    humidity: humidity,
                    windSpeed: windSpeed, 
                    gustSpeed: gustSpeed,
                    uvIndex: uvIndex,
                    visibility: visibility,
                    hourlyTemps: hourlyTemps,
                    hourlyWeatherCodes: hourlyWeatherCodes,
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
                        <Card 
                            icon={thermometerIcon} iconTitle="FEELS LIKE" value={loading ? "Loading..." : tempData.apparentTemp + "°"} 
                            note="Humidity is making it feel warmer"
                        />
                        <Card 
                            icon={precipitationIcon} iconTitle="PRECIPITATION" value={loading ? "Loading..." : tempData.precipitaion + '"'} 
                            subvalue="in last 24h" note='2" expected in the next 24h'
                        />
                        <Card 
                            icon={visibilityIcon} iconTitle="VISIBILITY" value={loading ? "Loading..." : tempData.visibility + " Km"}
                        />
                        <Card 
                            icon={humidityIcon} iconTitle="HUMIDITY" value={loading ? "Loading..." : tempData.humidity + "%"} 
                            note="The dew point is 25°C right now"
                        /> 
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
                        <HourlyCard time="Now" temperature= {loading ? "Loading..." : tempData.currentTemp + "°"} 
                            temperatureIcon={loading ? "Loading..." : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour], weatherCodes)} 
                        />
                        <HourlyCard 
                            time={getHourString(1)} temperature={loading ? "Loading..." : Math.floor(tempData.hourlyTemps[currentHour + 1]) + "°"}
                            temperatureIcon={loading ? "Loading..." : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour + 1], weatherCodes)} 
                        />
                        <HourlyCard time={getHourString(2)} temperature={ loading ? 'Loading..' : Math.floor(tempData.hourlyTemps[currentHour + 2]) + "°" } 
                            temperatureIcon={loading ? "Loading..." : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour + 2], weatherCodes)} 
                        />
                        <HourlyCard time={getHourString(3)}  temperature={ loading ? 'Loading..' : Math.floor(tempData.hourlyTemps[currentHour + 3]) + "°" }
                            temperatureIcon={loading ? "Loading..." : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour + 3], weatherCodes)} 
                        />
                        <HourlyCard time={getHourString(4)}  temperature={ loading ? 'Loading..' : Math.floor(tempData.hourlyTemps[currentHour + 4]) + "°" }
                            temperatureIcon={loading ? "Loading..." : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour + 4], weatherCodes)} 
                        />
                        <HourlyCard time={getHourString(5)}  temperature={ loading ? 'Loading..' : Math.floor(tempData.hourlyTemps[currentHour + 5]) + "°" }
                            temperatureIcon={loading ? "Loading..." : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour + 5], weatherCodes)}
                        />
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
