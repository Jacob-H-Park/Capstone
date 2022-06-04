import React from "react";
import { useSelector } from "react-redux";

const Favorites = () => {
  const {businesses: restaurants} = useSelector(({ restaurants }) => restaurants);
  const auth = useSelector(({ auth }) => auth);

  if (!restaurants) {
    return null;
  }

  return (
    <div>
      <h1> {auth.username}' favorites</h1>
      <ul>
         {restaurants.map(restaurant => {
            return (
              <li key={restaurant.id}>
                {restaurant.name}
              </li>
            )
         })}
      </ul> 
      
    </div>
  );
};

export default Favorites;
