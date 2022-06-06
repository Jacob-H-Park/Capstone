import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../App";
import axios from "axios";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData } from "../../server/api/map";
import List from "./map/List/List";
import Map from "./map/Map/Map";

const Table = () => {
  const auth = useSelector(({ auth }) => auth);
  const place = `https://maps.googleapis.com/maps/api/geocode/json?address=${auth.city}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState("");

  const getUserLocation = async () => {
    const response = await axios.get(place);
    setCoordinates({
      lat: response.data.results[0].geometry.location.lat,
      lng: response.data.results[0].geometry.location.lng,
    });
  };

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

<<<<<<< HEAD
  render() {
    const restaurants = this.state.restaurantCollection.data;
=======
  useEffect(() => {
    auth.city
      ? getUserLocation()
      : navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
          }
        );
  }, []);
>>>>>>> ad77255fb8967533f36aa2db8bc1af746089ddc4

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlacesData(bounds.sw, bounds.ne).then((data) => {
        setPlaces(data);
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
<<<<<<< HEAD
    return (
      <div>
        <ul>
          {" "}
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              {restaurant.name} --
              {restaurant.address} --
              {restaurant.ranking?.slice(0, 10)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
=======
  }, [coordinates, bounds]);

  return (
    <div className="wrapper-users">
      <CssBaseline />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Table;
>>>>>>> ad77255fb8967533f36aa2db8bc1af746089ddc4
