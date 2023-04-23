import React from 'react';
import './countrySelector.css';

const CountrySelector = ({ countries, selectedCountry, handleCountryChange }) => {
  return(
    <div className="country-selector">
      <label htmlFor="country-select" className="form-label">
        Country : 
      </label>
      <select id="countrySelect" value={selectedCountry} onChange={handleCountryChange} className="form-select">
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;