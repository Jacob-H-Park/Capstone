

import React from "react";
import { useSelector } from "react-redux";

const Trending= () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);
  const auth = useSelector(({ auth }) => auth);
  

      if (!restaurants) {
          return null;
        }

          return (


              <div>
                <h1> Welcome {auth.username}</h1>
                <h2> {auth.username} , we recommend the following resturants! </h2>
                <ul>
                  {restaurants.map((place) => {
                    if (place.ranking < 4)
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
                          <button type="button"> Add To Favorites </button>
                          <br></br>
                        </li>
                      );
                  })}
                </ul>
                </div>
              )
          }
        
          export default Trending;