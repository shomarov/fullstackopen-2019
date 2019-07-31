import React from 'react'

const Countries = ({ countries, handleShowCountryButton }) => {
  if (countries.length === 0) {
    return ''
  }

  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (countries.length > 1) {
    return (
      countries.map(country =>
        <div key={country.name}>{country.name}
          <button onClick={() => handleShowCountryButton(country)}>show</button>
        </div>
      ))
  }
}

export default Countries