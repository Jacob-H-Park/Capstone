import React, {Component} from "react";
import {connect, useSelector} from "react-redux";
import {Link, Route} from "react-router-dom";
import { useParams } from "react-router-dom";
import Posts from "./Posts";


const SingleRestaurant = () => {
  const {businesses: restaurants} = useSelector(({ restaurants }) => restaurants);
  const posts = useSelector(({ posts }) => posts);
  const {alias} = useParams();

  if(!restaurants) {
    return null
}

  const restaurant = restaurants.filter((place) => place.alias === alias)[0]
  console.log(restaurant)

  return (
    <div>
        <div>
        {restaurant.name}
        </div>
       <img src={restaurant.image_url}/>
       <div> 
        {restaurant.rating}
       </div>
       <div>
       <Route component={Posts} />
       </div>
    </div>
  )
}

export default SingleRestaurant

