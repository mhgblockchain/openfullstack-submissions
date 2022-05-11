const RenderedCountries = ({ countriesToSHow, setSearch }) => {
  if (countriesToSHow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
        <br />
        <br />
      </div>
    );
  } else if (countriesToSHow.length === 1) {
    return (
      <div>
        {countriesToSHow.map((country) => (
          <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
              {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img
              src={country.flags.png}
              alt={country.name.common}
              width="200"
              height="100"
            />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <ul>
          {countriesToSHow.map((country) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => setSearch(country.name.common)}>
                show
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default RenderedCountries;
