import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AnimatedPage from "./AnimatedPage";

import ByCity from "./ByCity";
import AllRestaurants from "./AllRestaurants";
import Trending from "./Trending";
import Favorites from "./Favorites";
import { Route } from "react-router-dom";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const Home = () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);
  const posts = useSelector(({ posts }) => posts);
  const auth = useSelector(({ auth }) => auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!restaurants) {
    return null;
  }

  if (!posts) {
    return null;
  }

  return (
    <div className="landing" style={{ marginTop: "90px" }}>
      <AnimatedPage>
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
      </AnimatedPage>
    </div>
  );
};

export default Home;
