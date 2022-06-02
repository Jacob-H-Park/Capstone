import React, { Component } from "react";
import "../App";
import axios from "axios";

const API_KEY = process.env.API_KEY;

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurantCollection: [] };
  }

  componentDidMount() {
    const options = {
      method: "GET",
      url: "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary",
      params: {
        bl_latitude: "40.63911",
        tr_latitude: "40.643331",
        bl_longitude: "-74.020374",
        tr_longitude: "-73.990926",
        restaurant_tagcategory_standalone: "10591",
        restaurant_tagcategory: "10591",
        limit: "30",
        currency: "USD",
        open_now: "false",
        lunit: "km",
        lang: "en_US",
      },
      headers: {
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "X-RapidAPI-Key": API_KEY,
      },
    };

    axios
      .request(options)
      .then((response) => {
        this.setState({ restaurantCollection: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const restaurants = this.state.restaurantCollection.data;

    if (!restaurants) {
      return null;
    }
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
