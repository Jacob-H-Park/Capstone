import React from "react";
import { useSelector } from "react-redux";

const Favorites = () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);
  const auth = useSelector(({ auth }) => auth);

  if (!restaurants) {
    return null;
  }

  return (
    <div>
      <h1> {auth.username}' favorites</h1>

      <ul>
        {restaurants.map((place) => {
          if (place.isFavorite)
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

export default Favorites;
