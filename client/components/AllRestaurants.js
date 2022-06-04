import React from "react";
import { useSelector } from "react-redux";

const AllRestaurants = () => {
  const {businesses: restaurants} = useSelector(({ restaurants }) => restaurants);

  if (!restaurants) {
    return null;
  }

  return (
    
    
      <div>

      <h2>Here is a list of all RESTAURANTS!</h2>
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

export default AllRestaurants;
