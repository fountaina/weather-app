import "../styles/App.css";
import React from 'react';
import locationIcon from "/images/location.png"

const App = () => {
  return (
    <div className="main-page">
      <div className="current-block">
        <div className="search-block">
          <img className="" src={locationIcon} alt="" />
          <input className="search-bar" placeholder="Lagos, Nigeria"></input>
        </div>
      </div>
      <div className="forecast-block">
        this is the forecast block
      </div>
    </div>
  )
}

export default App