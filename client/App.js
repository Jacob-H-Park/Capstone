<<<<<<< HEAD
import React, { createContext, useState, useEffect } from "react";

=======
import React, {
  useState,
  useEffect,
  Component,
  Fragment,
  createContext,
} from "react";
>>>>>>> ad77255fb8967533f36aa2db8bc1af746089ddc4
import { connect } from "react-redux";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";

import history from "./history";
import { Login, Signup } from "./components/AuthForm";
import Profile from "./components/Profile";
import { me } from "./store";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Landing from "./components/Landing";
<<<<<<< HEAD
import Stream from "./components/Stream";

import { fetchRestaurants } from "./store/restaurants";
import ReactSwitch from "react-switch";
=======
import Map from "./components/Search";
import { fetchRestaurants } from "./store/restaurants";
import ReactSwitch from "react-switch";
import alanBtn from "@alan-ai/alan-sdk-web";
>>>>>>> ad77255fb8967533f36aa2db8bc1af746089ddc4

export const ThemeContext = createContext(null);

const App = (props) => {
  const { isLoggedIn, fetchRestaurants, loadInitialData } = props;
<<<<<<< HEAD

=======
>>>>>>> ad77255fb8967533f36aa2db8bc1af746089ddc4
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
<<<<<<< HEAD
=======

  useEffect(() => {
    alanBtn({
      key: process.env.ALAN_KEY,
      onCommand: ({ command, articles, number }) => {
        if (command === "homepage") {
          history.push("/landing");
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
>>>>>>> ad77255fb8967533f36aa2db8bc1af746089ddc4

  useEffect(() => {
    loadInitialData();
    fetchRestaurants();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <Navbar />
<<<<<<< HEAD
        {/* <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} /> */}
=======
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
>>>>>>> ad77255fb8967533f36aa2db8bc1af746089ddc4
        {isLoggedIn ? (
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/landing" component={Landing} />
<<<<<<< HEAD
            <Route path="/streamchat" component={Stream} />
=======
            <Route path="/map" component={Map} />
>>>>>>> ad77255fb8967533f36aa2db8bc1af746089ddc4
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
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
  };
};

export default withRouter(connect(mapState, mapDispatch)(App));
