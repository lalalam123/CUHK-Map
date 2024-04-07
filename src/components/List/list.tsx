"use client";
import React from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";

import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

import PlacesDetails from "../PlacesDetails/placesDetails";

// 36:51
// Custom component: Add mui on html
// MUI Styles: Add custom styles on MUI components

const Div = styled("div")(({ theme }) => ({
  color: alpha(theme.palette.common.black, 0.8),
  backgroundColor: alpha(theme.palette.common.white, 1),
  marginLeft: 0,
  width: "100%",
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
  marginBottom: "30px",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function List() {
  const [type, setType] = React.useState("restaurants");
  const [rating, setRating] = React.useState("");
  const places = [
    { name: "Cool Place" },
    { name: "Best Beer" },
    { name: "Best Steak" },
    { name: "Cool Place" },
    { name: "Best Beer" },
    { name: "Best Steak" },
    { name: "Cool Place" },
    { name: "Best Beer" },
    { name: "Best Steak" },
  ];

  return (
    <Div>
      <StyledTypography variant="h6">
        Restaurants, Hotels, and Attractions around you
      </StyledTypography>
      <StyledFormControl>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </StyledFormControl>
      <StyledFormControl>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </StyledFormControl>
      <Grid container spacing={3}>
        {places?.map((place, i) => (
          <Grid item key={i} xs={12}>
            {/* <PlacesDetails place={place} /> */}
            <Typography variant="h6" padding={2}>
              {place.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Div>
  );
}
