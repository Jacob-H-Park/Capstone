
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
           if(restaurant.location.city==="Brooklyn")
            return (
              <li key={restaurant.id}>
                Restaurant Name:{restaurant.name}
                <br></br>
                Rating: {restaurant.rating}
              </li>
            )
         })}
      </ul> 
      </div>
     
      
      
 
  
  );
};


export default ByCity;
