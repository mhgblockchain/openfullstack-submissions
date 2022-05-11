import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

import RenderedCountries from "./components/RenderedCountries";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);

  const fetchData = () => {
    const countriesAPI = "https://restcountries.com/v3.1/all";
    const city = "oslo";
    const api_key = process.env.REACT_APP_API_KEY;
    const weatherAPI = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`;

    const getCountry = axios.get(countriesAPI);
    const getWeather = axios.get(weatherAPI);

    axios.all([getCountry, getWeather]).then(
      axios.spread((...responses) => {
        const countries = responses[0].data;
        const weather = responses[1].data;
        console.log("countries", countries);
        console.log("weather", weather);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const countriesToSHow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  // const Search = ({ handleSearch, search }) => {
  //   return (
  //     <form>
  //       <label>
  //         Search the countries:
  //         <input
  //           type="text"
  //           value={search}
  //           onChange={(e) => setSearch(e.target.value)}
  //         />
  //       </label>
  //     </form>
  //   );
  // };

  const Weather = () => {
    return <h1>dsc</h1>;
  };

  return (
    <div>
      <h1>Countries</h1>
      {/* <Search search={search} handleSearch={handleSearch} /> */}
      <form>
        <label>
          Search the countries:
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </form>
      <RenderedCountries
        countriesToSHow={countriesToSHow}
        setSearch={setSearch}
      />
      <Weather />
    </div>
  );
}

export default App;
