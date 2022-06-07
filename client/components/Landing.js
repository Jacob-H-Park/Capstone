import React from "react";
import { useSelector } from "react-redux";

import ByCity from "./ByCity";
import AllRestaurants from "./AllRestaurants";
import Trending from "./Trending";
import Favorites from "./Favorites";
import Table from "./Table";
import { Route } from "react-router-dom";
import CreatePost from "./CreatePost";
import Posts from "./Posts";


const Landing = () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);
  const posts = useSelector(({ posts}) => posts);
  const auth = useSelector(({ auth }) => auth);
<<<<<<< HEAD
  console.log(auth);
  console.log(restaurants);
  console.log(posts);
=======
>>>>>>> e0e63bab167ea1f0f8f6aa56b7bcc48656d439f4

  if (!restaurants) {
    return null;
  }

  return (
    <div className="landing">
      <Trending />

      <ByCity />

      <AllRestaurants />

      <Favorites />
<<<<<<< HEAD
  
        <div id="landing">
          <h1> Welcome {auth.username}</h1>
          <Route component={CreatePost} />
          <h2>My Feed</h2>
          <Route component={Posts} />
        </div>
=======

      <div id="landing">
        <h1> Welcome {auth.username}</h1>
        <Route component={CreatePost} />
        <Route component={Posts} />
      </div>
>>>>>>> e0e63bab167ea1f0f8f6aa56b7bcc48656d439f4
    </div>
  );
};

export default Landing;
