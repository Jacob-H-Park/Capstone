
import React from "react";
import { useSelector } from "react-redux";

const ByCity= () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);
  

  if (!restaurants) {
    return null;
  }

  return (
    
      <div>
        <h2>Here is a list of top restuarants in BROOKLYN, NY!</h2>
        <ul>
          {restaurants.map((place) => {
            if (place.city === "Brooklyn")
              return (
                <li key={place.id}>
                  Restaurant Name: {place.name}
                  <br></br>
                  Category: {place.category}
                  <br></br>
                  Restaurant Address {place.address}
                  <br></br>
                  City: {place.city}
                  <br></br>
                  State: {place.state}
                  <br></br>
                  RANKING: {place.ranking}
                  <br></br>
                  <img className="logos" src={place.image} />
                  <br></br>
                </li>
              );
          })}
        </ul>
      </div>
     
      
      
 
  
  );
};


export default ByCity;
