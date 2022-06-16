
import React from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

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
                <ul >
                 {restaurants.map(restaurant => {
                   if(restaurant.rating === 5)
            return (
              <li key={restaurant.id}>
                Restaurant: {restaurant.name}
                <br></br>
                Rating: {restaurant.rating}
                <br></br>
                <Link to={`/trending/${restaurant.alias}`}> <img className="topPhoto"src={restaurant.image_url} ></img> </Link>
              </li>
            )
                 })}
                 </ul> 
                </div>
              )
          }
        
          export default Trending;