import React from "react";
import { useSelector } from "react-redux";

import ByCity from "./Recommended";
import Trending from "./Trending";
import { Route } from "react-router-dom";
import CreatePost from "./CreatePost";
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
    <div className="landing">
      <Trending />
      <ByCity />
      <div id="landing">
        <h1> Welcome {auth.username}</h1>
        <Route component={CreatePost} />
      </div>
    </div>
  );
};

export default Home;
