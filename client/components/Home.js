import React from "react";
import { useSelector } from "react-redux";

import Recommended from "./Recommended";
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
      <Recommended />
      <Trending />
     
      
      <div id="landing">

      </div>
      {/* <Posts /> */}
    </div>
  );
};

export default Home;
