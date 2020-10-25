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
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util.js";
import LineGraph from "./LineGraph";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
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
          let sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
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
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        {/* H E A D E R */}
        <div className="app__header">
          {/* T I T L E  */}
          <h1>Covid-19 Tracker</h1>
          {/* S E L E C T    D R O P DO W N */}
          <FormControl className="app__dropdown">
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
            onClick={(e) => setCasesType("cases")}
            active={casesType === "cases"}
            isRed={true}
            total={prettyPrintStat(countryInfo.cases)}
            cases={prettyPrintStat(countryInfo.todayCases)}
          />
          {/* I N F O B O X E S title='Coronavirus recoveries'*/}
          <InfoBox
            title="Recovered"
            onClick={(e) => setCasesType("recovered")}
            active={casesType === "recovered"}
            isRed={false}
            total={prettyPrintStat(countryInfo.recovered)}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
          />
          {/* I N F O B O X E S title='Coronavirus deaths'*/}
          <InfoBox
            title="Deaths"
            onClick={(e) => setCasesType("deaths")}
            active={casesType === "deaths"}
            isRed={true}
            total={prettyPrintStat(countryInfo.deaths)}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
          />
        </div>
        {/* M A P */}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* T A B L E */}
          <Table countries={tableData} />
          <h3>Worldwide new {casesType}</h3>
          {/* G R A P H */}
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
