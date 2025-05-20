import "../styles/App.css";
import React, { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import locationIcon from "/images/location.png"
import weatherCodes from "./WeatherCodes.js";
import Card from "./UI/Card";
import HourlyCard from "./UI/HourlyCard.jsx";
import DailyCard from "./UI/DailyCard.jsx";
import thermometerIcon from "/images/thermometer.png";
import visibilityIcon from "/images/eye.png";
import humidityIcon from "/images/humidity.png";
import precipitationIcon from "/images/blood-drop.png";
import clockIcon from "/images/clock.png";
import calendarIcon from "/images/calendar.png";
import windIcon from "/images/wind.png";
import compassIcon from "/images/compass.png";
import nightIcons from "./NightWeatherIcons.js";
import SearchCity from "./UI/SearchCity.jsx";
import {DateTime} from "luxon"

const URL = "https://api.open-meteo.com/v1/forecast"

const currentHour = new Date().getHours();

export function getWeatherCodeData(code, weatherCodes) {
    // Gets the data (including Icon) attached to the weather wmo code.
    const weatherCodeData = weatherCodes.find(weatherCode => weatherCode.code === code);
    return weatherCodeData;
};

function getNightIcon(code) {
    // Gets icons when it is night 
    if (code <= 3) {
        return nightIcons.nightIcon
    } else if (code <= 48) {
        return nightIcons.nightFoggyIcon
    } else if (code <= 67) {
        return nightIcons.nightRain
    } else if (code <= 77) {
        return nightIcons.nightSnowy
    } else if (code <= 82) {
        return nightIcons.nightRain
    } else if (code <= 86) {
        return nightIcons.nightSnowy
    } else {
        return nightIcons.nightThunderstorm
    }
}

function getWeatherIcon(code, weatherCodes, hour, sunset, sunrise) {
    // Gets the weatherIcon for based on the weather wmo code
    // if (isDay) {
    //     const icon = getWeatherCodeData(code, weatherCodes).icon;
    //     return icon;
    // } else {
    //     const icon = getNightIcon(code)
    //     return icon;
    // }
    if (hour >= sunrise && hour <= sunset) {
        const icon = getWeatherCodeData(code, weatherCodes).icon;
        return icon;
    } else if (hour < sunrise || hour > sunset) {
        const icon = getNightIcon(code)
        return icon;
    }
};

function getWeatherIconDaily(code, weatherCodes) {
    // Gets the weatherIcon for based on the weather wmo code for Daily forecast
    const icon = getWeatherCodeData(code, weatherCodes).icon;
    return icon;
};

function getWeatherType(code, weatherCodes) {
    const weatherType = getWeatherCodeData(code, weatherCodes).type
    return weatherType;
}

function getWeatherDescription(code, weatherCodes) {
    const description = getWeatherCodeData(code, weatherCodes).description
    return description
}

const App = () => {
    const [tempData, setTempData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [longitude, setLongitude] = useState(3.3947)
    const [latitude, setLatitude] = useState(6.4541)

    const params = {
        "latitude": latitude,
        "longitude": longitude,
        "daily": ["uv_index_max", "weather_code", "temperature_2m_max", "precipitation_sum", "sunset", "sunrise"],
        "hourly": ["temperature_2m", "visibility", "weather_code"],
        "current": [
            "temperature_2m", "wind_speed_10m", "wind_gusts_10m",
            "apparent_temperature", "precipitation", "rain", "relative_humidity_2m", "weather_code", "is_day"
        ],
        "timezone": "auto",
        "precipitation_unit": "inch"
    };

    // function getHourString(hoursToAdd) {
    //     // Get the hours in 24-hour format
    //     const now = new Date();
    //     now.setHours(now.getHours() + hoursToAdd);
    //     const futureHour = String(now.getHours()).padStart(2, '0') + ":00";
    //     return futureHour;
    // }
    
    function getHourString(hoursToAdd, timezone) {
        // Get the hours in 24-hour format
        const dt = DateTime.now().plus({ hours: hoursToAdd }).setZone(timezone);
        const futureHour = String(dt.hour).padStart(2, "0") + ":00" // dt.toFormat('HH:mm');
        return futureHour;
    }

    // function getHourValue(hoursToAdd) {
    //     // Get the hour value
    //     const now = new Date();
    //     now.setHours(now.getHours() + hoursToAdd);
    //     const futureHourValue = now.getHours();
    //     return futureHourValue;
    // }

    function getHourValue(hoursToAdd, timezone) {
        // Get the hour value
        const dt = DateTime.now().plus({ hours: hoursToAdd }).setZone(timezone);
        const futureHourValue = dt.hour;
        return futureHourValue;
    }

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

    const getHumidityNote = () => {
        // gets a note based on the humdity value
        if (tempData.humidity <= 30) {
            return "Dry air, skin may feel dry"
        } else if (tempData.humidity <= 50) {
            return "Comfortable Humidity"
        } else if (tempData.humidity <= 65) {
            return "Slightly Humid"
        } else if (tempData.humidity <= 75) {
            return "Humid, may feel sticky"
        } else if (tempData.humidity <= 85) {
            return "Very Humid, discomfort likely"
        } else {
            return "Oppressive Humidity"
        }
    }

    const getVisibilityNote = (visibilityKm) => {
        // gets a note based on the visibility value
        if (visibilityKm > 10) {
            return "Clear visibility";
        } else if (visibilityKm > 6) {
            return "Good visibility";
        } else if (visibilityKm > 4) {
            return "Moderate visibility";
        } else if (visibilityKm > 2) {
            return "Low visibility";
        } else if (visibilityKm > 1) {
            return "Poor visibility";
        } else {
            return "Very poor visibility";
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

    const handleCityData = (latitude, longitude) => {
        setLoading(true)
        setLatitude(latitude)
        setLongitude(longitude)
        console.log("New city Data: " + "Latitude: " + latitude + "Longitude: " + longitude)
    }

    useEffect(() => {
        const fetchWeatherData = async (maxRetries = 10) => {
            let retryAttempt = 0; // counts the number of times API connection retry is done

            function delay(ms) {
                // delays the retry by the given number of seconds
                return new Promise(resolve => setTimeout(resolve, ms))
            }

            while (retryAttempt < maxRetries) {
                let error = null;
                try {
                    const responses = await fetchWeatherApi(URL, params)
                    const response = responses[0];

                    // Attributes for timezone and location
                    const utcOffsetSeconds = response.utcOffsetSeconds();
                    const timezone = response.timezone();
                    const timezoneAbbreviation = response.timezoneAbbreviation();
                    const latitude = response.latitude();
                    const longitude = response.longitude();

                    const current = response.current();
                    const hourly = response.hourly();
                    const daily = response.daily();

                    const currentTemp = Math.floor(current.variables(0).value())
                    const currentWeatherCode = current.variables(7).value()
                    const windSpeed = Math.floor(current.variables(1).value())
                    const gustSpeed = Math.floor(current.variables(2).value())
                    const apparentTemp = Math.floor(current.variables(3).value())
                    const precipitation = Math.ceil(current.variables(4).value() * 10000) / 10000
                    const humidity = current.variables(6).value()
                    const uvIndex = Math.round(daily.variables(0).valuesArray()[0])
                    const visibility = Math.round(hourly.variables(1).valuesArray()[0] * 0.0003048) // convert  ft  to KM
                    const hourlyTemps = hourly.variables(0).valuesArray();
                    const hourlyWeatherCodes = hourly.variables(2).valuesArray();
                    const dailyWeatherCodes = daily.variables(1).valuesArray();
                    const dailyTemp = daily.variables(2).valuesArray()
                    const tomorrowPrecipitation = Math.round(daily.variables(3).valuesArray()[1]);
                    const isDay = current.variables(8).value()
                    const sunset = daily.variables(4)
                    const sunrise = daily.variables(5)
                    const time = new Date((Number(current.time())) * 1000)

                    const sunsetToday = [...Array(sunset.valuesInt64Length())].map((_, i) => new Date((Number(sunset.valuesInt64(i))) * 1000));
                    const sunriseToday = [...Array(sunrise.valuesInt64Length())].map((_, i) => new Date((Number(sunrise.valuesInt64(i))) * 1000));

                    setTempData({
                        currentTemp: currentTemp,
                        currentWeatherCode: currentWeatherCode,
                        apparentTemp: apparentTemp,
                        precipitation: precipitation,
                        humidity: humidity,
                        windSpeed: windSpeed,
                        gustSpeed: gustSpeed,
                        uvIndex: uvIndex,
                        visibility: visibility,
                        hourlyTemps: hourlyTemps,
                        hourlyWeatherCodes: hourlyWeatherCodes,
                        dailyWeatherCodes: dailyWeatherCodes,
                        dailyTemp: dailyTemp,
                        tomorrowPrecipitation: tomorrowPrecipitation,
                        isDay: isDay,
                        time: time,
                        timezone: timezone,
                        sunset: sunsetToday[0].getHours(),
                        sunrise: sunriseToday[0].getHours(),
                    })
                    // setTempData([currentTemp, apparentTemp, precipitaion, humidity, windSpeed, gustSpeed])
                    console.log(tempData)

                } catch (err) {
                    retryAttempt++
                    error = err
                    console.warn("Error Message: " + err.message + " Retrying...")
                    await delay(5000)
                    continue;
                } finally {
                    if (!error) {
                        setLoading(false)
                        break;
                    }
                }
                break;
            }
        }
        fetchWeatherData();
    }, [latitude, longitude]);

    useEffect(() => {
        console.log("Temperature Data: " + tempData)
        // console.log("UV-index: " + tempData.uvIndex)
    }, [tempData]);

    return (
        <div className="main-page">
            <div className="current-block">
                {/* <div className="search-block"> */}
                {/*     <img className="" src={locationIcon} alt="" /> */}
                {/*     <input className="search-bar" placeholder="Lagos, Nigeria"></input> */}
                {/* </div> */}
                <SearchCity getCityData={handleCityData} />
                <div className="current-display relative">
                    {/* <video */}
                    {/*     autoPlay */}
                    {/*     loop */}
                    {/*     muted */}
                    {/*     playsInline */}
                    {/*     className="absolute top-0 left-0 w-full h-full object-cover opacity-30 pointer-events-none z-0 rounded-2xl" */}
                    {/* > */}
                    {/*     <source src="/videos/rain.mp4" type="video/mp4" /> */}
                    {/*     Your browser does not support the video tag. */}
                    {/* </video> */}
                    <div className="top-current-display">
                        <h1 className="temp">{loading ? "---" : tempData.currentTemp}<sup>&deg;C</sup></h1>
                        <h2 className="weather">
                            {loading ?
                                "---" :
                                getWeatherType(tempData.currentWeatherCode, weatherCodes)
                            }
                        </h2>
                        <p className="weather-note">
                            {loading ? "---" : getWeatherDescription(tempData.currentWeatherCode, weatherCodes)}
                            {loading ? "" : ` | This is sunset today: ${tempData.sunset}`}
                        </p>
                    </div>
                    <div className="bottom-current-display">
                        <Card
                            icon={thermometerIcon}
                            iconTitle="FEELS LIKE" value={loading ? "---" : tempData.apparentTemp + "°"}
                            note={
                                !loading
                                    ? tempData.currentTemp > tempData.apparentTemp
                                        ? "Feels cooler due to wind or damp air"
                                        : "Feels warmer than actual"
                                    : "---"
                            }
                        />
                        <Card
                            icon={precipitationIcon}
                            iconTitle="PRECIPITATION" value={loading ? "---" : tempData.precipitation + '"'}
                            subvalue="in last 24h"
                            note={loading ? "---" : `${tempData.tomorrowPrecipitation}" expected in the next 24h`}
                        />
                        <Card
                            icon={visibilityIcon}
                            iconTitle="VISIBILITY"
                            value={loading ? "---" : tempData.visibility + " Km"}
                            note={loading ? "---" : getVisibilityNote(tempData.visibility)}
                        />
                        <Card
                            icon={humidityIcon} iconTitle="HUMIDITY"
                            value={loading ? "---" : tempData.humidity + "%"}
                            note={loading ? "---" : getHumidityNote()}
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
                    <hr className="top-hr" />
                    <div className="mid-hourly-daily-forecast">
                        <HourlyCard
                            time="Now"
                            temperature={loading ? "---" : tempData.currentTemp + "°"}
                            temperatureIcon={
                                loading ?
                                    "---"
                                    : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour], weatherCodes, getHourValue(0, tempData.timezone), tempData.sunset, tempData.sunrise)
                            }
                        />
                        <HourlyCard
                            time={loading ? "---" : getHourString(1, tempData.timezone)}
                            temperature={loading ? "---" : Math.floor(tempData.hourlyTemps[currentHour + 1]) + "°"}
                            temperatureIcon={
                                loading ?
                                    "---"
                                    : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour + 1], weatherCodes, getHourValue(1, tempData.timezone), tempData.sunset, tempData.sunrise)
                            }
                        />
                        <HourlyCard
                            time={loading ? "---" : getHourString(2, tempData.timezone)}
                            temperature={loading ? '---' : Math.floor(tempData.hourlyTemps[currentHour + 2]) + "°"}
                            temperatureIcon={
                                loading ?
                                    "---"
                                    : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour + 2], weatherCodes, getHourValue(2, tempData.timezone), tempData.sunset, tempData.sunrise)
                            }
                        />
                        <HourlyCard
                            time={loading ? "---" : getHourString(3, tempData.timezone)}
                            temperature={loading ? '---' : Math.floor(tempData.hourlyTemps[currentHour + 3]) + "°"}
                            temperatureIcon={
                                loading ?
                                    "---"
                                    : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour + 3], weatherCodes, getHourValue(3, tempData.timezone), tempData.sunset, tempData.sunrise)
                            }
                        />
                        <HourlyCard
                            time={loading ? "---" : getHourString(4, tempData.timezone)}
                            temperature={loading ? '---' : Math.floor(tempData.hourlyTemps[currentHour + 4]) + "°"}
                            temperatureIcon={
                                loading ?
                                    "---"
                                    : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour + 4], weatherCodes, getHourValue(4, tempData.timezone), tempData.sunset, tempData.sunrise)
                            }
                        />
                        <HourlyCard
                            time={loading ? "---" : getHourString(5, tempData.timezone)}
                            temperature={loading ? '---' : Math.floor(tempData.hourlyTemps[currentHour + 5]) + "°"}
                            temperatureIcon={
                                loading ?
                                    "---"
                                    : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour + 5], weatherCodes, getHourValue(5, tempData.timezone), tempData.sunset, tempData.sunrise)
                            }
                        />
                        <HourlyCard
                            time={loading ? "---" : getHourString(6, tempData.timezone)}
                            temperature={loading ? '---' : Math.floor(tempData.hourlyTemps[currentHour + 5]) + "°"}
                            temperatureIcon={
                                loading ?
                                    "---"
                                    : getWeatherIcon(tempData.hourlyWeatherCodes[currentHour + 6], weatherCodes, getHourValue(6, tempData.timezone), tempData.sunset, tempData.sunrise)
                            }
                        />
                    </div>
                    <hr className="bottom-hr" />
                </div>
                <div className="hourly-daily-forecast">
                    <div className="top-hourly-daily-forecast">
                        <div className="forecast-icon">
                            <img src={calendarIcon} />
                        </div>
                        <h3>7-DAY FORECAST</h3>
                    </div>
                    <hr className="top-hr" />
                    <div className="mid-hourly-daily-forecast">
                        <DailyCard
                            // date={loading ? "---" : `${tempData.currentTime[2]}/${tempData.currentTime[1]}`}
                            dateIncrease={0}
                            temperature={loading ? "---" : `${tempData.currentTemp}°`}
                            temperatureIcon={
                                loading ?
                                    "---" : getWeatherIconDaily(tempData.dailyWeatherCodes[0], weatherCodes)
                            }
                        />

                        <DailyCard
                            dateIncrease={1}
                            temperature={loading ? "---" : `${Math.floor(tempData.dailyTemp[1])}°`}
                            temperatureIcon={
                                loading ?
                                    "---" :
                                    getWeatherIconDaily(tempData.dailyWeatherCodes[1], weatherCodes)
                            }
                        />
                        <DailyCard
                            dateIncrease={2}
                            temperature={loading ? "---" : `${Math.floor(tempData.dailyTemp[2])}°`}
                            temperatureIcon={
                                loading ?
                                    "---" : getWeatherIconDaily(tempData.dailyWeatherCodes[2], weatherCodes)
                            }
                        />
                        <DailyCard
                            dateIncrease={3}
                            temperature={loading ? "---" : `${Math.floor(tempData.dailyTemp[3])}°`}
                            temperatureIcon={
                                loading ?
                                    "---" : getWeatherIconDaily(tempData.dailyWeatherCodes[3], weatherCodes)
                            }
                        />
                        <DailyCard
                            dateIncrease={4}
                            temperature={loading ? "---" : `${Math.floor(tempData.dailyTemp[4])}°`}
                            temperatureIcon={
                                loading ?
                                    "---" : getWeatherIconDaily(tempData.dailyWeatherCodes[4], weatherCodes)
                            }
                        />
                        <DailyCard
                            dateIncrease={5}
                            temperature={loading ? "---" : `${Math.floor(tempData.dailyTemp[5])}°`}
                            temperatureIcon={
                                loading ?
                                    "---" : getWeatherIconDaily(tempData.dailyWeatherCodes[5], weatherCodes)
                            }
                        />
                        <DailyCard
                            dateIncrease={6}
                            temperature={loading ? "---" : `${Math.floor(tempData.dailyTemp[6])}°`}
                            temperatureIcon={
                                loading ?
                                    "---" : getWeatherIconDaily(tempData.dailyWeatherCodes[6], weatherCodes)
                            }
                        />
                    </div>
                    <hr className="bottom-hr" />
                </div>
                <div className="bottom-forecast">
                    <div className="uv-index">
                        <div className="top-hourly-daily-forecast">
                            <div className="forecast-icon">
                                <img src={thermometerIcon} />
                            </div>
                            <h3>UV INDEX</h3>
                        </div>
                        <div className="uv-text-block">
                            <h2>{loading ? "---" : tempData.uvIndex}</h2>
                            <h5 className="mb-1">
                                {loading ? "---" : getUvIndexLevel()}
                            </h5>
                        </div>
                        <div className="uv-gradient">
                            <div className={
                                !loading
                                    ? `${getUvGradientPos(tempData.uvIndex)} uv-gradient-marker`
                                    : "left-0 uv-gradient-marker"}
                            ></div>
                        </div>
                        <h3 className="text-xs mt-2">Predicted Maximum UV-Index for today</h3>
                    </div>
                    <div className="wind">
                        <div className="w-1/2">
                            <div className="top-hourly-daily-forecast">
                                <div className="forecast-icon">
                                    <img src={windIcon} />
                                </div>
                                <h3>WIND</h3>
                            </div>
                            <div className="wind-text-block-top">
                                <div className="flex items-center">
                                    <h2 className="text-4xl">{loading ? "---" : tempData.windSpeed}</h2>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 font-semibold">km/h</h3>
                                    <h3 className="font-semibold">Wind</h3>
                                </div>
                            </div>
                            <hr className="mt-2 w-full top-hr" />
                            <div className="wind-text-block-top">
                                <div className="flex items-center">
                                    <h2 className="text-4xl">{loading ? "---" : tempData.gustSpeed}</h2>
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
