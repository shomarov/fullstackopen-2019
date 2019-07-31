import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [search, setSearch] = useState('')
  const [initialCountries, setInitialCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState({})
  const [condition, setCondition] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(result => setInitialCountries(result.data)
      )
  }, [])

  useEffect(() => {
    if (country !== null) {
      axios
        .get(`http://api.apixu.com/v1/forecast.json?key=a8bfc100669348f5bf1172910190407&q=${country.capital}`)
        .then(response => {
          setWeather(response.data.current)
          setCondition(response.data.current.condition)
        })
    }
  }, [country])

  const handleSearchChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    filterCountries(newSearch)
  }

  const filterCountries = (newSearch) => {
    const newCountries = initialCountries.filter(country =>
      country.name.toLowerCase().includes(newSearch.trim().toLowerCase()))

    setFilteredCountries(newCountries)

    if (newCountries.length !== 1) {
      setCountry(null)
    } else if (newCountries.length === 1) {
      setCountry(newCountries[0])
    }

  }

  const handleShowCountryButton = (country) => {
    setCountry(country)
  }

  return (
    <div>
      find countries <input onChange={handleSearchChange} value={search} />
      {country === null ?
        <Countries countries={filteredCountries}
          handleShowCountryButton={handleShowCountryButton} /> :
        <Country country={country} weather={weather} condition={condition} />
      }
    </div>
  )
}

export default App
