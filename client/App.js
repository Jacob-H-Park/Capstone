import React, { useState, useEffect, createContext } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { useLocation } from "react-router";
import ReactSwitch from "react-switch";
import alanBtn from "@alan-ai/alan-sdk-web";
import { AnimatePresence } from "framer-motion";

import history from "./history";
import { me } from "./store";
import { loadPosts } from "./store/posts";
import { fetchRestaurants } from "./store/restaurants";

import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Stream from "./components/Stream";
import Post from "./components/Post";
import Landing from "./components/Landing";
import Map from "./components/Search";

export const ThemeContext = createContext(null);

const App = (props) => {
  const { isLoggedIn, fetchRestaurants, loadInitialData, loadPosts } = props;
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    alanBtn({
      key: process.env.ALAN_KEY,
      onCommand: ({ command, articles, number }) => {
        if (command === "homepage") {
          history.push("/");
        } else if (command === "map") {
          history.push("/map");
        } else if (command === "profile") {
          history.push("/profile");
        } else if (command === "night") {
          toggleTheme();
        }
      },
    });
  }, []);

  useEffect(() => {
    loadInitialData();
    fetchRestaurants();
    loadPosts();
  }, []);

  const location = useLocation();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        {isLoggedIn ? (
          <>
            <Navbar />
            <AnimatePresence exitBeforeEnter>
              <Switch key={location.pathname} location={location}>
                <Route path="/profile" component={Profile} />
                <Route path="/welcome" component={Welcome} />
                <Route exact path="/" component={Home} />
                <Route path="/map" component={Map} />
                <Route path="/streamchat" component={Stream} />
                <Route path="/posts/:id" component={Post} />
              </Switch>
            </AnimatePresence>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
          </>
        ) : (
          <Route exact path="/" component={Landing} />
        )}
      </div>
    </ThemeContext.Provider>
  );
};

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
    fetchRestaurants: () => dispatch(fetchRestaurants()),
    loadPosts: () => dispatch(loadPosts()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(App));
