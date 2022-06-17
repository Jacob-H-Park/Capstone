import React from "react";
import { useSelector } from "react-redux";

import ByCity from "./ByCity";
import AllRestaurants from "./AllRestaurants";
import Trending from "./Trending";
import Favorites from "./Favorites";
import { Route } from "react-router-dom";
import CreatePost from "./CreatePost";
import ClippedDrawer from "./SideBar";
import Posts from "./Posts";

const Home = () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);
  const posts = useSelector(({ posts }) => posts);
  const auth = useSelector(({ auth }) => auth);

  if (!restaurants) {
    return null;
  }

  if (!posts) {
    return null;
  }

  return (
    <div>
      {/* <ClippedDrawer /> */}
      <div className="landing">
        <Trending />
        <ByCity />
        <AllRestaurants />
        <Favorites />
        <div id="landing">
          <h1> Welcome {auth.username}</h1>
          <Route component={CreatePost} />
          <h2>My Feed</h2>
          <Route component={Posts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
