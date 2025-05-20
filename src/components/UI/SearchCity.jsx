import "../../styles/Search.css";
import { useState, useEffect } from "react";
import locationIcon from "/images/location.png"
import axios from "axios";
import SearchIcon from "/images/search.png"
import cancelIcon from "/images/cancel.png"
import { CircleFlag } from 'react-circle-flags'


function SearchCity(props) {
    const [citySearch, setCitySearch] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const [placeholder, setPlaceholder] = useState("Lagos, Nigeria")

    const handleSearch = (event) => {
        setInput(event.target.value);
        // if (event.target.value.length > 0) {
        //     setIsVisible(true);
        // } else {
        //     setIsVisible(false);
        // }
    }

    const handleOptionClick = (city) => {
        console.log("This is city data: " + JSON.stringify(city))
        props.getCityData(city.latitude, city.longitude);
        // setInput(`${city.name}, ${city.admin1}, ${city.country}`);
        setPlaceholder(`${city.name}, ${city.admin1} ${city.country}`)
        setIsVisible(false)
        console.log("You clicked this city " + city.name + " ", city.country)
    }

    const handleBlur = () => {
        setIsVisible(false)
    }

    const findCity = async () => {
        try {
            const results = await axios.get(
                'https://geocoding-api.open-meteo.com/v1/search',
                {
                    params: {
                        name: input,
                        count: 10,
                    }
                }
            )
            setCitySearch(results.data.results);
            setLoading(false)
            setIsVisible(true)
            setErrorMessage("")
        } catch (error) {
            setIsVisible(true)
            setErrorMessage("--Please check your Internet connection and try again!--")
            console.log("Error fetching city: " + error)
        } finally {
            console.log("This line is trying to run, at least")
        }
    }

    useEffect(() => {
        if (!loading && citySearch) {
            console.log("Results: ", citySearch);
        }
    }, [loading, citySearch]);

    return (
        <div className="search-block">
            <div className={isVisible ? "py-2 search-top-block" : "search-top-block"}>
                {
                    isVisible ?
                        <img src={cancelIcon} alt="" onClick={() => setIsVisible(false)} />
                        : <img className="" src={locationIcon} alt="" />
                }
                <input
                    className="search-bar"
                    onChange={handleSearch}
                    // onBlur={handleBlur} // Is activated when an elements loses focus.
                    placeholder={placeholder}
                ></input>
                <img className="search-icon" src={SearchIcon} onClick={findCity} alt="" />
            </div>
            {
                isVisible && !errorMessage ? (
                    <div className="search-extension">
                        {
                            !loading && citySearch ?
                                citySearch.map((city) => (
                                    <li
                                        key={city.id}
                                        style={{ listStyleType: 'none' }}
                                        onClick={() => handleOptionClick(city)}
                                    >
                                        {/* <img src={SearchIcon} /> */}
                                        <CircleFlag countryCode={city.country_code.toLocaleLowerCase()} height="35" />
                                        {city.name}, {city.admin1}, {city.country}
                                    </li>
                                ))
                                : <li className="flex justify-center items-center"><em>---No results Found---</em></li>
                        }
                    </div>
                )
                    : (<li className="text-sm"><em>{errorMessage}</em></li>)
            }
        </div >
    )
}

export default SearchCity
