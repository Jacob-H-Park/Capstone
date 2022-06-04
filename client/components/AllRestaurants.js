import React from "react";
import { useSelector } from "react-redux";

const AllRestaurants = () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);

  if (!restaurants) {
    return null;
  }

  return (
    
    
      <div>

      <h2>Here is a list of all RESTAURANTS!</h2>

        <ul>
          {restaurants.map((place) => {
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

export default AllRestaurants;
