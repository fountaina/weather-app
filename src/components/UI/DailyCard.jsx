import React from 'react'
import "../../styles/HourlyCard.css"
import { DateTime } from "luxon"

const DailyCard = ({ dateIncrease, temperature, temperatureIcon, timezone }) => {
    // Component for displaying the weather information and date for 7-day forecast
    const today = DateTime.now().setZone(timezone)
    const nextDay = today.plus({ days: dateIncrease })
    const date = nextDay.toFormat("dd/MM")
    const day = nextDay.toFormat("ccc")

    return (
        <div className={dateIncrease === 0 ? "bg-gray-700 daily-card" : "daily-card"}>
            {/* <h3 className="day">{dateIncrease === 0 ? "Today" : DayOfTheWeek[day]}</h3> */}
            <h3 className="day">
                {
                    dateIncrease === 0 ?
                        "Today"
                        : !timezone ?
                            "---"
                            : day
                }</h3>
            <h5 className="date">{!timezone ? "---" : date}</h5>
            <h2 className="daily-temp">{temperature}</h2>
            <img className="daily-img" src={temperatureIcon} />
        </div>
    )
}
export default DailyCard
