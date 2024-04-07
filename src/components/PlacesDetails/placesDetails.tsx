import React from "react";

import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

export default function PlacesDetails(place: any) {
  return (
    <Typography variant="h6" padding={2} sx={{ color: "inherit", backgroundColor: "inherit" }}>
      {place.name}
    </Typography>
  );
}
