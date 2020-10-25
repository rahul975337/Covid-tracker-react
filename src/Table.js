// import React from "react";
// import "./Table.css";
// import numeral from "numeral";

// function Table({ countries }) {
//   return (
//     <div className="table">
//       {countries.map(({ country, cases }) => (
//         //
//         // emmet tr>td*2
//         <tr>
//           <td>{country}</td>
//           <td>
//             <strong>{numeral(country.cases).format("0,0")}</strong>
//           </td>
//         </tr>
//       ))}
//     </div>
//   );
// }

// export default Table;
import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
