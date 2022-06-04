
import React from "react";
import { useSelector } from "react-redux";

const ByCity= () => {
  const {businesses: restaurants} = useSelector(({ restaurants }) => restaurants);
  

  if (!restaurants) {
    return null;
  }

  return (
    
      <div>
        <h2>Here is a list of top restuarants in BROOKLYN, NY!</h2>
        <ul>
         {restaurants.map(restaurant => {
            return (
              <li>
                {restaurant.name}
              </li>
            )
         })}
      </ul> 
      </div>
     
      
      
 
  
  );
};


export default ByCity;
