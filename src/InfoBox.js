import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox({ title, cases, active, isRed, total, ...props }) {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
      onClick={props.onClick}
    >
      <CardContent>
        {/* T I T L E */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        {/* NO OF   C A S E S */}
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>
        {/* T O T A L */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
