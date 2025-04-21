import React from 'react'
import "../../styles/Card.css"
const Card = ({icon, iconTitle, value, subvalue, note}) => {
  return (
    <div className='card'>
        <div className='top'>
            <img src={icon} alt="" />
            <h3>{iconTitle}</h3>
        </div>
        <div className='mid'>
            <h2>{value}</h2>
            <h4 className="text-sm">{subvalue}</h4>
        </div>
        <div className='bottom'>
            <p>{note}</p>
        </div>
    </div>
  )
}

export default Card
