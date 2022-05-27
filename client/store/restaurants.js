import axios from "axios"

const FETCH_RESTAURANT = "FETCH_RESTAURANT"

export const fetchRestaurants = () => {
  return async(dispatch) => {
    const restaurants = (await axios.get("/api/restaurants")).data;
    dispatch( {type: FETCH_RESTAURANT, restaurants})
    console.log('test',restaurants)
      
  }

}


export default function (state = [], action) {
  switch (action.type) {
    case FETCH_RESTAURANT:
      return action.restaurants;
   
    default:
      return state;
  }
}