

import React from "react";
import { useSelector } from "react-redux";

const Trending= () => {
  const {businesses: restaurants} = useSelector(({ restaurants }) => restaurants);
  const auth = useSelector(({ auth }) => auth);
  

      if (!restaurants) {
          return null;
        }

          return (


              <div>
                <h1> Welcome {auth.username}</h1>
                <h2> {auth.username} , we recommend the following resturants! </h2>
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
              )
          }
        
          export default Trending;