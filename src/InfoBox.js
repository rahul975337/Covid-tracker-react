import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        {/* T I T L E */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        {/* NO OF   C A S E S */}
        <h2 className="infoBox__cases">{cases}</h2>
        {/* T O T A L */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
