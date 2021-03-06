import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import theme from "./styles.js";
import { ThemeProvider } from "@mui/material/styles";

const List = ({ places, childClicked, isLoading, rating, setRating }) => {
  //const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <Box sx={{ p: "25px" }}>
      <Typography variant="h4">Food & Dining around you</Typography>
      {isLoading ? (
        <Box
          sx={{
            height: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <>
          <FormControl
            sx={{
              margin: "16px",
              minWidth: "120px",
              marginBottom: "30px",
            }}
          >
            <InputLabel id="rating">Rating</InputLabel>
            <Select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} sx={{ height: "70vh", overflow: "auto" }}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default List;
