import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const TrelloCard = () => {
  return (
    <Card>
      <Typography sx={{ fontSize: 14 }} gutterBottom>
        Word of the Day
      </Typography>
    </Card>
  );
};

export default TrelloCard;
