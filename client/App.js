import React, {
  useState,
  useEffect,
  Component,
  Fragment,
  createContext,
} from "react";
import { connect } from "react-redux";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";

import history from "./history";
import { Login, Signup } from "./components/AuthForm";
import Profile from "./components/Profile";
import { me } from "./store";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Landing from "./components/Landing";
import Map from "./components/Search";
import { fetchRestaurants } from "./store/restaurants";
import ReactSwitch from "react-switch";
import alanBtn from "@alan-ai/alan-sdk-web";

export const ThemeContext = createContext(null);

const App = (props) => {
  const { isLoggedIn, fetchRestaurants, loadInitialData } = props;
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

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

  useEffect(() => {
    loadInitialData();
    fetchRestaurants();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <Navbar />
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        {isLoggedIn ? (
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/landing" component={Landing} />
            <Route path="/map" component={Map} />
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
