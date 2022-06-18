import React from "react";
import { useSelector } from "react-redux";

import Recommended from "./Recommended";
import Trending from "./Trending";
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
<<<<<<< HEAD
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
=======
    <div className="landing">
      <Recommended />
      <Trending />
     
      
      <div id="landing">
        <h1> Welcome {auth.username}</h1>
>>>>>>> d36dd87f245bf61fcde0e1c9a2cd2f3f8c7608be
      </div>
      {/* <Posts /> */}
    </div>
  );
};

export default Home;
