import React from 'react';
import "../../styles/HourlyCard.css";

const DailyCard = ({day, date, temperature, temperatureIcon}) => {
    return (
        <div className={day === "Today" ? "bg-gray-700 daily-card" : "daily-card"}>
            <h3 className="day">{day}</h3>
            <h5 className="date">{date}</h5>
            <h2 className="daily-temp">{temperature}</h2>
            <img className="daily-img" src={temperatureIcon}/>
        </div>
    )
} 
export default DailyCard
