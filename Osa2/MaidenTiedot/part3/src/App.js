import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ searchName, handleFilterChange }) => (
  <>
    <div>
      <div>
        <input value={searchName} onChange={handleFilterChange} />
      </div>
    </div>
    <div>
      <button type="submit">Etsi</button>
    </div>
  </>
);

const CountryList = ({ countries, searchName, handleButtonClick }) => {
  const foundCountries = countries.filter(({ name }) =>
    name.toLowerCase().includes(searchName.toLowerCase())
  );
  console.log(foundCountries);
  if (foundCountries.length > 10) {
    return "Liian monta tulosta, tarkenna hakuehtoja!";
  } else if (foundCountries.length < 10 && foundCountries.length > 1) {
    return (
      <>
        {foundCountries.map((country) => (
          <div key={country.name}>
            <p>
              {country.name}
              <button onClick={handleButtonClick} value={country.name}>
                Näytä
              </button>
            </p>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        {foundCountries.map((country) => (
          <div key={country.name}>
            <h4>{country.name}</h4>
            <p>Pääkaupunki {country.capital}</p>
            <p>Väkiluku {country.population}</p>
            <h4>Kielet</h4>
            <ul>
              {country.languages.map((lng) => (
                <li key={lng.name}>{lng.name}</li>
              ))}{" "}
            </ul>
            <img src={country.flag} width="150" alt="The country flag"></img>
          </div>
        ))}
      </>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleButtonClick = (event) => setSearchName(event.target.value);

  return (
    <div>
      <h1>Maiden tietoja</h1>
      <h2>Etsi maan nimellä</h2>
      <Filter searchName={searchName} handleFilterChange={handleFilterChange} />
      <CountryList
        countries={countries}
        searchName={searchName}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default App;
