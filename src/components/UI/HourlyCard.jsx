import "../../styles/HourlyCard.css";
import React from 'react';
import {weatherCodes, getWeatherCodeData} from "../App.jsx";

const HourlyCard = ({time, temperature, temperatureIcon}) => {
    return (
        <>
            <div className={time === "Now" ? "bg-gray-700 hourly-card" : "hourly-card"}>
                <h3 className="time">{time}</h3>
                <h2 className="hourly-temp">{temperature}</h2>
                <img className="hourly-img" src={temperatureIcon}/>
            </div>
        </>
    );
}
export default HourlyCard
