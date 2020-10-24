import "./App.css";
import React, { useState, useEffect } from "react";

import { FormControl, Select, MenuItem } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["worldwide"]); // STATE = How to write a variable in REACT <<<<<
  //  https://disease.sh/v3/covid-19/countries
  // USEEFFECT = Runs a piece of code based on a given condition
  useEffect(() => {
    // The code inside here will run
    // Once when the component loads and not again
    // async => send a request,wait for it,do something with it
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United states,United Kingdom,India
            value: country.countryInfo.iso2, //UK,USA,FR,IND
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };
  return (
    <div className="App">
      {/* H E A D E R */}
      <div className="app__header">
        {/* T I T L E  */}
        <h1>Covid-19 Tracker</h1>
        {/* S E L E C T    D R O P DO W N */}
        <FormControl className="app_dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            {/* LOOP THROUGH ALL THE COUNTRIES AND SHOW DROPDOWN */}
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        {/* I N F O B O X E S  title='Coronavirus cases'*/}
        <InfoBox title="Cases" total="2000" cases="123" />
        {/* I N F O B O X E S title='Coronavirus recoveries'*/}
        <InfoBox title="Recovered" total="2000" cases="123" />
        {/* I N F O B O X E S title='Coronavirus deaths'*/}
        <InfoBox title="Deaths" total="2000" cases="123" />
      </div>

      {/* T A B L E */}
      {/* G R A P H */}
      {/* M A P */}
      <Map/>
    </div>
  );
}

export default App;
