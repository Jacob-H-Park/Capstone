import axios from "axios";

//ACTION TYPES
const FETCH_RESTAURANT = "FETCH_RESTAURANT";

//ACTION CREATORS
const _fetchRestaurants = (restaurants) => {
  return {
    type: FETCH_RESTAURANT,
    restaurants,
  };
};

export const fetchRestaurants = () => {
  return async (dispatch) => {
    const restaurants = (await axios.get("/api/restaurants/yelp")).data;
    dispatch(_fetchRestaurants(restaurants));
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_RESTAURANT:
      return action.restaurants;

    default:
      return state;
  }
}
