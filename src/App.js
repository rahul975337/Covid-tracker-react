import "./App.css";
import React, { useState, useEffect } from "react";

import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";

import { sortData } from "./util.js";
import LineGraph from "./LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  // STATE = How to write a variable in REACT <<<<<
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
          // setTableData(data);
          const sortedData = sortData(data);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);
  ///////////////////////////////////////////////
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  //////////////////////////////
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        // All of the data...... from the country response
        setCountryInfo(data);
      });
  };
  console.log("====================================");
  console.log(countryInfo);
  console.log("====================================");
  return (
    <div className="app">
      <div className="app__left">
        {/* H E A D E R */}
        <div className="app__header">
          {/* T I T L E  */}
          <h1>Covid-19 Tracker</h1>
          {/* S E L E C T    D R O P DO W N */}
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
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
          <InfoBox
            title="Cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          {/* I N F O B O X E S title='Coronavirus recoveries'*/}
          <InfoBox
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          {/* I N F O B O X E S title='Coronavirus deaths'*/}
          <InfoBox
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>
        {/* M A P */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* T A B L E */}
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          {/* G R A P H */}
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
