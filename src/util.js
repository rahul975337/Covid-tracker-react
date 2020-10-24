import { Circle,Popup } from 'react-leaflet';
import React from 'react';
import numeral from 'numeral'


const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",

    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  // data.sort((a,b))
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

/////F O R     M A P S///////]
// DRAW CIRCLES ON MAP WITH INTERACTIVE TOOLKIT///
export const showDataOnMap = (data, caseType = "cases") => {
 data.map(country=>(
<Circle center={[country.countryInfo.lat,country.countryInfo.long]}
 fillOpacity={0.4} fillColor={}>

</Circle>
 ))
});
