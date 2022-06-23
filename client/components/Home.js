import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AnimatedPage from "./AnimatedPage";

import Recommended from "./Recommended";
import Trending from "./Trending";
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
        <Recommended />
        <Trending />
      </AnimatedPage>
    </div>
  );
};

export default Home;
