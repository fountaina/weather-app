import React from 'react';
import "../../styles/HourlyCard.css";

const DailyCard = ({ dateIncrease, temperature, temperatureIcon }) => {
    const DayOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const today = new Date()
    const nextDay = new Date(today)
    nextDay.setDate(today.getDate() + dateIncrease)

    let day = nextDay.getDay()
    let nextDayStr = String(nextDay.getDate()).padStart(2, '0')
    let month = String(today.getMonth() + 1).padStart(2, '0')
    let date = `${nextDayStr}/${month}`
    return (
        <div className={dateIncrease === 0 ? "bg-gray-700 daily-card" : "daily-card"}>
            <h3 className="day">{dateIncrease === 0 ? "Today" : DayOfTheWeek[day]}</h3>
            <h5 className="date">{date}</h5>
            <h2 className="daily-temp">{temperature}</h2>
            <img className="daily-img" src={temperatureIcon} />
        </div>
    )
}
export default DailyCard
