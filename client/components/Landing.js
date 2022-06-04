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
  const auth = useSelector(({ auth }) => auth);
  console.log(auth);
  console.log(restaurants);

  if (!restaurants) {
    return null;
  }

  return (
    <div className="landing">
      <Trending />

      <ByCity />

      <AllRestaurants />

      <Favorites />
      <>
        <div id="landing">
          <h1> Welcome {auth.username}</h1>
          <Route component={CreatePost} />
          <Route component={Posts} />
        </div>
      </>
    </div>
  );
};

export default Landing;
