import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../App";
import axios from "axios";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData } from "../../server/api/map";
import Header from "./map/Header/Header";
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

  const getUserLocation = async () => {
    const response = await axios.get(place);
    setCoordinates({
      lat: response.data.results[0].geometry.location.lat,
      lng: response.data.results[0].geometry.location.lng,
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (bounds) {
      getPlacesData(bounds.sw, bounds.ne).then((data) => {
        console.log(data);
        setPlaces(data);
        setIsLoading(false);
      });
    }
  }, [coordinates, bounds]);

  return (
    <div className="wrapper-users">
      <CssBaseline />
      {/* <Header /> */}
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Table;

// export default class Table extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { restaurantCollection: [] };
//   }

//   componentDidMount() {
//     const options = {
//       method: "GET",
//       url: "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary",
//       params: {
//         bl_latitude: "40.63911",
//         tr_latitude: "40.643331",
//         bl_longitude: "-74.020374",
//         tr_longitude: "-73.990926",
//         restaurant_tagcategory_standalone: "10591",
//         restaurant_tagcategory: "10591",
//         limit: "30",
//         currency: "USD",
//         open_now: "false",
//         lunit: "km",
//         lang: "en_US",
//       },
//       headers: {
//         "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
//         "X-RapidAPI-Key": API_KEY,
//       },
//     };

//     axios
//       .request(options)
//       .then((response) => {
//         this.setState({ restaurantCollection: response.data });
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   render() {
//     const restaurants = this.state.restaurantCollection.data;
//     console.log("roobby", restaurants);

//     if (!restaurants) {
//       return null;
//     }
