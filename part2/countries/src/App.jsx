import { useState, useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";
// import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (filteredCountries.length !== 0 && filteredCountries[0].capital) {
      weatherService.getWeather(filteredCountries[0].capital, api_key).then((response) => {
        setWeather(response.data);
      });
    }
  }, [filteredCountries]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCountryClick = (country) => {
    setFilter(country.name.common);
  };

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <ul>
        {filteredCountries.length == 1 ? (
          filteredCountries.map((country) => (
            <div>
              <h1>{country.name.common}</h1>
              <p>capital {country.capital}</p>
              <p>area {country.area} </p>
              <b>languages:</b>
              <ul>
                {Object.values(country.languages).map((language) => (
                  <li>{language}</li>
                ))}
              </ul>
              <img src={country.flags.png}></img>
              {weather ? (
                <>
                  <h1>weather in {country.capital}</h1>
                  <p>temperature: {weather.main.temp}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  ></img>
                  <p>wind {weather.wind.speed}</p>
                </>
              ) : (
                ""
              )}
            </div>
          ))
        ) : filteredCountries.length <= 10 ? (
          filteredCountries.map((country) => (
            <li>
              <span>{country.name.common}</span>
              <button onClick={() => handleCountryClick(country)}>show</button>
            </li>
          ))
        ) : (
          <span>Too many matches, specify another filter</span>
        )}
      </ul>
    </div>
  );
};

export default App;
