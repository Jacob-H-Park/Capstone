import React from "react";
import { useSelector } from "react-redux";
import Table from "./Table";
import {Route} from 'react-router-dom';
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const Landing = () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);
  const auth = useSelector(({ auth }) => auth);
  console.log(auth);

  if (!restaurants) {
    return null;
  }
  return (
    <>
      <div id="landing">
        <h1> Welcome {auth.username}</h1>
        <Route component={CreatePost} />
        <Route component={Posts} />
      </div>
    </>
  );
};

export default Landing;
