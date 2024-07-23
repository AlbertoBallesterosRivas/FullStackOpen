import { useState, useEffect } from "react";
import countryService from "./services/countries";
// import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCountryClick = (country) => {
    setFilter(country.name.common)
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  console.log(filteredCountries);
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

            </div>
          ))
        ) : filteredCountries.length <= 10 ? (
          filteredCountries.map((country) => <li><span>{country.name.common}</span><button onClick={() => handleCountryClick(country)}>show</button></li>)
        ) : (
          <span>Too many matches, specify another filter</span>
        )}

      </ul>
    </div>
  );
};

export default App;
