import React from 'react'

const Country = ({ country, weather, condition }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => {
          return (
            <li key={language.name}>{language.name}</li>
          )
        }
        )}
      </ul>
      <img src={country.flag} alt='flag' height="10%" width="10%" />
      <h3>Weather in {country.capital}</h3>
      <div><b>temperature:</b> {weather.temp_c} Celsius</div>
      <img src={`http:${condition.icon}`} alt='icon'></img>
      <div><b>wind:</b> {weather.wind_kph} kph direction {weather.wind_dir}</div>
    </div>
  )
}

export default Country