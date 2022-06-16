import React, {Component} from "react";
import {connect, useSelector} from "react-redux";
import {Link, Route} from "react-router-dom";
import { useParams } from "react-router-dom";
import Posts from "./Posts";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


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
      <h1 id="singlePlace"> {restaurant.name} </h1>
      <img id="singleImage" src={restaurant.image_url} />
      <Link to='/'> Home page </Link>
       <Route component={Posts} />
  
    </div>
  )
}

export default SingleRestaurant

