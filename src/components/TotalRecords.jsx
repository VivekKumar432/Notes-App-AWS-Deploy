import { Box, Typography } from "@mui/material";
import React from "react";

const TotalRecords = ({totalrec,marked}) => {
  return (
    <Box sx={{ margin: 5, display: "flex", alignItems: "center" }}>
      <Typography  variant="h5" color="textSecondary"  sx={{ marginRight: 2 }}>Total records: {totalrec}</Typography>
      <Typography  variant="h5" color="textSecondary"  sx={{ marginRight: 2 }}>Marked records: {marked}</Typography>
      <Typography  variant="h5" color="textSecondary" >Unmarked records: {totalrec-marked}</Typography>
    </Box>
  );
};

export default TotalRecords;
